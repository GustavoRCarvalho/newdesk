import { Route, Routes } from "react-router-dom"
import { Home } from "../components/environment/home/Home"
import { Article } from "../components/environment/article/Article"
import { Editor } from "../components/principal/editor/Editor"
import { Environment } from "../components/environment/Environment"
import { Principal } from "../components/principal/Principal"
import { useEffect } from "react"
import { initClient } from "../utils/googleDriveApi"
import { changeColorTheme, changeDarkTheme } from "../store/themeSlice"
import { useDispatch } from "react-redux"

export default function Content() {
  const dispatch = useDispatch()

  useEffect(() => {
    let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    dispatch(changeDarkTheme(isDark))

    dispatch(changeColorTheme("Blue"))

    initClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route default path="/" element={<Principal />}></Route>
      <Route path="/edit" element={<Editor />}></Route>
      <Route
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
