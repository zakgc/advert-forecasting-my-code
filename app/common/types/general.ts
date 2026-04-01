export type JSONPrimitive = string | number | boolean | null | undefined
export type JSONArray = JSONValue[]
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type JSONObject = {
  [key: string]: JSONValue
}
export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export type ValueOf<T> = T[keyof T]
