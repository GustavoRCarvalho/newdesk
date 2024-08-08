import { BrowserRouter } from "react-router-dom"
import "./App.css"
import Content from "./router/content"
import useWindowDimensions from "./utils/functions"
import { DesktopAlert } from "./router/DesktopAlert"
import { store } from "./store/store"
import { Provider } from "react-redux"
import "react-quill/dist/quill.snow.css"
import { Modal } from "./router/Modal"
import { Alerts } from "./router/Alerts"
import { Quill } from "react-quill"

window.Quill = Quill

function App() {
  const { isDesktop } = useWindowDimensions()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Content />
        <Modal />
        <Alerts />
        {!isDesktop && <DesktopAlert />}
      </BrowserRouter>
    </Provider>
  )
}

export default App
