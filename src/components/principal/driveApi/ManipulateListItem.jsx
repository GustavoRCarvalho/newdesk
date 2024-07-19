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
  GoImage,
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
  const [value, setValue] = useState(item.name)
  const [isEditable, setIsEditable] = useState(false)
  const renameExecuting = isExecutingAnimation.rename !== ""
  const [newItemImage, setNewItemImage] = useState(item.imageUrl)
  const imageSrc = newItemImage ? `data:image/png;base64,${newItemImage}` : ""

  async function handleSwitchEditable() {
    if (renameExecuting || isExecuting) return
    try {
      if (isEditable && item.name !== value) {
        setIsExecuting(true)
        setIsExecutingAnimation((state) => ({ ...state, rename: item.id }))

        await renameFile(item.id, value, newItemImage)

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

  function handleItemFile(e) {
    if (!e.target.files.length) return
    const file = e.target.files[0]
    const reader = new FileReader()
    let base64String

    reader.onload = function (event) {
      base64String = event.target.result.split(",")[1]
      setNewItemImage(base64String)
    }
    reader.readAsDataURL(file)
  }

  return (
    <tr>
      <td>
        <ImageWrapper $select={newItemImage !== ""} $disabled={!isEditable}>
          <label htmlFor={`file-${item.id}`}>
            <GoImage />
            <img alt="logo" src={imageSrc} />
          </label>
          <input
            id={`file-${item.id}`}
            accept="image/*"
            type="file"
            onChange={handleItemFile}
          />
        </ImageWrapper>
      </td>
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

const ImageWrapper = styled.div`
  input {
    &[type="file"] {
      display: none;
    }
  }
  user-select: none;
  pointer-events: ${(props) => (props.$disabled ? "none" : "normal")};

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    aspect-ratio: 1;
    cursor: ${(props) => (props.$disabled ? "default" : "pointer")};
  }

  svg {
    display: ${(props) => (props.$select ? "none" : "block")};
    color: ${(props) =>
      props.$alert ? "#ff3f3f" : props.$select ? "#92ff71" : "#d4d0d0"};
    width: 2em;
    height: 2em;

    cursor: ${(props) => (props.$disabled ? "default" : "pointer")};
  }

  img {
    display: ${(props) => (props.$select ? "block" : "none")};
    width: 2em;
    height: 2em;

    cursor: ${(props) => (props.$disabled ? "default" : "pointer")};
  }
`

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
