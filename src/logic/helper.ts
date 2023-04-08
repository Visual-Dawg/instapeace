/**
 * A helper to handle unparsed returned values form `storage.onChange`.
 */
export function jsonParse<T>(string: T): T {
  try {
    return JSON.parse(string as string)
  } catch {
    return string
  }
}
