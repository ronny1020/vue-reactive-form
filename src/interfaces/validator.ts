/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableType } from './stringType'

export type ValidationErrors = {
  [key: string]: any
}

export type Validator = (value: AvailableType) => ValidationErrors

export type ValidatorFactory = (...args: any[]) => Validator
