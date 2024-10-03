import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { toggleChangeIcon } from "../../../store/modalSlice"
import { useState } from "react"
import { DynaminicIcon } from "../../../router/DynamicIcon"
import { changeIconCategory } from "../../../store/editorSlice"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"
import { ModalBackground } from "../../../router/Modal"

export const ChangeIcon = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  const isOpen = useSelector((state) => state.modal)
  const [value, setValue] = useState(isOpen.changeIcon.Icon)
  const [error, setError] = useState(false)

  async function handleClick() {
    const categories = editorData.categories.map(({ title }) => title)

    let index = categories.indexOf(isOpen.changeIcon.title)

    if (index === -1) {
      dispatch(toggleChangeIcon())
      dispatch(
        createAlertError(
          "Não foi possível encontrar a categoria, tente novamente."
        )
      )
      return
    }
    dispatch(changeIconCategory({ newIcon: value, index: index }))
    dispatch(createAlertSucess("Icone padrão adicionado."))
    dispatch(toggleChangeIcon())
  }

  async function handleChange(e) {
    setError(false)
    setValue(e.target.value.replace(" ", ""))
  }

  return (
    <ModalBackground
      id="modalChangeIcon"
      onMouseDown={(e) =>
        e.target.id === "modalChangeIcon" && dispatch(toggleChangeIcon())
      }
    >
      <ChangeIconContainer>
        <span>
          Escolha um icone disponível em{" "}
          <a
            href="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Icons
          </a>
        </span>
        <DynaminicIcon iconName={value} />
        <InputWrapper>
          <ChangeIconInput
            placeholder="FaIcons"
            type="text"
            value={value}
            $alert={error}
            onChange={handleChange}
          />
          <ChangeIconButton onClick={handleClick}>Salvar</ChangeIconButton>
        </InputWrapper>
      </ChangeIconContainer>
    </ModalBackground>
  )
}

const InputWrapper = styled.div`
  display: flex;

  gap: 1em;
`

const ChangeIconButton = styled.button`
  background-color: var(--manipulate-table-head-background);
  color: var(--manipulate-table-head-color);

  padding: 0.75em 2em;

  display: flex;
  align-items: center;
  gap: 1em;

  border: none;
  border-radius: 0.5em;

  cursor: pointer;
`

const ChangeIconInput = styled.input`
  font-size: 1em;
  background-color: transparent;
  color: var(--manipulate-color);
  width: calc(100% - 2em);

  padding: 0.5em 1em;

  border: ${(props) =>
    props.$alert ? "1px solid #ff3f3f" : "1px solid #d4d0d0"};
  &::placeholder {
    color: ${(props) => (props.$alert ? "#ff3f3f" : "#777")};
  }
  border-radius: 0.5em;

  outline: none;
`

const ChangeIconContainer = styled.div`
  background-color: #00000086;
  backdrop-filter: blur(5px);

  color: var(--manipulate-color);

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 1em;
  padding: 1em;

  border-radius: 1em;

  svg {
    width: 5em;
    height: 5em;

    padding: 1em;
  }

  a {
    color: var(--manipulate-color);
  }
`
