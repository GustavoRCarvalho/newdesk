import { useDispatch } from "react-redux"
import {
  toggleEnvironmentId,
  toggleLogin,
  toggleManipulate,
} from "../../store/modalSlice"
import useWindowDimensions from "../../utils/functions"
import styled from "styled-components"
import CatFace from "../../assets/images/CatFaceWhite.png"
import { BiSearch } from "react-icons/bi"
import { useEffect, useState } from "react"
import { GoX } from "react-icons/go"
import { CiMenuBurger } from "react-icons/ci"
import { useCookies } from "react-cookie"

export const PrincipalHeader = () => {
  const dispatch = useDispatch()
  const [cookies, setCookies] = useCookies()
  const [navMenuOpen, setNavMenuOpen] = useState(false)
  const { isDesktop } = useWindowDimensions()

  function toggleOpen() {
    setNavMenuOpen((state) => !state)
  }

  useEffect(() => {
    setNavMenuOpen(false)
  }, [isDesktop])

  return isDesktop ? (
    <HeaderContainer>
      <Logo src={CatFace} />
      <nav>
        <button
          onClick={() => {
            if (cookies.GISToken) {
              dispatch(toggleManipulate())
            } else {
              dispatch(toggleLogin())
            }
          }}
        >
          Meus Ambientes
        </button>
        <MenuButton onClick={() => dispatch(toggleEnvironmentId())}>
          <BiSearch /> Acessar Ambiente
        </MenuButton>
      </nav>
      <button
        onClick={() => {
          sessionStorage.clear()
        }}
      >
        clear
      </button>
      <button onClick={() => dispatch(toggleLogin())}>Conta</button>
    </HeaderContainer>
  ) : (
    <SideHeader>
      <Logo src={CatFace} />
      <CiMenuBurger onClick={toggleOpen} />
      <NavBackground onClick={toggleOpen} $isOpen={navMenuOpen} />
      <SideNav $isOpen={navMenuOpen}>
        <CloseContainer>
          <GoX onClick={toggleOpen} />
        </CloseContainer>
        <button
          onClick={() => {
            if (cookies.GISToken) {
              dispatch(toggleManipulate())
            } else {
              dispatch(toggleLogin())
            }
          }}
        >
          Meus Ambientes
        </button>
        <MenuButtonMobile onClick={() => dispatch(toggleEnvironmentId())}>
          <BiSearch /> Acessar Ambiente
        </MenuButtonMobile>
        <button onClick={() => dispatch(toggleLogin())}>Conta</button>
      </SideNav>
    </SideHeader>
  )
}

const CloseContainer = styled.div`
  width: calc(100% - 2em);

  padding-block: 1em;

  display: flex;
  justify-content: end;
`

const NavBackground = styled.div`
  background-color: #00000040;
  display: ${(props) => (props.$isOpen ? "unset" : "none")};

  position: fixed;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  z-index: 1;
`

const SideHeader = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-block: 1em;

  svg {
    width: 1.5em;
    height: 1.5em;

    cursor: pointer;
  }
`

const SideNav = styled.nav`
  position: fixed;
  right: ${(props) => (props.$isOpen ? 0 : "-16em")};
  top: 0;

  min-width: 15em;
  height: 100%;

  background: var(--principal-background);
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: end;

  padding-inline: 0.5em;

  svg {
    width: 2em;
    height: 2em;
  }

  button {
    width: 100%;
    text-align: end;

    font-size: 1em;
    height: 3em;
    background-color: transparent;

    border: none;
    color: #fff;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    svg {
      width: 1.5em;
      height: 1.5em;
    }
  }

  transition: 0.5s;
`

const Logo = styled.img`
  width: 3em;
  height: 3em;

  user-select: none;
  pointer-events: none;
`

const MenuButtonMobile = styled.button`
  display: flex;
  align-items: center;
  justify-content: end;

  gap: 0.5em;
`

const MenuButton = styled.button`
  display: flex;
  align-items: center;

  gap: 0.5em;
`

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  max-width: 1600px;
  padding-block: 1em;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 1em;
  }

  button {
    font-size: 1em;
    height: 3em;
    background-color: transparent;

    border: none;
    color: #fff;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`
