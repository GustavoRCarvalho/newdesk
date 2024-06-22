import styled from "styled-components"
import { Search } from "./Search"
import { SideHeader } from "./SideHeader"
import { LayoutGroup, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosHeart } from "react-icons/io"
import { DropdownButton } from "./DropdownButton"
import { data } from "../../assets/data"

export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [delayComplete, setDelayComplete] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setDelayComplete(false)
      const timer = setTimeout(() => {
        setDelayComplete(true)
      }, 400)

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
        <DropdownButton
          isOpen={isOpen}
          Icon={IoIosHeart}
          title={"Favoritos"}
          subCategories={[]}
        />
        {data.map((data, index) => {
          return (
            <DropdownButton
              key={data.title + index}
              isOpen={isOpen}
              {...data}
            />
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
