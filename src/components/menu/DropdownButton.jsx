import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import styled from "styled-components"
import { DropdownOption } from "./DropdownOption"
import { CardOption } from "./CardOption"

export const DropdownButton = ({ isOpen, Icon, title, options }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isHover, setIsHover] = useState()

  return isOpen ? (
    <DropdownContainer>
      <Dropdown layout $isopen={dropdownOpen}>
        <DropText layout>
          <Icon />
          <motion.span> {title}</motion.span>
        </DropText>
        <ButtonOpen
          $isvisible={options.length > 0}
          $isopen={dropdownOpen}
          onClick={() => setDropdownOpen((state) => !state)}
        />
      </Dropdown>
      {dropdownOpen &&
        options.map((data, index) => (
          <DropdownOption key={data.title + index} {...data}></DropdownOption>
        ))}
    </DropdownContainer>
  ) : (
    <DropdownIcon
      layout
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Icon />
      {isHover && options.length !== 0 && <CardOption options={options} />}
    </DropdownIcon>
  )
}

const DropdownContainer = styled(AnimatePresence)``

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
  position: relative;
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
