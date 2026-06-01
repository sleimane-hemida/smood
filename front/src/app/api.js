export function apiUrl(path) {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim()

  if (!baseUrl) {
    return path
  }

  return `${baseUrl.replace(/\/$/, '')}${path}`
}