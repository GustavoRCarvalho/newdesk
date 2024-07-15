import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { EditorComponent } from "./EditorComponent"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { CategoryDropdown } from "./CategoryDropdown"
import { initialData, setEditor } from "../../../store/editorSlice"
import { SubCategoryDropdown } from "./SubCategoryDropdown"
import { ArticleDropdown } from "./ArticleDropdown"
import { readJsonFile, updateJsonFile } from "../../../utils/googleDriveApi"
import ReactQuill from "react-quill"
import { modules } from "../../../utils/functions"
import { Spinner } from "../driveApi/ManipulateListItem"
import { LoadingScreen } from "../../../router/LoadingScreen"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"

export const Editor = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [fileFound, setFileFound] = useState(false)
  const editorState = useSelector((state) => state.editor)

  const dataEditor = () => {
    const data =
      editorState.editor[editorState.selectedCategoryIndex]?.subCategories[
        editorState.selectedSubCategoryIndex
      ]?.articles[editorState.selectedArticleIndex]?.data
    if (data === undefined || data === "") {
      return false
    }
    return true
  }

  const params = new URLSearchParams(location.search)
  const environment = params.get("environment")

  async function fetchData() {
    try {
      const data = await readJsonFile(environment)
      dispatch(setEditor(data))
      setFileFound(true)
    } catch (e) {
      dispatch(createAlertError(e.message))
      setErrorMessage(e.message)
      setFileFound(false)
    }
  }

  async function saveData() {
    try {
      setIsSaving(true)
      await updateJsonFile(environment, editorState.editor)
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

  useEffect(() => {
    dispatch(initialData())
    if (environment) {
      fetchData()
    } else {
      dispatch(setEditor([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !fileFound ? (
    <LoadingScreen errorMessage={errorMessage} />
  ) : (
    <EditorContainer>
      <>
        <DropdownContainer>
          <CategoryDropdown />
          <SubCategoryDropdown />
          <ArticleDropdown />
        </DropdownContainer>
        {dataEditor() ? (
          <EditorComponent />
        ) : (
          <ReactQuill readOnly theme="snow" modules={modules} />
        )}
        <SaveContainer>
          <button onClick={saveData}>Salvar {isSaving && <Spinner />}</button>
        </SaveContainer>
      </>
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  width: 100%;
  min-height: calc(100dvh - 2em);

  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;

    border-radius: 1em;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }

  .quill {
    width: 100%;
    height: 100%;

    margin-bottom: 2em;
  }

  .ql-toolbar {
    background-color: var(--home-card-background);
    border: none;

    border-radius: 0.5em;
    box-shadow: 0em 0em 1em 0em #0000004b;
  }

  .ql-picker-options {
    background-color: var(--home-card-background);
  }

  .ql-container {
    border: none;

    margin-top: 2em;
  }

  .ql-editor {
    background-color: var(--home-card-background);
    height: calc(100% - (24px + 2em));

    border-radius: 0.5em;

    box-shadow: 0em 0em 1em 0em #0000004b;
  }

  .ql-fill {
    fill: var(--editor-color);
  }
  .ql-stroke {
    stroke: var(--editor-color);
  }
  .ql-picker {
    color: var(--editor-color);
  }
`

const DropdownContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 920px;

  gap: 1em;

  padding: 1em;
`

const SaveContainer = styled.div`
  display: flex;
  justify-content: end;

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
