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

export const Editor = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
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
      if (data) {
        dispatch(setEditor(data))
        setFileFound(true)
      } else {
        setFileFound(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    dispatch(initialData())
    if (environment) {
      fetchData()
    } else {
      dispatch(setEditor([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EditorContainer>
      editor: {environment ?? "Not Found"}
      {loading ? (
        <div>loading</div>
      ) : fileFound ? (
        <>
          <DropdownContainer>
            <CategoryDropdown />
            <SubCategoryDropdown />
            <ArticleDropdown />
          </DropdownContainer>
          {dataEditor() ? (
            <>
              <EditorComponent />
              <button
                onClick={() => {
                  updateJsonFile(environment, editorState.editor)
                }}
              >
                salvar
              </button>
            </>
          ) : (
            <ReactQuill theme="snow" modules={modules} />
          )}
        </>
      ) : (
        <div>Not Found</div>
      )}
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;

  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ql-toolbar {
    background-color: var(--home-card-background);
    border: none;

    border-radius: 0.5em;
    box-shadow: 0em 0em 1em 0em #0000004b;
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

  gap: 1em;

  padding: 1em;
`
