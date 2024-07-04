import { Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { Home } from "../components/home/Home"
import { Article } from "../components/article/Article"

export default function Content({ height }) {
  return (
    <MainContainer id="containerElement" $height={height}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles/:article" element={<Article />}></Route>
        {/* <Route path="roupas">
          <Route path="id=:id" element={<Product />} />
        </Route> */}
        <Route path="*" element={<div>Error NOT Found</div>} />
      </Routes>
    </MainContainer>
  )
}

const MainContainer = styled.main`
  background-color: var(--home-background);

  min-height: 100dvh;
  height: ${(props) => `${props.$height}px` ?? "100dvh"};
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;

    border-radius: 1em;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`
