import { createTheme, MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'

/** Mantine teması: renk ve tipografi tokenları src/styles/tokens.css ile aynı kaynaktan. Varsayılan yazı tipi Outfit. */
const theme = createTheme({
  primaryColor: 'ember',
  colors: {
    ember: ['#fff1e8', '#ffd9c3', '#ffbd96', '#ff9d68', '#ff8a4f', '#ff7a3d', '#e86a30', '#d9501a', '#b03f12', '#8a300c'],
  },
  primaryShade: 5,
  fontFamily: "'Outfit Variable', system-ui, sans-serif",
  headings: { fontFamily: "'Outfit Variable', system-ui, sans-serif" },
  fontSizes: { xs: '1rem', sm: '1rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' },
  defaultRadius: 'md',
  focusRing: 'auto',
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark" withCssVariables>
      {children}
    </MantineProvider>
  )
}
