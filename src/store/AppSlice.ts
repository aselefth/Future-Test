import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterFromDuplicate } from "../services/booksSort";
import { IBook } from "../types/IBook";
import { Category, OrderBy } from "../types/IRequest";

interface InitialState {
    searchValue: string
    books: IBook[],
}

const initialState: InitialState = {
    searchValue: '',
    books: [],

}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<{searchValue: string}>) => {
            state.searchValue = action.payload.searchValue
        },
        clearBooks: (state) => {
            state.books = []
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