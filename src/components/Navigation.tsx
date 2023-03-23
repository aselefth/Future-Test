import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import search from '../assets/search.svg'

export default function Navigation() {
	const navigate = useNavigate()
	const inputRef = useRef<HTMLInputElement>(null)

	function handleSubmitForm() {
		if (inputRef?.current?.value === '') return
		if (inputRef.current) {
			navigate(`/search/${inputRef.current.value}`, {replace: true})
			inputRef.current.value = ''
		}
	}

	return (
		<nav className='bg-green-700 w-full fixed top-0 left-0 right-0 h-12 px-5 md:px-10 xl:px-40 py-2 flex justify-between items-center z-10'>
			<p onClick={() => navigate('/')} className='cursor-pointer text-sm sm:text-xl font-bold uppercase text-white'>
				search for books
			</p>
			<form
				className='flex items-center h-8'
				onSubmit={(e) => {
					e.preventDefault()
					handleSubmitForm()
				}}
			>
				<input
					ref={inputRef}
					className='text-lg h-full bg-gray-200 px-4 py-1 outline-none w-32 xsm:w-40 sm:w-60'
					placeholder='e.x. flowers...'
				/>
				<button className='bg-white h-full px-2 min-w-[2rem]'>
					<img
						src={search}
						width='20px'
						height='20px'
						alt='search-button'
					/>
				</button>
			</form>
		</nav>
	)
}
