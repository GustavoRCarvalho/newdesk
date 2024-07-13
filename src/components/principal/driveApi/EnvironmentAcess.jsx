import styled from "styled-components"
import { useDispatch } from "react-redux"
import { toggleEnvironmentId } from "../../../store/modalSlice"
import { useState } from "react"
import { readJsonFile } from "../../../utils/googleDriveApi"
import { changeData } from "../../../store/homeDataSlice"
import { useNavigate } from "react-router-dom"

export const EnvironmentAcess = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (error) return
    setLoading(true)
    try {
      const data = await readJsonFile(value)
      if (data) {
        dispatch(changeData(data))
        dispatch(toggleEnvironmentId())
        navigate(`/environment?environment=${value}`)
      } else {
        setError(false)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <EnvironmentAcessModal
      id="modalAcess"
      onClick={(e) =>
        e.target.id === "modalAcess" && dispatch(toggleEnvironmentId())
      }
    >
      <AcessContainer>
        <input
          type="text"
          value={value}
          $error={error}
          onChange={(e) => {
            if (e.target.value === "") {
              setError(true)
              return
            }
            setError(false)
            setValue(e.target.value)
          }}
        />
        <button onClick={handleClick}>Acessar{loading && "loading"}</button>
      </AcessContainer>
    </EnvironmentAcessModal>
  )
}

const EnvironmentAcessModal = styled.div`
  position: fixed;

  background-color: #00000026;
  backdrop-filter: blur(2px);

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
const AcessContainer = styled.div`
  background-color: #00000086;
  backdrop-filter: blur(5px);

  color: var(--manipulate-color);

  min-width: 20em;
  min-height: 30em;

  display: flex;
  flex-direction: column;
`
