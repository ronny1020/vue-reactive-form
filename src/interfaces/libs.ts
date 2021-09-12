export type OptionalPropertyOf<T extends Record<string, unknown>> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K
  }[keyof T],
  undefined
>

export type OptionalPropertiesObject<T extends Record<string, unknown>> = Pick<
  T,
  OptionalPropertyOf<T>
>
