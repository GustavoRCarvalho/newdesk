import { GoStar, GoStarFill, GoTrash } from "react-icons/go"
import styled from "styled-components"
import { createAlertError } from "../../../store/alertSlice"
import { useDispatch, useSelector } from "react-redux"
import { setComments } from "../../../store/homeDataSlice"
import { useMemo, useState } from "react"
import { Spinner } from "../../principal/driveApi/ManipulateListItem"
import { useCookies } from "react-cookie"

export const Commentary = ({
  id,
  userId,
  imageUrl,
  name,
  rating,
  date,
  content,
}) => {
  const dispatch = useDispatch()
  const commentsData = useSelector((state) => state.homeData.comments)
  const [cookies, _setCookies] = useCookies()
  const user = useMemo(() => {
    return cookies.GISuser
  }, [cookies.GISuser])
  const sameUser = userId === user.sub
  const [loading, setLoading] = useState(null)

  async function handleDelete() {
    if (loading) return
    if (!sameUser) return
    setLoading(true)
    try {
      const commentsCopy = JSON.parse(JSON.stringify(commentsData))
      const commentIndex = commentsCopy.map(({ id }) => id).indexOf(id)

      await new Promise((resolve) => setTimeout(resolve, 500))
      commentsCopy.splice(commentIndex, 1)
      dispatch(setComments(commentsCopy))
    } catch (e) {
      dispatch(createAlertError(e.message))
    } finally {
      setLoading(false)
    }
  }
  return (
    <CommentaryContainer>
      <CommentaryWrapper>
        <UserWrapper>
          <img src={imageUrl ?? ""} alt="" />
          <InfosWrapper>
            <NameRatingWrapper>
              <span>{name}</span>
              <RatingStars>
                {rating < 1 ? <GoStar /> : <GoStarFill />}
                {rating < 2 ? <GoStar /> : <GoStarFill />}
                {rating < 3 ? <GoStar /> : <GoStarFill />}
                {rating < 4 ? <GoStar /> : <GoStarFill />}
                {rating < 5 ? <GoStar /> : <GoStarFill />}
              </RatingStars>
            </NameRatingWrapper>
            <DateSpan>Avaliado em {date}</DateSpan>
          </InfosWrapper>
        </UserWrapper>
        <ContentSpan>{content}</ContentSpan>
      </CommentaryWrapper>
      {sameUser && (
        <DeleteButton onClick={handleDelete}>
          {loading ? <Spinner /> : <GoTrash />}
        </DeleteButton>
      )}
    </CommentaryContainer>
  )
}

const DeleteButton = styled.button`
  background-color: transparent;
  color: var(--home-card-color);

  width: 2.5em;
  height: 2.5em;
  padding: 0.5em;

  border: none;
  border-radius: 50%;

  &:hover {
    background-color: var(--home-settings-button-background-hover);
    color: #ff3f3f;
  }

  svg {
    width: 1.5em;
    height: 1.5em;
  }

  cursor: pointer;
`

const RatingStars = styled.div`
  display: flex;

  svg {
    color: #ffe600;
    width: 1.5em;
    height: 1.5em;
  }
`

const CommentaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  width: 90%;

  margin-block: 0.75em;
  margin-left: 1.5em;

  @media (max-width: 720px) {
    margin-left: 0em;
  }
`

const CommentaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  gap: 0.25em;
`

const NameRatingWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 0.5em;
`

const InfosWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const UserWrapper = styled.div`
  display: flex;
  gap: 1em;

  img {
    width: 3em;
    height: 3em;

    border-radius: 50%;
  }
`

const DateSpan = styled.span`
  font-size: 0.8em;
  opacity: 0.8;
`

const ContentSpan = styled.div`
  display: flex;
  margin-left: 4em;

  overflow: hidden;
`
