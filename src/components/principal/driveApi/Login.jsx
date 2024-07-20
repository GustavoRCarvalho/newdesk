import styled from "styled-components"
import {
  handleIsSignIn,
  handleSignIn,
  handleSignOut,
  handleWhoIsSignIn,
} from "../../../utils/googleDriveApi"
import { useDispatch, useSelector } from "react-redux"
import { toggleLogin } from "../../../store/modalSlice"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"
import { FcGoogle } from "react-icons/fc"
import { initialUser, setUser } from "../../../store/userSlice"
import { useEffect } from "react"
import logo from "../../../assets/images/Logo.svg"
import { ModalBackground } from "../../../router/Modal"

export const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  async function onLogin() {
    try {
      const user = await handleSignIn()
      dispatch(setUser(user))

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
      dispatch(initialUser())
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

  async function getUser() {
    try {
      const user = await handleWhoIsSignIn()
      dispatch(setUser(user))
    } catch (e) {
      dispatch(createAlertError(e.message))
    }
  }

  useEffect(() => {
    if (JSON.stringify(user) === "{}") {
      getUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <ModalBackground
      id="modalLogin"
      onMouseDown={(e) =>
        e.target.id === "modalLogin" && dispatch(toggleLogin())
      }
    >
      <LoginContainer>
        {handleIsSignIn() ? (
          <>
            <UserInfosWrapper>
              <img alt="foto do perfil" src={user.imageUrl ?? logo} />
              <UserInfos>
                <label>Nome:</label>
                <span>{user.name}</span>
                <label>Email:</label>
                <span>{user.email}</span>
              </UserInfos>
            </UserInfosWrapper>
            <button onClick={onLogout}>Desconectar</button>
          </>
        ) : (
          <>
            <FcGoogle />
            Faça login na sua conta do Google para acessar a plataforma
            <button onClick={onLogin}>Conectar</button>
          </>
        )}
      </LoginContainer>
    </ModalBackground>
  )
}

const LoginContainer = styled.div`
  background-color: #00000086;
  backdrop-filter: blur(5px);

  color: var(--manipulate-color);

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-around;

  min-width: 15em;
  min-height: 15em;

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

const UserInfosWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    user-select: none;
    pointer-events: none;

    border-radius: 10%;
  }

  gap: 1em;
`

const UserInfos = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  span {
    margin-bottom: 0.5em;
  }
  label {
    font-size: 0.9em;
    opacity: 0.8;
  }
`
