/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableType } from './stringType'

export type Validator = (value: AvailableType) => Record<string, true>

export type ValidatorFactory = (...args: any[]) => Validator
