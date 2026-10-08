import { Chip, CopyButton, Pagination, Select, Switch, Table, TextInput } from '@mantine/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { SourceToolData } from '../../models/SourceTool'
import { SourceTool } from '../../models/SourceTool'
import { PAGE_SIZES, SourcesViewModel, type Facet, type GroupFilter, type SortKey } from '../../viewmodels/SourcesViewModel'
import { Providers } from './Providers'
import classes from './SourcesTable.module.css'

const withCount = (facets: Facet[], selected: string | null) => {
  const list = facets.map((f) => ({ value: f.value, label: `${f.value} (${f.count})` }))
  if (selected && !list.some((o) => o.value === selected)) list.unshift({ value: selected, label: `${selected} (0)` })
  return list
}

function SortHeader({ vm, id, label, onSort }: { vm: SourcesViewModel; id: Exclude<SortKey, 'order'>; label: string; onSort: (k: Exclude<SortKey, 'order'>) => void }) {
  const active = vm.state.sortKey === id
  const dir = vm.state.sortDir
  return (
    <Table.Th aria-sort={active ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'} className={classes.th}>
      <button type="button" className={classes.sort} onClick={() => onSort(id)}>
        {label}
        <span aria-hidden="true" className={classes.arrow} data-active={active || undefined}>{active ? (dir === 'asc' ? '↑' : '↓') : '↕'}</span>
      </button>
    </Table.Th>
  )
}

function Detail({ tool }: { tool: SourceTool }) {
  return (
    <div className={classes.detail}>
      {tool.snippets.length === 0 && <p className={classes.muted}>Bu kayıt için kod örneği verilmemiş.</p>}
      {tool.snippets.map((s, i) => (
        <div key={i} className={classes.code}>
          <div className={classes.codeBar}>
            <span className={classes.lang}>{s.lang}</span>
            <CopyButton value={s.code} timeout={2000}>
              {({ copied, copy }) => (
                <button type="button" className={classes.copy} onClick={copy} aria-label={`${tool.name} kodunu kopyala`} data-copied={copied || undefined}>
                  {copied ? 'Kopyalandı' : 'Kopyala'}
                </button>
              )}
            </CopyButton>
          </div>
          <pre className={classes.pre}><code>{s.code}</code></pre>
        </div>
      ))}
      {tool.scenario && (
        <p className={classes.scenario}><strong>Kullanım senaryosu.</strong> {tool.scenario}</p>
      )}
    </div>
  )
}

export interface SourcesTableProps { tools: SourceToolData[] }

function SourcesTableInner({ tools }: SourcesTableProps) {
  const all = useMemo(() => SourceTool.of(tools), [tools])
  const [vm, setVm] = useState(() => SourcesViewModel.create(all))
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const [ready, setReady] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)

  // URL'den durumu geri yükle (sunucu HTML'i varsayılan durumla üretilir)
  useEffect(() => {
    setVm(SourcesViewModel.fromUrlParams(all, window.location.search))
    setReady(true)
  }, [all])

  // Durumu URL'ye yansıt
  useEffect(() => {
    if (!ready) return
    const qs = vm.toUrlParams().toString()
    const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
    window.history.replaceState(null, '', url)
  }, [vm, ready])

  const update = (next: SourcesViewModel) => {
    setVm(next)
    if (scroller.current) scroller.current.scrollTop = 0
  }
  const toggle = (id: string) =>
    setOpen((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const [from, to] = vm.range
  const counts = vm.groupCounts
  const cats = withCount(vm.categoryFacets, vm.state.category)
  const subs = withCount(vm.subcategoryFacets, vm.state.subcategory)
  const fieldClasses = { input: classes.input, label: classes.label, option: classes.option, dropdown: classes.dropdown, section: classes.section, empty: classes.option }

  return (
    <div className={classes.root}>
      <form className={classes.filters} role="search" aria-label="Kaynak filtreleri" onSubmit={(e) => e.preventDefault()}>
        <TextInput
          className={classes.search}
          classNames={fieldClasses}
          label="Ara"
          placeholder="Araç, açıklama veya kategori ara"
          type="search"
          value={vm.state.query}
          onChange={(e) => update(vm.withQuery(e.currentTarget.value))}
          autoComplete="off"
        />
        <Select
          classNames={fieldClasses}
          label="Kategori"
          placeholder="Tüm kategoriler"
          data={cats}
          value={vm.state.category}
          onChange={(v) => update(vm.withCategory(v))}
          searchable
          clearable
          nothingFoundMessage="Eşleşen kategori yok"
          comboboxProps={{ withinPortal: false }}
          clearButtonProps={{ 'aria-label': 'Kategori seçimini temizle' }}
        />
        <Select
          classNames={fieldClasses}
          label="Alt kategori"
          placeholder="Tüm alt kategoriler"
          data={subs}
          value={vm.state.subcategory}
          onChange={(v) => update(vm.withSubcategory(v))}
          searchable
          clearable
          nothingFoundMessage="Eşleşen alt kategori yok"
          comboboxProps={{ withinPortal: false }}
          clearButtonProps={{ 'aria-label': 'Alt kategori seçimini temizle' }}
        />
        <fieldset className={classes.group}>
          <legend className={classes.label}>Liste</legend>
          <Chip.Group multiple={false} value={vm.state.group} onChange={(v) => update(vm.withGroup(v as GroupFilter))}>
            <div className={classes.chips}>
              <Chip value="all" variant="light" classNames={{ label: classes.chip }}>{`Tümü (${counts.all})`}</Chip>
              <Chip value="ana" variant="light" classNames={{ label: classes.chip }}>{`Ana liste (${counts.ana})`}</Chip>
              <Chip value="ayrica" variant="light" classNames={{ label: classes.chip }}>{`Ayrıca (${counts.ayrica})`}</Chip>
            </div>
          </Chip.Group>
        </fieldset>
        <Switch
          className={classes.cdn}
          classNames={{ label: classes.label, body: classes.switchBody }}
          label="Yalnızca CDN kodu olanlar"
          checked={vm.state.onlyCdn}
          onChange={(e) => update(vm.withOnlyCdn(e.currentTarget.checked))}
        />
      </form>

      <div className={classes.status}>
        <p role="status" aria-live="polite" data-testid="result-count">
          {vm.total === 0 ? '0 sonuç' : `${vm.total} sonuçtan ${from}–${to} arası gösteriliyor`}
        </p>
        {vm.hasActiveFilters && (
          <button type="button" className={classes.link} onClick={() => update(vm.cleared())}>Filtreleri temizle</button>
        )}
      </div>

      <div
        ref={scroller}
        className={classes.scroller}
        role="region"
        aria-label="Kaynaklar tablosu, yatay kaydırılabilir"
        tabIndex={0}
        data-lenis-prevent
        data-testid="table-scroller"
      >
        <Table className={classes.table} classNames={{ th: classes.th, td: classes.td, tr: classes.tr }} data-testid="sources-table">
          <Table.Thead>
            <Table.Tr>
              <SortHeader vm={vm} id="name" label="Araç" onSort={(k) => update(vm.toggleSort(k))} />
              <SortHeader vm={vm} id="category" label="Kategori" onSort={(k) => update(vm.toggleSort(k))} />
              <SortHeader vm={vm} id="subcategory" label="Alt kategori" onSort={(k) => update(vm.toggleSort(k))} />
              <Table.Th className={classes.th}>Açıklama</Table.Th>
              <Table.Th className={classes.th}>CDN</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {vm.pageRows.map((t) => {
              const isOpen = open.has(t.id)
              const panel = `detay-${t.id}`
              return (
                <RowPair key={t.id}>
                  <Table.Tr data-testid="row" data-open={isOpen || undefined}>
                    <Table.Td className={classes.tool}>
                      <button type="button" className={classes.expand} aria-expanded={isOpen} aria-controls={isOpen ? panel : undefined} onClick={() => toggle(t.id)}>
                        <span aria-hidden="true" className={classes.chevron} data-open={isOpen || undefined}>{'›'}</span>
                        <span className={classes.name}>{t.name}</span>
                      </button>
                    </Table.Td>
                    <Table.Td>{t.category}</Table.Td>
                    <Table.Td>{t.subcategory ?? <span className={classes.muted}>–</span>}</Table.Td>
                    <Table.Td className={classes.desc}>{t.description}</Table.Td>
                    <Table.Td><span className={classes.tag} data-cdn={t.hasCdn || undefined}>{t.hasCdn ? 'CDN' : 'Yok'}</span></Table.Td>
                  </Table.Tr>
                  {isOpen && (
                    <Table.Tr className={classes.detailRow}>
                      <Table.Td colSpan={5} id={panel}>
                        <Detail tool={t} />
                      </Table.Td>
                    </Table.Tr>
                  )}
                </RowPair>
              )
            })}
          </Table.Tbody>
        </Table>
        {vm.total === 0 && (
          <div className={classes.empty}>
            <p>Bu filtrelerle eşleşen kaynak bulunamadı.</p>
            <button type="button" className={classes.link} onClick={() => update(vm.cleared())}>Filtreleri temizle</button>
          </div>
        )}
      </div>

      <div className={classes.footer}>
        <Select
          classNames={fieldClasses}
          className={classes.pageSize}
          label="Sayfa başına"
          data={PAGE_SIZES.map((n) => ({ value: String(n), label: String(n) }))}
          value={String(vm.state.pageSize)}
          onChange={(v) => v && update(vm.withPageSize(Number(v)))}
          allowDeselect={false}
          comboboxProps={{ withinPortal: false }}
        />
        {vm.totalPages > 1 && (
          <Pagination
            className={classes.pagination}
            classNames={{ control: classes.pageControl }}
            total={vm.totalPages}
            value={vm.page}
            onChange={(p) => update(vm.withPage(p))}
            siblings={1}
            boundaries={1}
            getControlProps={(control) => {
              if (control === 'previous') return { 'aria-label': 'Önceki sayfa' }
              if (control === 'next') return { 'aria-label': 'Sonraki sayfa' }
              if (control === 'first') return { 'aria-label': 'İlk sayfa' }
              if (control === 'last') return { 'aria-label': 'Son sayfa' }
              return {}
            }}
            getItemProps={(page) => ({ 'aria-label': `Sayfa ${page}` })}
          />
        )}
      </div>
    </div>
  )
}

/** Satır + ayrıntı satırı çifti için anahtarlı sarmalayıcı (tbody içinde geçerli HTML korunur). */
function RowPair({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default function SourcesTable(props: SourcesTableProps) {
  return (
    <Providers>
      <SourcesTableInner {...props} />
    </Providers>
  )
}
