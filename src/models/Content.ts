import { byOrder, Entity } from './Entity'

/** Başlık + metin taşıyan sıralı içerik öğesi (hizmet, süreç adımı, ilke, aşama). */
export interface TitledData { id: string; order: number; title: string; text: string }

export class Titled<T extends TitledData = TitledData> extends Entity<T> {
  static list<T extends TitledData>(rows: T[]): Titled<T>[] {
    return rows.map((r) => new Titled<T>(r)).sort((a, b) => byOrder(a.data, b.data))
  }
  get order() { return this.data.order }
  get title() { return this.data.title }
  get text() { return this.data.text }
}

export interface ServiceData extends TitledData { tags: string[] }
export class Service extends Titled<ServiceData> {
  static of(rows: ServiceData[]): Service[] {
    return rows.map((r) => new Service(r)).sort((a, b) => byOrder(a.data, b.data))
  }
  get tags() { return this.data.tags }
  /** Ekran okuyucu ve numaralama için iki haneli sıra. */
  get number() { return String(this.order).padStart(2, '0') }
}

export interface StageData extends TitledData { word: string }
export class Stage extends Titled<StageData> {
  static of(rows: StageData[]): Stage[] {
    return rows.map((r) => new Stage(r)).sort((a, b) => byOrder(a.data, b.data))
  }
  get word() { return this.data.word }
}

export interface ActData {
  id: string; order: number; kicker: string; title: string; text: string; note: string; alt: string
  source?: { file: string; from: number; to: number; lang: 'ts' | 'tsx' | 'js' | 'json' | 'css' | 'html' }
  flow?: Array<{ kind: 'prompt' | 'plan' | 'tool' | 'result'; text: string; meta?: string }>
  checks?: string[]
}
export class Act extends Entity<ActData> {
  static of(rows: ActData[]): Act[] {
    return rows.map((r) => new Act(r)).sort((a, b) => byOrder(a.data, b.data))
  }
  get order() { return this.data.order }
  get kicker() { return this.data.kicker }
  get title() { return this.data.title }
  get text() { return this.data.text }
  get note() { return this.data.note }
  get alt() { return this.data.alt }
  get source() { return this.data.source }
  get flow() { return this.data.flow ?? [] }
  get checks() { return this.data.checks ?? [] }
}

export interface WorkData {
  id: string; order: number; title: string; text: string; meta: string; tags: string[]; href: string; wide: boolean
}
export class Work extends Entity<WorkData> {
  static of(rows: WorkData[]): Work[] {
    return rows.map((r) => new Work(r)).sort((a, b) => byOrder(a.data, b.data))
  }
  get order() { return this.data.order }
  get number() { return String(this.data.order).padStart(2, '0') }
  get title() { return this.data.title }
  get text() { return this.data.text }
  get meta() { return this.data.meta }
  get tags() { return this.data.tags }
  get href() { return this.data.href }
  get wide() { return this.data.wide }
  get isRepoOnly() { return this.data.href.startsWith('https://github.com/') }
  get ariaLabel() { return `${this.title}: ${this.meta}. Yeni sekmede açılır.` }
}

export interface StatData { id: string; order: number; value: number; suffix: string; label: string }
export class Stat extends Entity<StatData> {
  static of(rows: StatData[]): Stat[] {
    return rows.map((r) => new Stat(r)).sort((a, b) => byOrder(a.data, b.data))
  }
  get value() { return this.data.value }
  get suffix() { return this.data.suffix }
  get label() { return this.data.label }
  get text() { return `${this.value.toLocaleString('tr-TR')}${this.suffix}` }
}

export interface FaqData { id: string; order: number; q: string; a: string }
export class Faq extends Entity<FaqData> {
  static of(rows: FaqData[]): Faq[] {
    return rows.map((r) => new Faq(r)).sort((a, b) => byOrder(a.data, b.data))
  }
  get q() { return this.data.q }
  get a() { return this.data.a }
  /** FAQPage zengin sonuç verisi için. */
  toQuestionLd() {
    return { '@type': 'Question', name: this.q, acceptedAnswer: { '@type': 'Answer', text: this.a } }
  }
}
