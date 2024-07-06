import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { SideMenu } from "./components/menu/SideMenu"
import Content from "./router/content"
import useWindowDimensions, {
  changeTheme,
  changeDarkLightMode,
} from "./utils/functions"
import { CardMenu } from "./components/menu/CardMenu"
import { DesktopAlert } from "./router/DesktopAlert"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import { store } from "./store/store"
import { Provider } from "react-redux"
import "react-quill/dist/quill.snow.css"

function App() {
  const [cookies, setCookies] = useCookies()

  const { width } = useWindowDimensions()
  const isDesktop = width > 720

  useEffect(() => {
    const isDark =
      !window.matchMedia("(prefers-color-scheme: dark)").matches ||
      (cookies.darkTheme !== undefined && cookies.darkTheme)
    changeDarkLightMode(isDark)
    setCookies("darkTheme", isDark)

    const themeColor = cookies.themeColor ?? "Blue"
    changeTheme(themeColor)
    setCookies("themeColor", themeColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isDesktop ? (
          <>
            <SideMenu />
            <Content />
            <CardMenu />
          </>
        ) : (
          <DesktopAlert />
        )}
      </BrowserRouter>
    </Provider>
  )
}

export default App
