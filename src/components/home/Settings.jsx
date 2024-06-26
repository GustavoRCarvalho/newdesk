import { motion } from "framer-motion"
import { useState } from "react"
import { HiOutlineDotsHorizontal, HiOutlineX } from "react-icons/hi"
import styled from "styled-components"

export const Settings = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
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
          right: "2em",
          top: "1em",
          width: "2em",
          height: "2em",
          padding: "10px",
        },
      }}
    >
      <SettingsButton
        $isopen={isOpen}
        onClick={() => setIsOpen((state) => !state)}
      >
        <HiOutlineX />
        <HiOutlineDotsHorizontal />
      </SettingsButton>
      {isOpen && children}
    </SettingsContainer>
  )
}
const SettingsContainer = styled(motion.div)`
  position: fixed;
  background-color: var(--home-card-background);

  display: flex;
  flex-direction: column;
  align-items: start;

  border-radius: 2em;

  box-shadow: 0em 0em 1em 0em #0000004b;

  z-index: 1;
`

const SettingsButton = styled(motion.button)`
  position: fixed;
  right: 2.3em;
  top: 3.1em;

  transform: translate(-50%, -50%);
  background-color: transparent;

  border: none;
  border-radius: 2em;

  width: 2em;
  height: 2em;
  padding: 10px;

  padding: ${(props) => (props.$isopen ? "15px" : "10px")};

  &:hover {
    background-color: ${(props) =>
      props.$isopen ? "transparent" : "var(--home-card-background);"};
  }

  cursor: pointer;

  svg {
    color: var(--home-card-color);
    position: absolute;

    width: 100%;
    height: 100%;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }
  svg:nth-child(1) {
    visibility: ${(props) => (props.$isopen ? "visible" : "hidden")};
  }
  svg:nth-child(2) {
    visibility: ${(props) => (props.$isopen ? "hidden" : "visible")};
  }

  /* z-index: 2; */
`
