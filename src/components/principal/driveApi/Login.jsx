import styled from "styled-components"
import {
  handleIsSignIn,
  handleSignIn,
  handleSignOut,
} from "../../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import { toggleLogin } from "../../../store/modalSlice"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"
import { FcGoogle } from "react-icons/fc"

export const Login = () => {
  const dispatch = useDispatch()

  async function onLogin() {
    try {
      await handleSignIn()
      dispatch(toggleLogin())
      dispatch(createAlertSucess("Login realizado com sucesso!"))
    } catch (e) {
      dispatch(
        createAlertError(
          "Falha ao realizadar o login. Por favor, tente novamente."
        )
      )
    }
  }

  async function onLogout() {
    try {
      await handleSignOut()
      dispatch(toggleLogin())
      dispatch(createAlertSucess("Logout realizado com sucesso!"))
    } catch (e) {
      dispatch(
        createAlertError(
          "Falha ao realizadar o logout. Por favor, tente novamente."
        )
      )
    }
  }

  return (
    <LoginModal
      id="modalLogin"
      onMouseDown={(e) =>
        e.target.id === "modalLogin" && dispatch(toggleLogin())
      }
    >
      <LoginContainer>
        <FcGoogle />
        Faça login na sua conta do Google para acessar a plataforma
        {handleIsSignIn() ? (
          <button onClick={onLogout}>Sair</button>
        ) : (
          <button onClick={onLogin}>Entrar</button>
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
  background-color: #00000086;
  backdrop-filter: blur(5px);

  color: var(--manipulate-color);

  display: flex;
  align-items: center;

  flex-direction: column;

  gap: 1em;
  padding: 1em;

  border-radius: 1em;

  button {
    font-size: 1em;
    background-color: var(--manipulate-table-head-background);
    color: var(--manipulate-table-head-color);

    padding: 0.75em 2em;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 0.5em;

    cursor: pointer;
  }

  svg {
    width: 4em;
    height: 4em;
  }
`
