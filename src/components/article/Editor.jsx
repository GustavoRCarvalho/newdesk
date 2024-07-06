import styled from "styled-components"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useState } from "react"

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

export const EditorComponent = ({ title = "conteudo" }) => {
  const [value, setValue] = useState("")

  const handleSave = () => {
    const blob = new Blob([value], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.replace(" ", "/")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleLoad = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      setValue(content)
    }
    reader.readAsText(file)
  }

  return (
    <EditorContainer>
      <input type="file" onChange={handleLoad} />
      <button onClick={handleSave}>Save Content</button>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
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
