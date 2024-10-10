import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toggleDelete, toggleManipulate } from "../../../store/modalSlice"
import { FaSpinner } from "react-icons/fa"
import styled, { keyframes } from "styled-components"
import { convertDate } from "../../../utils/functions"
import { GoLink, GoLinkExternal, GoTrash } from "react-icons/go"
import { useTranslation } from "react-i18next"

export const ManipulateListItem = ({ item }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [hasCopy, setHasCopy] = useState(false)
  const [value, setValue] = useState(item.name)
  const [isEditable, setIsEditable] = useState(false)

  return (
    <tr>
      <td>
        <InputTable
          disabled={!isEditable}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </td>
      <td>{convertDate(item.createdTime)}</td>
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
      </td>
      <td>
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
          <CopyAlert $show={hasCopy}>{t("Copied")} !</CopyAlert>
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
