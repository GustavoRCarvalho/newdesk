const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
export const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const GISPermissionToken = (callback) => {
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: "https://www.googleapis.com/auth/drive.file",
    callback: callback,
  })

  client.requestAccessToken()
}

export const GISInit = (callback) => {
  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: callback,
  })
}

export const GISLogin = () => {
  window.google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`
      window.google.accounts.id.prompt()
    }
  })
}

export const GISLogout = () => {
  window.google.accounts.id.disableAutoSelect()
}
export const listFiles = async (token) => {
  const response = await fetch(
    "https://www.googleapis.com/drive/v3/files?fields=files(id, name, size, createdTime)",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const data = await response.json()

  if (data.code === 401) {
    data.message = "Token inválido!"
  }
  if (data.code === 403) {
    data.message = "Permissão de escopo não concedida!"
  }
  return data
}

export const createContentFile = async (token, name, image) => {
  const newName = name === "" ? "New Desk" : name

  const boundary = "-------314159265358979323846"
  const delimiter = `\r\n--${boundary}\r\n`
  const closeDelimiter = `\r\n--${boundary}--`
  const contentType = "application/json"

  const fileMetadata = {
    name: newName,
    mimeType: "application/json",
  }

  const content = {
    environmentName: newName,
    environmentImage: image,
    categories: [],
  }

  const utf = JSON.stringify(content)

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json\r\n\r\n" +
    JSON.stringify(fileMetadata) +
    delimiter +
    "Content-Type: " +
    contentType +
    "\r\n" +
    "Content-Transfer-Encoding: utf-8\r\n" +
    "\r\n" +
    utf +
    closeDelimiter

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/related; boundary="' + boundary + '"',
      },
      body: multipartRequestBody,
    }
  )

  const data = await response.json()
  await shareFile(token, data.id)
}

export const shareFile = async (token, fileId) => {
  try {
    const permissionBody = {
      role: "reader",
      type: "anyone",
    }

    await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(permissionBody),
      }
    )
  } catch (error) {
    console.error("Error adding anyone permissions", error)
    throw error
  }
}

export const deleteFile = async (token, fileId) => {
  await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateJsonFile = async (token, fileId, data) => {
  const boundary = "-------314159265358979323846"
  const delimiter = `\r\n--${boundary}\r\n`
  const closeDelimiter = `\r\n--${boundary}--`
  const contentType = "application/json"

  const fileMetadata = {
    name: data.environmentName,
    mimeType: "application/json",
  }

  const utf = JSON.stringify(data)

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json\r\n\r\n" +
    JSON.stringify(fileMetadata) +
    delimiter +
    "Content-Type: " +
    contentType +
    "\r\n" +
    "Content-Transfer-Encoding: utf-8\r\n" +
    "\r\n" +
    utf +
    closeDelimiter

  const response = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/related; boundary="' + boundary + '"',
      },
      body: multipartRequestBody,
    }
  )

  if (response.status === 401 || response.status === 403) {
    throw new Error("Sessão expirada! Por favor, confirme seu login.")
  }
  if (response.status === 404) {
    throw new Error(
      "Arquivo não encontrado na conta escolhida. Escolha outra conta!"
    )
  }
  if (response.status !== 200) {
    throw new Error("Falha ao salvar os dados. Por favor, tente novamente.")
  }
  return response
}

export const readJsonFile = async (fileId, signal) => {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`,
    {
      signal,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  )
  if (response.status === 400) {
    throw new Error(
      "Houve algum problema inesperado. Por favor, tente novamente."
    )
  }
  if (response.status === 403) {
    throw new Error("Falha no uso das credencias. Aguarde e tente novamente.")
  }
  if (response.status === 404) {
    throw new Error("Falha ao carregar. Por favor, verifique o código.")
  }
  if (!response.ok) {
    throw new Error(
      "Houve algum problema inesperado. Por favor, tente novamente."
    )
  }

  const buffer = await response.arrayBuffer()

  const decoder = new TextDecoder("utf-8")
  const decodedString = decoder.decode(buffer)

  return JSON.parse(decodedString)
}
