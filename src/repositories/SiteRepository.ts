import { Act, Faq, Service, Stage, Stat, Titled, Work, type ActData, type FaqData, type ServiceData, type StageData, type StatData, type TitledData, type WorkData } from '../models/Content'
import { Hero, Manifesto, NavItem, Ticker, type HeroData } from '../models/Page'
import { Profile, type ProfileData } from '../models/Profile'
import { ContentRepository } from './ContentRepository'

/** Ana sayfanın tüm içeriğini JSON koleksiyonlarından Model nesnelerine çeviren repository. */
export class SiteRepository extends ContentRepository {
  async profile() { return Profile.from(await this.first<ProfileData>('profile')) }
  async nav() { return NavItem.of(await this.rows('nav')) }
  async hero() { return Hero.from(await this.first<HeroData>('hero')) }
  async manifesto() { return Manifesto.from(await this.first('manifesto')) }
  async acts() { return Act.of(await this.rows<ActData>('acts')) }
  async stages() { return Stage.of(await this.rows<StageData>('stages')) }
  async services() { return Service.of(await this.rows<ServiceData>('services')) }
  async process() { return Titled.list(await this.rows<TitledData>('process')) }
  async works() { return Work.of(await this.rows<WorkData>('works')) }
  async stats() { return Stat.of(await this.rows<StatData>('stats')) }
  async principles() { return Titled.list(await this.rows<TitledData>('principles')) }
  async faqs() { return Faq.of(await this.rows<FaqData>('faq')) }
  async ticker() { return Ticker.from(await this.first('ticker')) }
}
