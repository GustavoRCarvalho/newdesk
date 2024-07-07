import styled from "styled-components"
import { changeTheme } from "../../../utils/functions"
import { useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { useCookies } from "react-cookie"

const colorList = [
  { color: "Red", hexColor: "#f55d5d" },
  { color: "Yellow", hexColor: "#fdeb84" },
  { color: "Green", hexColor: "#D4FFAA" },
  { color: "Blue", hexColor: "#84f5fd" },
  { color: "Pink", hexColor: "#fd84f5" },
  { color: "Purple", hexColor: "#D784FD" },
]

export const ButtonThemeChange = () => {
  const [cookies, setCookies] = useCookies()
  const [colorTheme, setColorTheme] = useState(cookies.themeColor ?? "Pink")

  return (
    <ThemeColorContainer>
      Tema
      <ColorContainer>
        {colorList.map(({ color, hexColor }, index) => (
          <ButtonChangeThemeColor
            key={color + index}
            title="change color"
            $color={hexColor}
            $ischeck={colorTheme === color}
            onClick={() => {
              changeTheme(color)
              setColorTheme(color)
              setCookies("themeColor", color)
            }}
          >
            <FaCheck />
          </ButtonChangeThemeColor>
        ))}
      </ColorContainer>
    </ThemeColorContainer>
  )
}

const ColorContainer = styled.div`
  display: flex;
  gap: 0.4em;
`

const ThemeColorContainer = styled.div`
  background-color: var(--home-card-background);

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;

  overflow: hidden;
`

const ButtonChangeThemeColor = styled.button`
  background-color: ${(props) => props.$color ?? "#fff"};

  /* border: ${(props) =>
    props.$ischeck ? "2px solid #fff" : "2px solid transparent"}; */
  border: none;
  border-radius: 3em;

  width: 1.6em;
  height: 1.6em;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  cursor: pointer;

  svg {
    display: ${(props) => (props.$ischeck ? "block" : "none")};

    width: 1em;
    height: 1em;

    color: #fff;
  }
`
