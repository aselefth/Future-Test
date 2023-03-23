import { Dispatch, SetStateAction } from 'react'
import { IBook } from '../types/IBook'
import { Category, OrderBy } from '../types/IRequest'
import getMappedEnum from './getMappedEnum'

export function handleChangeCategory(
	e: React.ChangeEvent<HTMLSelectElement>,
	setCategory: Dispatch<SetStateAction<Category>>,
	fetch: () => void,
    setStartIndex: Dispatch<SetStateAction<number>>
) {
    setStartIndex(0)
	for (let category of getMappedEnum(Category)) {
		if (Category[category] === e.target.value) {
			setCategory(() => Category[category])
			fetch()
		}
	}
}


export function handleChangeOrder(
	e: React.ChangeEvent<HTMLSelectElement>,
	setOrderBy: Dispatch<SetStateAction<OrderBy>>,
    fetch: () => void,
    setStartIndex: Dispatch<SetStateAction<number>>
) {
    setStartIndex(0)
	for (let orderOption of getMappedEnum(OrderBy)) {
		if (OrderBy[orderOption] === e.target.value) {
			setOrderBy(() => OrderBy[orderOption])
            fetch()
		}
	}
}


export function filterFromDuplicate (books: IBook[]): IBook[] {
    const uniqueIds: string[] = []
    const res = books.filter(book => {
        if (uniqueIds.includes(book.id)) {
            return
        } else {
            uniqueIds.push(book.id)
            return book
        }
    })

    return res
}