import styled from "styled-components"
import { PrincipalHeader } from "./PrincipalHeader"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setInitial } from "../../store/homeDataSlice"
import spaceCat from "../../assets/images/spaceCat.png"

export const Principal = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitial({}))
  }, [dispatch])

  return (
    <PrincipalContainer>
      <PrincipalHeader />
      <PrincipalContent>
        <ContentText>
          <PrincipalTitle>
            Bem-vindo ao New Desk
            <br />
            Sua Ferramenta de Organização e Colaboração
          </PrincipalTitle>
          <ResumeContainer>
            Crie artigos de forma gratuita e compartilhe com seus colegas. Com
            essa plataforma atual você utiliza seu Google Drive e toda sua
            confiabilidade para armazenar suas ideias.
            {/* New Desk é uma plataforma inovadora projetada para facilitar a
            organização e a colaboração no ambiente de trabalho.
            <div></div>
            Com nossa ferramenta, você pode criar ambientes personalizados com
            categorias, subcategorias e artigos, permitindo uma estrutura clara
            e eficiente para suas tarefas e projetos.
            <div></div>
            Compartilhe facilmente ambientes com seus colegas de trabalho, sendo
            mais colaborativo e produtivo. */}
          </ResumeContainer>
        </ContentText>
        <img src={spaceCat} alt="" />
      </PrincipalContent>
    </PrincipalContainer>
  )
}

const PrincipalContent = styled.div`
  position: relative;

  width: 100%;
  max-width: 1600px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1350px) {
    flex-direction: column;
  }

  img {
    width: 50%;
    /* border: 1px solid black; */

    user-select: none;
    pointer-events: none;
  }
`

const ContentText = styled.div`
  width: 100%;
  height: 70%;
  max-width: 50%;

  display: flex;
  flex-direction: column;
`

const ResumeContainer = styled.span`
  display: block;

  height: min-content;
  font-size: 0.9em;

  max-width: 70%;

  padding: 0.5em;
  border-radius: 1em;

  @media (max-width: 1350px) {
    font-size: 1em;

    margin-inline: auto;
    text-align: center;
  }
`

const PrincipalTitle = styled.h1`
  position: relative;

  max-width: 80%;

  line-height: 1.1em;

  font-size: 2.5em;
  font-weight: 400;

  margin: 0em;
  margin-bottom: 1em;

  @media (max-width: 1350px) {
    font-size: 1.9em;

    margin-inline: auto;
    text-align: center;
  }
`

const PrincipalContainer = styled.div`
  font-size: 1.2em;
  background: linear-gradient(#2d3b4e, #050608);
  color: #fff;
  position: relative;

  padding-inline: 3em;
  width: calc(100vw - 6em);
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1000px) {
    font-size: 1em;
  }

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;

    border-radius: 1em;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`
