import styled from "styled-components"
import { Category } from "./Category"
import { data } from "../../assets/data"

export const Home = () => {
  function changeTheme(theme) {
    const body = document.body.classList
    body.add(`theme${theme}`)
    if (theme !== "Blue") {
      body.remove("themeBlue")
    }
    if (theme !== "Pink") {
      body.remove("themePink")
    }
  }
  function changeDarkLightMode() {
    const body = document.body.classList

    if (body.contains("lightMode")) {
      body.add("darkMode")
      body.remove("lightMode")
    } else {
      body.add("lightMode")
      body.remove("darkMode")
    }
  }

  return (
    <HomeContainer>
      <button title="change color" onClick={() => changeTheme("Pink")}>
        change theme to pink
      </button>
      <button title="change color" onClick={() => changeTheme("Blue")}>
        change theme to blue
      </button>
      <button title="change color" onClick={() => changeDarkLightMode()}>
        change theme to dark/light mode
      </button>
      {data.map((data, index) => (
        <Category key={data.title + index} {...data} />
      ))}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  padding: 2em;
  width: calc(100% - 4em);

  color: var(--home-card-color);
`
