import styled, { css, keyframes } from "styled-components"
import { changeDarkLightMode, changeTheme } from "../../utils/functions"
import { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { motion } from "framer-motion"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2"

export const ThemeChange = () => {
  const [colorList, setColorList] = useState([
    { color: "Pink", hexColor: "#fd84f5" },
    { color: "Blue", hexColor: "#84f5fd" },
    { color: "Yellow", hexColor: "#fdeb84" },
    { color: "Red", hexColor: "#f55d5d" },
  ])
  const [lightTheme, setLightTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)")
  )
  const [colorTheme, setColorTheme] = useState("Pink")
  const [isOpen, setIsOpen] = useState(false)
  const [isRotating, setIsRotating] = useState(false)

  useEffect(() => {
    if (isOpen) return

    setColorList((state) => {
      const index = state.map((obj) => obj.color).indexOf(colorTheme)
      let newListColors = [...state]
      newListColors.splice(index, 1)
      newListColors.unshift(state[index])
      return newListColors
    })
  }, [isOpen, colorTheme])

  useEffect(() => {
    changeDarkLightMode(lightTheme)
    setIsRotating(true)
    setTimeout(() => {
      setIsRotating(false)
    }, 1000)
  }, [lightTheme])

  return (
    <>
      <ThemeColorContainer layout="size">
        {colorList.map(({ color, hexColor }, index) => (
          <ButtonChangeThemeColor
            layout="size"
            transition={{ duration: 0 }}
            key={color + index}
            title="change color"
            $color={hexColor}
            $isvisible={isOpen || index === 0}
            $ischeck={colorTheme === color && isOpen}
            onClick={() => {
              if (!isOpen && index === 0) {
                setIsOpen(true)
                return
              }
              if (isOpen && colorTheme === color) {
                changeTheme(color)
                setIsOpen(false)
                return
              }
              if (!isOpen) return
              changeTheme(color)
              setColorTheme(color)
            }}
          >
            <FaCheck />
          </ButtonChangeThemeColor>
        ))}
      </ThemeColorContainer>
      <ButtonChangelightTheme
        title="change light or dark mode"
        onClick={() => {
          if (!isRotating) setLightTheme((state) => !state)
        }}
        $isvisible={lightTheme}
        $isrotating={isRotating}
      >
        <HiOutlineSun />
        <HiOutlineMoon />
      </ButtonChangelightTheme>
    </>
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
    opacity: ${(props) => (props.$isvisible ? "1" : "0")};
  }
  svg:nth-child(2) {
    opacity: ${(props) => (props.$isvisible ? "0" : "1")};
  }

  cursor: pointer;
`

const ThemeColorContainer = styled(motion.div)`
  background-color: var(--home-card-background);

  width: max-content;

  display: flex;
  align-items: center;

  border-radius: 3em;
  gap: 0.5em;

  padding: 0.3em;
  box-shadow: 0em 0em 1em 0em #0000004b;

  overflow: hidden;
`

const ButtonChangeThemeColor = styled(motion.button)`
  background-color: ${(props) => props.$color ?? "#fff"};

  /* border: ${(props) =>
    props.$ischeck ? "2px solid #fff" : "2px solid transparent"}; */
  border: none;
  border-radius: 3em;

  width: 3em;
  height: 3em;

  display: ${(props) => (props.$isvisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  padding: 0;

  cursor: pointer;

  svg {
    display: ${(props) => (props.$ischeck ? "block" : "none")};

    width: 1.5em;
    height: 1.5em;

    color: #fff;
  }
`
