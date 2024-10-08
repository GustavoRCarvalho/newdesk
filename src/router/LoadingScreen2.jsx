import styled from "styled-components"
import { GoHome } from "react-icons/go"
import { useNavigate } from "react-router-dom"
import CatFace from "../assets/icons/gatitoRecortado.svg"
import { GoCloudOffline } from "react-icons/go"

export const LoadingScreen2 = ({ errorMessage = "", progress = 0 }) => {
  const navigate = useNavigate()

  return (
    <LoadingContainer>
      {errorMessage !== "" ? (
        <>
          <GoCloudOffline />
          {[
            "Falha no uso das credencias. Aguarde e tente novamente.",
            "Failed to fetch",
          ].includes(errorMessage) && (
            <Paragraph>
              Hmm, que estranho, <br /> parece que você está muito ansioso por
              novidades, <br /> tente esperar alguns minutos e volte novamente!
            </Paragraph>
          )}
          {["Falha ao carregar. Por favor, verifique o código."].includes(
            errorMessage
          ) && (
            <Paragraph>
              Ops!!! Parece que este local não existe... <br /> tente algo
              diferente.
            </Paragraph>
          )}
          <button onClick={() => navigate("/")}>
            <GoHome />
          </button>
        </>
      ) : (
        <>
          <img src={CatFace} />
          <ProgressLineBox>
            <ProgressLine $progress={progress} />
          </ProgressLineBox>
          <Paragraph>
            Estamos preparando tudo,
            <br /> isso pode levar alguns segundos...
          </Paragraph>
        </>
      )}
    </LoadingContainer>
  )
}

const Paragraph = styled.p`
  margin: 0;
  padding: 0;
`

const ProgressLineBox = styled.div`
  background-color: black;

  height: 4px;
  width: 90%;
  max-width: 25em;
  border-radius: 2em;
`
const ProgressLine = styled.div.attrs((props) => ({
  style: {
    width: props.$progress + "%",
  },
}))`
  /* background-color: var(--card-button-background); */
  background-color: #fff;
  height: 4px;

  max-width: 100%;
  border-radius: 2em;
  filter: drop-shadow(0px 0px 10px #fff);

  transition: width 50ms;
`

const LoadingContainer = styled.div`
  background-color: #222;
  color: #fff;
  position: fixed;

  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 2em;

  text-align: center;
  user-select: none;

  svg,
  img {
    width: 5em;
    height: 5em;

    user-select: none;
    pointer-events: none;

    filter: drop-shadow(0px 0px 10px white);
  }

  button {
    background-color: transparent;
    border: none;
    border-radius: 0.5em;
    width: 3.5em;
    height: 3.5em;

    padding: 0.25em;

    cursor: pointer;

    &:hover {
      background-color: #363636;
    }

    svg {
      color: #fff;

      width: 3em;
      height: 3em;

      filter: none;
    }
  }
`
