import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import styled from "styled-components"
import { DropdownOption } from "./DropdownOption"

export const DropdownButton = ({ isOpen, Icon, title, options }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return isOpen ? (
    <DropdownContainer>
      <Dropdown layout>
        <DropText layout>
          <Icon />
          <motion.span> {title}</motion.span>
        </DropText>
        <ButtonOpen onClick={() => setDropdownOpen((state) => !state)} />
      </Dropdown>
      {dropdownOpen &&
        options.map((data, index) => (
          <DropdownOption key={data.title + index} {...data}></DropdownOption>
        ))}
    </DropdownContainer>
  ) : (
    <DropdownIcon layout>
      <Icon />
    </DropdownIcon>
  )
}

const DropdownContainer = styled(AnimatePresence)``

const ButtonOpen = styled(IoIosArrowDown)`
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

const Dropdown = styled(motion.div)`
  font-size: 1.4em;

  color: var(--side-menu-item);

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
