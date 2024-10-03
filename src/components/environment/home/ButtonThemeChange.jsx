import styled from "styled-components"
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

  return (
    <ThemeColorContainer>
      Tema
      <ColorContainer>
        {colorList.map(({ color, hexColor }, index) => (
          <ButtonChangeThemeColor
            key={color + index}
            title="change color"
            $color={hexColor}
            $ischeck={cookies.colorTheme === color}
            onClick={() => {
              setCookies("colorTheme", color, { path: "/", maxAge: 34560000 })
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
`

const ButtonChangeThemeColor = styled.button`
  background-color: ${(props) => props.$color ?? "#fff"};

  /* border: ${(props) =>
    props.$ischeck ? "2px solid #fff" : "2px solid transparent"}; */
  border: none;
  border-radius: 3em;

  width: 1.2em;
  height: 1.2em;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: ${(props) => props.$ischeck && `0 0 1em 2px ${props.$color}`};

  padding: 0;

  cursor: pointer;

  svg {
    display: ${(props) => (props.$ischeck ? "block" : "none")};

    width: 1em;
    height: 1em;

    color: #ffffff;
  }
`
