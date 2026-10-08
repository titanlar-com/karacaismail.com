import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * İçerik önce JSON'da yaşar; burada doğrulanır (derleme sırasında), Model sınıflarına buradan akar.
 * Yeni içerik = yalnızca JSON değişikliği. Şema ihlali derlemeyi durdurur.
 */
const ordered = { order: z.number().int().positive() }
const link = z.object({ label: z.string(), href: z.string() })

const json = (name: string) => file(`src/content/${name}.json`)

export const collections = {
  profile: defineCollection({
    loader: json('profile'),
    schema: z.object({
      name: z.string(), role: z.string(), jobTitle: z.string(), org: z.string(), orgUrl: z.url(), city: z.string(),
      github: z.url(), githubOrg: z.url(), email: z.email(), siteUrl: z.url(),
      seo: z.object({ title: z.string().max(70), description: z.string().max(170) }),
    }),
  }),
  sections: defineCollection({
    loader: json('sections'),
    schema: z.object({
      eyebrow: z.string(), title: z.string(), lead: z.string().optional(), hint: z.string().optional(),
      seoTitle: z.string().optional(), seoDescription: z.string().optional(),
    }),
  }),
  nav: defineCollection({ loader: json('nav'), schema: z.object({ ...ordered, label: z.string(), href: z.string() }) }),
  hero: defineCollection({
    loader: json('hero'),
    schema: z.object({ kicker: z.string(), lines: z.array(z.string()).length(3), lead: z.string(), primary: link, secondary: link }),
  }),
  manifesto: defineCollection({ loader: json('manifesto'), schema: z.object({ text: z.string(), sub: z.string() }) }),
  acts: defineCollection({
    loader: json('acts'),
    schema: z.object({
      ...ordered, kicker: z.string(), title: z.string(), text: z.string(), note: z.string(), alt: z.string(),
      /** Kod sahnesi: gösterilecek gerçek kaynak dosyası ve satır aralığı (derleme sırasında okunur). */
      source: z.object({ file: z.string(), from: z.number().int().positive(), to: z.number().int().positive(), lang: z.enum(['ts', 'tsx', 'js', 'json', 'css', 'html']) }).optional(),
      /** Ajan sahnesi: istek, plan, araç çağrıları ve sonuç. */
      flow: z.array(z.object({ kind: z.enum(['prompt', 'plan', 'tool', 'result']), text: z.string(), meta: z.string().optional() })).optional(),
      checks: z.array(z.string()).optional(),
    }),
  }),
  stages: defineCollection({
    loader: json('stages'),
    schema: z.object({ ...ordered, word: z.string(), title: z.string(), text: z.string() }),
  }),
  services: defineCollection({
    loader: json('services'),
    schema: z.object({ ...ordered, title: z.string(), text: z.string(), tags: z.array(z.string()).min(1) }),
  }),
  process: defineCollection({
    loader: json('process'),
    schema: z.object({ ...ordered, title: z.string(), text: z.string() }),
  }),
  works: defineCollection({
    loader: json('works'),
    schema: z.object({
      ...ordered, title: z.string(), text: z.string(), meta: z.string(), tags: z.array(z.string()),
      href: z.url(), wide: z.boolean().default(false),
    }),
  }),
  stats: defineCollection({
    loader: json('stats'),
    schema: z.object({ ...ordered, value: z.number(), suffix: z.string(), label: z.string() }),
  }),
  principles: defineCollection({
    loader: json('principles'),
    schema: z.object({ ...ordered, title: z.string(), text: z.string() }),
  }),
  faq: defineCollection({ loader: json('faq'), schema: z.object({ ...ordered, q: z.string(), a: z.string() }) }),
  ticker: defineCollection({ loader: json('ticker'), schema: z.object({ items: z.array(z.string()).min(4) }) }),
  sources: defineCollection({
    loader: json('sources'),
    schema: z.object({
      name: z.string(),
      category: z.string(),
      subcategory: z.string().nullable(),
      group: z.enum(['ana', 'ayrica']),
      description: z.string(),
      snippets: z.array(z.object({ lang: z.string(), code: z.string() })),
      scenario: z.string().nullable(),
    }),
  }),
}
