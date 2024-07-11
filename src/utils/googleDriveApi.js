import { gapi } from "gapi-script"
import { data } from "../assets/data"

const CLIENT_ID =
  "957224851469-vvghdahkn1j1scf8afh8a1ef8igf5as4.apps.googleusercontent.com"
export const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
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
      .catch((error) => {
        console.error("Error initializing Google API", error)
        alert(
          "There was an issue initializing Google API. Please check your browser settings for third-party cookies."
        )
      })
  })
}

export const handleSignIn = async () => {
  try {
    await gapi.auth2.getAuthInstance().signIn()
  } catch (e) {
    console.log(e)
  }
}

export const handleIsSignIn = () => {
  return gapi.auth2.getAuthInstance().isSignedIn.get()
}

export const handleSignOut = () => {
  gapi.auth2.getAuthInstance().signOut()
}

export const listFiles = async () => {
  try {
    const response = await gapi.client.drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name, createdTime, size)",
    })

    const result = await Promise.all(
      response.result.files.map(async (item) => {
        item.shared = await getSharingStatus(item.id)
        return item
      })
    )

    return result
  } catch (error) {
    console.log(error)
    throw error // Lançar o erro para que possa ser tratado pelo chamador
  }
}

export const handleUploadJson = async (jsonObject, name) => {
  const newName = name === "" ? "data" : name
  const boundary = "-------314159265358979323846"
  const delimiter = `\r\n--${boundary}\r\n`
  const closeDelimiter = `\r\n--${boundary}--`

  const contentType = "application/json"
  const metadata = {
    name: `${newName}.json`, // Nome do arquivo que será salvo no Google Drive
    mimeType: contentType,
  }

  const utf = JSON.stringify(jsonObject)
  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: " +
    contentType +
    "\r\n" +
    "Content-Transfer-Encoding: utf-8\r\n" +
    "\r\n" +
    utf +
    closeDelimiter

  try {
    const response = await gapi.client.request({
      path: "/upload/drive/v3/files",
      method: "POST",
      params: { uploadType: "multipart" },
      headers: {
        "Content-Type": 'multipart/related; boundary="' + boundary + '"',
      },
      body: multipartRequestBody,
    })
    await shareFile(response.result.id)
  } catch (error) {
    console.error("Erro ao acessar o arquivo:", error)
  }
}

export const readJsonFile = async (fileId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    )
    if (!response.ok) {
      return null
    }

    const buffer = await response.arrayBuffer()

    const decoder = new TextDecoder("utf-8")
    const decodedString = decoder.decode(buffer)

    return JSON.parse(decodedString)
  } catch (error) {
    console.error("Erro ao acessar o arquivo:", error)
    return []
  }
}

export const updateJsonFile = async (fileId) => {
  const boundary = "-------314159265358979323846"
  const delimiter = `\r\n--${boundary}\r\n`
  const closeDelimiter = `\r\n--${boundary}--`

  const contentType = "application/json"
  const metadata = {
    mimeType: contentType,
  }

  const utf = JSON.stringify(data)

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: " +
    contentType +
    "\r\n" +
    "Content-Transfer-Encoding: utf-8\r\n" +
    "\r\n" +
    utf +
    closeDelimiter

  try {
    await gapi.client.request({
      path: `/upload/drive/v3/files/${fileId}`,
      method: "PATCH",
      params: { uploadType: "multipart" },
      headers: {
        "Content-Type": 'multipart/related; boundary="' + boundary + '"',
      },
      body: multipartRequestBody,
    })
  } catch (error) {
    console.error("Error updating JSON file:", error)
  }
}

export const renameFile = async (fileId, newName) => {
  await gapi.client.drive.files
    .update({
      fileId: fileId,
      resource: {
        name: `${newName}.json`,
      },
    })
    .then(
      (response) => {
        console.log("File renamed to", response.result.name)
      },
      (error) => {
        console.error("Error renaming file", error)
      }
    )
}

export const deleteFile = async (fileId) => {
  try {
    await gapi.client.drive.files.delete({
      fileId: fileId,
    })
    console.log("File deleted successfully")
  } catch (error) {
    console.error("Error deleting file", error)
  }
}

export const shareFile = async (fileId) => {
  try {
    await gapi.client.drive.permissions.create({
      fileId: fileId,
      resource: {
        role: "reader",
        type: "anyone",
      },
    })
  } catch (error) {
    console.error("Error adding anyone permissions", error)
  }
}

export const removeSharing = async (fileId) => {
  try {
    await gapi.client.drive.permissions.delete({
      fileId: fileId,
      permissionId: "anyoneWithLink",
    })
  } catch (error) {
    console.error("Error removing anyone permissions", error)
  }
}

export const getSharingStatus = async (fileId) => {
  try {
    const response = await gapi.client.drive.permissions.list({
      fileId: fileId,
    })

    const permission = response.result.permissions
      .map(({ type }) => type)
      .includes("anyone")

    return permission
  } catch (error) {
    console.error("Error fetching permissions", error)
    return null
  }
}
