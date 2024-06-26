import { useState, useEffect } from "react"

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

export function onEnterSearch(e) {
  if (e.key !== "Enter") return

  const text = e.target.value
  console.log(text)
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
}

export function changeDarkLightMode(isLight) {
  const body = document.body.classList

  if (isLight) {
    body.add("darkMode")
    body.remove("lightMode")
  } else {
    body.add("lightMode")
    body.remove("darkMode")
  }
}
