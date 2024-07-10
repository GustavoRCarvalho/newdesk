import { Link } from "react-router-dom"
import { handleIsSignIn } from "../../utils/googleDriveApi"
import { useDispatch } from "react-redux"
import { toggleLogin, toggleManipulate } from "../../store/modalSlice"

export const Principal = () => {
  const dispatch = useDispatch()
  const driveLink = "zzhelp"

  return (
    <div>
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
