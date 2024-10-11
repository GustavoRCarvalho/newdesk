import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  addSubCategory,
  changeNameSubCategory,
  changeOrderSubCategory,
  removeSubCategory,
  selectSubCategory,
} from "../../../store/editorSlice"
import {
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"
import { useMemo } from "react"

export const SubCategoryDropdown = () => {
  const dispatch = useDispatch()
  const selectedCategoryIndex = useSelector(
    (state) => state.editor.selectedCategoryIndex
  )
  const selectedSubCategoryIndex = useSelector(
    (state) => state.editor.selectedSubCategoryIndex
  )
  const subCategories =
    useSelector(
      (state) =>
        state.editor.environment?.categories[selectedCategoryIndex]
          ?.subCategories
    ) ?? []

  const subCategoriesTitles = useMemo(
    () => subCategories.map(({ title }) => title),
    [subCategories]
  )

  const handleChangeSubCategory = useMemo(
    () => (newName, oldName) => {
      if (newName === oldName) return
      const subCategoryIndex = subCategoriesTitles.indexOf(oldName)
      if (subCategoryIndex === -1 || subCategoriesTitles.includes(newName)) {
        dispatch(createAlertWarning("Atenção: Está sub categoria já existe."))
        return
      }
      dispatch(
        changeNameSubCategory({ newName: newName, index: subCategoryIndex })
      )
      dispatch(createAlertSucess("Alterado com sucesso!"))
    },
    [dispatch, subCategoriesTitles]
  )

  const handleAddSubCategory = () => {
    if (subCategoriesTitles.includes("Nova sub categoria")) {
      dispatch(createAlertWarning("Atenção: Está sub categoria já existe."))
      return
    }

    dispatch(addSubCategory())
    dispatch(createAlertSucess("Sub Categoria adicionada com sucesso!"))
  }

  const handleRemoveSubCategory = (index) => {
    dispatch(removeSubCategory({ index: index }))
    dispatch(createAlertSucess("Sub Categoria removida com sucesso!"))
  }

  const handleSelectCategory = (index) => {
    dispatch(selectSubCategory(index))
  }

  const handleReorder = (newList) => {
    dispatch(changeOrderSubCategory(newList))
  }

  const selected = subCategories[selectedSubCategoryIndex] ?? {
    title: "Sub Categoria",
  }

  return (
    <DropdownSelector
      options={subCategories}
      disabled={selectedCategoryIndex === -1}
      placeholder={selected}
      onSelect={handleSelectCategory}
      handleChange={handleChangeSubCategory}
      handleAdd={handleAddSubCategory}
      handleRemove={handleRemoveSubCategory}
      handleReorder={handleReorder}
    />
  )
}
