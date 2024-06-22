import { Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { Home } from "../components/home/Home"

export default function Content(props) {
  return (
    <MainContainer id="containerElement">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="roupas">
          <Route path="id=:id" element={<Product />} />
        </Route> */}
        <Route path="*" element={<div>Error NOT Found</div>} />
      </Routes>
    </MainContainer>
  )
}

const MainContainer = styled.main`
  height: 100dvh;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`
