import { useSelector } from "react-redux"
import styled from "styled-components"
import { Commentary } from "./Commentary"
import { AddComment } from "./AddComment"

export const Comments = ({ articleId }) => {
  const commentsData = useSelector((state) => state.homeData.comments)
  const commentsFiltered = commentsData?.filter(
    (comment) => articleId === comment.articleId
  )
  // const commentsData = [
  //   {
  //     id: "9878675",
  //     articleId: "0",
  //     imageUrl:
  //       "https://lh3.googleusercontent.com/a/ACg8ocLD3hG4mwwl1RBYZA5bP1I-PrzlstYqQT0xDr1F6IqFYRiImWg=s96-c",
  //     userId: "123213123",
  //     name: "Gustavo Rafael de Carvalho",
  //     rating: 5,
  //     date: "Qua, 17 Jul de 2024 - 01:58",
  //     content:
  //       "Melhor artigo do mundo! É muito importante termos estas informações para auxiliar o nosso time maravilhoso!",
  //   },
  // ]

  return (
    <CommentsContainer>
      <AddComment articleId={articleId} />
      <h2>COMENTÁRIOS</h2>
      {commentsFiltered?.map((comment) => {
        return <Commentary key={comment.id} {...comment} />
      })}
    </CommentsContainer>
  )
}

const CommentsContainer = styled.div`
  color: var(--home-card-color);

  width: calc(100%);
  max-width: 920px;

  display: flex;
  flex-direction: column;
  align-items: start;

  padding-block: 3em;

  h2 {
    max-width: max-content;

    border-bottom: 1px solid var(--home-card-color);

    margin: 0;
    margin-bottom: 0.5em;
    padding-bottom: 1em;
    padding-right: 3em;
  }
`
