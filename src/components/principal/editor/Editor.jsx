import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { EditorComponent } from "./EditorComponent"
import styled from "styled-components"
import { useEffect } from "react"
import { CategoryDropdown } from "./CategoryDropdown"
import { initialData, setEditor } from "../../../store/editorSlice"
import { data } from "../../../assets/data"
import { SubCategoryDropdown } from "./SubCategoryDropdown"
import { ArticleDropdown } from "./ArticleDropdown"

export const Editor = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialData())
    dispatch(setEditor(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const environment = params.get("environment")

  return (
    <EditorContainer>
      editor: {environment}
      <DropdownContainer>
        <CategoryDropdown />
        <SubCategoryDropdown />
        <ArticleDropdown />
      </DropdownContainer>
      <EditorComponent data={""} />
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
