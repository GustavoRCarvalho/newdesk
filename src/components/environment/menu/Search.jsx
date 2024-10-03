import { motion } from "framer-motion"
import styled from "styled-components"
import { IoMdSearch } from "react-icons/io"
import { search } from "../../../utils/functions"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchData } from "../../../store/homeDataSlice"

export const Search = ({ isOpen, setIsOpen }) => {
  const homeData = useSelector((state) => state.homeData.environment)
  const dispatch = useDispatch()
  const searchInputRef = useRef(null)

  return (
    <SearchContainer layout>
      {isOpen ? (
        <SearchInput
          ref={searchInputRef}
          onChange={(e) => {
            dispatch(
              searchData(
                search(e, homeData?.categories, homeData?.categoriesSearched)
              )
            )
          }}
          placeholder="Pesquisar"
        />
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
      )}
    </SearchContainer>
  )
}

const SearchInput = styled.input`
  background-color: #fff;
  width: calc(100% - 2em);
  height: 1em;

  padding: 0.85em 1em;

  border-radius: 5px;
  border: none;

  outline: none;
`

const SearchContainer = styled(motion.div)`
  width: 100%;
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
