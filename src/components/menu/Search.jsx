import { motion } from "framer-motion"
import styled from "styled-components"
import { SearchIconBase } from "../../assets/icons/SearchIconBase"
import { onEnterSearch } from "../../utils/SearchFunction"

export const Search = ({ isOpen }) => {
  return isOpen ? (
    <SearchContainer
      onKeyPress={onEnterSearch}
      placeholder="Pesquisar"
      layout
    ></SearchContainer>
  ) : (
    <SearchIconContainer layout>
      <SearchIconBase />
    </SearchIconContainer>
  )
}

const SearchContainer = styled(motion.input)`
  background-color: #fff;

  padding: 0.85em 1em;

  border-radius: 5px;
  border: none;

  outline: none;
`

const SearchIconContainer = styled(motion.div)`
  padding: 0.7em;
  width: 2em;
  height: 2em;
  border-radius: 5px;

  &:hover {
    background-color: var(--side-menu-item-background-select);
  }

  svg {
    width: 2em;
    height: 2em;

    color: var(--side-menu-item);
  }

  cursor: pointer;
`
