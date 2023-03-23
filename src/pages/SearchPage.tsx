import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Book from '../components/Book'
import BookSkeleton from '../components/BookSkeleton'
import {
	getBooksByCategory,
	handleChangeCategory,
} from '../services/booksCategories'
import getMappedEnum from '../services/getMappedEnum'
import { useGetBooksQuery } from '../store/BooksApiSlice'
import { IBook } from '../types/IBook'
import { Category, OrderBy } from '../types/IRequest'

export default function SearchPage() {
	const { query: title } = useParams<string>()
	const [query, setQuery] = useState<string>(String(useParams().query))
	const [books, setBooks] = useState<IBook[]>([])
	const [startIndex, setStartIndex] = useState(0)
	const [category, setCategory] = useState<Category>(Category.ALL)
	const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.RELEVANCE)
	const [totalItems, setTotalItems] = useState<number>(0)
	const [hasNextPage, setHasNextPage] = useState<boolean>(false)

	const { data, isError, isFetching, isLoading } = useGetBooksQuery({
		title: String(title),
		orderBy,
		startIndex,
	})

	useEffect(() => {
		const ids: Record<string, number> = {}
		if (!data) return
		if (query !== title) {
			setBooks(data.items)
			setQuery(String(title))
		} else {
			setBooks((prev) => {
				return [...prev, ...data.items].filter((book) => {
					if (ids[book.id]) return
					else {
						ids[book.id] = 1
					}
					return book
				})
			})
		}

		setTotalItems(data.totalItems)
	}, [data])

	useEffect(() => {
		if (Math.ceil((totalItems - startIndex) / 30)) {
			setHasNextPage(true)
		} else {
			setHasNextPage(false)
		}
	}, [totalItems])

	useEffect(() => {
		if (!data) return
		setStartIndex(0)
		setTotalItems(data?.totalItems)
		setBooks(data.items)
	}, [orderBy])

	function handleLoadBooks() {
		setStartIndex((prev) => prev + 30)
	}

	function handleChangeOrder(e: React.ChangeEvent<HTMLSelectElement>) {
		for (let orderOption of getMappedEnum(OrderBy)) {
			if (OrderBy[orderOption] === e.target.value) {
				setOrderBy(OrderBy[orderOption])
			}
		}
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
					{data?.totalItems === 0 ? 'no ' : `${data?.totalItems} `}
					results found for "{title}"
				</h1>
				<div className='flex gap-6 flex-wrap'>
					<div className='flex gap-2 text-lg items-center'>
						<span>sort by</span>
						<select
							value={orderBy}
							onChange={handleChangeOrder}
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
								handleChangeCategory(e, setCategory)
							}
							className='px-2 py-1 text-lg bg-gray-100'
						>
							{Object.values(Category).map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='flex flex-wrap gap-4 items-center justify-center'>
					{getBooksByCategory(books, category).map((book) => (
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
				getBooksByCategory(books, category).length !== 0 && (
					<button
						onClick={handleLoadBooks}
						className={`px-2 py-1 shadow-md text-lg bg-green-700 
					text-white mt-8 rounded hover:rounded-md hover:opacity-90 transition-all`}
					>
						load more
					</button>
				)}
		</div>
	)
}
