import { SiteRepository } from '../repositories/SiteRepository'
import { SourceSnippetRepository, type Snippet } from '../repositories/SourceSnippetRepository'

/**
 * Ana sayfanın görünüm modeli: görünümlerin ihtiyacı olan her şeyi tek nesnede toplar.
 * Görünümler (Astro bileşenleri) yalnızca bu nesnenin özelliklerini okur; iş mantığı burada kalır.
 */
export class HomeViewModel {
  private constructor(
    readonly profile: Awaited<ReturnType<SiteRepository['profile']>>,
    readonly nav: Awaited<ReturnType<SiteRepository['nav']>>,
    readonly hero: Awaited<ReturnType<SiteRepository['hero']>>,
    readonly manifesto: Awaited<ReturnType<SiteRepository['manifesto']>>,
    readonly acts: Awaited<ReturnType<SiteRepository['acts']>>,
    readonly stages: Awaited<ReturnType<SiteRepository['stages']>>,
    readonly services: Awaited<ReturnType<SiteRepository['services']>>,
    readonly process: Awaited<ReturnType<SiteRepository['process']>>,
    readonly works: Awaited<ReturnType<SiteRepository['works']>>,
    readonly stats: Awaited<ReturnType<SiteRepository['stats']>>,
    readonly principles: Awaited<ReturnType<SiteRepository['principles']>>,
    readonly faqs: Awaited<ReturnType<SiteRepository['faqs']>>,
    readonly ticker: Awaited<ReturnType<SiteRepository['ticker']>>,
    private readonly sectionList: Awaited<ReturnType<SiteRepository['sections']>>,
    private readonly snippets: ReadonlyMap<string, Snippet>,
  ) {}

  static async load(repo: SiteRepository = new SiteRepository(), snippetRepo: SourceSnippetRepository = new SourceSnippetRepository()): Promise<HomeViewModel> {
    const [profile, nav, hero, manifesto, acts, stages, services, process, works, stats, principles, faqs, ticker, sections] =
      await Promise.all([
        repo.profile(), repo.nav(), repo.hero(), repo.manifesto(), repo.acts(), repo.stages(), repo.services(),
        repo.process(), repo.works(), repo.stats(), repo.principles(), repo.faqs(), repo.ticker(), repo.sections(),
      ])
    // "Kod" sahnesi: gösterilen satırlar sitenin gerçek kaynak dosyasından okunur (görünüm dosya sistemine dokunmaz)
    const snippets = new Map(acts.filter((a) => a.source).map((a) => [a.id, snippetRepo.read(a.source!)] as const))
    return new HomeViewModel(profile, nav, hero, manifesto, acts, stages, services, process, works, stats, principles, faqs, ticker, sections, snippets)
  }

  // Arrow özellikleri: görünümler `const { section } = vm` biçiminde ayrıştırabilsin (this kaybolmaz)
  readonly act = (id: string) => {
    const a = this.acts.find((x) => x.id === id)
    if (!a) throw new Error(`Sahne bulunamadı: ${id}`)
    return a
  }

  readonly section = (id: string) => {
    const x = this.sectionList.find((s) => s.id === id)
    if (!x) throw new Error(`Bölüm metni bulunamadı: ${id}`)
    return x
  }

  readonly snippetFor = (actId: string): Snippet | null => this.snippets.get(actId) ?? null

  get seo() { return this.profile.seo }

  /** Kişi + SSS yapılandırılmış verisi (tek @graph). */
  get jsonLd(): string {
    const { '@context': ctx, ...person } = this.profile.toJsonLd() as { '@context': string }
    return JSON.stringify({
      '@context': ctx,
      '@graph': [person, { '@type': 'FAQPage', mainEntity: this.faqs.map((f) => f.toQuestionLd()) }],
    })
  }
}
