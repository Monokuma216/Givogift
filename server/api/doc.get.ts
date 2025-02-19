import { defineEventHandler } from 'h3'

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const GOOGLE_DOC_ID = config.GOOGLE_DOC_ID
  const GOOGLE_API_KEY = config.GOOGLE_API_KEY

  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${GOOGLE_DOC_ID}/export?mimeType=text/markdown&key=${GOOGLE_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error('Не удалось загрузить документ')
    }

    const text = await response.text()
    return { content: text }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при загрузке документа',
      data: error,
    })
  }
})
