import styled from "styled-components"
import { useDispatch } from "react-redux"
import { toggleEnvironmentId } from "../../../store/modalSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAlertError } from "../../../store/alertSlice"
import { ModalBackground } from "../../../router/Modal"

export const EnvironmentAcess = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  async function handleClick() {
    if (value === "") {
      setError(true)
      return
    }
    if (error) return
    try {
      setError(false)
      dispatch(toggleEnvironmentId())
      navigate(`/environment?environment=${value}`)
    } catch (e) {
      setError(true)
      dispatch(createAlertError(e.message))
    }
  }

  return (
    <ModalBackground
      id="modalAcess"
      onMouseDown={(e) =>
        e.target.id === "modalAcess" && dispatch(toggleEnvironmentId())
      }
    >
      <AcessContainer>
        <AcessInput
          placeholder="1a2b3c4d5e6f"
          type="text"
          value={value}
          $alert={error}
          onChange={(e) => {
            setError(false)
            setValue(e.target.value)
          }}
        />
        <AcessButton onClick={handleClick}>Acessar</AcessButton>
      </AcessContainer>
    </ModalBackground>
  )
}

const AcessButton = styled.button`
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

const AcessInput = styled.input`
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

const AcessContainer = styled.div`
  background-color: #00000086;
  backdrop-filter: blur(5px);

  color: var(--manipulate-color);

  display: flex;

  gap: 1em;
  padding: 1em;

  border-radius: 1em;
`
