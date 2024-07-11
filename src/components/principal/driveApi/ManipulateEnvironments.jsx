import styled from "styled-components"
import { handleUploadJson, listFiles } from "../../../utils/googleDriveApi"
import { useDispatch, useSelector } from "react-redux"
import { toggleManipulate } from "../../../store/modalSlice"
import { useEffect, useState } from "react"
// import { data } from "../../../assets/data"
import { ManipulateListItem, Spinner } from "./ManipulateListItem"
import { GoX } from "react-icons/go"

export const ManipulateEnvironments = () => {
  const isDeleteOpen = useSelector((state) => state.modal.delete)
  const [newEnvironments, setNewEnvironments] = useState("")
  const [inputAlert, setInputAlert] = useState(false)
  const [list, setList] = useState([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [isExecutingAnimation, setIsExecutingAnimation] = useState({
    create: false,
    rename: "",
  })
  const createExecuting = isExecutingAnimation.create
  const dispatch = useDispatch()

  async function handleCreate() {
    if (newEnvironments === "") {
      setInputAlert(true)
      return
    }
    if (createExecuting || isExecuting) return
    setIsExecuting(true)
    setIsExecutingAnimation((state) => ({ ...state, create: true }))
    try {
      await handleUploadJson([], newEnvironments)
    } finally {
      setNewEnvironments("")
      setIsExecuting(false)
    }
  }

  const fetchFiles = async () => {
    try {
      const files = await listFiles()
      setList(files)
      setIsExecutingAnimation({
        create: false,
        rename: "",
      })
    } catch (error) {
      console.error("Error fetching files:", error)
    } finally {
    }
  }

  useEffect(() => {
    if (!isExecuting && isDeleteOpen === "") {
      fetchFiles()
    }
  }, [isExecuting, isDeleteOpen])

  return (
    <Modal
      id="modalManipulate"
      onClick={(e) =>
        e.target.id === "modalManipulate" && dispatch(toggleManipulate())
      }
    >
      <Container>
        <CloseContainer>
          <CloseButton onClick={() => dispatch(toggleManipulate())}>
            <GoX />
          </CloseButton>
        </CloseContainer>
        <CreateContainer>
          <CreateInput
            $alert={inputAlert}
            placeholder="Nome do novo ambiente"
            type="text"
            value={newEnvironments || ""}
            onChange={(e) => {
              setInputAlert(false)
              setNewEnvironments(e.target.value)
            }}
          />
          <CreateButton onClick={handleCreate}>
            Adicionar {createExecuting && <Spinner />}
          </CreateButton>
        </CreateContainer>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Tamanho</th>
              <th>Ferramentas</th>
            </tr>
          </thead>
          {list.length !== 0 && (
            <tbody>
              {list.map((item) => {
                return (
                  <ManipulateListItem
                    key={item.id}
                    item={item}
                    isExecuting={isExecuting}
                    setIsExecuting={setIsExecuting}
                    isExecutingAnimation={isExecutingAnimation}
                    setIsExecutingAnimation={setIsExecutingAnimation}
                  />
                )
              })}
            </tbody>
          )}
        </table>
        {list.length === 0 && (
          <TableEmpty>Nenhum ambiente adicionado</TableEmpty>
        )}
      </Container>
    </Modal>
  )
}

const CloseContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: end;
`

const CloseButton = styled.button`
  font-size: 1em;
  background-color: transparent;

  padding: 0;
  width: 2em;
  height: 2em;

  border: none;

  svg {
    color: var(--manipulate-color);

    width: 100%;
    height: 100%;
  }

  cursor: pointer;
`

const TableEmpty = styled.span`
  font-size: 1.5em;

  width: 100%;
  margin-top: 1em;

  text-align: center;
`

const CreateContainer = styled.div`
  display: flex;

  gap: 1em;
`

const CreateButton = styled.button`
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

const CreateInput = styled.input`
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
  background-color: var(--home-card-background);
  color: var(--home-card-color);

  min-width: 20em;
  min-height: min-content;
  height: 30em;

  display: flex;
  flex-direction: column;

  gap: 1em;

  border-radius: 1em;

  padding: 1em;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 20px;
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

  table {
    border-spacing: 0;
    border-collapse: collapse;
    th {
      padding-inline: 1em;
    }
    td {
      padding-inline: 1em;
    }
  }

  thead {
    tr {
      background-color: var(--manipulate-table-head-background);
      color: var(--manipulate-table-head-color);

      th {
        font-weight: 500;
        text-align: start;
        padding-block: 0.75em;
      }
    }
    th:nth-child(1) {
      text-align: start;
      padding-left: 1.5em;
      border-top-left-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
    }
    th:last-child {
      text-align: end;
      padding-right: 1.5em;
      border-top-right-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
    }
  }
  tbody {
    color: var(--manipulate-color);

    button {
      position: relative;
      font-size: 1em;

      width: 1.75em;
      height: 1.75em;
      background-color: transparent;

      color: #000;

      border: none;
      border-radius: 0.25em;

      padding: 0.25em;
      margin-inline: 0.1em;

      svg {
        color: var(--manipulate-color);

        width: 100%;
        height: 100%;
      }

      cursor: pointer;

      &:hover {
        background-color: var(--manipulate-table-button-background);
      }
    }
    .delete {
      &:hover {
        background-color: #ff2b2b;
      }
    }
    td {
      text-align: start;
      padding-block: 0.5em;
    }
    td:nth-child(1) {
      text-align: start;
      padding-left: 1.5em;

      div {
        display: flex;
      }
    }
    td:last-child {
      text-align: end;
      padding-right: 1.5em;
    }
  }
`
