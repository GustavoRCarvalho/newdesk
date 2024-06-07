import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { SideMenu } from "./components/menu/SideMenu"
import Content from "./router/content"

function App() {
  return (
    <BrowserRouter>
      <SideMenu />
      <Content />
    </BrowserRouter>
  )
}

export default App
