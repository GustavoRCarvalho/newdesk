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
  const selectedCategoryIndex = useSelector(
    (state) => state.editor.selectedCategoryIndex
  )
  const categories =
    useSelector((state) => state.editor.environment?.categories) ?? []

  const categoriesTitles = useMemo(
    () => categories.map(({ title }) => title),
    [categories]
  )

  const handleChangeCategory = useMemo(
    () => (newName, oldName) => {
      if (newName === oldName) return
      const categoryIndex = categoriesTitles.indexOf(oldName)
      if (categoryIndex === -1 || categoriesTitles.includes(newName)) {
        dispatch(createAlertWarning("Atenção: Está categoria já existe."))
        return
      }

      dispatch(changeNameCategory({ newName: newName, index: categoryIndex }))
      dispatch(createAlertSucess("Alterado com sucesso!"))
    },
    [categoriesTitles, dispatch]
  )

  const handleAddCategory = () => {
    if (categoriesTitles.includes("Nova categoria")) {
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

  const selected = categories[selectedCategoryIndex] ?? {
    title: "Categoria",
    Icon: "",
  }

  return (
    <DropdownSelector
      options={categories}
      placeholder={selected}
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddCategory}
      handleRemove={handleRemoveCategory}
      handleReorder={handleReorder}
    />
  )
}
