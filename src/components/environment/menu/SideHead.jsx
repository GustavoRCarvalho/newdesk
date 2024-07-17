import styled from "styled-components"
import logo from "../../../assets/images/Logo.svg"
import { motion } from "framer-motion"
import { NoStyleLinkRouter } from "../../../router/NoStyleLinkRouter"
import { animateScroll } from "react-scroll"
import { useSelector } from "react-redux"

export const SideHeader = ({ isOpen }) => {
  const homeData = useSelector((state) => state.homeData.environment)
  const imageSrc = `data:image/png;base64,${homeData.environmentImage}`

  return (
    <Header
      $isopen={isOpen}
      onClick={() =>
        animateScroll.scrollToTop({ containerId: "containerElement" })
      }
    >
      <NoStyleLinkRouter to="/environment">
        {homeData.environmentImage ? (
          <Logo $isopen={isOpen} src={imageSrc} layout />
        ) : (
          <Logo $isopen={isOpen} src={logo} layout />
        )}
      </NoStyleLinkRouter>
      {isOpen && (
        <NoStyleLinkRouter to="/environment">
          <Title>{homeData.environmentName}</Title>
        </NoStyleLinkRouter>
      )}
    </Header>
  )
}

const Header = styled(motion.header)`
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
