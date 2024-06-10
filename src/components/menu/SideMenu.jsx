import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io"
import { Search } from "./Search"
import { SideHeader } from "./SIdeHeader"
import { LayoutGroup, motion } from "framer-motion"
import { useState } from "react"
import { Heart } from "../../assets/icons/Heart"
import { Box } from "../../assets/icons/Box"
import { IoIosArrowBack } from "react-icons/io"

const menuOptions = [
  {
    title: "Favoritos",
    Icon: Heart,
    options: [],
  },
  {
    title: "Encantamento",
    Icon: Box,
    options: [],
  },
]

export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <LayoutGroup>
      <SideContainer isOpen={isOpen} layout>
        <CloseButton
          layout
          isOpen={isOpen}
          onClick={() => setIsOpen((state) => !state)}
        >
          {/* {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />} */}
          <IoIosArrowBack />
        </CloseButton>
        <SideHeader isOpen={isOpen} />
        <Search isOpen={isOpen} />
        {menuOptions.map(({ title, Icon }) => {
          return isOpen ? (
            <DropdownButton layout>
              <DropText layout>
                <Icon />
                <motion.span> {title}</motion.span>
              </DropText>
              <ButtonOpen />
            </DropdownButton>
          ) : (
            <DropdownButtonIcon layout>
              <Icon />
            </DropdownButtonIcon>
          )
        })}
      </SideContainer>
    </LayoutGroup>
  )
}

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2em;
  right: -1em;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 2em;
  height: 2em;

  border: none;
  border-radius: 50%;
  padding: 0;

  box-shadow: 2px 2px 10px #00000087;

  svg {
    width: 1.5em;
    height: 1.5em;

    transform: ${(props) => (props.isOpen ? "none" : "rotateZ(180deg)")};
    transition: transform 0.5s;
  }

  cursor: pointer;
`

const SideContainer = styled(motion.div)`
  position: relative;
  background-color: var(--side-menu-background);
  height: calc(100dvh - 2em);
  width: ${(props) => (props.isOpen ? "400px" : "min-content")};

  padding: 1em;
  display: grid;
  align-content: start;
  gap: 0.5em;
`

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

const DropdownButton = styled(motion.div)`
  font-size: 1.4em;

  color: var(--side-menu-item);

  display: flex;
  justify-content: space-between;
  align-items: center;

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

const DropdownButtonIcon = styled(motion.div)`
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
