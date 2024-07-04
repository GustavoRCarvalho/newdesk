import { Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { Home } from "../components/home/Home"
import { Article } from "../components/article/Article"
import { resetCard } from "../store/cardSlice"
import { useDispatch } from "react-redux"

export default function Content() {
  const dispatch = useDispatch()

  return (
    <MainContainer
      id="containerElement"
      onMouseEnter={() => dispatch(resetCard())}
    >
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

  height: 100dvh;
  flex: 1;
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
