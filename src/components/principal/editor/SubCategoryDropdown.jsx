import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  setEditor,
  selectSubCategoryIndex,
  selectArticleIndex,
} from "../../../store/editorSlice"
import {
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"

export const SubCategoryDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  let newCopy = JSON.parse(JSON.stringify(editorData.categories))

  const subCategoriesOptions =
    editorData.categories[editorState.selectedCategoryIndex]?.subCategories ??
    []
  const subCategories = subCategoriesOptions.map(({ title }) => title)

  const handleChangeSubCategory = (newName, oldName) => {
    if (newName === oldName) return
    const subCategoryIndex = subCategories.indexOf(oldName)
    if (subCategoryIndex === -1 || subCategories.includes(newName)) {
      dispatch(createAlertWarning("Atenção: Está sub categoria já existe."))
      return
    }
    newCopy[editorState.selectedCategoryIndex].subCategories[
      subCategoryIndex
    ].title = newName
    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Alterado com sucesso!"))
    if (oldName === editorState.selectedSubCategory) {
      dispatch(selectSubCategoryIndex(subCategoryIndex))
    }
  }
  const handleAddSubCategory = () => {
    if (subCategories.includes("Nova sub categoria")) {
      dispatch(createAlertWarning("Atenção: Está sub categoria já existe."))
      return
    }
    const newSubCategory = {
      title: "Nova sub categoria",
      articles: [],
    }
    newCopy[editorState.selectedCategoryIndex].subCategories.push(
      newSubCategory
    )
    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Sub Categoria adicionada com sucesso!"))
  }

  const handleRemoveSubCategory = (itemName) => {
    const subCategoryIndex = subCategories.indexOf(itemName)

    newCopy[editorState.selectedCategoryIndex].subCategories.splice(
      subCategoryIndex,
      1
    )

    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Sub Categoria removida com sucesso!"))

    if (subCategoryIndex === editorState.selectedSubCategory) {
      dispatch(selectSubCategoryIndex(-1))
      dispatch(selectArticleIndex(-1))
    }
  }

  const handleSelectCategory = (itemName) => {
    dispatch(selectSubCategoryIndex(itemName))
    dispatch(selectArticleIndex(-1))
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
