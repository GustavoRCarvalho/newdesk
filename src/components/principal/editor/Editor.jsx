import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { EditorComponent } from "./EditorComponent"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { CategoryDropdown } from "./CategoryDropdown"
import { initialData, setEditor } from "../../../store/editorSlice"
import { SubCategoryDropdown } from "./SubCategoryDropdown"
import { ArticleDropdown } from "./ArticleDropdown"
import { readJsonFile } from "../../../utils/googleDriveApi"

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
          {dataEditor() && <EditorComponent />}
        </>
      ) : (
        <div>Not Found</div>
      )}
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DropdownContainer = styled.div`
  display: flex;

  gap: 1em;
`
