import { Link } from "react-router-dom"
import React, { useEffect } from "react"
import { API_KEY, initClient } from "../../utils/googleDriveApi"
import { gapi } from "gapi-script"
import { data } from "../../assets/data"

export const Principal = () => {
  const driveLink = "zzhelp"

  useEffect(() => {
    initClient()
  }, [])

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn()
  }

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut()
  }

  const listFiles = () => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
      })
      .then((response) => {
        const files = response.result.files
        if (files && files.length > 0) {
          console.log("Files:")
          files.forEach((file) => {
            console.log(`${file.name} (${file.id})`)
          })
        } else {
          console.log("No files found.")
        }
      })
  }

  const uploadJson = (jsonObject) => {
    const boundary = "-------314159265358979323846"
    const delimiter = `\r\n--${boundary}\r\n`
    const closeDelimiter = `\r\n--${boundary}--`

    const contentType = "application/json"
    const metadata = {
      name: "data.json", // Nome do arquivo que será salvo no Google Drive
      mimeType: contentType,
    }

    const base64Data = btoa(JSON.stringify(jsonObject))
    const multipartRequestBody =
      delimiter +
      "Content-Type: application/json\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: " +
      contentType +
      "\r\n" +
      "Content-Transfer-Encoding: base64\r\n" +
      "\r\n" +
      base64Data +
      closeDelimiter

    const request = gapi.client.request({
      path: "/upload/drive/v3/files",
      method: "POST",
      params: { uploadType: "multipart" },
      headers: {
        "Content-Type": 'multipart/related; boundary="' + boundary + '"',
      },
      body: multipartRequestBody,
    })

    request.execute((file) => {
      console.log("File uploaded: ", file)
    })
  }

  const handleUploadJson = () => {
    uploadJson(data)
  }

  const readJsonFile = async (fileId) => {
    fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-16le",
        },
      }
    )
      .then((response) =>
        response.arrayBuffer().then((buffer) => {
          const decoder = new TextDecoder("utf-8")
          const decodedString = decoder.decode(buffer)
          console.log(JSON.parse(decodedString))
        })
      )

      .catch((error) => console.error("Erro ao acessar o arquivo:", error))
  }

  const updateJsonFile = async (fileId) => {
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
      const response = await gapi.client.request({
        path: `/upload/drive/v3/files/${fileId}`, //trocar aqui pra file id
        method: "PATCH",
        params: { uploadType: "multipart" },
        headers: {
          "Content-Type": 'multipart/related; boundary="' + boundary + '"',
        },
        body: multipartRequestBody,
      })
      console.log("File updated: ", response)
    } catch (error) {
      console.error("Error updating JSON file:", error)
    }
  }

  return (
    <div>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={listFiles}>List Files</button>
      <button onClick={handleUploadJson}>Create Test File</button>
      <button onClick={() => readJsonFile("1AX29I0vYlDuiYVO8L3yVoI39IMXoF5lm")}>
        Read Test File
      </button>
      <button
        onClick={() => updateJsonFile("1AX29I0vYlDuiYVO8L3yVoI39IMXoF5lm")}
      >
        Atualizar Test File
      </button>
      <button onClick={handleSignOut}>Sign Out</button>
      <Link to={`/environment?environment=${driveLink}`}>{driveLink}</Link>
      <br />
      <Link to={`/edit?environment=${driveLink}`}>edit</Link>
    </div>
  )
}
