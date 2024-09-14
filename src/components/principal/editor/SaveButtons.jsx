import styled from "styled-components"
import {
  changeBackgroundArticle,
  changeContentArticle,
} from "../../../store/editorSlice"
import {
  createAlertError,
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"
import { Spinner } from "../driveApi/ManipulateListItem"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { GISPermissionToken, updateJsonFile } from "../../../utils/GISApi"

export const SaveButtons = ({ value }) => {
  const [backgroundColor, setBackgroundColor] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const colors = [
    "var(--home-card-background)",
    "#3f7ee8",
    "#66be67",
    "#f3c324",
    "#ef9441",
    "#df5e5a",
  ]
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment

  const [searchParams] = useSearchParams()
  const environment = searchParams.get("environment")

  const [cookies, setCookies] = useCookies()

  const handleSave = () => {
    dispatch(changeContentArticle(value))
    dispatch(createAlertSucess("Salvo!"))
  }

  const handleChangeColor = () => {
    if (editorState.selectedArticleIndex === -1) {
      return
    }

    if (backgroundColor === colors.length - 1) {
      setBackgroundColor(0)
      return
    }
    setBackgroundColor((state) => (state += 1))

    dispatch(changeBackgroundArticle({ newColor: colors[backgroundColor] }))
  }

  function getToken() {
    if (cookies.GISToken) {
      setCookies("GISToken", null)
    }
    const getTokenCallback = (response) => {
      if (
        window.google.accounts.oauth2.hasGrantedAllScopes(
          response,
          "https://www.googleapis.com/auth/drive.file"
        )
      ) {
        var expiresTime = new Date()
        expiresTime.setTime(expiresTime.getTime() + response.expires_in * 1000)
        setCookies(`GISToken`, response.access_token, {
          expires: expiresTime,
        })
        saveData(response.access_token)
      }
    }
    GISPermissionToken(getTokenCallback)
  }

  async function saveData(token) {
    setIsSaving(true)
    const acessToken = token ?? cookies.GISToken
    try {
      await updateJsonFile(acessToken, environment, editorData)

      var expiresTime = new Date()
      expiresTime.setTime(expiresTime.getTime() + 15 * 60 * 1000)

      const content = {
        ...editorData,
        expires: expiresTime,
      }

      try {
        sessionStorage.setItem(environment, JSON.stringify(content))
      } catch (e) {
        sessionStorage.clear()
      }
      dispatch(createAlertSucess("Dados salvos com sucesso!"))
    } catch (e) {
      if (e.message === "Sessão expirada! Por favor, confirme seu login.") {
        dispatch(
          createAlertWarning("Sessão expirada! Por favor, confirme seu login.")
        )
        getToken()
        return
      }
      if (
        e.message ===
        "Arquivo não encontrado na conta escolhida. Escolha outra conta!"
      ) {
        dispatch(createAlertError(e.message))
        getToken()
        return
      }
      dispatch(createAlertError(e.message))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SaveContainer>
      <button onClick={handleChangeColor}>Trocar cor do fundo</button>
      <SaveWrapper>
        {value && <button onClick={handleSave}>Salvar</button>}
        <button onClick={() => saveData()}>
          Postar {isSaving && <Spinner />}
        </button>
      </SaveWrapper>
    </SaveContainer>
  )
}

const SaveWrapper = styled.div`
  display: flex;

  gap: 1em;
`

const SaveContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 920px;

  padding-block: 1em;

  button {
    background-color: var(--home-card-background);
    color: var(--home-card);
    font-size: 1em;

    display: flex;
    align-items: center;
    gap: 1em;

    border-radius: 0.5em;

    border: none;
    padding: 0.5em 1.5em;

    box-shadow: 0em 0em 1em 0em #0000004b;

    cursor: pointer;
  }
`
