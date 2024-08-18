import { handleIsSignIn } from "../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import {
  toggleEnvironmentId,
  toggleLogin,
  toggleManipulate,
} from "../../store/modalSlice"
import styled from "styled-components"
import CatFace from "../../assets/images/CatFaceWhite.png"
import { BiSearch } from "react-icons/bi"

export const PrincipalHeader = () => {
  const dispatch = useDispatch()

  return (
    <HeaderContainer>
      <Logo src={CatFace} />
      <div>
        <button
          onClick={() => {
            if (handleIsSignIn()) {
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
      </div>
      <button onClick={() => dispatch(toggleLogin())}>Conta</button>
    </HeaderContainer>
  )
}

const Logo = styled.img`
  width: 3em;
  height: 3em;

  user-select: none;
  pointer-events: none;
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

  div {
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
