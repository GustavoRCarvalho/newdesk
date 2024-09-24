import styled from "styled-components"
import { Element } from "react-scroll"
import { Card } from "./Card"
import { useMemo } from "react"
import { useSelector } from "react-redux"

export const Favorites = () => {
  const homeData = useSelector((state) => state.homeData.environment)
  const favoritesData = useSelector((state) => state.homeData.favorites)
  const categoriesSearched = homeData?.categoriesSearched

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
