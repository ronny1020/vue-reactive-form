/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableType } from './availableType'

export type ValidationErrors = {
  [key: string]: any
}

export type Validator<T extends AvailableType> = (value: T) => ValidationErrors | null

export type ValidatorFactory<T extends AvailableType> = (...args: any[]) => Validator<T>
