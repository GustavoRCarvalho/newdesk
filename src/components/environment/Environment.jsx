import styled from "styled-components"
import { CardMenu } from "./menu/CardMenu"
import { SideMenu } from "./menu/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { resetCard } from "../../store/cardSlice"
import { Settings } from "./home/Settings"
import { useLocation } from "react-router-dom"
import { setInitial } from "../../store/homeDataSlice"
import { useEffect } from "react"
import { LoadingScreen } from "../../router/LoadingScreen"
import { useFetchData } from "../principal/driveApi/useFetchData"
import { useCookies } from "react-cookie"

export const Environment = ({ children }) => {
  const homeData = useSelector((state) => state.homeData.environment)
  const categoriesSearched = homeData?.categoriesSearched
  const dispatch = useDispatch()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const environment = params.get("environment")

  const [cookies, setCookies] = useCookies([environment])

  const { data, loading, error } = useFetchData(
    cookies[environment] ? "" : environment
  )

  useEffect(() => {
    if (cookies[environment]) {
      const obj = {
        ...cookies[environment],
        categoriesSearched: cookies[environment].categories,
      }
      dispatch(setInitial(obj))
      return
    }
    if (loading) return
    if (data) {
      const obj = { ...data, categoriesSearched: data.categories }
      dispatch(setInitial(obj))

      const expires = new Date()
      expires.setMinutes(expires.getMinutes() + 10)
      setCookies([environment], obj, { path: "/", expires })
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch, environment])

  return !categoriesSearched ? (
    <LoadingScreen errorMessage={error} />
  ) : (
    <EnvironmentContainer>
      <Settings />
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
