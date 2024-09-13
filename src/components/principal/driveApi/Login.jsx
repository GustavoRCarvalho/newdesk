import styled from "styled-components"
import { useDispatch } from "react-redux"
import { toggleLogin } from "../../../store/modalSlice"
import { createAlertSucess } from "../../../store/alertSlice"
import { FcGoogle } from "react-icons/fc"
import logo from "../../../assets/images/Logo.svg"
import { ModalBackground } from "../../../router/Modal"
import { GISLogin, GISLogout, GISPermissionToken } from "../../../utils/GISApi"
import { useCookies } from "react-cookie"
import { useMemo } from "react"

export const Login = () => {
  const dispatch = useDispatch()
  const [cookies, setCookies] = useCookies()
  const user = useMemo(() => {
    return cookies.GISuser
  }, [cookies.GISuser])

  function onLogin() {
    GISLogin()
  }

  function onLogout() {
    GISLogout()
    setCookies("GISuser", {})
    setCookies("GISToken", null)
    dispatch(toggleLogin())
    dispatch(createAlertSucess("Logout realizado com sucesso!"))
  }

  function getToken() {
    if (!user?.email_verified) return
    if (cookies.GISToken) return
    const getTokenCallback = (response) => {
      if (
        response.access_token &&
        response.scope.includes("https://www.googleapis.com/auth/drive.file")
      ) {
        setCookies(`GISToken`, response.access_token, {
          maxAge: response.expires_in,
        })
      }
    }
    GISPermissionToken(getTokenCallback)
    dispatch(toggleLogin())
  }

  return (
    <ModalBackground
      id="modalLogin"
      onMouseDown={(e) =>
        e.target.id === "modalLogin" && dispatch(toggleLogin())
      }
    >
      <LoginContainer>
        {user?.email_verified ? (
          <>
            <UserInfosWrapper>
              <img alt="foto do perfil" src={user.picture ?? logo} />
              <UserInfos>
                <label>Nome:</label>
                <span>{user.name}</span>
                <label>Email:</label>
                <span>{user.email}</span>
              </UserInfos>
            </UserInfosWrapper>
            {!cookies.GISToken && (
              <UserHasDrivePermission>
                * Para criar ambientes,{" "}
                <span
                  onClick={getToken}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  permita a criação de arquivos
                </span>{" "}
                *
              </UserHasDrivePermission>
            )}
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

const UserHasDrivePermission = styled.span`
  font-size: 0.8em;

  color: #c2a500;
`
