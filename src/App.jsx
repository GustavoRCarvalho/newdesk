import { BrowserRouter } from "react-router-dom"
import "./App.css"
import Content from "./router/content"
import { store } from "./store/store"
import { Provider } from "react-redux"
import "quill/dist/quill.snow.css"
import { Modal } from "./router/Modal"
import { Alerts } from "./router/Alerts"
import Quill from "quill"

window.Quill = Quill

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
