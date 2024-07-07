import styled from "styled-components"
import LogoImg from "../../../assets/images/Logo.png"
import { motion } from "framer-motion"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"
import { animateScroll } from "react-scroll"

export const SideHeader = ({ isOpen }) => {
  return (
    <Header
      $isopen={isOpen}
      onClick={() =>
        animateScroll.scrollToTop({ containerId: "containerElement" })
      }
    >
      <NoStyleLinkRouter to="/environment">
        <Logo $isopen={isOpen} src={LogoImg} layout />
      </NoStyleLinkRouter>
      {isOpen && (
        <NoStyleLinkRouter to="/environment">
          <Title>ZZ HELP</Title>
        </NoStyleLinkRouter>
      )}
    </Header>
  )
}

const Header = styled(motion.header)`
  /* padding: ${(props) => (props.$isopen ? "1em" : "0")}; */
  /* margin-bottom: ${(props) => (props.$isopen ? "0em" : "4em")}; */

  min-height: 8em;

  display: flex;
  align-items: ${(props) => (props.$isopen ? "center" : "start")};
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
