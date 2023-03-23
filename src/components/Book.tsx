import { IBook } from '../types/IBook'
import noImageLogo from '../assets/noImage.png'
import { useNavigate } from 'react-router-dom'

interface BookProps {
	book: IBook
}

export default function Book({ book }: BookProps) {
	const navigate = useNavigate()

	function handleNavigateToBookPage() {
		navigate(`/books/${book.id}`)
	}


	return (
		<div
			className='flex flex-col items-center gap-1 w-60 h-[30rem] p-4 bg-gray-300 hover:scale-105 transition-all cursor-pointer'
			onClick={handleNavigateToBookPage}
		>
			<div className='px-6 py-2 mb-4'>
				<img
					src={
						book.volumeInfo.imageLinks?.thumbnail ||
						book.volumeInfo.imageLinks?.smallThumbnail ||
						noImageLogo
					}
					alt={`${book.volumeInfo.title} poster`}
					className='object-cover h-64 book-shadow'
				/>
			</div>
			{book.volumeInfo.categories && (
				<span
					key={Math.random()}
					className='underline text-[.9rem] opacity-60'
				>
					{book.volumeInfo.categories?.at(0)?.split(',')[0]}
				</span>
			)}

			<h1 className='text-center w-full p-1 font-bold'>
				{book.volumeInfo.title}
			</h1>
			{book.volumeInfo.categories && (
				<span
					key={Math.random()}
					className='opacity-60'
				>
					{book.volumeInfo.authors?.at(0)?.split(',')[0]}
				</span>
			)}
		</div>
	)
}
