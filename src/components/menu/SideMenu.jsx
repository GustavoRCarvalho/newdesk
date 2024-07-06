import styled from "styled-components"
import { Search } from "./Search"
import { SideHeader } from "./SideHead"
import { LayoutGroup, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosHeart } from "react-icons/io"
import { DropdownButton } from "./DropdownButton"
import { useSelector } from "react-redux"

export const SideMenu = () => {
  const homeData = useSelector((state) => state.homeData.data)
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdownLabel, setOpenDropdownLabel] = useState("")
  const [delayComplete, setDelayComplete] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setDelayComplete(false)
      const timer = setTimeout(() => {
        setDelayComplete(true)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <LayoutGroup>
      <SideContainer $delaycomplete={delayComplete} $isopen={isOpen} layout>
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
        <OptionsContainer>
          <DropdownButton
            isOpen={isOpen}
            Icon={IoIosHeart}
            title={"Favoritos"}
            subCategories={[]}
            setOpenDropdownLabel={setOpenDropdownLabel}
            openDropdownLabel={openDropdownLabel}
          />
          {homeData.map((data, index) => {
            return (
              <DropdownButton
                key={data.title + index}
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

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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

  overflow: ${(props) => (props.$delaycomplete ? "" : "hidden")};
  z-index: 1;
`
