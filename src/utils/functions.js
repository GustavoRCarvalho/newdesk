import { useState, useEffect } from "react"
import { data } from "../assets/data"

export const currentDate = () => {
  var today = new Date()

  const currentDay =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

  return currentDay
}

export const convertDate = (date) => {
  const splitDate = date.split("T")[0].split("-")
  const day = splitDate[2]
  const month = convertMonth(splitDate[1])
  const year = splitDate[0]

  return `${day} ${month} de ${year}`
}

export const convertMonth = (value) => {
  switch (value) {
    case "01":
      return "Jan"
    case "02":
      return "Fev"
    case "03":
      return "Mar"
    case "04":
      return "Abr"
    case "05":
      return "Mai"
    case "06":
      return "Jun"
    case "07":
      return "Jul"
    case "08":
      return "Ago"
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

export function search(text) {
  if (text === "") return data
  const searchTermLower = text.toLowerCase()
  return data
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
              article.date.toLowerCase().includes(searchTermLower)
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
