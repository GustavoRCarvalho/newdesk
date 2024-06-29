import { motion } from "framer-motion"
import styled from "styled-components"
import { IoMdSearch } from "react-icons/io"
import { search } from "../../utils/functions"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { changeData } from "../../store/homeDataSlice"

export const Search = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const searchInputRef = useRef(null)

  return isOpen ? (
    <SearchContainer
      ref={searchInputRef}
      onChange={(e) => {
        dispatch(changeData(search(e.target.value)))
      }}
      placeholder="Pesquisar"
      layout
    ></SearchContainer>
  ) : (
    <SearchIconContainer
      layout
      onClick={() => {
        setIsOpen(true)
        setTimeout(() => {
          searchInputRef.current.focus()
        }, 0)
      }}
    >
      <IoMdSearch />
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
