import { Entity } from './Entity'

export interface ProfileData {
  id: string; name: string; role: string; jobTitle: string; org: string; orgUrl: string; city: string
  github: string; githubOrg: string; email: string; siteUrl: string
  seo: { title: string; description: string }
}

export class Profile extends Entity<ProfileData> {
  static from(data: ProfileData): Profile { return new Profile(data) }

  get name() { return this.data.name }
  get role() { return this.data.role }
  get org() { return this.data.org }
  get orgUrl() { return this.data.orgUrl }
  get city() { return this.data.city }
  get github() { return this.data.github }
  get githubOrg() { return this.data.githubOrg }
  get email() { return this.data.email }
  get siteUrl() { return this.data.siteUrl }
  get seo() { return this.data.seo }
  get year() { return new Date().getFullYear() }
  get githubHandle() { return this.data.github.replace('https://github.com/', '') }

  /** schema.org Person: arama motorları için yapılandırılmış veri. */
  toJsonLd(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: this.name,
      url: this.siteUrl,
      jobTitle: this.data.jobTitle,
      worksFor: { '@type': 'Organization', name: this.org, url: this.orgUrl },
      address: { '@type': 'PostalAddress', addressLocality: this.city, addressCountry: 'TR' },
      sameAs: [this.github, this.data.githubOrg],
    }
  }
}
