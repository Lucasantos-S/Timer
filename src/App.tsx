import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalSyle } from './styles/global'
import { CyclesContextProvider } from './context'

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalSyle />
    </ThemeProvider>
  )
}
