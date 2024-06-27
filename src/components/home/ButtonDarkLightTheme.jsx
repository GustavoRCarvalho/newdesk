import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import styled, { css, keyframes } from "styled-components"
import { changeDarkLightMode } from "../../utils/functions"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"

export const ButtonDarkLightTheme = () => {
  const [cookies, setCookies] = useCookies("darkTheme")
  const [darkTheme, setDarkTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)") &&
      cookies.darkTheme !== null &&
      cookies.darkTheme
  )
  const [isRotating, setIsRotating] = useState(false)

  useEffect(() => {
    changeDarkLightMode(darkTheme)

    setCookies("darkTheme", darkTheme)

    setIsRotating(true)
    setTimeout(() => {
      setIsRotating(false)
    }, 1000)
  }, [darkTheme, setCookies])

  return (
    <ButtonChangelightTheme
      title="change light or dark mode"
      onClick={() => {
        if (!isRotating) setDarkTheme((state) => !state)
      }}
      $isvisible={!darkTheme}
      $isrotating={isRotating}
    >
      <HiOutlineSun />
      <HiOutlineMoon />
    </ButtonChangelightTheme>
  )
}

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`

const ButtonChangelightTheme = styled.button`
  position: relative;
  background-color: var(--home-background);
  color: var(--home-card-color);

  border: 2px solid gray;
  border-radius: 3em;

  width: 3em;
  height: 3em;

  margin: 0.3em;

  svg {
    position: absolute;
    width: 2em;
    height: 2em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${(props) =>
      props.$isrotating
        ? css`
            ${rotate} 1s forwards
          `
        : ""};
    transition: 0.5s;
  }
  svg:nth-child(1) {
    opacity: ${(props) => (props.$isvisible ? "0" : "1")};
  }
  svg:nth-child(2) {
    opacity: ${(props) => (props.$isvisible ? "1" : "0")};
  }

  cursor: pointer;
`
