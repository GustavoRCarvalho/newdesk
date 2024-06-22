import styled from "styled-components"
import { SubCaregory } from "./SubCategory"

export const Category = ({ title, subCategories }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionLine />
      {subCategories.map((data, index) => (
        <SubCaregory key={data.title + index} {...data} />
      ))}
    </SectionContainer>
  )
}

const SectionContainer = styled.section`
  margin-block: 1em;
`

const SectionTitle = styled.h2`
  font-size: 1.4em;
  font-weight: normal;

  margin: 0 0 0 0.2em;
`

const SectionLine = styled.hr`
  width: 20%;

  margin: 0;
  border-width: 0;
  border-top: 1px solid black;

  margin-block: 0em 0.5em;
`
