import { useEffect, useState } from "react"
import { readJsonFile } from "../../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import { createAlertError, createAlertSucess } from "../../../store/alertSlice"

export const useFetchData = (fileId) => {
  const dispatch = useDispatch()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      console.log(fileId)
      if (fileId === "") return
      if (fileId === null) {
        setError("Falha ao carregar. Por favor, verifique o código.")
        dispatch(
          createAlertError("Falha ao carregar. Por favor, verifique o código.")
        )

        return
      }

      console.log("fetch")
      try {
        const response = await readJsonFile(fileId, signal)
        setData(response)
        dispatch(createAlertSucess("Carregado com sucesso!"))
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message)
          dispatch(createAlertError(error.message))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [fileId, dispatch])

  return { data, loading, error }
}
