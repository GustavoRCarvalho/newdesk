import styled from "styled-components"
import { Category } from "./Category"
import { data } from "../../assets/data"
import { Settings } from "./Settings"
import { ButtonThemeChange } from "./ButtonThemeChange"
import { ButtonDarkLightTheme } from "./ButtonDarkLightTheme"

export const Home = () => {
  return (
    <HomeContainer>
      <Settings>
        <ButtonThemeChange />
        <ButtonDarkLightTheme />
      </Settings>
      {data.map((data, index) => (
        <Category key={data.title + index} {...data} />
      ))}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  padding: 2em;
  width: calc(100% - 4em);

  color: var(--home-card-color);
`
