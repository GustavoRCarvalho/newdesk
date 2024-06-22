import styled from "styled-components"
import { Card } from "./Card"
import { MdOutlineLibraryBooks } from "react-icons/md"
import { Element } from "react-scroll"

export const SubCaregory = ({ categoryTitle, title, articles }) => {
  return (
    <SubCategoriesContainer name={categoryTitle + title}>
      <SectionSubtitle>
        <MdOutlineLibraryBooks /> {title} ({articles.length})
      </SectionSubtitle>
      <SectionCardList>
        {articles.map((data, index) => (
          <Card key={data.title + index} {...data} />
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

const SectionCardList = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 1em;

  margin-left: 1.2em;
`
