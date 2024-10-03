import { Element } from "react-scroll"
import { Card } from "./Card"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { SectionCardList } from "./SubCategory"
import { SectionContainer, SectionLine, SectionTitle } from "./Category"

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
