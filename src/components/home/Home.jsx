import styled from "styled-components"
import { Category } from "./Category"
import { data } from "../../assets/data"

export const Home = () => {
  return (
    <HomeContainer>
      {data.map((data, index) => (
        <Category key={data.title + index} {...data} />
      ))}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  padding: 2em;
  width: calc(100% - 4em);
`
