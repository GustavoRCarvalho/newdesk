import { Route, Routes } from "react-router-dom"
import { Home } from "../components/environment/home/Home"
import { Article } from "../components/environment/article/Article"
import { Editor } from "../components/principal/editor/Editor"
import { Environment } from "../components/environment/Environment"
import { Principal } from "../components/principal/Principal"
import { useEffect } from "react"
import { changeColorTheme, changeDarkTheme } from "../store/themeSlice"
import { useDispatch } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { toggleLogin } from "../store/modalSlice"
import { createAlertError, createAlertSucess } from "../store/alertSlice"
import { GISInit } from "../utils/GISApi"
import { useCookies } from "react-cookie"

export default function Content() {
  const dispatch = useDispatch()
  const [_cookies, setCookies] = useCookies()

  const handleLoginCallback = (response) => {
    const decoded = jwtDecode(response.credential)

    try {
      setCookies("GISuser", decoded)

      dispatch(toggleLogin())
      dispatch(createAlertSucess("Login realizado com sucesso!"))
    } catch (e) {
      dispatch(
        createAlertError(
          "Falha ao realizadar o login. Por favor, tente novamente."
        )
      )
    }
  }

  useEffect(() => {
    let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    dispatch(changeDarkTheme(isDark))

    dispatch(changeColorTheme("Blue"))

    /* Load GIS (Google Identity Services) script */
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      GISInit(handleLoginCallback)
    }

    return () => {
      document.body.removeChild(script)
    }
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
