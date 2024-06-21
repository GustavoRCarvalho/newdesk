import styled from "styled-components"

export const Home = () => {
  return (
    <HomeContainer>
      <Card>
        <CardTextGroup>
          <CardTitle>ajuste no fluxo de antecipação dos créditos</CardTitle>
          <CardLine />
          <CardDate>06 de jun 2024</CardDate>
        </CardTextGroup>
        <CardButton>Ver mais</CardButton>
      </Card>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  padding: 2em;
`

const Card = styled.div`
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 10em;
  height: 10.8em;

  padding: 1em;
  border-radius: 1em;

  border: 3px solid black;

  box-shadow: -0.2em 0.2em 0.5em 0em #00000070;
`

const CardTitle = styled.h3`
  font-size: 1em;

  font-weight: 500;
  text-transform: uppercase;

  margin: 0;
`

const CardLine = styled.hr`
  width: 75%;
  margin: 0;
  margin-block: 0.4em;

  border-width: 0;
  border-top: 2px solid black;
`

const CardDate = styled.span`
  display: block;
  width: 100%;

  text-align: end;
  font-size: 0.8em;
`

const CardTextGroup = styled.div``

const CardButton = styled.button`
  background-color: var(--side-menu-background);
  color: var(--side-menu-color);
  font-weight: 400;
  font-size: 1.1em;

  padding: 0.5em 1.75em;

  border: none;
  border-radius: 0.5em;

  &:hover {
    transform: translateX(2px) translateY(-2px);
    box-shadow: -2px 2px 0px 0px var(--side-menu-item-select),
      -2px 2px 1em 0em #00000097;
  }

  &:active {
    transform: none;
    box-shadow: none;
  }

  transition: 0.25s;

  cursor: pointer;
`
