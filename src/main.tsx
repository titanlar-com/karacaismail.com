import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/hanken-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@mantine/core/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const theme = createTheme({
  primaryColor: 'ember',
  colors: {
    ember: ['#fff1e8', '#ffd9c3', '#ffbd96', '#ff9d68', '#ff8a4f', '#ff7a3d', '#e86a30', '#d9501a', '#b03f12', '#8a300c'],
  },
  primaryShade: 5,
  fontFamily: "'Hanken Grotesk Variable', system-ui, sans-serif",
  headings: { fontFamily: "'Bricolage Grotesque Variable', system-ui, sans-serif" },
  fontSizes: { xs: '1rem', sm: '1rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' },
  defaultRadius: 'md',
  focusRing: 'auto',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} forceColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
)
