import styled from "styled-components"
import { CardMenu } from "./menu/CardMenu"
import { SideMenu } from "./menu/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { resetCard } from "../../store/cardSlice"
import { Settings } from "./home/Settings"
import { useSearchParams } from "react-router-dom"
import { resetData, setFavorites, setInitial } from "../../store/homeDataSlice"
import { useEffect, useMemo } from "react"
// import { LoadingScreen } from "../../router/LoadingScreen"
import { useFetchData } from "../principal/driveApi/useFetchData"
import PageTitle from "../../router/PageTitle"
import { useCookies } from "react-cookie"
import { createAlertSucess } from "../../store/alertSlice"
import { LoadingScreen2 } from "../../router/LoadingScreen2"

export const Environment = ({ children }) => {
  const homeData = useSelector((state) => state.homeData.environment)
  const favoritesData = useSelector((state) => state.homeData.favorites)
  const [cookies, setCookies] = useCookies()
  const categoriesSearched = homeData?.categoriesSearched
  const titleEnvironment = homeData?.environmentName
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const environment = searchParams.get("environment")

  const environmentContent = useMemo(() => {
    const content = JSON.parse(localStorage.getItem([environment]))

    var nowTime = new Date()
    var expiresTime = new Date(content?.expires)

    if (expiresTime.getTime() - nowTime.getTime() < 0) {
      localStorage.removeItem([environment])
      return null
    }
    return content
  }, [environment])

  const { data, loading, progress, error } = useFetchData(
    environmentContent ? "" : environment
  )

  useEffect(() => {
    dispatch(resetData())
  }, [])

  useEffect(() => {
    if (environmentContent) {
      dispatch(setInitial(environmentContent))
      return
    }
    if (loading) return
    if (data) {
      var expiresTime = new Date()
      expiresTime.setTime(expiresTime.getTime() + 15 * 60 * 1000)

      const localContent = {
        ...data,
        expires: expiresTime,
      }
      try {
        localStorage.setItem(environment, JSON.stringify(localContent))
      } catch (e) {
        localStorage.clear()
      }

      dispatch(setInitial(localContent))
      dispatch(createAlertSucess("Carregado com sucesso!"))
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch, environment])

  useEffect(() => {
    if (favoritesData !== null) {
      return
    }
    if (cookies[`favorites${environment}`] === undefined) {
      return
    }
    dispatch(setFavorites(cookies[`favorites${environment}`]))
  }, [environment])

  useEffect(() => {
    if (!favoritesData) {
      return
    }
    setCookies(`favorites${environment}`, favoritesData, {
      path: "/",
      maxAge: 34560000,
    })
  }, [favoritesData])

  return !categoriesSearched ? (
    <LoadingScreen2 errorMessage={error} progress={progress} />
  ) : (
    <EnvironmentContainer>
      <PageTitle title={titleEnvironment + " - New Desk"} />
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
