import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Book from '../components/Book'
import BookSkeleton from '../components/BookSkeleton'
import {
	handleChangeCategory,
	handleChangeOrder,
} from '../services/booksSort'
import { useAppDispatch, useAppSelector } from '../store'
import { appActions } from '../store/AppSlice'
import { useLazyGetBooksQuery } from '../store/BooksApiSlice'
import { Category, OrderBy } from '../types/IRequest'

export default function SearchPage() {
	const query = useParams<string>().query
	const books = useAppSelector(state => state.appReducer.books)
	const [startIndex, setStartIndex] = useState(0)
	const [category, setCategory] = useState<Category>(Category.ALL)
	const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.RELEVANCE)
	const [totalItems, setTotalItems] = useState<number>(0)
	const [hasNextPage, setHasNextPage] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	const [fetchBooks, {isLoading, isFetching, isError}] = useLazyGetBooksQuery()
	useEffect(() => {
		handleFetchBooks()
		setStartIndex(prev => prev + 30)
	}, [])

	useEffect(() => {
		if (totalItems) {
			if ((totalItems - startIndex) / 30 > 1) {
				setHasNextPage(true)
			} else {
				setHasNextPage(false)
			}
		}
	}, [totalItems])

	useEffect(() => {
		setStartIndex(0)
		handleFetchBooks()
	}, [query])

	async function handleFetchBooks() {
		try {
			const data = await fetchBooks({title: String(query), subject: category, orderBy, startIndex}).unwrap()
			dispatch(appActions.setBooks({books: data.items}))
			setTotalItems(data.totalItems)
		} catch (e) {
			console.log(e)
		}
	}

	async function handleFetchMoreBooks() {
		try {
			const data = await fetchBooks({title: String(query), subject: category, orderBy, startIndex}).unwrap()
			dispatch(appActions.addBooks({books: data.items}))
			setTotalItems(data.totalItems)
		} catch (e) {
			console.log(e)
		}
	}

	function handleLoadNewPage () {
		handleFetchMoreBooks()
		setStartIndex(prev => prev + 30)
	}

	return (
		<div className='flex flex-col items-center gap-4'>
			{isError && (
				<p className='fixed z-10 bg-red-400 text-white left-10 bottom-20 px-4 py-2 text-lg'>
					Something went wrong. Try again, please
				</p>
			)}

			<>
				<h1 className='text-2xl'>
					{totalItems === 0 ? 'no ' : `${totalItems} `}
					results found for "{query}"
				</h1>
				<div className='flex gap-6 flex-wrap'>
					<div className='flex gap-2 text-lg items-center'>
						<span>sort by</span>
						<select
							value={orderBy}
							onChange={(e) => handleChangeOrder(e, setOrderBy, handleFetchBooks, setStartIndex)}
							className='px-2 py-1 text-lg bg-gray-100'
						>
							{Object.values(OrderBy).map((orderOption) => (
								<option key={orderOption} value={orderOption}>
									{orderOption}
								</option>
							))}
						</select>
					</div>
					<div className='flex gap-2 text-lg items-center'>
						<span>category</span>
						<select
							value={category}
							onChange={(e) =>
								handleChangeCategory(e, setCategory, handleFetchBooks, setStartIndex)
							}
							className='px-2 py-1 text-lg bg-gray-100'
						>
							{Object.values(Category).map((category) => (
								<option key={category} value={category}>
									{category === '' ? 'all' : category}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='flex flex-wrap gap-4 items-center justify-center'>
					{books.map((book) => (
						<Book key={book.id} book={book} />
					))}
					{(isFetching || isLoading) && (
						<>
							<BookSkeleton />
							<BookSkeleton />
							<BookSkeleton />
							<BookSkeleton />
							<BookSkeleton />
							<BookSkeleton />
							<BookSkeleton />
							<BookSkeleton />
						</>
					)}
				</div>
			</>

			{hasNextPage &&
				books.length !== 0 && (
					<button
						onClick={handleLoadNewPage}
						className={`px-2 py-1 shadow-md text-lg bg-green-700 
					text-white mt-8 rounded hover:rounded-md hover:opacity-90 transition-all`}
					>
						load more
					</button>
				)}
		</div>
	)
}
