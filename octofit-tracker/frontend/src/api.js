const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const getCollection = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export async function fetchCollection(resource) {
  const endpoint = resource.startsWith('http') ? resource : `${API_BASE_URL}/${resource}/`
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return getCollection(await response.json())
}