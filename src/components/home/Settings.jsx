import { motion } from "framer-motion"
import { useState } from "react"
import { HiOutlineDotsHorizontal, HiOutlineX } from "react-icons/hi"
import styled from "styled-components"

export const Settings = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SettingsButton
        $isopen={isOpen}
        onClick={() => setIsOpen((state) => !state)}
      >
        <HiOutlineDotsHorizontal />
      </SettingsButton>
      <SettingsContainer
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            right: "2em",
            top: "1em",
            minWidth: "13em",
            width: "auto",
            height: "auto",
            padding: "1em",
            paddingTop: "3em",
          },
          closed: {
            right: "3em",
            top: "2em",
            width: "0em",
            height: "0em",
            padding: "0px",
          },
        }}
      >
        {isOpen && <ButtonClose onClick={() => setIsOpen(false)} />}
        {children}
      </SettingsContainer>
    </>
  )
}

const ButtonClose = styled(HiOutlineX)`
  position: absolute;

  top: 1em;
  right: 1em;

  width: 2em;
  height: 2em;

  cursor: pointer;
`

const SettingsContainer = styled(motion.div)`
  position: fixed;
  background-color: var(--home-card-background);

  display: flex;
  flex-direction: column;
  align-items: start;

  border-radius: 2em;

  box-shadow: 0em 0em 1em 0em #0000004b;
  overflow: hidden;

  z-index: 1;
`

const SettingsButton = styled(motion.button)`
  position: fixed;
  display: ${(props) => (props.$isopen ? "none" : "flex")};
  align-items: center;
  justify-content: center;

  right: 2em;
  top: 1em;

  background-color: transparent;

  border: none;
  border-radius: 2em;

  padding: 0.5em;

  &:hover {
    background-color: var(--home-card-background);
  }

  cursor: pointer;

  svg {
    color: var(--home-card-color);

    width: 2em;
    height: 2em;
  }
`
