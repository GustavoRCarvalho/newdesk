import styled from "styled-components"
import {
  deleteFile,
  handleUploadJson,
  listFiles,
  removeSharing,
  shareFile,
} from "../../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import { toggleManipulate } from "../../../store/modalSlice"
import { useEffect, useState } from "react"
import { data } from "../../../assets/data"
import { FaTrash, FaLock, FaGlobeAmericas, FaCopy } from "react-icons/fa"

export const ManipulateEnvironments = () => {
  const [newEnvironments, setNewEnvironments] = useState({})
  const inputValue = newEnvironments.name
  const [list, setList] = useState([])
  const [isExecuting, setIsExecuting] = useState(false)
  const dispatch = useDispatch()

  function handleChangeValue(value) {
    setNewEnvironments((state) => ({ ...state, name: value }))
  }

  async function handleCreate() {
    setIsExecuting(true)
    try {
      await handleUploadJson(data, inputValue)
    } finally {
      handleChangeValue("")
      setIsExecuting(false)
    }
  }

  async function handleDelete(id) {
    setIsExecuting(true)
    try {
      await deleteFile(id)
    } finally {
      setIsExecuting(false)
    }
  }

  async function handleSwitchShare(value) {
    setIsExecuting(true)
    try {
      if (value.shared) {
        await removeSharing(value.id)
      } else {
        await shareFile(value.id)
      }
    } finally {
      setIsExecuting(false)
    }
  }

  const fetchFiles = async () => {
    try {
      const files = await listFiles()
      setList(files)
    } catch (error) {
      console.error("Error fetching files:", error)
    } finally {
    }
  }

  useEffect(() => {
    if (!isExecuting) {
      fetchFiles()
    }
  }, [isExecuting])

  return (
    <Modal
      id="modalManipulate"
      onClick={(e) =>
        e.target.id === "modalManipulate" && dispatch(toggleManipulate())
      }
    >
      <Container>
        <div>
          List:
          {list.length === 0
            ? "Nenhum ambiente criado"
            : list.map((value) => {
                return (
                  <div key={value.id}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(value.id)
                        alert("Copied the text: " + value.id)
                      }}
                    >
                      <FaCopy />
                    </button>
                    <button onClick={() => handleSwitchShare(value)}>
                      {value.shared ? <FaGlobeAmericas /> : <FaLock />}
                    </button>
                    <span>
                      id:{value.id}name:{value.name}
                    </span>
                    <button onClick={() => handleDelete(value.id)}>
                      <FaTrash />
                    </button>
                  </div>
                )
              })}
        </div>
        <input
          placeholder="Nome do novo ambiente"
          type="text"
          value={inputValue || ""}
          onChange={(e) => handleChangeValue(e.target.value)}
        />
        <button onClick={handleCreate}>Create Test File</button>
      </Container>
    </Modal>
  )
}

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
  min-height: 30em;

  display: flex;
  flex-direction: column;
`
