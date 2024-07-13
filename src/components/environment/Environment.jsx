import styled from "styled-components"
import { CardMenu } from "./menu/CardMenu"
import { SideMenu } from "./menu/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { resetCard } from "../../store/cardSlice"
import { Settings } from "./home/Settings"
import { ButtonDarkLightTheme } from "./home/ButtonDarkLightTheme"
import { ButtonThemeChange } from "./home/ButtonThemeChange"
import { useLocation } from "react-router-dom"
import { readJsonFile } from "../../utils/googleDriveApi"
import { changeData } from "../../store/homeDataSlice"
import { useEffect } from "react"

export const Environment = ({ children }) => {
  const dispatch = useDispatch()

  const homeData = useSelector((state) => state.homeData)
  const isLoad = JSON.stringify(homeData) === "{}"
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const environment = params.get("environment")

  async function handleFetch() {
    // setLoading(true)
    try {
      const data = await readJsonFile(environment)
      dispatch(changeData(data))
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoad) {
      handleFetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoad])

  return (
    <EnvironmentContainer>
      <Settings>
        <ButtonDarkLightTheme />
        <ButtonThemeChange />
      </Settings>
      <SideMenu />
      <MainContainer
        id="containerElement"
        onMouseEnter={() => dispatch(resetCard())}
      >
        {children}
      </MainContainer>
      <CardMenu />
    </EnvironmentContainer>
  )
}

const EnvironmentContainer = styled.div`
  display: flex;
  width: 100%;

  color: var(--home-card-color);
  background-color: var(--side-menu-background);
`

const MainContainer = styled.main`
  background-color: var(--home-background);

  height: 100dvh;
  flex: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;

    border-radius: 1em;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`
