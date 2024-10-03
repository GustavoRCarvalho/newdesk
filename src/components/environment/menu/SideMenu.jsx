import styled from "styled-components"
import { Search } from "./Search"
import { SideHeader } from "./SideHead"
import { LayoutGroup, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { DropdownButton } from "./DropdownButton"
import { useSelector } from "react-redux"
import useWindowDimensions from "../../../utils/functions"
import { GoX } from "react-icons/go"
import { CiMenuBurger } from "react-icons/ci"

export const SideMenu = () => {
  const homeData = useSelector((state) => state.homeData.environment)
  const categoriesSearched = homeData?.categoriesSearched
  const [isOpen, setIsOpen] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [openDropdownLabel, setOpenDropdownLabel] = useState("")
  const { isDesktop } = useWindowDimensions()

  useEffect(() => {
    setIsOpen(true)
  }, [isDesktop])

  return (
    <LayoutGroup>
      <BurguerIcon onClick={() => setIsShow(true)} />
      <SideContainer layout $isDesktop={isDesktop} $isShow={isShow}>
        {isDesktop ? (
          <CloseButton
            title="close"
            layout
            $isopen={isOpen}
            onClick={() => setIsOpen((state) => !state)}
          >
            <IoIosArrowBack />
          </CloseButton>
        ) : (
          <CloseXButton>
            <GoX onClick={() => setIsShow(false)} />
          </CloseXButton>
        )}
        <SideHeader isOpen={isOpen} />
        <Search isOpen={isOpen} setIsOpen={setIsOpen} />
        <OptionsContainer layout>
          <DropdownButton
            isOpen={isOpen}
            Icon={"GoHeartFill"}
            title={"Favoritos"}
            linkTitle={"Favorites"}
            subCategories={[]}
            setOpenDropdownLabel={setOpenDropdownLabel}
            openDropdownLabel={openDropdownLabel}
          />
          {categoriesSearched &&
            categoriesSearched.map((data) => {
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

const BurguerIcon = styled(CiMenuBurger)`
  position: fixed;
  top: 1em;
  left: 1em;

  width: 1.5em;
  height: 1.5em;

  z-index: 1;
`

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

const CloseXButton = styled(motion.button)`
  position: absolute;
  top: 1em;
  left: 1em;
  background-color: transparent;

  display: flex;
  align-items: center;

  width: 2em;
  height: 2em;

  border: none;
  padding: 0;

  svg {
    width: 2em;
    height: 2em;

    color: #fff;
  }

  cursor: pointer;
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
  position: ${(props) => (props.$isDesktop ? "relative" : "fixed")};
  background-color: var(--side-menu-background);
  height: calc(100dvh - 2em);
  min-width: ${(props) =>
    props.$isDesktop ? "min-content" : "calc(90% - 2em)"};

  padding: 1em;
  display: grid;
  align-content: start;
  gap: 0.5em;

  user-select: none;

  left: ${(props) => (props.$isDesktop ? 0 : props.$isShow ? 0 : "-150%")};

  z-index: 1;
`
