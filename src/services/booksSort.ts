import { Dispatch, SetStateAction } from "react"
import { IBook } from "../types/IBook"
import { Category, OrderBy } from "../types/IRequest"
import getMappedEnum from "./getMappedEnum"

export function handleChangeCategory(e: React.ChangeEvent<HTMLSelectElement>, setCategory: Dispatch<SetStateAction<Category>>) {
    for (let category of getMappedEnum(Category)) {
        if (Category[category] === e.target.value) {
            setCategory(() => 
                Category[category]
            )
        }
    }
}

export function getBooksByCategory(books: IBook[], category: string): IBook[] {
    if (category === Category.ALL) {
        return books
    }

    const booksInCategory = books.filter((book) => {
        if (book.volumeInfo.categories?.includes(category)) return book
    })

    return booksInCategory
}

export function handleChangeOrder(e: React.ChangeEvent<HTMLSelectElement>, setOrderBy: Dispatch<SetStateAction<OrderBy>>) {
    for (let orderOption of getMappedEnum(OrderBy)) {
        if (OrderBy[orderOption] === e.target.value) {
            setOrderBy(() => OrderBy[orderOption])
        }
    }
}