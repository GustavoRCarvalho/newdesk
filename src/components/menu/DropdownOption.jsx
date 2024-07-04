import { motion } from "framer-motion"
import { MdOutlineLibraryBooks } from "react-icons/md"
import { IoIosArrowForward } from "react-icons/io"
import styled from "styled-components"
import { NoStyleLinkScroll } from "../../router/NoStyleLinkScroll"
import { useDispatch } from "react-redux"
import { changeCard, resetCard } from "../../store/cardSlice"
import { useRef } from "react"

export const DropdownOption = ({
  categoryTitle,
  dropdownOpen,
  title,
  articles,
}) => {
  const refDownIcon = useRef(null)
  const dispatch = useDispatch()

  return (
    <DropdownOptionContainer
      layout={"size"}
      $isopen={dropdownOpen}
      ref={refDownIcon}
    >
      <NoStyleLinkScroll to={categoryTitle + title}>
        <DropText layout={"size"} onMouseEnter={() => dispatch(resetCard())}>
          <MdOutlineLibraryBooks />
          <motion.span>{title}</motion.span>
        </DropText>
      </NoStyleLinkScroll>
      <OptionButtonOpen
        $isvisible={articles.length > 0}
        onMouseEnter={() => {
          var rect = refDownIcon.current.getBoundingClientRect()
          var x = rect.x + rect.width
          var y = rect.y + rect.height - 50
          dispatch(
            changeCard({
              title: title,
              options: articles,
              x: x,
              y: y,
              isArticle: true,
            })
          )
        }}
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
