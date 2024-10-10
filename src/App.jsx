import { BrowserRouter } from "react-router-dom"
import "./App.css"
import Content from "./router/content"
import { store } from "./store/store"
import { Provider } from "react-redux"

import "quill/dist/quill.snow.css"
import { Modal } from "./router/Modal"
import { Alerts } from "./router/Alerts"
import { Quill } from "react-quill-new"

import ImageResize from "quill-image-resize-module-react"

window.Quill = Quill
window.Quill.register("modules/imageResize", ImageResize)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Content />
        <Modal />
        <Alerts />
      </BrowserRouter>
    </Provider>
  )
}

export default App
