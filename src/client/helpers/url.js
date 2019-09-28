export function getUserName(href, usernameParamId) {
  const url = new URL(href)
  if (url.searchParams.has(usernameParamId)) {
    return url.searchParams.get(usernameParamId)
  }
}
