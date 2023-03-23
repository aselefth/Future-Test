export default function BookSkeleton() {

	return (
		<div className='flex flex-col items-center w-60 h-[30rem] p-2 rounded bg-gray-200 animate-pulse gap-4'>
			<div className="w-full h-64 bg-gray-400 rounded-lg"></div>
            <div className="w-full h-6 bg-gray-400 rounded-lg"></div>
            <div className="w-full h-6 bg-gray-400 rounded-lg"></div>
            <div className="w-full h-6 bg-gray-400 rounded-lg"></div>
		</div>
	)
}