import styled from "styled-components"
import { SubCaregory } from "./SubCategory"
import { Element } from "react-scroll"

export const Category = ({ title, subCategories }) => {
  return (
    <Element name={title}>
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        <SectionLine />
        {subCategories.map((data, index) => (
          <SubCaregory
            categoryTitle={title}
            key={data.title + index}
            {...data}
          />
        ))}
      </SectionContainer>
    </Element>
  )
}

const SectionContainer = styled.section`
  margin-block: 1em;
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
