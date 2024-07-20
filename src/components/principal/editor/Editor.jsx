import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { EditorComponent } from "./EditorComponent"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { CategoryDropdown } from "./CategoryDropdown"
import {
  initialData,
  setEditor,
  setEditorInitial,
} from "../../../store/editorSlice"
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
  const [backgroundColor, setBackgroundColor] = useState(0)
  const colors = [
    "var(--home-card-background)",
    "#3f7ee8",
    "#66be67",
    "#f3c324",
    "#ef9441",
    "#df5e5a",
  ]
  const [errorMessage, setErrorMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [fileFound, setFileFound] = useState(false)
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  let copyContent = JSON.parse(JSON.stringify(editorData.categories))

  const dataEditor = () => {
    const content =
      editorData.categories[editorState.selectedCategoryIndex]?.subCategories[
        editorState.selectedSubCategoryIndex
      ]?.articles[editorState.selectedArticleIndex]?.content
    if (content === undefined || content === "") {
      return false
    }
    return true
  }

  const params = new URLSearchParams(location.search)
  const environment = params.get("environment")

  async function fetchData() {
    try {
      const result = await readJsonFile(environment)
      dispatch(setEditorInitial(result))
      setFileFound(true)
    } catch (e) {
      dispatch(createAlertError(e.message))
      setErrorMessage(e.message)
      setFileFound(false)
    }
  }

  const handleChangeColor = () => {
    if (
      editorState.selectedCategoryIndex === -1 ||
      editorState.selectedSubCategoryIndex === -1 ||
      editorState.selectedArticleIndex === -1
    ) {
      return
    }

    if (backgroundColor === colors.length - 1) {
      setBackgroundColor(0)
      return
    }
    setBackgroundColor((state) => (state += 1))

    copyContent[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles[editorState.selectedArticleIndex].backgroundColor =
      colors[backgroundColor]
    dispatch(setEditor(copyContent))
  }

  async function saveData() {
    try {
      setIsSaving(true)
      await updateJsonFile(environment, editorData)
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
    if (editorData.environmentName) {
      return
    }
    if (environment) {
      fetchData()
    } else {
      dispatch(setEditorInitial({}))
    }

    return () => {
      initialData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !fileFound ? (
    <LoadingScreen errorMessage={errorMessage} />
  ) : (
    <EditorContainer
      $readOnly={!dataEditor()}
      $backgroundColor={colors[backgroundColor]}
    >
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
        <button onClick={handleChangeColor}>Trocar cor do fundo</button>
        <button onClick={saveData}>Salvar {isSaving && <Spinner />}</button>
      </SaveContainer>
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  width: 100%;
  max-width: 920px;
  min-height: calc(100dvh - 2em);

  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: start;
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

  .ql-color-picker.ql-color .ql-picker-item:hover {
    border-color: var(--editor-color);
  }

  .ql-toolbar.ql-snow {
    text-align: center;
    .ql-picker.ql-expanded {
      .ql-picker-label {
        border: 1px solid var(--editor-color);
        border-radius: 0.5em;
        color: var(--editor-color-hover);
      }
      .ql-picker-options {
        border-radius: 0.5em;
        border: none;
      }
    }

    button:hover,
    button:focus,
    .ql-picker-label:hover,
    .ql-picker-item:hover,
    .ql-picker-item.ql-selected {
      color: var(--editor-color-hover);
      .ql-stroke {
        stroke: var(--editor-color-hover);
      }
      .ql-fill {
        fill: var(--editor-color-hover);
      }
    }
  }

  .ql-picker-item {
  }

  .ql-container {
    border: none;

    margin-top: 2em;
    min-height: calc(100% - (24px + 5em));
  }

  .ql-editor {
    background-color: ${(props) =>
      props.$backgroundColor ?? "var(--home-card-background)"};

    height: 100%;

    border-radius: 0.5em;

    box-shadow: 0em 0em 1em 0em #0000004b;
    * {
      cursor: ${(props) => (props.$readOnly ? "default" : "text")};
    }
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

  gap: 1em;

  padding: 1em;
`

const SaveContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 920px;

  padding-block: 1em;
  margin-top: 5em;

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
