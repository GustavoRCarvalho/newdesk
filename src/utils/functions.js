import { useState, useEffect } from "react"

export const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", { color: [] }], // dropdown with defaults from theme
    [
      { align: [] },
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      "clean",
    ],
    ["link", "image", "video"],
  ],
}

export const generateUniqueId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

export const currentDate = () => {
  var today = new Date()

  const currentDaySplited = today.toString().split(" ")
  const currentTimeSplited = currentDaySplited[4].split(":")
  const dateString = `${convertWeek(currentDaySplited[0])}, ${
    currentDaySplited[2]
  } ${currentDaySplited[1]} de ${currentDaySplited[3]} - ${
    currentTimeSplited[0]
  }:${currentTimeSplited[1]}`

  return dateString
}

export const convertWeek = (value) => {
  switch (value) {
    case "Sun":
      return "Dom"
    case "Mon":
      return "Seg"
    case "Tue":
      return "Ter"
    case "Wed":
      return "Qua"
    case "Thu":
      return "Qui"
    case "Fri":
      return "Sex"
    default:
      return "Sab"
  }
}

export const convertDate = (date) => {
  const splitDate = date?.split("T")[0]?.split("-")
  const day = splitDate[2]
  const month = convertMonth(splitDate[1])
  const year = splitDate[0]

  return `${day} ${month} de ${year}`
}

export const convertMonth = (value) => {
  switch (value) {
    case "1":
    case "01":
      return "Jan"
    case "2":
    case "02":
      return "Fev"
    case "3":
    case "03":
      return "Mar"
    case "4":
    case "04":
      return "Abr"
    case "5":
    case "05":
      return "Mai"
    case "6":
    case "06":
      return "Jun"
    case "7":
    case "07":
      return "Jul"
    case "8":
    case "08":
      return "Ago"
    case "9":
    case "09":
      return "Set"
    case "10":
      return "Out"
    case "11":
      return "Nov"
    default:
      return "Dez"
  }
}

export const prepareCardDate = (date) => {
  const splitDate = date?.split(", ")[1]?.split(" - ")[0]

  return splitDate
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

export function changeTheme(theme) {
  const body = document.body.classList
  body.add(`theme${theme}`)
  if (theme !== "Blue") {
    body.remove("themeBlue")
  }
  if (theme !== "Pink") {
    body.remove("themePink")
  }
  if (theme !== "Yellow") {
    body.remove("themeYellow")
  }
  if (theme !== "Red") {
    body.remove("themeRed")
  }
  if (theme !== "Purple") {
    body.remove("themePurple")
  }
  if (theme !== "Green") {
    body.remove("themeGreen")
  }
}

export function changeDarkLightMode(isDark) {
  const body = document.body.classList

  if (isDark) {
    body.add("darkMode")
    body.remove("lightMode")
  } else {
    body.add("lightMode")
    body.remove("darkMode")
  }
}

export function search(e, oriData, searchData) {
  // if (
  //   (e.key === "Backspace" || e.key === "Delete") &&
  //   e.target.value.length === 1
  // ) {
  //   return oriData
  // }
  // if (e.key !== "Enter") {
  //   return searchData
  // }
  // if (e.target.value === "") return oriData
  const searchTermLower = e.target.value.toLowerCase()

  return oriData
    .map((category) => {
      if (category.title.toLowerCase().includes(searchTermLower)) {
        return category
      }
      const filteredSubCategories = category.subCategories
        .map((subCategory) => {
          if (subCategory.title.toLowerCase().includes(searchTermLower)) {
            return subCategory
          }
          const filteredArticles = subCategory.articles.filter(
            (article) =>
              article.title.toLowerCase().includes(searchTermLower) ||
              article.date.toLowerCase().includes(searchTermLower) ||
              article.content.toLowerCase().includes(searchTermLower)
          )
          if (
            subCategory.title.toLowerCase().includes(searchTermLower) ||
            filteredArticles.length > 0
          ) {
            return { ...subCategory, articles: filteredArticles }
          }
          return null
        })
        .filter((subCategory) => subCategory !== null)
      if (
        category.title.toLowerCase().includes(searchTermLower) ||
        filteredSubCategories.length > 0
      ) {
        return { ...category, subCategories: filteredSubCategories }
      }
      return null
    })
    .filter((category) => category !== null)
}
