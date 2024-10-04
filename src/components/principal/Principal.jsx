import styled, { keyframes } from "styled-components"
import { PrincipalHeader } from "./header/PrincipalHeader"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { resetData } from "../../store/homeDataSlice"
import onlySpaceCat from "../../assets/images/onlySpaceCat.png"
import onlySpace from "../../assets/images/onlySpace.png"
import PageTitle from "../../router/PageTitle"
import { DevelopBy } from "../../router/DevelopBy"
import { useTranslation } from "react-i18next"

export const Principal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetData())
  }, [dispatch])

  return (
    <PrincipalContainer>
      <PageTitle title={"New Desk"} />
      <PrincipalHeader />
      <PrincipalContent>
        <ContentText>
          <PrincipalTitle>
            {t("PrincipalTitle1")}
            <br />
            {t("PrincipalTitle2")}
          </PrincipalTitle>
          <ResumeContainer>{t("PrincipalSubTitle")}</ResumeContainer>
        </ContentText>
        <SpaceImageWrapper>
          <img src={onlySpace} alt="Imagem de espaço com estrelas e planetas" />
          <img
            src={onlySpaceCat}
            alt="Imagem de um gato com capacete de astronauta"
          />
        </SpaceImageWrapper>
      </PrincipalContent>
      <DevelopBy />
    </PrincipalContainer>
  )
}

const animationCat = keyframes`
  0%, 100% {
    transform: translate(-50%, -45%);
  }
  50% {
    transform: translate(-50%, -55%);
  }
`

const SpaceImageWrapper = styled.div`
  position: relative;

  width: 40%;
  aspect-ratio: 1;

  user-select: none;
  pointer-events: none;

  img {
    position: absolute;
  }

  img:nth-child(1) {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  img:nth-child(2) {
    width: calc(100% / 3.1);

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    animation: ${animationCat} 5s ease-in-out infinite;
  }

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 720px) {
    width: 75%;
  }
`

const PrincipalContent = styled.div`
  position: relative;

  width: 100%;
  max-width: 1600px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const ContentText = styled.div`
  width: 100%;
  height: 70%;
  max-width: 50%;

  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    height: unset;
    max-width: 100%;
  }
`

const ResumeContainer = styled.span`
  display: block;

  height: min-content;
  font-size: 0.9em;

  max-width: 70%;

  padding: 0.5em;
  border-radius: 1em;

  @media (max-width: 1024px) {
    font-size: 1em;

    margin-inline: auto;
    text-align: center;
  }
  @media (max-width: 720px) {
    max-width: 90%;
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

  @media (max-width: 1024px) {
    font-size: 1.9em;

    margin-inline: auto;
    text-align: center;
  }
  @media (max-width: 720px) {
    max-width: 90%;
  }
`

const PrincipalContainer = styled.div`
  font-size: 1.2em;
  background: var(--principal-background);
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

  @media (max-width: 720px) {
    width: calc(100vw - 2em);
    padding-inline: 1em;
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
