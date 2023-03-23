import { useParams } from 'react-router-dom'
import { useGetBookByIdQuery } from '../store/BooksApiSlice'
import noImageLogo from '../assets/noImage.png'
import BookPageSkeleton from '../components/BookPageSkeleton'

export default function BookPage() {
	const { bookId } = useParams()
	const { data: book, isLoading, isError } = useGetBookByIdQuery(`${bookId}`)

	return (
		<div className='flex flex-col md:flex-row items-center justify-center md:items-start gap-8 text-lg'>
			{!book && <BookPageSkeleton />}
			{book && (
				<>
					<img
						src={
							book.volumeInfo.imageLinks?.thumbnail ||
							book.volumeInfo.imageLinks?.smallThumbnail ||
							noImageLogo
						}
						alt={`${book.volumeInfo.title} poster`}
						className='object-cover h-full min-w-[14rem] w-full max-w-[24rem] book-shadow'
					/>

					<div className='flex flex-col gap-2'>
						<h1 className='text-2xl'>{book.volumeInfo.title}</h1>
						<p>
							<span className='font-bold'>Authors: </span>
							<span>{book.volumeInfo.authors}</span>
						</p>
						<p>
							<span className='font-bold'>Categories: </span>
							<span>
								{book.volumeInfo.categories
									? book.volumeInfo.categories
									: '-'}
							</span>
						</p>
						<p className='flex flex-col'>
							<span className='font-bold'>Description:</span>
							<span>{book.volumeInfo.description}</span>
						</p>
					</div>
				</>
			)}
		</div>
	)
}
