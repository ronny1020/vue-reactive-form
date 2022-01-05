export type InferArrayType<T> = T extends (infer U)[] ? U : never
