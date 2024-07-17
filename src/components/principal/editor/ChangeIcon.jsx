import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { toggleChangeIcon } from "../../../store/modalSlice"
import { useState } from "react"
import { DynaminicIcon } from "../../../router/DynamicIcon"
import { setEditor } from "../../../store/editorSlice"
import { createAlertSucess } from "../../../store/alertSlice"

export const ChangeIcon = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  const isOpen = useSelector((state) => state.modal)
  const [value, setValue] = useState(isOpen.changeIcon.Icon)
  const [error, setError] = useState(false)

  async function handleClick() {
    let newCopy = JSON.parse(JSON.stringify(editorData.categories))
    let index = editorData.categories
      .map(({ title }) => title)
      .indexOf(isOpen.changeIcon.title)
    if (index === -1) {
      dispatch(toggleChangeIcon())
      // mensagem de erro dizendo que a categoria nao foi encontrada corretamente
      return
    }
    newCopy[index].Icon = value
    dispatch(createAlertSucess("Icone padrão adicionado."))

    dispatch(setEditor(newCopy))
    dispatch(toggleChangeIcon())
  }

  async function handleChange(e) {
    setError(false)
    setValue(e.target.value.replace(" ", ""))
  }

  return (
    <ChangeIconModal
      id="modalChangeIcon"
      onMouseDown={(e) =>
        e.target.id === "modalChangeIcon" && dispatch(toggleChangeIcon())
      }
    >
      <ChangeIconContainer>
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
    </ChangeIconModal>
  )
}

const InputWrapper = styled.div`
  display: flex;

  gap: 1em;
`

const ChangeIconButton = styled.button`
  font-size: 1em;
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

const ChangeIconModal = styled.div`
  position: fixed;

  background-color: #00000026;
  backdrop-filter: blur(2px);

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
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
`
