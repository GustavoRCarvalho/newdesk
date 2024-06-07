import { Route, Routes } from "react-router-dom"
import styled from "styled-components"

export default function Content(props) {
  return (
    <MainContainer>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div style={{ height: "200vh", width: "100%" }}>home</div>
            </div>
          }
        ></Route>
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
