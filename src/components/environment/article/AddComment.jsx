import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { GoStarFill, GoStar } from "react-icons/go"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { toggleLogin } from "../../../store/modalSlice"
import {
  readJsonFile,
  updateJsonFileShared,
} from "../../../utils/googleDriveApi"
import { setComments } from "../../../store/homeDataSlice"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"
import { currentDate, generateUniqueId } from "../../../utils/functions"
import { Spinner } from "../../principal/driveApi/ManipulateListItem"

export const AddComment = ({ articleId }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(null)
  const [rating, setRating] = useState(null)
  const homeData = useSelector((state) => state.homeData.environment)
  const commentsData = useSelector((state) => state.homeData.comments)
  const user = useSelector((state) => state.user.user)

  async function handleFetchComments() {
    console.log(homeData.commentId)
    try {
      const data = await readJsonFile(homeData.commentId)
      dispatch(setComments(data))
      return data
    } catch (e) {
      dispatch(setComments([]))
      dispatch(createAlertError(e.message))
    } finally {
    }
  }

  async function addCommentary() {
    if (content === "") {
      setError((state) => ({ ...state, content: true }))
    }
    if (rating === null) {
      setError((state) => ({ ...state, rating: true }))
    }
    if (rating === null || content === "") {
      return
    }
    setLoading(true)
    try {
      // const comments = await handleFetchComments()
      const commentsCopy = JSON.parse(JSON.stringify(commentsData))

      const newComment = {
        id: generateUniqueId(),
        articleId: articleId,
        imageUrl: user.imageUrl,
        userId: user.id,
        name: user.name,
        rating: rating,
        date: currentDate(),
        content: content,
      }
      commentsCopy.unshift(newComment)
      // await updateJsonFileShared(homeData.commentId, commentsCopy)
      // await handleFetchComments()
      dispatch(setComments(commentsCopy))
      dispatch(createAlertSucess("Comentário adicionado com sucesso!"))
    } catch (e) {
      dispatch(createAlertError(e.message))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (content !== "") {
      setError((state) => ({ ...state, content: false }))
    }
    if (rating !== null) {
      setError((state) => ({ ...state, rating: false }))
    }
  }, [rating, content])

  return (
    <AddCommentaryContainer>
      <AddCommentaryTitle>
        Você possui algum comentário construtivo? Compartilha com a gente! S2
      </AddCommentaryTitle>
      <AddWrapper>
        {!user && (
          <UserNoLoggedBlocker>
            Conecte com Google e comente
            <ConnectGoogleButton onClick={() => dispatch(toggleLogin())}>
              <FcGoogle /> Conectar
            </ConnectGoogleButton>
          </UserNoLoggedBlocker>
        )}
        <NameRatingWrapper>
          <NameSpan>{user?.name ?? ""}</NameSpan>
          <RatingWrapper>
            <span>Qual sua nota para este artigo?</span>
            <RatingStars $error={error?.rating}>
              {rating < 1 ? (
                <GoStar onClick={() => setRating(1)} />
              ) : (
                <GoStarFill
                  onClick={() => (rating === 1 ? setRating(0) : setRating(1))}
                />
              )}
              {rating < 2 ? (
                <GoStar onClick={() => setRating(2)} />
              ) : (
                <GoStarFill
                  onClick={() => (rating === 2 ? setRating(0) : setRating(2))}
                />
              )}
              {rating < 3 ? (
                <GoStar onClick={() => setRating(3)} />
              ) : (
                <GoStarFill
                  onClick={() => (rating === 3 ? setRating(0) : setRating(3))}
                />
              )}
              {rating < 4 ? (
                <GoStar onClick={() => setRating(4)} />
              ) : (
                <GoStarFill
                  onClick={() => (rating === 4 ? setRating(0) : setRating(4))}
                />
              )}
              {rating < 5 ? (
                <GoStar onClick={() => setRating(5)} />
              ) : (
                <GoStarFill
                  onClick={() => (rating === 5 ? setRating(0) : setRating(5))}
                />
              )}
            </RatingStars>
          </RatingWrapper>
        </NameRatingWrapper>
        <CommentInput
          $error={error?.content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type=""
          placeholder="Comentário"
        />
        <SendContainer>
          <button onClick={addCommentary}>
            Enviar {loading && <Spinner />}
          </button>
        </SendContainer>
      </AddWrapper>
    </AddCommentaryContainer>
  )
}

const UserNoLoggedBlocker = styled.div`
  position: absolute;
  border-radius: 1em;
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1em;

  top: -5%;
  left: -5%;

  width: 110%;
  height: 110%;
`

const ConnectGoogleButton = styled.button`
  background-color: var(--home-card-background);
  color: var(--home-card);
  font-size: 1em;

  display: flex;
  align-items: center;
  gap: 1em;

  border-radius: 0.5em;

  border: none;
  padding: 0.5em 1.5em;

  box-shadow: 0em 0em 1em 0em #0000004b;

  cursor: pointer;
`

const AddCommentaryTitle = styled.span`
  font-size: 1.2em;
  font-weight: 500;

  text-align: center;
`

const AddCommentaryContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`

const AddWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 2em;

  gap: 1em;
`

const NameSpan = styled.span`
  width: calc(100% - 3.5em);
  padding: 0.5em 0.75em;

  border: 1px solid var(--home-card-color);
  border-radius: 0.5em;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  cursor: default;
`

const NameRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  gap: 2em;
`
const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  width: calc(100% - 3.5em);
  white-space: nowrap;
`
const RatingStars = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;

  svg {
    color: ${(props) => (props.$error ? "#ff3f3f" : "yellow")};
    width: 2em;
    height: 2em;

    cursor: pointer;
  }
`
const CommentInput = styled.textarea`
  display: block;
  font-family: "Jost", sans-serif;
  font-size: 1em;

  background-color: transparent;
  color: var(--home-card-color);

  width: calc(100% - 1.5em) !important;
  height: 5em;
  min-height: 1.5em;

  width: 100%;
  padding: 0.5em 0.75em;

  border: 1px solid
    ${(props) => (props.$error ? "#ff3f3f" : "var(--home-card-color)")};
  border-radius: 0.5em;
  outline: none;
`

const SendContainer = styled.div`
  display: flex;
  justify-content: end;

  width: 100%;
  max-width: 920px;

  button {
    background-color: var(--home-card-background);
    color: var(--home-card);
    font-size: 1em;

    display: flex;
    align-items: center;
    gap: 1em;

    border-radius: 0.5em;

    border: none;
    padding: 0.5em 1.5em;

    box-shadow: 0em 0em 1em 0em #0000004b;

    cursor: pointer;
  }
`
