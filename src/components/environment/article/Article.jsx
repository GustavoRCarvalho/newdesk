import { useLocation } from "react-router-dom"
import styled from "styled-components"
import ReactQuill from "react-quill"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"
import { useSelector } from "react-redux"

export const Article = () => {
  const { pathname } = useLocation()
  const homeData = useSelector((state) => state.homeData.data)
  const articleData = homeData ?? []
  const pathLabel = decodeURI(pathname.replace("/", "")).split("/")

  const indexCategory = articleData
    .map(({ title }) => title)
    .indexOf(pathLabel[1])
  const indexSubCategory = articleData[indexCategory]?.subCategories
    .map(({ title }) => title)
    .indexOf(pathLabel[2])
  const indexArticle = articleData[indexCategory]?.subCategories[
    indexSubCategory
  ]?.articles
    .map(({ title }) => title)
    .indexOf(pathLabel[3])
  const article =
    articleData[indexCategory]?.subCategories[indexSubCategory]?.articles[
      indexArticle
    ] ?? {}

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
        >{` ${pathLabel[2]}`}</NoStyleLinkRouter>
      </NavigationArticle>
      <TitleArticle>{article.title}</TitleArticle>
      <DateArticle>Modificado em: {article.date}</DateArticle>
      <ReactQuill
        readOnly={true}
        value={article.content}
        modules={{ toolbar: [] }}
      />
    </ArticleContainer>
  )
}

const DateArticle = styled.span`
  width: 100%;
`

const TitleArticle = styled.h2`
  width: 100%;

  margin-block: 0.75em;
`

const NavigationArticle = styled.div`
  font-size: 1.3em;

  width: 100%;

  a {
    cursor: pointer;
    color: var(--home-card-color);

    &:hover {
      color: var(--side-menu-item-select);
    }
  }
`

const ArticleContainer = styled.div`
  width: calc(100% - 6em);
  max-width: 920px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3em;

  color: var(--home-card-color);

  .quill {
    margin-top: 1em;
    width: 100%;
    height: 100%;
  }

  .ql-toolbar {
    display: none;
  }

  .ql-container {
    border: none;
    border-radius: 1em;
    box-shadow: 0em 0em 1em 0em #0000004b;
  }
`
