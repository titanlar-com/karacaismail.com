import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// Statik çıktı: SEO ve performans için HTML ön planda; React/Mantine yalnızca etkileşimli adacıklarda.
export default defineConfig({
  site: 'https://karacaismail.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react()],
  vite: { ssr: { noExternal: ['@mantine/core', '@mantine/hooks'] } },
})
