import styled from "styled-components"
import { Element } from "react-scroll"
import { Card } from "./Card"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import { setFavorites } from "../../../store/homeDataSlice"
import { useSearchParams } from "react-router-dom"

export const Favorites = () => {
  const dispatch = useDispatch()
  const [cookies, setCookies] = useCookies()
  const homeData = useSelector((state) => state.homeData.environment)
  const favoritesData = useSelector((state) => state.homeData.favorites)
  const categoriesSearched = homeData?.categoriesSearched
  const [searchParams] = useSearchParams()
  const environment = searchParams.get("environment")

  const favorites = useMemo(() => {
    const favorites = []
    if (favoritesData) {
      categoriesSearched?.map(
        ({ linkTitle: linkTitleCategory, subCategories }) => {
          subCategories?.map(
            ({ linkTitle: linkTitleSubCategory, articles }) => {
              articles?.map((article) => {
                if (favoritesData.includes(article.id)) {
                  favorites.push({
                    id: article.id,
                    title: article.title,
                    date: article.date,
                    linkTitle: article.linkTitle,
                    linkTitleCategory: linkTitleCategory,
                    linkTitleSubCategory: linkTitleSubCategory,
                  })
                }
              })
            }
          )
        }
      )
    }
    return favorites
  }, [favoritesData, categoriesSearched])

  useEffect(() => {
    if (!cookies[`favorites${environment}`]) {
      return
    }
    dispatch(setFavorites(cookies[`favorites${environment}`]))
  }, [])

  useEffect(() => {
    if (!favoritesData) {
      return
    }
    setCookies(`favorites${environment}`, favoritesData)
  }, [favoritesData])

  if (!favorites || favorites.length === 0) {
    return null
  }

  return (
    <Element name={"Favorites"}>
      <SectionContainer>
        <SectionTitle>Favoritos</SectionTitle>
        <SectionLine />
        <SectionCardList>
          {favorites.map((data) => (
            <Card key={data?.id} {...data} />
          ))}
        </SectionCardList>
      </SectionContainer>
    </Element>
  )
}

const SectionContainer = styled.section`
  margin-block: 1em;
`
const SectionCardList = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 1em;

  margin-left: 1.2em;
`

const SectionTitle = styled.h2`
  font-size: 1.6em;
  font-weight: 500;

  margin: 0 0 0 0.2em;
`

const SectionLine = styled.hr`
  width: 20%;

  margin: 0 0 0.5em 0.35em;
  border-width: 0;
  border-top: 1px solid var(--home-card-color);
`
