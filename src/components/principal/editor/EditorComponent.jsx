import styled from "styled-components"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux"
import { setEditor } from "../../../store/editorSlice"

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

  const data =
    editorState.editor[editorState.selectedCategoryIndex]?.subCategories[
      editorState.selectedSubCategoryIndex
    ]?.articles[editorState.selectedArticleIndex]?.data

  const handleSave = (value) => {
    let newCopy = JSON.parse(JSON.stringify(editorState.editor))

    newCopy[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles[editorState.selectedArticleIndex].data = value

    dispatch(setEditor(newCopy))
  }

  return (
    <EditorContainer>
      <button onClick={handleSave}>Save Content</button>
      <ReactQuill
        theme="snow"
        value={data}
        onChange={handleSave}
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
