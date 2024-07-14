import styled from "styled-components"
import { deleteFile } from "../../../utils/googleDriveApi"
import { useDispatch, useSelector } from "react-redux"
import { toggleDelete } from "../../../store/modalSlice"
import { useState } from "react"
import { Spinner } from "./ManipulateListItem"
import Trash from "../../../assets/images/lixeira.svg"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"

export const DeleteConfirme = () => {
  const dispatch = useDispatch()
  const deleteId = useSelector((state) => state.modal.delete)
  const [inputAlert, setInputAlert] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [value, setValue] = useState("")

  async function handleDelete() {
    if (value !== "EXCLUIR") {
      setInputAlert(true)
      return
    }
    if (isWaiting) return
    setIsWaiting(true)
    try {
      await deleteFile(deleteId)
      dispatch(createAlertSucess("Deletado com sucesso!"))
    } catch (e) {
      dispatch(
        createAlertError("Falha ao deletar. Por favor, tente novamente.")
      )
    } finally {
      setValue("")
      setIsWaiting(false)
      dispatch(toggleDelete())
    }
  }

  return (
    <Modal
      id="modalDelete"
      onMouseDown={(e) =>
        e.target.id === "modalDelete" && dispatch(toggleDelete())
      }
    >
      <Container>
        <TrashImage src={Trash} />
        <Message>
          Para excluir o ambiente permanentemente digite:{" "}
          <MessageRed>EXCLUIR</MessageRed>
        </Message>
        <DeleteInput
          $alert={inputAlert}
          placeholder="Confirmação"
          type="text"
          value={value}
          onChange={(e) => {
            setInputAlert(false)
            setValue(e.target.value)
          }}
        />
        <ContainerButtons>
          <CancelButton onClick={() => dispatch(toggleDelete())}>
            Cancelar
          </CancelButton>
          <DeleteButton onClick={handleDelete}>
            Excluir {isWaiting && <Spinner />}
          </DeleteButton>
        </ContainerButtons>
      </Container>
    </Modal>
  )
}

const TrashImage = styled.img`
  width: 4em;
`

const DeleteButton = styled.button`
  background-color: #cf0000;
  color: var(--manipulate-color);

  display: flex;
  align-items: center;
  gap: 1em;
`

const CancelButton = styled.button`
  background-color: var(--manipulate-table-button-background);
  color: var(--manipulate-color);
`

const ContainerButtons = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;

  button {
    font-size: 1em;

    border-radius: 0.5em;

    border: none;
    padding: 0.5em 1.5em;

    cursor: pointer;
  }
`

const MessageRed = styled.span`
  color: #cf0000;

  text-decoration: underline;
`

const Message = styled.span`
  font-size: 1.2em;

  max-width: 20em;

  text-align: center;

  user-select: none;
`

const DeleteInput = styled.input`
  font-size: 1em;
  background-color: transparent;
  color: var(--manipulate-color);
  min-width: calc(50%);

  padding: 0.5em 1em;

  border: ${(props) =>
    props.$alert ? "1px solid #ff3f3f" : "1px solid #d4d0d0"};
  border-radius: 0.5em;

  outline: none;

  &::placeholder {
    color: ${(props) => (props.$alert ? "#ff3f3f" : "#777")};
  }
`

const Modal = styled.div`
  position: fixed;

  background-color: #00000026;
  backdrop-filter: blur(2px);

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  background-color: #141414;
  backdrop-filter: blur(5px);

  color: var(--home-card-color);

  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 2em;

  border-radius: 1em;

  padding: 2em;
`
