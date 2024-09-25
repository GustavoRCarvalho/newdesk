import styled from "styled-components"
import { Category } from "./Category"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { scroller } from "react-scroll"
import { Favorites } from "./Favorites"

export const Home = () => {
  const homeData = useSelector((state) => state.homeData.environment)
  const categoriesSearched = homeData?.categoriesSearched
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
      <Favorites />
      {categoriesSearched &&
        categoriesSearched.map((data, index) => (
          <Category key={data.title + index} {...data} />
        ))}
      {categoriesSearched?.length === 0 && (
        <EmptySearch>Nenhum artigo foi encontrado!</EmptySearch>
      )}
    </HomeContainer>
  )
}

const EmptySearch = styled.p`
  text-align: center;
`

const HomeContainer = styled.div`
  padding: 2em;
  width: calc(100% - 4em);
`
