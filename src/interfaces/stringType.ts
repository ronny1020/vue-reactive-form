/* eslint-disable @typescript-eslint/no-explicit-any */
export type AvailableType =
  | 'boolean'
  | 'number'
  | 'string'
  | 'boolean[]'
  | 'number[]'
  | 'string[]'
  | 'any'

export type TypeFromString<T extends AvailableType> = T extends 'boolean'
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
