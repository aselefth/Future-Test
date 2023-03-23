import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import booksApiSlice from './BooksApiSlice'

const store = configureStore({
	reducer: {
        [booksApiSlice.reducerPath]: booksApiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(booksApiSlice.middleware)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
