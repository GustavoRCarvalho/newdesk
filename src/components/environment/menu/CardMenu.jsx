import styled from "styled-components"
import { WiStars } from "react-icons/wi"
import { useDispatch, useSelector } from "react-redux"
import { resetCard } from "../../../store/cardSlice"
import { useEffect, useRef, useState } from "react"
import { GiOpenBook } from "react-icons/gi"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"

export const CardMenu = () => {
  const refCard = useRef(null)
  const dispatch = useDispatch()
  const card = useSelector((state) => state.card.card)
  const [bottomDistance, setBottomDistance] = useState(0)
  const isOpen = card?.options.length > 0
  const y = card && card.y
  const recCard = refCard.current && refCard.current.getBoundingClientRect()

  useEffect(() => {
    if (refCard.current) {
      setBottomDistance(0)
      refCard.current.scroll({ top: 0, behavior: "instant" })
    }
  }, [isOpen])

  useEffect(() => {
    setBottomDistance(0)
  }, [y])

  useEffect(() => {
    setTimeout(() => {
      const distance =
        window.innerHeight - refCard.current.getBoundingClientRect().bottom
      if (distance < 0) {
        setBottomDistance(distance - 10)
      }
    }, 0)
  }, [recCard])

  return (
    <Card
      ref={refCard}
      $isopen={isOpen}
      $x={card.x}
      $y={y + bottomDistance}
      onMouseLeave={() => dispatch(resetCard())}
    >
      {card.isArticle
        ? card?.options?.map(({ title, textURL }, index) => (
            <NoStyleLinkRouter
              key={title + index}
              to={`/environment/${card.categoryTitle}/${card.title}/${textURL}`}
            >
              <Title>
                <WiStars />
                {title}
              </Title>
            </NoStyleLinkRouter>
          ))
        : card?.options?.map(({ title }, index) => (
            <NoStyleLinkRouter
              key={title + index}
              to="/environment"
              state={{ scrollTo: card.title + title }}
            >
              <Title>
                <GiOpenBook />
                {title}
              </Title>
            </NoStyleLinkRouter>
          ))}
    </Card>
  )
}

const Title = styled.span`
  display: flex;
  color: var(--side-menu-item);

  gap: 0.3em;

  &:hover {
    color: var(--side-menu-item-select);
  }

  border-radius: 5px;

  transition: color 0.2s;

  cursor: pointer;
`

const Card = styled.div`
  position: absolute;

  display: ${(props) => (props.$isopen ? "flex" : "none")};
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  font-size: 1.1em;

  top: ${(props) => props.$y + "px"};
  left: ${(props) => props.$x + "px"};

  width: max-content;
  max-height: 50%;

  padding: 1em;
  gap: 0.8em;
  border-radius: 5px;

  background-color: var(--side-menu-background);
  color: var(--side-menu-color);

  box-shadow: -0.25em 0.25em 1em 0.1em black;
  z-index: 1;

  svg {
    width: 1.45em;
    height: 1.45em;
  }

  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;

    border-radius: 1em;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`
