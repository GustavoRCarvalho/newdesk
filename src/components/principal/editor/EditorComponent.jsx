import ReactQuill from "react-quill-new"
import { useDispatch, useSelector } from "react-redux"
import {
  changeContentArticle,
  boolArticleChange,
} from "../../../store/editorSlice"
import { useEffect, useState } from "react"
import { modules } from "../../../utils/functions"
import { createAlertSucess } from "../../../store/alertSlice"
import { SaveButtons } from "./SaveButtons"

export const EditorComponent = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  const articleChanged = editorState.articleChanged
  const [value, setValue] = useState("")

  const handleKeySave = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault()

      articleChanged && dispatch(boolArticleChange(false))
      dispatch(changeContentArticle(value))
      dispatch(createAlertSucess("Salvo!"))
    }
  }

  // useEffect(() => {
  //   setHasChange(false)
  // }, [editorState.selectedArticleIndex])

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
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(text) => {
          !articleChanged && dispatch(boolArticleChange(true))
          setValue(text)
        }}
        onKeyDown={handleKeySave}
        modules={modules}
      />
      <SaveButtons value={value} />
    </>
  )
}
