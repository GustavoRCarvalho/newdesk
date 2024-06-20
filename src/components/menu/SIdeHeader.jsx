import styled from "styled-components"
import LogoImg from "../../assets/images/Logo.svg"
import { motion } from "framer-motion"

export const SideHeader = ({ isOpen }) => {
  return (
    <Header $isopen={isOpen}>
      <Logo $isopen={isOpen} src={LogoImg} layout />
      {isOpen && <Title>ZZ HELP</Title>}
    </Header>
  )
}

const Header = styled(motion.div)`
  padding: ${(props) => (props.$isopen ? "1em" : "0")};

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1em;
`

const Logo = styled(motion.img)`
  width: ${(props) => (props.$isopen ? "6em" : "3em")};
  height: ${(props) => (props.$isopen ? "6em" : "3em")};

  margin-bottom: ${(props) => (props.$isopen ? "0em" : "4em")};
`

const Title = styled(motion.h2)`
  width: max-content;

  font-size: 2.5em;
  font-weight: normal;

  margin: 0;

  color: var(--side-menu-color);
`
