import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { renameFile } from "../../../utils/googleDriveApi"
import { toggleDelete, toggleManipulate } from "../../../store/modalSlice"
import { FaSpinner } from "react-icons/fa"
import styled, { keyframes } from "styled-components"
import { convertDate } from "../../../utils/functions"
import {
  GoCheck,
  GoLink,
  GoLinkExternal,
  GoPencil,
  GoTrash,
} from "react-icons/go"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"

export const ManipulateListItem = ({
  item,
  isExecuting,
  setIsExecuting,
  isExecutingAnimation,
  setIsExecutingAnimation,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [hasCopy, setHasCopy] = useState(false)
  const [value, setValue] = useState(item.name.split(".json")[0])
  const [isEditable, setIsEditable] = useState(false)
  const renameExecuting = isExecutingAnimation.rename !== ""

  async function handleSwitchEditable() {
    if (renameExecuting || isExecuting) return
    try {
      if (isEditable && item.name !== `${value}.json`) {
        setIsExecuting(true)
        setIsExecutingAnimation((state) => ({ ...state, rename: item.id }))
        await renameFile(item.id, value)

        dispatch(createAlertSucess("Nome alterado com sucesso!"))
      }
    } catch (e) {
      dispatch(
        createAlertError("Falha ao alterar o nome. Por favor, tente novamente.")
      )
    } finally {
      setIsEditable((state) => !state)
      setIsExecuting(false)
    }
  }

  return (
    <tr>
      <td>
        <div>
          <InputTable
            disabled={!isEditable}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSwitchEditable}>
            {isExecutingAnimation.rename === item.id ? (
              <Spinner />
            ) : isEditable ? (
              <GoCheck />
            ) : (
              <GoPencil />
            )}
          </button>
        </div>
      </td>
      <td>{convertDate(item.createdTime)}</td>
      <td>{Math.round(item.size / 1000000)} Mb</td>
      <td>
        <button
          onClick={() => {
            setIsEditable(false)
            dispatch(toggleManipulate())
            navigate(`/edit?environment=${item.id}`)
          }}
        >
          <GoLinkExternal />
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(item.id)
            setHasCopy(true)
            setTimeout(() => {
              setHasCopy(false)
            }, 2000)
          }}
        >
          <GoLink />
          <CopyAlert $show={hasCopy}>Copiado !</CopyAlert>
        </button>
        <button
          onClick={() => dispatch(toggleDelete(item.id))}
          className="delete"
        >
          <GoTrash />
        </button>
      </td>
    </tr>
  )
}

const CopyAlert = styled.div`
  display: ${(props) => (props.$show ? "unset" : "none")};
  position: absolute;

  width: max-content;

  top: 110%;
  left: 0;

  padding: 0.2em 0.4em;

  border-radius: 0.2em;

  background-color: var(--manipulate-table-head-background);
  color: var(--manipulate-table-head-color);
  z-index: 1;
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Spinner = styled(FaSpinner)`
  animation: ${spin} 2s linear infinite;
`

const InputTable = styled.input`
  font-size: 1em;
  background-color: transparent;

  max-width: 7em;

  display: flex;
  align-items: center;

  border: none;
  outline: none;

  color: var(--edit-dropdown-editable);
  border-bottom: 1px solid gray;
  &:disabled {
    border-bottom: 1px solid transparent;
    color: var(--manipulate-color);
  }
`
