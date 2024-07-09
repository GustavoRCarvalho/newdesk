import { useSelector } from "react-redux"
import { Login } from "../components/principal/driveApi/Login"
import { ManipulateEnvironments } from "../components/principal/driveApi/ManipulateEnvironments"

export const Modal = () => {
  const isOpen = useSelector((state) => state.modal)

  return (
    <>
      {isOpen.login && <Login />}
      {isOpen.manipulate && <ManipulateEnvironments />}
    </>
  )
}
