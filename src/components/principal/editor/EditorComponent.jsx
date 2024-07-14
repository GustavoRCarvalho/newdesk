import styled from "styled-components"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux"
import { setEditor } from "../../../store/editorSlice"
import { useEffect, useState } from "react"
import { convertDate, currentDate, modules } from "../../../utils/functions"

export const EditorComponent = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const [value, setValue] = useState("")

  const handleSave = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault()

      let newCopy = JSON.parse(JSON.stringify(editorState.editor))

      const article =
        newCopy[editorState.selectedCategoryIndex].subCategories[
          editorState.selectedSubCategoryIndex
        ].articles[editorState.selectedArticleIndex]
      article.data = value
      article.date = convertDate(currentDate())

      dispatch(setEditor(newCopy))
      // gerar alerta de save
    }
  }

  useEffect(() => {
    setValue(
      editorState.editor[editorState.selectedCategoryIndex]?.subCategories[
        editorState.selectedSubCategoryIndex
      ]?.articles[editorState.selectedArticleIndex]?.data
    )
  }, [
    editorState.editor,
    editorState.selectedArticleIndex,
    editorState.selectedCategoryIndex,
    editorState.selectedSubCategoryIndex,
  ])

  return (
    <EditorContainer>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        onKeyDown={handleSave}
        modules={modules}
      />
    </EditorContainer>
  )
}
const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
