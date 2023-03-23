import { IBook } from "./IBook"

export interface IBooksResponse {
    kind: string
    totalItems: number
    items: IBook[]
}