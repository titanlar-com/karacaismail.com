import { SiteRepository } from '../repositories/SiteRepository'

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
  ) {}

  static async load(repo: SiteRepository = new SiteRepository()): Promise<HomeViewModel> {
    const [profile, nav, hero, manifesto, acts, stages, services, process, works, stats, principles, faqs, ticker] =
      await Promise.all([
        repo.profile(), repo.nav(), repo.hero(), repo.manifesto(), repo.acts(), repo.stages(), repo.services(),
        repo.process(), repo.works(), repo.stats(), repo.principles(), repo.faqs(), repo.ticker(),
      ])
    return new HomeViewModel(profile, nav, hero, manifesto, acts, stages, services, process, works, stats, principles, faqs, ticker)
  }

  act(id: string) {
    const a = this.acts.find((x) => x.id === id)
    if (!a) throw new Error(`Sahne bulunamadı: ${id}`)
    return a
  }

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
