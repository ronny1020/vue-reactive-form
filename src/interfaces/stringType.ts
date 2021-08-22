/* eslint-disable @typescript-eslint/no-explicit-any */
export type AvailableStringType =
  | 'boolean'
  | 'number'
  | 'string'
  | 'boolean[]'
  | 'number[]'
  | 'string[]'
  | 'any'

export type TypeFromString<T extends AvailableStringType> = T extends 'boolean'
  ? boolean
  : T extends 'number'
  ? number
  : T extends 'string'
  ? string
  : T extends 'boolean[]'
  ? boolean[]
  : T extends 'number[]'
  ? number[]
  : T extends 'string[]'
  ? string[]
  : T extends 'any'
  ? any
  : never

export type AvailableType = TypeFromString<AvailableStringType>
