import styled from "styled-components"
import { useState } from "react"

import { useTranslation } from "react-i18next"
import { useCookies } from "react-cookie"
import { GoChevronDown, GoChevronUp, GoGlobe } from "react-icons/go"

const languages = ["English", "Português", "Español"]

export const Language = () => {
  const [_cookies, setCookie] = useCookies(["language"])
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  function onSetLanguage(lang) {
    i18n.changeLanguage(lang)
    setCookie("language", lang, { path: "/", maxAge: 34560000 })
    setOpen(false)
  }

  return (
    <DropdownButton $isOpen={open}>
      <LangLabel $active={false} onClick={() => setOpen((state) => !state)}>
        <GoGlobe /> {t("Language")} {open ? <GoChevronUp /> : <GoChevronDown />}
      </LangLabel>
      {open &&
        languages.map((lang) => {
          const active = lang === i18n.language
          return (
            <LangLabel
              $active={active}
              key={lang}
              onClick={() => onSetLanguage(lang)}
            >
              {lang}
            </LangLabel>
          )
        })}
    </DropdownButton>
  )
}

const LangLabel = styled.span`
  min-height: 3em;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;

  cursor: pointer;

  width: 100%;

  text-decoration: ${(props) => (props.$active ? "underline" : "none")};

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1012px) {
    justify-content: end;
  }
`

const DropdownButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isOpen ? "start" : "center")};
  align-items: center;

  width: max-content;

  border-radius: 0.25em;
  z-index: 1;

  &:hover {
    text-decoration: unset !important;
  }

  svg {
    height: 1em;
    width: 1em;
  }
`
