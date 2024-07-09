import { Link } from "react-router-dom"
import {
  handleIsSignIn,
  initClient,
  readJsonFile,
} from "../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import { toggleLogin, toggleManipulate } from "../../store/modalSlice"
import { useEffect } from "react"

export const Principal = () => {
  const dispatch = useDispatch()
  const driveLink = "zzhelp"

  useEffect(() => {
    initClient()
  }, [])

  return (
    <div>
      <button onClick={() => console.log(handleIsSignIn())}>
        test is sign
      </button>
      <button onClick={() => readJsonFile("1AX29I0vYlDuiYVO8L3yVoI39IMXoF5lm")}>
        Read Test File
      </button>
      <button
        onClick={() => {
          if (handleIsSignIn()) {
            dispatch(toggleManipulate())
          } else {
            dispatch(toggleLogin())
          }
        }}
      >
        Manipulate
      </button>
      <button onClick={() => dispatch(toggleLogin())}>Logar</button>
      <Link to={`/environment?environment=${driveLink}`}>{driveLink}</Link>
      <br />
      <Link to={`/edit?environment=${driveLink}`}>edit</Link>
    </div>
  )
}
