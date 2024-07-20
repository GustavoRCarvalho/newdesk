import { useSelector } from "react-redux"
import { Login } from "../components/principal/driveApi/Login"
import { ManipulateEnvironments } from "../components/principal/driveApi/ManipulateEnvironments"
import { DeleteConfirme } from "../components/principal/driveApi/DeleteConfirme"
import { EnvironmentAcess } from "../components/principal/driveApi/EnvironmentAcess"
import { ChangeIcon } from "../components/principal/editor/ChangeIcon"
import styled from "styled-components"

export const Modal = () => {
  const isOpen = useSelector((state) => state.modal)

  return (
    <>
      {isOpen.login && <Login />}
      {isOpen.manipulate && <ManipulateEnvironments />}
      {isOpen.delete !== "" && <DeleteConfirme />}
      {isOpen.changeIcon.title !== "" && <ChangeIcon />}
      {isOpen.environmentId && <EnvironmentAcess />}
    </>
  )
}

export const ModalBackground = styled.div`
  position: fixed;

  background-color: #00000026;
  backdrop-filter: blur(2px);

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2;
`
