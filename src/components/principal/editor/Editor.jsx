import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { EditorComponent } from "./EditorComponent"
import { DropdownSelector } from "./DropdownSelector"
import styled from "styled-components"

export const Editor = () => {
  const homeData = useSelector((state) => state.homeData.data)
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const environment = params.get("environment")

  return (
    <EditorContainer>
      editor: {environment}
      <DropdownSelector />
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
