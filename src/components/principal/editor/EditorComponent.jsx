import styled from "styled-components"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux"
import { setEditor } from "../../../store/editorSlice"
import { useEffect, useState } from "react"

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", { color: [] }], // dropdown with defaults from theme
    [
      { align: [] },
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      "clean",
    ],
    ["link", "image", "video"],
  ],
}

export const EditorComponent = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const [value, setValue] = useState("")

  const handleSave = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault()

      let newCopy = JSON.parse(JSON.stringify(editorState.editor))

      newCopy[editorState.selectedCategoryIndex].subCategories[
        editorState.selectedSubCategoryIndex
      ].articles[editorState.selectedArticleIndex].data = value

      dispatch(setEditor(newCopy))
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
      <button onClick={handleSave}>Save Content</button>
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
