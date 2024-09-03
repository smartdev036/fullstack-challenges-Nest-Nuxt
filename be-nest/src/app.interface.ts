export interface Pagination<T> {
    first: number
    last: number
    next: number
    prev: number
    page: number
    total_page: number
    total: number
    data: T[]
}
