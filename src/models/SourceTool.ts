import { Entity } from './Entity'

export interface SourceSnippet { lang: string; code: string }
export type SourceGroup = 'ana' | 'ayrica'

export interface SourceToolData {
  id: string
  name: string
  category: string
  subcategory: string | null
  group: SourceGroup
  description: string
  snippets: SourceSnippet[]
  scenario: string | null
}

/** Türkçe'ye duyarlı küçük harf: İ -> i, I -> ı. */
export const lowerTr = (s: string): string => s.toLocaleLowerCase('tr')

/** Aksan duyarsız arama için Türkçe harfleri ASCII karşılığına indirger (girdi önce lowerTr'den geçmeli). */
export const foldTr = (s: string): string =>
  s.replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/\u0307/g, '')

/** Web geliştirme araçları kataloğundaki tek bir kütüphane/araç. Saf TypeScript: React adacığında da çalışır. */
export class SourceTool extends Entity<SourceToolData> {
  private readonly text: string

  private constructor(data: SourceToolData) {
    super(data)
    this.text = lowerTr([data.name, data.category, data.subcategory ?? '', data.description, data.scenario ?? ''].join(' '))
  }

  static from(data: SourceToolData): SourceTool { return new SourceTool(data) }
  static of(rows: SourceToolData[]): SourceTool[] { return rows.map((r) => new SourceTool(r)) }

  get name() { return this.data.name }
  get category() { return this.data.category }
  get subcategory() { return this.data.subcategory }
  get group() { return this.data.group }
  get description() { return this.data.description }
  get snippets() { return this.data.snippets }
  get scenario() { return this.data.scenario }
  /** En az bir kod parçası bir CDN/kaynak adresi içeriyor mu. */
  get hasCdn(): boolean { return this.data.snippets.some((s) => /https?:\/\//.test(s.code)) }
  get primarySnippet(): SourceSnippet | null { return this.data.snippets[0] ?? null }
  /** Arama için küçük harfli (tr) birleşik metin. */
  get searchText(): string { return this.text }
  /** Aksan duyarsız eşleşme için sadeleştirilmiş metin. */
  get foldedText(): string { return foldTr(this.text) }

  toJSON(): SourceToolData { return { ...this.data } }
}
