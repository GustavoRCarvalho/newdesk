import { gapi } from "gapi-script"

const CLIENT_ID =
  "957224851469-vvghdahkn1j1scf8afh8a1ef8igf5as4.apps.googleusercontent.com"
export const API_KEY = process.env.GOOGLE_API_KEY
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
]
const SCOPES = "https://www.googleapis.com/auth/drive.file"

export const initClient = () => {
  gapi.load("client:auth2", () => {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        console.log("Google API initialized")
      })
  })
}
