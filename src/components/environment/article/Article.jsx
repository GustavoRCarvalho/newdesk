import { useLocation } from "react-router-dom"
import styled from "styled-components"
import ReactQuill from "react-quill"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"
import { useSelector } from "react-redux"

export const Article = () => {
  const { pathname } = useLocation()
  const homeData = useSelector((state) => state.homeData.data)
  const pathLabel = decodeURI(pathname.replace("/", "")).split("/")
  const indexCategory = homeData.map(({ title }) => title).indexOf(pathLabel[1])
  const indexSubCategory = homeData[indexCategory]?.subCategories
    .map(({ title }) => title)
    .indexOf(pathLabel[2])
  const indexArticle = homeData[indexCategory]?.subCategories[
    indexSubCategory
  ]?.articles
    .map(({ textURL }) => textURL)
    .indexOf(pathLabel[3])
  const dataArticle =
    homeData[indexCategory]?.subCategories[indexSubCategory]?.articles[
      indexArticle
    ]?.data

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
      <ReactQuill
        readOnly={true}
        value={dataArticle}
        modules={{ toolbar: [] }}
      />
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

  .quill {
    width: 100%;
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
