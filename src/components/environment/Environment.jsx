import styled from "styled-components"
import { CardMenu } from "./menu/CardMenu"
import { SideMenu } from "./menu/SideMenu"
import { useDispatch, useSelector } from "react-redux"
import { resetCard } from "../../store/cardSlice"
import { Settings } from "./home/Settings"
import { useSearchParams } from "react-router-dom"
import { resetData, setInitial } from "../../store/homeDataSlice"
import { useEffect, useMemo } from "react"
import { LoadingScreen } from "../../router/LoadingScreen"
import { useFetchData } from "../principal/driveApi/useFetchData"

export const Environment = ({ children }) => {
  const homeData = useSelector((state) => state.homeData.environment)
  const categoriesSearched = homeData?.categoriesSearched
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const environment = searchParams.get("environment")

  const environmentContent = useMemo(() => {
    const content = JSON.parse(sessionStorage.getItem([environment]))

    var nowTime = new Date()
    var expiresTime = new Date(content?.expires)

    if (expiresTime.getTime() - nowTime.getTime() < 0) {
      sessionStorage.removeItem([environment])
      return null
    }
    return content
  }, [environment])

  const { data, loading, error } = useFetchData(
    environmentContent ? "" : environment
  )

  useEffect(() => {
    dispatch(resetData())
  }, [])

  useEffect(() => {
    if (environmentContent) {
      const obj = {
        ...environmentContent,
        categoriesSearched: environmentContent.categories,
      }
      dispatch(setInitial(obj))
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
        sessionStorage.setItem(environment, JSON.stringify(localContent))
      } catch (e) {
        sessionStorage.clear()
      }

      const content = {
        ...localContent,
        categoriesSearched: data.categories,
      }
      dispatch(setInitial(content))

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
