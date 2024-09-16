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
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { GISPermissionToken, updateJsonFile } from "../../../utils/GISApi"
import { VscSettings } from "react-icons/vsc"

export const SaveButtons = ({ value }) => {
  const [isSaving, setIsSaving] = useState(false)
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment

  const articleBackgroundColor = useMemo(() => {
    if (
      editorState.selectedCategoryIndex !== -1 &&
      editorState.selectedSubCategoryIndex !== -1 &&
      editorState.selectedArticleIndex !== -1
    ) {
      return editorData?.categories[editorState.selectedCategoryIndex]
        ?.subCategories[editorState.selectedSubCategoryIndex]?.articles[
        editorState.selectedArticleIndex
      ]?.backgroundColor
    } else {
      return "var(--home-card-background)"
    }
  }, [
    editorData?.categories,
    editorState.selectedArticleIndex,
    editorState.selectedCategoryIndex,
    editorState.selectedSubCategoryIndex,
  ])
  const [color, setColor] = useState(
    articleBackgroundColor === "var(--home-card-background)"
      ? "#303030"
      : articleBackgroundColor
  )

  const [searchParams] = useSearchParams()
  const environment = searchParams.get("environment")

  const [cookies, setCookies] = useCookies()

  const handleSave = () => {
    dispatch(changeContentArticle(value))
    dispatch(createAlertSucess("Salvo!"))
  }

  useEffect(() => {
    if (
      editorState.selectedCategoryIndex !== -1 &&
      editorState.selectedSubCategoryIndex !== -1 &&
      editorState.selectedArticleIndex !== -1
    ) {
      const timeout = setTimeout(() => {
        dispatch(changeBackgroundArticle({ newColor: color }))
      }, 50)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [color])

  const handleChangeColor = (event) => {
    const color = event.target.value
    setColor(color)
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
      {value && (
        <ColorButton $color={articleBackgroundColor}>
          <VscSettings />
          <input
            type="color"
            value={color}
            onChange={handleChangeColor}
          ></input>
        </ColorButton>
      )}
      <SaveWrapper>
        {value && <button onClick={handleSave}>Salvar</button>}
        <button onClick={() => saveData()}>
          Postar {isSaving && <Spinner />}
        </button>
      </SaveWrapper>
    </SaveContainer>
  )
}

const ColorButton = styled.div`
  position: relative;

  background-color: ${(props) => props.$color ?? "var(--home-card-background)"};
  width: 2.5em;
  height: 2.5em;

  border-radius: 0.5em;

  box-shadow: 0em 0em 1em 0em #0000004b;

  svg {
    position: absolute;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 1.5em;
    height: 1.5em;
    color: var(--home-card);
  }

  input {
    position: absolute;
    opacity: 0;
    font-size: 1em;

    width: 2.5em;
    height: 2.5em;

    border: none;
    padding: 0;

    border-radius: 0.5em;
    aspect-ratio: 1;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-webkit-color-swatch {
      border: none;
      border-radius: 0.5em;
    }
    cursor: pointer;
  }
`

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
