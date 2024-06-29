import styled from "styled-components"
import { Category } from "./Category"
import { Settings } from "./Settings"
import { ButtonThemeChange } from "./ButtonThemeChange"
import { ButtonDarkLightTheme } from "./ButtonDarkLightTheme"
import { useSelector } from "react-redux"

export const Home = () => {
  const homeData = useSelector((state) => state.homeData.data)
  return (
    <HomeContainer>
      <Settings>
        <ButtonThemeChange />
        <ButtonDarkLightTheme />
      </Settings>
      {homeData.map((data, index) => (
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
