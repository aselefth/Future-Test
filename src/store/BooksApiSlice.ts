import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBook } from '../types/IBook'
import { IBooksResponse } from '../types/IBooksResponse'
import { IBooksRequest } from '../types/IRequest'

const booksQueryStr = `volumes?key=${import.meta.env.VITE_API_KEY}&maxResults=30&printType=books`
const bookQueryStr = `?key=${import.meta.env.VITE_API_KEY}`

const booksApiSlice = createApi({
	reducerPath: 'booksApiSlice',
	tagTypes: ['Books'],
	baseQuery: fetchBaseQuery({
		baseUrl: `https://www.googleapis.com/books/v1`,
	}),
	endpoints: (build) => ({
		getBooks: build.query<IBooksResponse, IBooksRequest>({
			query: ({title, startIndex, orderBy}) => ({
				url: `${booksQueryStr}&q=${title}&startIndex=${startIndex}&orderBy=${orderBy}`,
			}),
			providesTags: ['Books']
			
		}),
		getBookById: build.query<IBook, string>({
			query: (bookId) => ({
				url: `volumes/${bookId}${bookQueryStr}`
			}),
			providesTags: ['Books']
		})
	}),
})

export default booksApiSlice
export const { useGetBooksQuery, useGetBookByIdQuery } = booksApiSlice
