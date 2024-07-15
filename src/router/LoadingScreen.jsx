import styled, { keyframes } from "styled-components"
import gif from "../assets/images/sr29ea2865be8aws3.gif"
import { PiCoffeeLight } from "react-icons/pi"
import { MdOutlineExitToApp } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export const LoadingScreen = ({ errorMessage = "" }) => {
  const navigate = useNavigate()

  return (
    <LoadingContainer>
      {errorMessage !== "" && (
        <button onClick={() => navigate("/")}>
          <MdOutlineExitToApp />
        </button>
      )}
      <PiCoffeeLight />
      {errorMessage === "Falha ao carregar. Por favor, verifique o código." && (
        <span>
          Ops!!! Parece que este local não existe... <br /> tente algo
          diferente.
        </span>
      )}
      {(errorMessage ===
        "Falha no uso das credencias. Aguarde e tente novamente." ||
        errorMessage === "Failed to fetch") && (
        <span>
          Hmm, que estranho, <br /> parece que você está muito ansioso por
          novidades, <br /> tente esperar alguns minutos e volte novamente!
        </span>
      )}
      {errorMessage === "" && (
        <span>
          Enquanto preparamos tudo, <br /> aproveite um café virtual...
        </span>
      )}
      <img
        src={gif}
        alt="gif de um gatinho em cima de uma mesa jogando uma bola de papel no chão"
      />
    </LoadingContainer>
  )
}

const gigle = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`

const LoadingContainer = styled.div`
  background-color: #1c2733;
  position: fixed;

  width: 100vw;
  height: 100vh;

  font-family: "Crimson Pro", serif;
  font-size: 3em;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  img {
    position: absolute;
    bottom: 0;
    right: 0;

    max-width: 25%;
  }

  svg {
    color: #ac814f;
    position: absolute;
    bottom: 0;
    left: 0;

    width: 1.5em;
    height: 1.5em;

    margin: 0.5em;
    animation: ${gigle} 1s linear infinite;
  }

  button {
    position: absolute;

    font-size: 1em;

    top: 0;
    left: 0;

    width: 1em;
    height: 1em;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #fff;
    color: #ac814f;

    border: none;
    border-radius: 0.5em;

    padding: 0;
    margin: 0.5em;

    svg {
      position: relative;
      width: 0.75em;
      height: 0.75em;

      margin: 0;
      animation: none;
      transform: rotateZ(180deg);
    }
    cursor: pointer;
  }

  user-select: none;
`
