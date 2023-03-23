import { Dispatch, SetStateAction } from "react"
import { IBook } from "../types/IBook"
import { Category } from "../types/IRequest"
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

// SetStateAction<Dispatch<Category>>

export function getBooksByCategory(books: IBook[], category: string): IBook[] {
    if (category === Category.ALL) {
        return books
    }

    const booksInCategory = books.filter((book) => {
        if (book.volumeInfo.categories?.includes(category)) return book
    })

    return booksInCategory
}