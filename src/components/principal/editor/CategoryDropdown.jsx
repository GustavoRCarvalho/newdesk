import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  addCategory,
  changeNameCategory,
  changeOrderCategory,
  removeCategory,
  selectCategory,
} from "../../../store/editorSlice"
import {
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"
import { useMemo } from "react"

export const CategoryDropdown = () => {
  const dispatch = useDispatch()
  const editorData = useSelector((state) => state.editor.environment)
  const selectedCategoryIndex = useSelector(
    (state) => state.editor.selectedCategoryIndex
  )

  const categoriesOptions = useMemo(
    () => editorData.categories ?? [],
    [editorData.categories]
  )
  const categories = useMemo(
    () => categoriesOptions.map(({ title }) => title),
    [categoriesOptions]
  )

  const handleChangeCategory = useMemo(
    () => (newName, oldName) => {
      if (newName === oldName) return
      const categoryIndex = categories.indexOf(oldName)
      if (categoryIndex === -1 || categories.includes(newName)) {
        dispatch(createAlertWarning("Atenção: Está categoria já existe."))
        return
      }

      dispatch(changeNameCategory({ newName: newName, index: categoryIndex }))
      dispatch(createAlertSucess("Alterado com sucesso!"))
    },
    [categories, dispatch]
  )

  const handleAddCategory = () => {
    if (categories.includes("Nova categoria")) {
      dispatch(createAlertWarning("Atenção: Está categoria já existe."))
      return
    }
    dispatch(addCategory())
    dispatch(createAlertSucess("Categoria adicionada com sucesso!"))
  }

  const handleRemoveCategory = (index) => {
    dispatch(removeCategory({ index: index }))
    dispatch(createAlertSucess("Categoria removida com sucesso!"))
  }

  const handleSelectCategory = (index) => {
    dispatch(selectCategory(index))
  }

  const handleReorder = (newList) => {
    dispatch(changeOrderCategory(newList))
  }

  const selected = () => {
    const objDefault = {
      title: "Categoria",
      Icon: "",
    }
    const obj = categoriesOptions[selectedCategoryIndex]
    if (obj) {
      return obj
    }
    return objDefault
  }

  return (
    <DropdownSelector
      options={categoriesOptions}
      placeholder={selected()}
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddCategory}
      handleRemove={handleRemoveCategory}
      handleReorder={handleReorder}
    />
  )
}
