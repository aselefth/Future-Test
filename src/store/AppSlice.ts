import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterFromDuplicate } from "../services/booksSort";
import { IBook } from "../types/IBook";
import { Category, OrderBy } from "../types/IRequest";

interface InitialState {
    searchValue: string
    books: IBook[],
    category: Category,
    orderBy: OrderBy,
    startIndex: number
}

const initialState: InitialState = {
    searchValue: '',
    books: [],
    orderBy: OrderBy.RELEVANCE,
    category: Category.ALL,
    startIndex: 0
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<{searchValue: string}>) => {
            state.searchValue = action.payload.searchValue
        },
        clearBooks: (state) => {
            state.books = [],
            state.category = Category.ALL
            state.orderBy = OrderBy.RELEVANCE
            state.startIndex = 0
        },
        addBooks: (state, action: PayloadAction<{books: IBook[]}>) => {
            state.books = filterFromDuplicate([...state.books, ...action.payload.books])
        },
        setBooks: (state, action: PayloadAction<{books: IBook[]}>) => {
            state.books = filterFromDuplicate(action.payload.books)
        }
    }
})

export const {reducer: appReducer, actions: appActions} = appSlice