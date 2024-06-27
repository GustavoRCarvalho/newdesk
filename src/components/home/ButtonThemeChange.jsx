import styled from "styled-components"
import { changeTheme } from "../../utils/functions"
import { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { motion } from "framer-motion"

export const ButtonThemeChange = () => {
  const [colorList, setColorList] = useState([
    { color: "Pink", hexColor: "#fd84f5" },
    { color: "Blue", hexColor: "#84f5fd" },
    { color: "Yellow", hexColor: "#fdeb84" },
    { color: "Red", hexColor: "#f55d5d" },
  ])
  const [colorTheme, setColorTheme] = useState("Pink")
  const [isOpen, setIsOpen] = useState(false)

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

  return (
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
  )
}

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
