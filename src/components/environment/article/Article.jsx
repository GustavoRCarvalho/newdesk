import { useLocation } from "react-router-dom"
import styled from "styled-components"
import ReactQuill from "react-quill"
import { data } from "../../../assets/data"
import { useEffect, useState } from "react"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"

export const Article = () => {
  const { pathname } = useLocation()
  const pathLabel = decodeURI(pathname.replace("/", "")).split("/")
  const [dataState, setDataState] = useState("")

  useEffect(() => {
    const indexCategory = data.map(({ title }) => title).indexOf(pathLabel[1])
    const indexSubCategory = data[indexCategory]?.subCategories
      .map(({ title }) => title)
      .indexOf(pathLabel[2])
    const indexArticle = data[indexCategory]?.subCategories[
      indexSubCategory
    ]?.articles
      .map(({ textURL }) => textURL)
      .indexOf(pathLabel[3])
    setDataState(
      data[indexCategory]?.subCategories[indexSubCategory]?.articles[
        indexArticle
      ]?.data
    )
  }, [pathLabel])

  return (
    <ArticleContainer>
      <NavigationArticle>
        <NoStyleLinkRouter
          to="/environment"
          state={{ scrollTo: "" }}
        >{`Início >`}</NoStyleLinkRouter>
        <NoStyleLinkRouter
          to="/environment"
          state={{ scrollTo: pathLabel[1] }}
        >{` ${pathLabel[1]} >`}</NoStyleLinkRouter>
        <NoStyleLinkRouter
          to="/environment"
          state={{ scrollTo: pathLabel[1] + pathLabel[2] }}
        >{` ${pathLabel[2]} >`}</NoStyleLinkRouter>
        <NoStyleLinkRouter>{` ${pathLabel[3]}`}</NoStyleLinkRouter>
      </NavigationArticle>
      <ReactQuill readOnly={true} value={dataState} modules={{ toolbar: [] }} />
    </ArticleContainer>
  )
}

const NavigationArticle = styled.div`
  font-size: 1.3em;

  width: 100%;

  margin-bottom: 1em;

  a {
    cursor: pointer;
    color: var(--home-card-color);

    &:hover {
      color: var(--side-menu-item-select);
    }
  }
  a:nth-child(4) {
    cursor: default;

    &:hover {
      color: var(--home-card-color);
    }
  }
`

const ArticleContainer = styled.div`
  width: calc(100% - 6em);
  height: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3em;

  color: var(--home-card-color);

  .ql-toolbar {
    display: none;
  }

  .ql-container {
    border: none;
    border-radius: 1em;
    box-shadow: 0em 0em 1em 0em #0000004b;
  }
`
