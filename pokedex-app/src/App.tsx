import { ThemeProvider } from "@mui/system"
import { BrowserRouter } from "react-router-dom"
import Router from "routes/router"
import theme from "theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
