import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import styled from "styled-components"
import { DropdownOption } from "./DropdownOption"
import { changeCard, resetCard } from "../../../store/cardSlice"
import { useDispatch } from "react-redux"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"
import { DynaminicIcon } from "../../../router/DynamicIcon"

export const DropdownButton = ({
  isOpen,
  Icon,
  title,
  linkTitle,
  subCategories,
  openDropdownLabel,
  setOpenDropdownLabel,
}) => {
  const refSideIcon = useRef(null)
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (openDropdownLabel !== "" && openDropdownLabel !== title) {
      setDropdownOpen(false)
    }
  }, [openDropdownLabel, title])

  return isOpen ? (
    <DropdownContainer layout>
      <Dropdown
        layout
        $isopen={dropdownOpen}
        onMouseEnter={() => dispatch(resetCard())}
      >
        <NoStyleLinkRouter to="/environment" state={{ scrollTo: linkTitle }}>
          <DropText>
            <DynaminicIcon iconName={Icon} />
            <motion.span>{title}</motion.span>
          </DropText>
        </NoStyleLinkRouter>
        <ButtonOpen
          $isvisible={subCategories.length > 0}
          $isopen={dropdownOpen}
          onClick={() => {
            setOpenDropdownLabel(title)
            setDropdownOpen((state) => !state)
          }}
        />
      </Dropdown>
      {subCategories.map((data, index) => (
        <DropdownOption
          categoryTitle={title}
          categoryLinkTitle={linkTitle}
          dropdownOpen={dropdownOpen}
          key={data.title + index}
          {...data}
        ></DropdownOption>
      ))}
    </DropdownContainer>
  ) : (
    <NoStyleLinkRouter
      onMouseEnter={() => {
        var rect = refSideIcon.current.getBoundingClientRect()
        var x = rect.x + rect.width
        var y = rect.y + rect.height - 50
        dispatch(
          changeCard({
            title: title,
            linkTitle: linkTitle,
            categoryTitle: title,
            categoryLinkTitle: linkTitle,
            options: subCategories,
            x: x,
            y: y,
            isArticle: false,
          })
        )
      }}
      to="/environment"
      state={{ scrollTo: linkTitle }}
    >
      <DropdownIcon ref={refSideIcon} layout>
        <DynaminicIcon iconName={Icon} />
      </DropdownIcon>
    </NoStyleLinkRouter>
  )
}

const DropdownContainer = styled(motion.div)`
  position: relative;
`

const ButtonOpen = styled(IoIosArrowDown)`
  display: ${(props) => (props.$isvisible ? "block" : "none")};
  width: 1.3em;
  height: 1.3em;

  transform: ${(props) => (props.$isopen ? "rotateZ(180deg)" : "none")};
  transition: transform 0.5s;
`

const DropText = styled(motion.div)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  align-items: center;

  gap: 0.5em;
  span {
    width: 10em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Dropdown = styled(motion.div)`
  font-size: 1.4em;

  color: ${(props) =>
    props.$isopen ? "var(--side-menu-item-select)" : "var(--side-menu-item)"};

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 1.45em;
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

const DropdownIcon = styled(motion.div)`
  font-size: 1.4em;

  color: var(--side-menu-item);

  width: 1.45em;
  height: 1.45em;
  padding: 0.5em;

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
