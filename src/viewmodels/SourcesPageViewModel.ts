import type { SourceToolData } from '../models/SourceTool'
import { SiteRepository } from '../repositories/SiteRepository'
import { SourcesRepository } from '../repositories/SourcesRepository'

/** /kaynaklar sayfasının görünüm modeli: düzen verisi + bölüm metni + araç listesi (sayfa ince kalır). */
export class SourcesPageViewModel {
  private constructor(
    readonly profile: Awaited<ReturnType<SiteRepository['profile']>>,
    readonly nav: Awaited<ReturnType<SiteRepository['nav']>>,
    readonly section: Awaited<ReturnType<SiteRepository['sections']>>[number],
    readonly tools: SourceToolData[],
  ) {}

  static async load(site = new SiteRepository(), sources = new SourcesRepository()): Promise<SourcesPageViewModel> {
    const [profile, nav, sections, tools] = await Promise.all([site.profile(), site.nav(), site.sections(), sources.tools()])
    const base = sections.find((s) => s.id === 'kaynaklar')
    if (!base) throw new Error('Bölüm metni bulunamadı: kaynaklar')
    const section = base.fill({ count: tools.length, name: profile.name })
    return new SourcesPageViewModel(profile, nav, section, tools.map((t) => t.toJSON()))
  }
}
