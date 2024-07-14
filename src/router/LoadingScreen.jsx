import styled from "styled-components"

export const LoadingScreen = () => {
  return <LoadingContainer>loading</LoadingContainer>
}

const LoadingContainer = styled.div`
  background-color: var(--alert-background);
  position: fixed;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`
