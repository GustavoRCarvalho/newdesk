import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { SideMenu } from "./components/menu/SideMenu"
import Content from "./router/content"
import useWindowDimensions from "./utils/functions"
import { DesktopAlert } from "./router/DesktopAlert"

function App() {
  const { width } = useWindowDimensions()
  const isDesktop = width > 768

  return (
    <BrowserRouter>
      {isDesktop ? (
        <>
          <SideMenu />
          <Content />
        </>
      ) : (
        <DesktopAlert />
      )}
    </BrowserRouter>
  )
}

export default App
