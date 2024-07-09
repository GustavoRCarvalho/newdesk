import styled from "styled-components"
import {
  handleIsSignIn,
  handleSignIn,
  handleSignOut,
} from "../../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import { toggleLogin } from "../../../store/modalSlice"

export const Login = () => {
  const dispatch = useDispatch()

  async function onLogin() {
    try {
      await handleSignIn()
      dispatch(toggleLogin())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <LoginModal
      id="modalLogin"
      onClick={(e) => e.target.id === "modalLogin" && dispatch(toggleLogin())}
    >
      <LoginContainer>
        Conta do Google {}
        {handleIsSignIn() ? (
          <button onClick={handleSignOut}>Deslogar</button>
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
      </LoginContainer>
    </LoginModal>
  )
}

const LoginModal = styled.div`
  position: fixed;

  background-color: #00000026;
  backdrop-filter: blur(2px);

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
const LoginContainer = styled.div`
  background-color: var(--home-card-background);
  color: var(--home-card-color);

  min-width: 20em;
  min-height: 30em;

  display: flex;
  flex-direction: column;
`
