import { useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import { useCookies } from "react-cookie"

export const ButtonDarkLightTheme = () => {
  const [cookies, setCookies] = useCookies()
  const [isRotating, setIsRotating] = useState(false)

  function handleChangeLightMode() {
    setIsRotating(true)
    setTimeout(() => {
      setIsRotating(false)
    }, 1000)

    setCookies("darkTheme", !cookies.darkTheme, { path: "/", maxAge: 34560000 })
  }

  return (
    <LightThemeContainer>
      Modo escuro
      <ButtonChangelightTheme
        title="change light or dark mode"
        onClick={() => {
          if (!isRotating) handleChangeLightMode()
        }}
        $isvisible={!cookies.darkTheme}
        $isrotating={isRotating}
      >
        <HiOutlineMoon />
        <HiOutlineSun />
      </ButtonChangelightTheme>
    </LightThemeContainer>
  )
}

const LightThemeContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const rotate = keyframes`
  0% {
    transform: translate(-0%, -47%) rotate(0deg);
  }
  100% {
    transform: translate(-100%, -47%) rotate(-360deg);
  }
`
const rotateReverse = keyframes`
  0% {
    transform: translate(-100%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-0%, -50%) rotate(360deg);
  }
`

const ButtonChangelightTheme = styled.button`
  position: relative;
  background-color: transparent;
  color: var(--home-dark-button);

  border: 1px solid var(--home-dark-button-background);
  border-radius: 3em;

  width: 2.8em;
  height: 1.5em;

  svg {
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    top: 50%;
    left: 50%;
    transition: transform 0.5s;
  }
  svg:nth-child(1) {
    animation: ${(props) =>
      props.$isrotating
        ? css`
            ${rotate} 1s forwards
          `
        : ""};
    opacity: ${(props) => (props.$isvisible ? "0" : "1")};
    transform: translate(-100%, -47%);
  }
  svg:nth-child(2) {
    animation: ${(props) =>
      props.$isrotating
        ? css`
            ${rotateReverse} 1s forwards
          `
        : ""};
    opacity: ${(props) => (props.$isvisible ? "1" : "0")};
    transform: translate(-0%, -50%);
  }

  cursor: pointer;
`
