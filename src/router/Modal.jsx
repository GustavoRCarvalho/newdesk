import { useSelector } from "react-redux"
import { Login } from "../components/principal/driveApi/Login"
import { ManipulateEnvironments } from "../components/principal/driveApi/ManipulateEnvironments"
import { DeleteConfirme } from "../components/principal/driveApi/DeleteConfirme"
import { EnvironmentAcess } from "../components/principal/driveApi/EnvironmentAcess"

export const Modal = () => {
  const isOpen = useSelector((state) => state.modal)

  return (
    <>
      {isOpen.login && <Login />}
      {isOpen.manipulate && <ManipulateEnvironments />}
      {isOpen.delete !== "" && <DeleteConfirme />}
      {isOpen.environmentId && <EnvironmentAcess />}
    </>
  )
}
