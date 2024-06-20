import { motion } from "framer-motion"
import { useState } from "react"
import { GiOpenBook } from "react-icons/gi"
import { IoIosArrowForward } from "react-icons/io"
import styled from "styled-components"
import { CardArticle } from "./CardArticle"

export const DropdownOption = ({ title, options }) => {
  const [articleOpen, setArticleOpen] = useState(false)

  return (
    <DropdownOptionContainer onMouseLeave={() => setArticleOpen(false)}>
      <DropText layout onMouseEnter={() => setArticleOpen(false)}>
        <GiOpenBook />
        <motion.span> {title}</motion.span>
      </DropText>
      <OptionButtonOpen
        $isvisible={options.length > 0}
        onMouseEnter={() => setArticleOpen(true)}
      />
      {articleOpen && options.length > 0 && <CardArticle options={options} />}
    </DropdownOptionContainer>
  )
}

const DropdownOptionContainer = styled(motion.div)`
  position: relative;
  font-size: 1.4em;

  color: var(--side-menu-item);

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 1.45em;

  margin-left: 1em;
  padding: 0.5em;
  gap: 1em;

  border-radius: 5px;

  cursor: pointer;

  &:hover {
    color: var(--side-menu-item-select);
    background-color: var(--side-menu-item-background-select);
  }

  svg {
    width: 1.45em;
    height: 1.45em;
  }

  transition: color 0.2s, background-color 0.2s;
`

const OptionButtonOpen = styled(IoIosArrowForward)`
  display: ${(props) => (props.$isvisible ? "block" : "none")};

  width: 1.3em;
  height: 1.3em;
`

const DropText = styled(motion.div)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  align-items: center;

  gap: 0.5em;
`
