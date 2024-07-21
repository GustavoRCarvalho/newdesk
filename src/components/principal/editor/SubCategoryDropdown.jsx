import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  addSubCategory,
  changeNameSubCategory,
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
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment

  const subCategoriesOptions = useMemo(
    () =>
      editorData.categories[editorState.selectedCategoryIndex]?.subCategories ??
      [],
    [editorData.categories, editorState.selectedCategoryIndex]
  )
  const subCategories = useMemo(
    () => subCategoriesOptions.map(({ title }) => title),
    [subCategoriesOptions]
  )

  const handleChangeSubCategory = useMemo(
    () => (newName, oldName) => {
      if (newName === oldName) return
      const subCategoryIndex = subCategories.indexOf(oldName)
      if (subCategoryIndex === -1 || subCategories.includes(newName)) {
        dispatch(createAlertWarning("Atenção: Está sub categoria já existe."))
        return
      }
      dispatch(
        changeNameSubCategory({ newName: newName, index: subCategoryIndex })
      )
      dispatch(createAlertSucess("Alterado com sucesso!"))
    },
    [dispatch, subCategories]
  )

  const handleAddSubCategory = () => {
    if (subCategories.includes("Nova sub categoria")) {
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

  const selected = () => {
    const objDefault = {
      title: "Sub Categoria",
    }
    const obj = subCategoriesOptions[editorState.selectedSubCategoryIndex]
    if (obj) {
      return obj
    }
    return objDefault
  }

  return (
    <DropdownSelector
      options={subCategoriesOptions}
      disabled={editorState.selectedCategoryIndex === -1}
      placeholder={selected()}
      onSelect={handleSelectCategory}
      handleChange={handleChangeSubCategory}
      handleAdd={handleAddSubCategory}
      handleRemove={handleRemoveSubCategory}
    />
  )
}
