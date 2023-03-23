import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import search from '../assets/search.svg'
import { useAppDispatch, useAppSelector } from '../store'
import { appActions } from '../store/AppSlice'

export default function Navigation() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const searchValue = useAppSelector((state) => state.appReducer.searchValue)

	function handleSubmitForm() {
		if (searchValue === '') return
		navigate(`/search/${searchValue}`)
		dispatch(appActions.setSearchValue({searchValue: ''}))
	}

	return (
		<nav className='bg-green-700 w-full fixed top-0 left-0 right-0 h-12 px-5 md:px-10 xl:px-40 py-2 flex justify-between items-center z-10'>
			<p
				onClick={() => navigate('/')}
				className='cursor-pointer text-sm sm:text-xl font-bold uppercase text-white'
			>
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
					value={searchValue}
					onChange={(e) => dispatch(appActions.setSearchValue({searchValue: e.target.value}))}
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
