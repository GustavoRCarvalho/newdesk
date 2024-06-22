import { MdMobileOff } from "react-icons/md"
import styled from "styled-components"

export const DesktopAlert = () => {
  return (
    <AlertContainer>
      <MdMobileOff />
      <AlertTitle>
        Para a melhor experiência, por favor, acesse este site em um computador
        desktop.
      </AlertTitle>
      <AlertText>
        Por que estou vendo este alerta?
        <p>
          1. Se estiver utilizando um computador desktop e se deparar com este
          aviso, é possível que a guia do seu navegador esteja reduzida. Aumente
          o tamanho da guia e o alerta não será mais exibido.
        </p>
        <p>
          2. Se estiver utilizando um dispositivo móvel (smartphone/tablet),
          pedimos desculpas, mas este site não foi idealizado para contemplar
          sua plataforma.
        </p>
      </AlertText>
    </AlertContainer>
  )
}

const AlertContainer = styled.div`
  background-color: var(--alert-background);

  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1em;

  svg {
    width: 3em;
    height: 3em;

    padding: 0.5em;

    border-radius: 50%;
    border: 2px solid #000;
  }

  user-select: none;
`

const AlertTitle = styled.span`
  font-size: 2.5em;
  text-align: center;

  width: 80%;

  font-family: "Jost", sans-serif;
`

const AlertText = styled.span`
  color: #363636;
  font-size: 1.2em;
  text-align: start;

  width: 80%;

  font-family: "Jost", sans-serif;
`
