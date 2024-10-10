import { useLocation } from "react-router-dom"
import styled from "styled-components"
import ReactQuill from "react-quill-new"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"
import {
  // useDispatch,
  useSelector,
} from "react-redux"
// import { useEffect } from "react"
// import { setComments } from "../../../store/homeDataSlice"
// import { createAlertError } from "../../../store/alertSlice"
// import { Comments } from "./Comments"
import { FavoriteButton } from "../home/FavoriteButton"

// const commentList = [
//   {
//     id: "1721276017744-2351",
//     articleId: "1721192326909-653",
//     imageUrl:
//       "https://lh3.googleusercontent.com/a/ACg8ocLD3hG4mwwl1RBYZA5bP1I-PrzlstYqQT0xDr1F6IqFYRiImWg=s96-c",
//     userEmail: "103198483550463711010",
//     name: "Gustavo Carvalho",
//     rating: 1,
//     date: "Qui, 18 Jul de 2024 - 01:13",
//     content: "bah ne",
//   },
// ]

export const Article = () => {
  // const dispatch = useDispatch()
  const { pathname } = useLocation()
  const homeData = useSelector((state) => state.homeData)
  const articleData = homeData.environment.categories ?? []
  // const articleComments = homeData.comments
  const pathLabel = decodeURI(pathname.replace("/", "")).split("/")

  const indexCategory = articleData
    .map(({ linkTitle }) => linkTitle)
    .indexOf(pathLabel[1])
  const indexSubCategory = articleData[indexCategory]?.subCategories
    .map(({ linkTitle }) => linkTitle)
    .indexOf(pathLabel[2])
  const indexArticle = articleData[indexCategory]?.subCategories[
    indexSubCategory
  ]?.articles
    .map(({ linkTitle }) => linkTitle)
    .indexOf(pathLabel[3])
  const article =
    articleData[indexCategory]?.subCategories[indexSubCategory]?.articles[
      indexArticle
    ] ?? {}
  const categoryTitle = articleData[indexCategory].title
  const subCategoryTitle =
    articleData[indexCategory]?.subCategories[indexSubCategory].title

  // async function handleFetch() {
  //   try {
  //     // const data = await readJsonFile(homeData.environment.commentId)
  //     dispatch(setComments(commentList))
  //   } catch (e) {
  //     dispatch(setComments([]))
  //     dispatch(createAlertError(e.message))
  //   }
  // }
  // useEffect(() => {
  //   if (articleComments === undefined) {
  //     handleFetch()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [articleComments])

  return (
    <ArticleContainer $backgroundColor={article.backgroundColor}>
      <NavigationArticle>
        <NoStyleLinkRouter
          to="/environment"
          state={{ scrollTo: "" }}
        >{`Início >`}</NoStyleLinkRouter>
        <NoStyleLinkRouter
          to="/environment"
          state={{ scrollTo: pathLabel[1] }}
        >{` ${categoryTitle} >`}</NoStyleLinkRouter>
        <NoStyleLinkRouter
          to="/environment"
          state={{ scrollTo: pathLabel[1] + pathLabel[2] }}
        >{` ${subCategoryTitle}`}</NoStyleLinkRouter>
      </NavigationArticle>
      <TitleWrapper>
        <TitleArticle>{article.title}</TitleArticle>
        <FavoriteButton id={article.id} />
      </TitleWrapper>
      <DateArticle>Modificado em: {article.date}</DateArticle>
      <ReactQuill
        readOnly={true}
        value={article.content}
        modules={{ toolbar: [] }}
      />
      {/* <Comments articleId={article.id} /> */}
    </ArticleContainer>
  )
}

const DateArticle = styled.span`
  width: 100%;
`

const TitleWrapper = styled.div`
  position: relative;
  font-size: 1.5em;

  display: flex;
  gap: 1em;
`

const TitleArticle = styled.h2`
  width: 100%;
  font-size: 1em;

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
  padding: 3em;

  @media (max-width: 720px) {
    padding-inline: 1em;
    width: calc(100% - 2em);
  }

  color: var(--home-card-color);

  .quill {
    margin-top: 1em;
  }

  .ql-toolbar {
    display: none;
  }

  .ql-container {
    border: none;
  }

  .ql-editor {
    background-color: ${(props) =>
      props.$backgroundColor ?? "var(--home-card-background)"};
  }
`
