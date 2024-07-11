import { BrowserRouter } from "react-router-dom"
import "./App.css"
import Content from "./router/content"
import useWindowDimensions, {
  changeTheme,
  changeDarkLightMode,
} from "./utils/functions"
import { DesktopAlert } from "./router/DesktopAlert"
import { useCookies } from "react-cookie"
import { useEffect } from "react"
import { store } from "./store/store"
import { Provider } from "react-redux"
import "react-quill/dist/quill.snow.css"
import { Modal } from "./router/Modal"
import { initClient } from "./utils/googleDriveApi"

function App() {
  const { width } = useWindowDimensions()
  const isDesktop = width > 720

  const [cookies, setCookies] = useCookies()

  useEffect(() => {
    let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (cookies.darkTheme !== undefined) isDark = cookies.darkTheme
    changeDarkLightMode(isDark)
    setCookies("darkTheme", isDark)

    const themeColor = cookies.themeColor ?? "Blue"
    changeTheme(themeColor)
    setCookies("themeColor", themeColor)

    initClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Content />
        <Modal />
        {!isDesktop && <DesktopAlert />}
      </BrowserRouter>
    </Provider>
  )
}

export default App
