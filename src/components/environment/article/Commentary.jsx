import { GoStar, GoStarFill } from "react-icons/go"
import styled from "styled-components"

export const Commentary = ({ imageUrl, name, rating, date, content }) => {
  return (
    <CommentaryContainer>
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
    </CommentaryContainer>
  )
}

const RatingStars = styled.div`
  display: flex;

  svg {
    color: #ffe600;
    width: 1.5em;
    height: 1.5em;
  }
`

const CommentaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  margin-block: 0.75em;
  margin-left: 1.5em;
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

const ContentSpan = styled.span`
  display: block;
  margin-left: 4em;
`
