import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { toggleLogin, toggleManipulate } from "../../../store/modalSlice"
import { useEffect, useState } from "react"
import { ManipulateListItem, Spinner } from "./ManipulateListItem"
import { GoX, GoImage } from "react-icons/go"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"
import { ModalBackground } from "../../../router/Modal"
import { createContentFile, listFiles } from "../../../utils/GISApi"
import { useCookies } from "react-cookie"

export const ManipulateEnvironments = () => {
  const [cookies, setCookies] = useCookies()
  const isDeleteOpen = useSelector((state) => state.modal.delete)
  const [newEnvironments, setNewEnvironments] = useState("")
  const [newImage, setNewImage] = useState("")
  const imageSrc = newImage ? `data:image/png;base64,${newImage}` : ""
  const [initialLoading, setInitialLoading] = useState(true)
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
    }
    if (createExecuting || isExecuting || newEnvironments === "") return
    setIsExecuting(true)
    setIsExecutingAnimation((state) => ({ ...state, create: true }))
    try {
      await createContentFile(cookies.GISToken, newEnvironments, newImage)
      dispatch(createAlertSucess("Ambiente criado com sucesso."))
    } catch (e) {
      dispatch(
        createAlertError(
          "Falha ao criar o ambiente. Por favor, tente novamente."
        )
      )
    } finally {
      setNewEnvironments("")
      setIsExecuting(false)
    }
  }

  const fetchFiles = async () => {
    try {
      const response = await listFiles(cookies.GISToken)
      if (response?.error?.code === 401) {
        setCookies(`GISToken`, null)
        dispatch(toggleManipulate())
        dispatch(toggleLogin())
        return
      }
      setList(response.files)
      setIsExecutingAnimation({
        create: false,
        rename: "",
      })
    } catch (error) {
      dispatch(
        createAlertError(
          "Falha ao listar os dados. Por favor, tente novamente."
        )
      )
    } finally {
      setInitialLoading(false)
    }
  }

  function handleFile(e) {
    if (!e.target.files.length) return
    const file = e.target.files[0]
    const reader = new FileReader()
    let base64String

    reader.onload = function (event) {
      base64String = event.target.result.split(",")[1]
      setInputAlert(false)
      setNewImage(base64String)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (!isExecuting && isDeleteOpen === "") {
      fetchFiles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExecuting, isDeleteOpen])

  return (
    <ModalBackground
      id="modalManipulate"
      onMouseDown={(e) =>
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
          <InputImage $select={newImage !== ""}>
            <label htmlFor="file-upload">
              <GoImage />
              <img alt="logo" src={imageSrc} />
            </label>
            <input
              id="file-upload"
              accept="image/*"
              type="file"
              onChange={handleFile}
            />
          </InputImage>
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
              <th>Editar</th>
              <th>Ferramentas</th>
            </tr>
          </thead>
          {list?.length !== 0 && (
            <tbody>
              {list?.map((item) => {
                return <ManipulateListItem key={item.id} item={item} />
              })}
            </tbody>
          )}
        </table>
        {list?.length === 0 && (
          <TableEmpty>
            {initialLoading ? <Spinner /> : "Nenhum ambiente adicionado"}{" "}
          </TableEmpty>
        )}
      </Container>
    </ModalBackground>
  )
}

const InputImage = styled.div`
  border: ${(props) =>
    props.$alert
      ? "1px solid #ff3f3f"
      : props.$select
      ? "1px solid #92ff71"
      : "1px solid #d4d0d0"};
  border-radius: 0.5em;
  cursor: pointer;

  input {
    &[type="file"] {
      display: none;
    }
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    aspect-ratio: 1;
    cursor: pointer;
  }

  svg {
    display: ${(props) => (props.$select ? "none" : "block")};
    color: ${(props) =>
      props.$alert ? "#ff3f3f" : props.$select ? "#92ff71" : "#d4d0d0"};
    width: 2em;
    height: 2em;

    cursor: pointer;
  }

  img {
    display: ${(props) => (props.$select ? "block" : "none")};
    width: 2em;
    height: 2em;

    cursor: pointer;
  }
`

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

const Container = styled.div`
  background-color: #00000086;
  backdrop-filter: blur(5px);

  color: var(--manipulate-color);

  min-width: 20em;
  min-height: min-content;
  height: 30em;

  display: flex;
  flex-direction: column;

  gap: 1em;

  border-radius: 1em;

  padding: 1em;

  overflow-x: hidden;
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
      @media (max-width: 720px) {
        padding-inline: 0.2em;
      }
    }
    td {
      padding-inline: 1em;
      @media (max-width: 720px) {
        padding-inline: 0.2em;
      }
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

      @media (max-width: 720px) {
        padding-left: 0.75em;
      }

      border-top-left-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
    }
    th:last-child {
      text-align: end;
      padding-right: 1.5em;

      @media (max-width: 720px) {
        padding-right: 0.75em;
      }

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

      @media (max-width: 720px) {
        padding: 0em;
        width: 1.25em;
        height: 1.25em;
      }

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
    tr {
      &:hover {
        background-color: #ffffff3e;
      }
    }
    td {
      text-align: start;
      padding-block: 0.5em;
    }
    td:nth-child(1) {
      text-align: start;
      padding-left: 1.5em;

      @media (max-width: 720px) {
        padding-left: 0.75em;
      }

      border-top-left-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
    }
    td:nth-child(3) {
      text-align: center;
    }
    td:last-child {
      text-align: center;
      padding-right: 1.5em;

      @media (max-width: 720px) {
        padding-right: 0.75em;
      }

      border-top-right-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
    }
  }
`
