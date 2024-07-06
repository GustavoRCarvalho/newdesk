import styled from "styled-components"
import { Category } from "./Category"
import { Settings } from "./Settings"
import { ButtonThemeChange } from "./ButtonThemeChange"
import { ButtonDarkLightTheme } from "./ButtonDarkLightTheme"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { scroller } from "react-scroll"

export const Home = () => {
  const homeData = useSelector((state) => state.homeData.data)
  const location = useLocation()
  const scrollTo = location.state?.scrollTo

  useEffect(() => {
    if (scrollTo) {
      scroller.scrollTo(scrollTo, {
        duration: 500,
        smooth: true,
        spy: true,
        offset: -50,
        containerId: "containerElement",
      })
    }
  }, [scrollTo])

  return (
    <HomeContainer>
      <Settings>
        <ButtonDarkLightTheme />
        <ButtonThemeChange />
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
