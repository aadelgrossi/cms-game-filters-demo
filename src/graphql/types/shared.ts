export interface ContentType<T> {
  data: Array<{
    id: string
    attributes: T
  }>
}
