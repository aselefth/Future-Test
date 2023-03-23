import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './layouts/Layout'
import BookPage from './pages/BookPage'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import store from './store'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/search/:query',
				element: <SearchPage />
			},
			{
				path: '/books/:bookId',
				element: <BookPage />
			}
		],
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
