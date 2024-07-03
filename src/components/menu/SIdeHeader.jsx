import styled from "styled-components"
import LogoImg from "../../assets/images/Logo.png"
import { motion } from "framer-motion"
import { NoStyleLinkRouter } from "../../router/NoStyleLinkRouter"

export const SideHeader = ({ isOpen }) => {
  return (
    <Header $isopen={isOpen}>
      <NoStyleLinkRouter to="/">
        <Logo $isopen={isOpen} src={LogoImg} layout />
      </NoStyleLinkRouter>
      {isOpen && (
        <NoStyleLinkRouter to="/">
          <Title>ZZ HELP</Title>
        </NoStyleLinkRouter>
      )}
    </Header>
  )
}

const Header = styled(motion.header)`
  padding: ${(props) => (props.$isopen ? "1em" : "0")};
  margin-bottom: ${(props) => (props.$isopen ? "0em" : "4em")};

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1em;
`

const Logo = styled(motion.img)`
  width: ${(props) => (props.$isopen ? "7em" : "3em")};
  height: ${(props) => (props.$isopen ? "7em" : "3em")};
`

const Title = styled(motion.h2)`
  width: max-content;

  font-size: 2.5em;
  font-weight: normal;

  margin: 0;

  color: var(--side-menu-color);
`
