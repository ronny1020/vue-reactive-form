export default function isObject(value: unknown): value is Record<string, unknown> {
  return value && value.constructor === Object
}
