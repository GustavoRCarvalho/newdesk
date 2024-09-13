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
  const editorData = useSelector((state) => state.editor.environment)
  const selectedCategoryIndex = useSelector(
    (state) => state.editor.selectedCategoryIndex
  )
  const selectedSubCategoryIndex = useSelector(
    (state) => state.editor.selectedSubCategoryIndex
  )

  const subCategoriesOptions = useMemo(() => {
    if (selectedCategoryIndex === -1) {
      return []
    }
    return editorData?.categories[selectedCategoryIndex]?.subCategories
  }, [editorData.categories, selectedCategoryIndex])

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

  const handleReorder = (newList) => {
    dispatch(changeOrderSubCategory(newList))
  }

  const selected = () => {
    const objDefault = {
      title: "Sub Categoria",
    }
    const obj = subCategoriesOptions[selectedSubCategoryIndex]
    if (obj) {
      return obj
    }
    return objDefault
  }

  return (
    <DropdownSelector
      options={subCategoriesOptions}
      disabled={selectedCategoryIndex === -1}
      placeholder={selected()}
      onSelect={handleSelectCategory}
      handleChange={handleChangeSubCategory}
      handleAdd={handleAddSubCategory}
      handleRemove={handleRemoveSubCategory}
      handleReorder={handleReorder}
    />
  )
}
