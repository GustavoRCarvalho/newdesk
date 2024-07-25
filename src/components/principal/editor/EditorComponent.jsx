import ReactQuill from "react-quill"
import { useDispatch, useSelector } from "react-redux"
import { changeContentArticle } from "../../../store/editorSlice"
import { useEffect, useState } from "react"
import { modules } from "../../../utils/functions"
import { createAlertSucess } from "../../../store/alertSlice"

export const EditorComponent = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  const [value, setValue] = useState("")

  const handleSave = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault()

      dispatch(changeContentArticle(value))
      dispatch(createAlertSucess("Salvo!"))
    }
  }

  useEffect(() => {
    setValue(
      editorData.categories[editorState.selectedCategoryIndex]?.subCategories[
        editorState.selectedSubCategoryIndex
      ]?.articles[editorState.selectedArticleIndex]?.content
    )
  }, [
    editorData.categories,
    editorState.selectedArticleIndex,
    editorState.selectedCategoryIndex,
    editorState.selectedSubCategoryIndex,
  ])

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      onKeyDown={handleSave}
      modules={modules}
    />
  )
}
