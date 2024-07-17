import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  setEditor,
  selectCategoryIndex,
  selectSubCategoryIndex,
  selectArticleIndex,
} from "../../../store/editorSlice"
import {
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"

export const CategoryDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  let newCopy = JSON.parse(JSON.stringify(editorData.categories))

  // console.log(editorData.categories)

  const categoriesOptions = editorData.categories ?? []
  const categories = categoriesOptions.map(({ title }) => title)

  const handleChangeCategory = (newName, oldName) => {
    if (newName === oldName) return
    const categoryIndex = categories.indexOf(oldName)
    if (categoryIndex === -1 || categories.includes(newName)) {
      dispatch(createAlertWarning("Atenção: Está categoria já existe."))
      return
    }

    newCopy[categoryIndex].title = newName
    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Alterado com sucesso!"))
  }

  const handleAddCategory = () => {
    if (categories.includes("Nova categoria")) {
      dispatch(createAlertWarning("Atenção: Está categoria já existe."))
      return
    }
    const newCategory = {
      title: "Nova categoria",
      Icon: "",
      subCategories: [],
    }
    dispatch(createAlertSucess("Categoria adicionada com sucesso!"))
    dispatch(setEditor([...editorData.categories, newCategory]))
  }

  const handleRemoveCategory = (itemName) => {
    const categoryIndex = categories.indexOf(itemName)

    newCopy.categories.splice(categoryIndex, 1)
    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Categoria removida com sucesso!"))
    if (categoryIndex === editorState.selectedCategoryIndex) {
      dispatch(selectCategoryIndex(-1))
      dispatch(selectSubCategoryIndex(-1))
      dispatch(selectArticleIndex(-1))
    }
  }

  const handleSelectCategory = (itemIndex) => {
    dispatch(selectCategoryIndex(itemIndex))
    dispatch(selectSubCategoryIndex(-1))
    dispatch(selectArticleIndex(-1))
  }

  const selected = () => {
    const objDefault = {
      title: "Categoria",
      Icon: "",
    }
    const obj = categoriesOptions[editorState.selectedCategoryIndex]
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
    />
  )
}
