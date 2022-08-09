export interface SingleContentType<T> {
  data: {
    id: string
    attributes: T
  } | null
}

export interface MultiContentType<T> {
  data: Array<{
    id: string
    attributes: T
  }>
}
