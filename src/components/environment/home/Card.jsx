import styled from "styled-components"
import { HiOutlineArrowUp } from "react-icons/hi"
import backgroundImage from "../../../assets/images/cardBackgroundImage.png"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"
import { prepareCardDate } from "../../../utils/functions"
import { FavoriteButton } from "./FavoriteButton"

export const Card = ({
  linkTitleCategory,
  linkTitleSubCategory,
  linkTitle,
  title,
  date,
  id,
}) => {
  return (
    <CardContainer>
      <FavoriteWrapper>
        <FavoriteButton id={id} />
      </FavoriteWrapper>
      <img src={backgroundImage} alt="background card" />
      <CardTextGroup>
        <CardTitle>{title}</CardTitle>
        <CardLine />
        <CardDate>{prepareCardDate(date)}</CardDate>
      </CardTextGroup>
      <NoStyleLinkRouter
        to={`/environment/${linkTitleCategory}/${linkTitleSubCategory}/${linkTitle}`}
      >
        <CardButton>
          Ver mais <HiOutlineArrowUp />
        </CardButton>
      </NoStyleLinkRouter>
    </CardContainer>
  )
}
const FavoriteWrapper = styled.div`
  position: absolute;

  right: 1em;
  top: 1.5em;
`

const CardContainer = styled.div`
  position: relative;
  background-color: var(--home-card-background);
  color: var(--home-card-color);

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  width: 14em;
  height: 14em;

  padding: 1.2em;
  border-radius: 1em;

  box-shadow: 0em 0em 1em 0em #0000004b;
  overflow: hidden;

  img {
    position: absolute;
    width: 70%;

    left: 60%;
    top: 52%;

    user-select: none;
    pointer-events: none;
  }

  @media (max-width: 405px) {
    width: 11em;
    height: 11em;
  }
`

const CardTitle = styled.h3`
  width: 100%;
  max-height: 4.5em;
  font-size: 1.45em;

  font-weight: 500;

  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`

const CardLine = styled.hr`
  width: 55%;
  margin: 0;
  margin-block: 0.4em 0.2em;

  border-width: 0;
  border-top: 2px solid var(--home-card-color);
`

const CardDate = styled.span`
  display: block;
  width: 100%;

  text-align: start;
  font-size: 0.8em;
  font-weight: 500;
`

const CardTextGroup = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

const CardButton = styled.button`
  background-color: var(--card-button-background);
  color: var(--card-button-color);
  font-weight: 500;
  line-height: 1px;

  display: flex;
  align-items: center;

  gap: 0.3em;

  padding: 0.5em 1em;
  margin-bottom: 0.4em;

  border: none;
  border-radius: 2em;

  transition: 0.25s;

  svg {
    margin-top: 0.1em;
    width: 1.1em;
    height: 1.1em;

    transform: rotateZ(40deg);
  }

  user-select: none;
  cursor: pointer;
`
