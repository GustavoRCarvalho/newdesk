import styled from "styled-components"
import { Search } from "./Search"
import { SideHeader } from "./SideHeader"
import { LayoutGroup, motion } from "framer-motion"
import { useState } from "react"
import { IoIosArrowBack, IoIosHeart } from "react-icons/io"
import { FaBoxOpen } from "react-icons/fa6"
import { GiShop, GiHighHeel } from "react-icons/gi"
import { DropdownButton } from "./DropdownButton"

const menuOptions = [
  {
    title: "Favoritos",
    Icon: IoIosHeart,
    options: [
      {
        title: "Favoritos",
        options: [
          {
            title: "Como realizar um Case?",
          },
          {
            title: "O que é uma Retratação?",
          },
          {
            title: "Consertos",
          },
        ],
      },
      {
        title: "Encantamento",
        options: [],
      },
      {
        title: "Integração de Canais",
        options: [],
      },
      {
        title: "Produtos",
        options: [],
      },
    ],
  },
  {
    title: "Encantamento",
    Icon: FaBoxOpen,
    options: [],
  },
  {
    title: "Integração de Canais",
    Icon: GiShop,
    options: [],
  },
  {
    title: "Produtos",
    Icon: GiHighHeel,
    options: [],
  },
]

export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <LayoutGroup>
      <SideContainer $isopen={isOpen} layout>
        <CloseButton
          layout
          $isopen={isOpen}
          onClick={() => setIsOpen((state) => !state)}
        >
          <IoIosArrowBack />
        </CloseButton>
        <SideHeader isOpen={isOpen} />
        <Search isOpen={isOpen} />
        {menuOptions.map((data, index) => {
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

    transform: ${(props) => (props.$isopen ? "none" : "rotateZ(180deg)")};
    transition: transform 0.5s;
  }

  cursor: pointer;
`

const SideContainer = styled(motion.div)`
  position: relative;
  background-color: var(--side-menu-background);
  height: calc(100dvh - 2em);
  width: ${(props) => (props.$isopen ? "400px" : "min-content")};

  padding: 1em;
  display: grid;
  align-content: start;
  gap: 0.5em;

  user-select: none;
`
