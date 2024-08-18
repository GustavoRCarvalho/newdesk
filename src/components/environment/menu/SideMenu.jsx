import styled from "styled-components"
import { Search } from "./Search"
import { SideHeader } from "./SideHead"
import { LayoutGroup, motion } from "framer-motion"
import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { DropdownButton } from "./DropdownButton"
import { useSelector } from "react-redux"

export const SideMenu = () => {
  const homeData = useSelector((state) => state.homeData.environment)
  const categoriesSearched = homeData?.categoriesSearched
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdownLabel, setOpenDropdownLabel] = useState("")

  return (
    <LayoutGroup>
      <SideContainer layout>
        <CloseButton
          title="close"
          layout
          $isopen={isOpen}
          onClick={() => setIsOpen((state) => !state)}
        >
          <IoIosArrowBack />
        </CloseButton>
        <SideHeader isOpen={isOpen} />
        <Search isOpen={isOpen} setIsOpen={setIsOpen} />
        <OptionsContainer layout>
          <DropdownButton
            isOpen={isOpen}
            Icon={"IoIosHeart"}
            title={"Favoritos"}
            linkTitle={"Favoritos"}
            subCategories={[]}
            setOpenDropdownLabel={setOpenDropdownLabel}
            openDropdownLabel={openDropdownLabel}
          />
          {categoriesSearched &&
            categoriesSearched.map((data, index) => {
              return (
                <DropdownButton
                  key={data.title}
                  isOpen={isOpen}
                  setOpenDropdownLabel={setOpenDropdownLabel}
                  openDropdownLabel={openDropdownLabel}
                  {...data}
                />
              )
            })}
        </OptionsContainer>
      </SideContainer>
    </LayoutGroup>
  )
}

const OptionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;

  gap: 0.5em;

  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;

    border-radius: 1em;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2em;
  right: -1em;
  background-color: #fff;

  display: flex;
  align-items: center;

  width: 2em;
  height: 2em;

  border: none;
  border-radius: 50%;
  padding: 0;

  box-shadow: 2px 2px 10px #00000087;

  svg {
    padding-left: ${(props) => (props.$isopen ? "0.2em" : "0")};
    padding-right: ${(props) => (props.$isopen ? "0" : "0.25em")};
    width: 1.5em;
    height: 1.5em;

    transform: ${(props) => (props.$isopen ? "none" : "rotateZ(180deg)")};
    transition: transform 0.5s;
  }

  cursor: pointer;
`

const SideContainer = styled(motion.div)`
  position: relative;
  background-color: var(--side-menu-background);
  height: calc(100dvh - 2em);
  min-width: min-content;

  padding: 1em;
  display: grid;
  align-content: start;
  gap: 0.5em;

  user-select: none;

  z-index: 1;
`
