import { handleIsSignIn } from "../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import {
  toggleEnvironmentId,
  toggleLogin,
  toggleManipulate,
} from "../../store/modalSlice"
import backgroundImage from "../../assets/images/backiee-295134-landscape.jpg"
import styled from "styled-components"
import {
  createAlertError,
  createAlertSucess,
  createAlertWarning,
} from "../../store/alertSlice"

export const Principal = () => {
  const dispatch = useDispatch()

  return (
    <PrincipalContainer>
      <PrincipalBackground src={backgroundImage} />
      <PrincipalContent>
        <PrincipalHeader>
          <button
            onClick={() => {
              dispatch(createAlertError("Erro ao criar"))
            }}
          >
            create error
          </button>
          <button
            onClick={() => {
              dispatch(createAlertWarning("cuidado ao criar"))
            }}
          >
            create warning
          </button>
          <button
            onClick={() => {
              dispatch(createAlertSucess("Sucesso ao criar"))
            }}
          >
            create sucess
          </button>
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
          <button onClick={() => dispatch(toggleEnvironmentId())}>
            Acessar
          </button>
          <button onClick={() => dispatch(toggleLogin())}>Entrar</button>
        </PrincipalHeader>
        <PrincipalTitle>
          Bem-vindo ao Next Blob
          <br />
          Sua Ferramenta de Organização e Colaboração
        </PrincipalTitle>
        <ResumeContainer>
          <PrincipalResume>
            OrgaPro é uma plataforma inovadora projetada para facilitar a
            organização e a colaboração no ambiente de trabalho.
            <div></div>
            Com nossa ferramenta, você pode criar ambientes personalizados com
            categorias, subcategorias e artigos, permitindo uma estrutura clara
            e eficiente para suas tarefas e projetos.
            <div></div>
            Compartilhe facilmente ambientes com seus colegas de trabalho, sendo
            mais colaborativo e produtivo.
          </PrincipalResume>
        </ResumeContainer>
      </PrincipalContent>
    </PrincipalContainer>
  )
}

const PrincipalContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1600px;
`

const ResumeContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: end;
  align-items: end;

  margin-bottom: 5em;
  @media (max-width: 1350px) {
    justify-content: center;
    text-align: center;

    margin-top: 4em;
  }
`

const PrincipalResume = styled.span`
  display: block;
  font-size: 0.8em;

  width: 500px;

  padding: 0.5em;
  backdrop-filter: blur(2px);
  border-radius: 1em;

  div {
    height: 0.5em;
  }
`

const PrincipalTitle = styled.h1`
  position: relative;
  width: 35%;

  line-height: 1.1em;

  font-size: 2.5em;
  font-weight: 400;

  padding: 0.5em;

  margin-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 0em;

  backdrop-filter: blur(2px);
  border-radius: 1em;

  @media (max-width: 1350px) {
    width: 43%;
    font-size: 1.9em;

    margin-top: 0em;

    margin-inline: auto;
    text-align: center;
  }
`

const PrincipalHeader = styled.header`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: end;

  button {
    font-size: 1em;
    padding: 1.5em;
    background-color: transparent;

    border: none;
    color: #fff;

    cursor: pointer;

    &:hover {
      background-color: #00000021;
    }
  }
`

const PrincipalContainer = styled.div`
  font-size: 1.2em;
  background-color: #35475d;
  color: #fff;
  position: relative;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;

  @media (max-width: 1000px) {
    font-size: 1em;
  }
`

const PrincipalBackground = styled.img`
  position: absolute;

  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  object-fit: cover;

  user-select: none;
  pointer-events: none;
`
