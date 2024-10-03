import styled from "styled-components"
import { Card } from "./Card"
import { MdOutlineLibraryBooks } from "react-icons/md"
import { Element } from "react-scroll"

export const SubCategory = ({
  linkTitleCategory,
  title,
  linkTitle,
  articles,
}) => {
  return (
    <SubCategoriesContainer name={linkTitleCategory + linkTitle}>
      <SectionSubtitle>
        <MdOutlineLibraryBooks /> {title} ({articles.length})
      </SectionSubtitle>
      <SectionCardList>
        {articles.map((data) => (
          <Card
            key={data.id}
            linkTitleCategory={linkTitleCategory}
            linkTitleSubCategory={linkTitle}
            {...data}
          />
        ))}
      </SectionCardList>
    </SubCategoriesContainer>
  )
}

const SectionSubtitle = styled.h3`
  font-size: 1.4em;
  font-weight: normal;

  margin: 0 0 0.4em 0.6em;

  display: flex;
  align-items: center;
  gap: 0.3em;

  svg {
    width: 1.3em;
    height: 1.3em;
  }
`

const SubCategoriesContainer = styled(Element)`
  margin-bottom: 1em;
`

export const SectionCardList = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 1em;

  margin-left: 1.2em;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`
