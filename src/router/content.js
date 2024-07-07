import { Route, Routes } from "react-router-dom"
import { Home } from "../components/environment/home/Home"
import { Article } from "../components/environment/article/Article"
import { Editor } from "../components/principal/editor/Editor"
import { Environment } from "../components/environment/Environment"
import { Principal } from "../components/principal/Principal"

export default function Content() {
  return (
    <Routes>
      <Route path="/" element={<Principal />}></Route>
      <Route path="/edit" element={<Editor />}></Route>
      <Route
        default
        path="/environment"
        element={
          <Environment>
            <Home />
          </Environment>
        }
      ></Route>
      <Route
        path="/environment/:category/:subcategory/:article"
        element={
          <Environment>
            <Article />
          </Environment>
        }
      ></Route>
      <Route path="*" element={<div>Error NOT Found</div>} />
    </Routes>
  )
}
