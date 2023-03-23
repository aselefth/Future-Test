export default function BookPageSkeleton() {
	return (
		<div className='flex flex-col md:flex-row items-center justify-center md:items-start gap-8 text-lg animate-pulse min-w-full flex-grow'>
			<div className='object-cover h-80 md:min-w-[14rem] min-w-[12rem] max-w-[24rem] book-shadow bg-gray-400' />
			<div className="flex flex-col gap-4 w-[14rem] sm:w-[40rem] lg:w-[54rem]">
				<p className="w-full h-10 bg-gray-400 rounded-lg"/>
				<p className="w-full h-6 bg-gray-400 rounded-lg"/>
				<p className="w-full h-6 bg-gray-400 rounded-lg"/>
				<p className="w-full h-6 bg-gray-400 rounded-lg"/>
				<p className="w-full h-40 bg-gray-400 rounded-lg"/>
			</div>
		</div>
	)
}
