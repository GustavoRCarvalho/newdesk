import { motion } from "framer-motion"
import { useState } from "react"
import { MdOutlineLibraryBooks } from "react-icons/md"
import { IoIosArrowForward } from "react-icons/io"
import styled from "styled-components"
import { CardArticle } from "./CardArticle"

export const DropdownOption = ({ dropdownOpen, title, articles }) => {
  const [articleOpen, setArticleOpen] = useState(false)

  return (
    <DropdownOptionContainer
      layout={"size"}
      $isopen={dropdownOpen}
      onMouseLeave={() => setArticleOpen(false)}
    >
      <DropText layout={"size"} onMouseEnter={() => setArticleOpen(false)}>
        <MdOutlineLibraryBooks />
        <motion.span>{title}</motion.span>
      </DropText>
      <OptionButtonOpen
        $isvisible={articles.length > 0}
        onMouseEnter={() => setArticleOpen(true)}
      />
      <CardArticle
        isopen={articleOpen && articles.length > 0}
        articles={articles}
      />
    </DropdownOptionContainer>
  )
}

const DropdownOptionContainer = styled(motion.div)`
  position: relative;
  font-size: 1.4em;

  color: var(--side-menu-item);

  display: ${(props) => (props.$isopen ? "flex" : "none")};
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
