import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { SideMenu } from "./components/menu/SideMenu"
import Content from "./router/content"
import useWindowDimensions, {
  changeTheme,
  changeDarkLightMode,
} from "./utils/functions"
import { DesktopAlert } from "./router/DesktopAlert"
import { useCookies } from "react-cookie"
import { useEffect } from "react"

function App() {
  const [cookies, setCookies] = useCookies()

  const { width } = useWindowDimensions()
  const isDesktop = width > 768

  useEffect(() => {
    const isDark =
      window.matchMedia("(prefers-color-scheme: dark)") &&
      cookies.darkTheme !== null &&
      cookies.darkTheme
    changeDarkLightMode(isDark)
    setCookies("darkTheme", isDark)

    const themeColor = cookies.themeColor ?? "Pink"
    changeTheme(themeColor)
    setCookies("themeColor", themeColor)
  }, [])

  return (
    <BrowserRouter>
      {
        //isDesktop ? (
        <>
          <SideMenu />
          <Content />
        </>
        // ) : (
        //   <DesktopAlert />
        // )
      }
    </BrowserRouter>
  )
}

export default App
