import { foldTr, lowerTr, SourceTool, type SourceGroup, type SourceToolData } from '../models/SourceTool'

export type SortKey = 'order' | 'name' | 'category' | 'subcategory'
export type SortDir = 'asc' | 'desc'
export type GroupFilter = 'all' | SourceGroup

export const PAGE_SIZES = [24, 48, 96] as const

export interface SourcesState {
  query: string
  category: string | null
  subcategory: string | null
  group: GroupFilter
  onlyCdn: boolean
  sortKey: SortKey
  sortDir: SortDir
  page: number
  pageSize: number
}

export interface Facet { value: string; count: number }

export const DEFAULT_STATE: SourcesState = {
  query: '', category: null, subcategory: null, group: 'all', onlyCdn: false,
  sortKey: 'order', sortDir: 'asc', page: 1, pageSize: PAGE_SIZES[0],
}

const collator = new Intl.Collator('tr')
const SORT_KEYS: SortKey[] = ['order', 'name', 'category', 'subcategory']

/**
 * Kaynaklar tablosunun görünüm modeli. Saf TypeScript (astro:content yok): sunucuda ve React adacığında aynı kod çalışır.
 * Değişmezdir: her with* çağrısı yeni bir nesne döndürür.
 */
export class SourcesViewModel {
  private cache: { rows?: SourceTool[] } = {}

  private constructor(readonly tools: readonly SourceTool[], readonly state: SourcesState) {}

  static create(tools: readonly SourceTool[], state: Partial<SourcesState> = {}): SourcesViewModel {
    return new SourcesViewModel(tools, { ...DEFAULT_STATE, ...state })
  }

  static fromData(data: SourceToolData[], state: Partial<SourcesState> = {}): SourcesViewModel {
    return SourcesViewModel.create(SourceTool.of(data), state)
  }

  /** Paylaşılabilir URL parametrelerinden durumu kurar; geçersiz değerler varsayılana düşer. */
  static fromUrlParams(tools: readonly SourceTool[], params: URLSearchParams | string): SourcesViewModel {
    const p = typeof params === 'string' ? new URLSearchParams(params) : params
    const categories = new Set(tools.map((t) => t.category))
    const subs = new Set(tools.map((t) => t.subcategory).filter((s): s is string => !!s))
    const category = p.get('kategori')
    const sub = p.get('alt')
    const group = p.get('grup')
    const sort = p.get('sirala') as SortKey | null
    const size = Number(p.get('adet'))
    const page = Math.floor(Number(p.get('sayfa')))
    return SourcesViewModel.create(tools, {
      query: (p.get('q') ?? '').slice(0, 120),
      category: category && categories.has(category) ? category : null,
      subcategory: sub && subs.has(sub) ? sub : null,
      group: group === 'ana' || group === 'ayrica' ? group : 'all',
      onlyCdn: p.get('cdn') === '1',
      sortKey: sort && SORT_KEYS.includes(sort) ? sort : 'order',
      sortDir: p.get('yon') === 'desc' ? 'desc' : 'asc',
      pageSize: (PAGE_SIZES as readonly number[]).includes(size) ? size : DEFAULT_STATE.pageSize,
      page: Number.isFinite(page) && page > 0 ? page : 1,
    })
  }

  toUrlParams(): URLSearchParams {
    const s = this.state
    const p = new URLSearchParams()
    if (s.query.trim()) p.set('q', s.query.trim())
    if (s.category) p.set('kategori', s.category)
    if (s.subcategory) p.set('alt', s.subcategory)
    if (s.group !== 'all') p.set('grup', s.group)
    if (s.onlyCdn) p.set('cdn', '1')
    if (s.sortKey !== 'order') p.set('sirala', s.sortKey)
    if (s.sortKey !== 'order' && s.sortDir === 'desc') p.set('yon', 'desc')
    if (s.pageSize !== DEFAULT_STATE.pageSize) p.set('adet', String(s.pageSize))
    if (this.page > 1) p.set('sayfa', String(this.page))
    return p
  }

  // --- durum değiştiriciler (filtre değişince sayfa 1'e döner) ---
  private next(patch: Partial<SourcesState>, resetPage = true): SourcesViewModel {
    return new SourcesViewModel(this.tools, { ...this.state, ...patch, ...(resetPage ? { page: 1 } : {}) })
  }
  withQuery(query: string) { return this.next({ query }) }
  withCategory(category: string | null) { return this.next({ category, subcategory: null }) }
  withSubcategory(subcategory: string | null) { return this.next({ subcategory }) }
  withGroup(group: GroupFilter) { return this.next({ group, category: null, subcategory: null }) }
  withOnlyCdn(onlyCdn: boolean) { return this.next({ onlyCdn }) }
  withSort(sortKey: SortKey, sortDir: SortDir = 'asc') { return this.next({ sortKey, sortDir }) }
  /** Aynı sütuna tekrar basınca yönü çevirir; üçüncü basışta kaynak sırasına döner. */
  toggleSort(key: Exclude<SortKey, 'order'>) {
    const { sortKey, sortDir } = this.state
    if (sortKey !== key) return this.withSort(key, 'asc')
    return sortDir === 'asc' ? this.withSort(key, 'desc') : this.withSort('order', 'asc')
  }
  withPage(page: number) { return this.next({ page: Math.min(Math.max(1, Math.floor(page)), this.totalPages) }, false) }
  withPageSize(pageSize: number) { return this.next({ pageSize }) }
  cleared() { return new SourcesViewModel(this.tools, { ...DEFAULT_STATE, pageSize: this.state.pageSize }) }

  get hasActiveFilters(): boolean {
    const s = this.state
    return !!(s.query.trim() || s.category || s.subcategory || s.group !== 'all' || s.onlyCdn)
  }

  // --- hesaplanan görünümler ---
  private matches(t: SourceTool, skip: 'category' | 'subcategory' | 'none'): boolean {
    const s = this.state
    if (s.group !== 'all' && t.group !== s.group) return false
    if (skip !== 'category' && s.category && t.category !== s.category) return false
    if (skip !== 'subcategory' && s.subcategory && t.subcategory !== s.subcategory) return false
    if (s.onlyCdn && !t.hasCdn) return false
    const q = foldTr(lowerTr(s.query.trim()))
    if (q) {
      const hay = t.foldedText
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false
    }
    return true
  }

  get rows(): SourceTool[] {
    if (this.cache.rows) return this.cache.rows
    const { sortKey, sortDir } = this.state
    const list = this.tools.filter((t) => this.matches(t, 'none'))
    if (sortKey !== 'order') {
      const val = (t: SourceTool) => (sortKey === 'name' ? t.name : sortKey === 'category' ? t.category : t.subcategory ?? '')
      const dir = sortDir === 'asc' ? 1 : -1
      list.sort((a, b) => dir * collator.compare(val(a), val(b)) || collator.compare(a.name, b.name))
    }
    return (this.cache.rows = list)
  }

  get total(): number { return this.rows.length }
  get totalPages(): number { return Math.max(1, Math.ceil(this.rows.length / this.state.pageSize)) }
  get page(): number { return Math.min(this.state.page, this.totalPages) }
  get pageRows(): SourceTool[] {
    const start = (this.page - 1) * this.state.pageSize
    return this.rows.slice(start, start + this.state.pageSize)
  }
  /** Gösterilen aralık (1 tabanlı, kapsayıcı); sonuç yoksa [0, 0]. */
  get range(): [number, number] {
    if (!this.total) return [0, 0]
    const start = (this.page - 1) * this.state.pageSize
    return [start + 1, Math.min(start + this.state.pageSize, this.total)]
  }

  private facet(pick: (t: SourceTool) => string | null, skip: 'category' | 'subcategory', within?: (t: SourceTool) => boolean): Facet[] {
    const counts = new Map<string, number>()
    for (const t of this.tools) {
      if (!this.matches(t, skip) || (within && !within(t))) continue
      const v = pick(t)
      if (v) counts.set(v, (counts.get(v) ?? 0) + 1)
    }
    const order = new Map<string, number>()
    this.tools.forEach((t) => { const v = pick(t); if (v && !order.has(v)) order.set(v, order.size) })
    return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => order.get(a.value)! - order.get(b.value)!)
  }

  /** Kategori sayıları, kategori dışındaki etkin filtreleri yansıtır. */
  get categoryFacets(): Facet[] { return this.facet((t) => t.category, 'category') }
  /** Alt kategori sayıları; seçili kategori varsa onunla sınırlı. */
  get subcategoryFacets(): Facet[] { return this.facet((t) => t.subcategory, 'subcategory') }
  get groupCounts(): Record<GroupFilter, number> {
    const base = new SourcesViewModel(this.tools, { ...this.state, group: 'all' })
    const rows = base.rows
    return { all: rows.length, ana: rows.filter((t) => t.group === 'ana').length, ayrica: rows.filter((t) => t.group === 'ayrica').length }
  }
}
