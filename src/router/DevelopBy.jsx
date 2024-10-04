import styled from "styled-components"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Link } from "react-router-dom"

const NoStyleLink = (props) => {
  return (
    <DevelopLink {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </DevelopLink>
  )
}

export const DevelopBy = () => {
  return (
    <DevelopContainer>
      <DevelopText>
        Desenvolvido por:
        <NoStyleLink to="https://www.linkedin.com/in/gustavo-carvalho-0/">
          <FaLinkedin />
        </NoStyleLink>
        <NoStyleLink to="https://github.com/GustavoRCarvalho">
          <FaGithub />
        </NoStyleLink>
      </DevelopText>
    </DevelopContainer>
  )
}

const DevelopContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1600px;

  display: flex;
  justify-content: end;
  align-items: end;

  margin-bottom: 1em;
`

const DevelopText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
`

const DevelopLink = styled(Link)`
  width: 1.3em;
  height: 1.3em;

  display: flex;

  text-decoration: none;
  color: #fff;

  svg {
    width: 1.3em;
    height: 1.3em;
  }
`
