import { useLocation } from "react-router-dom"
import styled from "styled-components"

export const Article = () => {
  const { pathname } = useLocation()
  const pathLabel = decodeURI(
    pathname.replace("/", "").split("/")[1].replace("_", " ")
  )

  return <ArticleContainer>article: {pathLabel}</ArticleContainer>
}

const ArticleContainer = styled.div`
  width: 100%;
  height: 100%;

  color: var(--home-card-color);
`
