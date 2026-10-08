import { Entity } from './Entity'

export class NavItem extends Entity<{ id: string; order: number; label: string; href: string }> {
  static of(rows: { id: string; order: number; label: string; href: string }[]): NavItem[] {
    return rows.map((r) => new NavItem(r)).sort((a, b) => a.data.order - b.data.order)
  }
  get label() { return this.data.label }
  get href() { return this.data.href }
  get isExternalPage() { return !this.data.href.startsWith('/#') }
}

interface CtaData { label: string; href: string }
export interface HeroData { id: string; kicker: string; lines: string[]; lead: string; primary: CtaData; secondary: CtaData }
export class Hero extends Entity<HeroData> {
  static from(d: HeroData): Hero { return new Hero(d) }
  get kicker() { return this.data.kicker }
  get lines() { return this.data.lines }
  get lead() { return this.data.lead }
  get primary() { return this.data.primary }
  get secondary() { return this.data.secondary }
  /** h1'in erişilebilir adı: görsel parçalar aria-hidden olduğundan tam cümle burada. */
  get headline() { return this.data.lines.join(' ') }
}

export class Manifesto extends Entity<{ id: string; text: string; sub: string }> {
  static from(d: { id: string; text: string; sub: string }): Manifesto { return new Manifesto(d) }
  get text() { return this.data.text }
  get sub() { return this.data.sub }
  get words() { return this.data.text.split(' ') }
}

export class Ticker extends Entity<{ id: string; items: string[] }> {
  static from(d: { id: string; items: string[] }): Ticker { return new Ticker(d) }
  get items() { return this.data.items }
}
