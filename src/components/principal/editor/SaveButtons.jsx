import styled from "styled-components"
import { updateJsonFile } from "../../../utils/googleDriveApi"
import {
  changeBackgroundArticle,
  changeContentArticle,
} from "../../../store/editorSlice"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"
import { Spinner } from "../driveApi/ManipulateListItem"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useCookies } from "react-cookie"

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

  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies([`editor${environment}`])

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

  async function saveData() {
    try {
      setIsSaving(true)
      await updateJsonFile(environment, editorData)

      setCookies(`editor${environment}`, editorData, {
        path: "/",
        maxAge: 31536000,
      })

      dispatch(createAlertSucess("Dados salvos com sucesso!"))
    } catch (e) {
      dispatch(
        createAlertError(
          "Falha ao salvar os dados. Por favor, tente novamente."
        )
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SaveContainer>
      <button onClick={handleChangeColor}>Trocar cor do fundo</button>
      <SaveWrapper>
        {value && <button onClick={handleSave}>Salvar</button>}
        <button onClick={saveData}>Postar {isSaving && <Spinner />}</button>
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
