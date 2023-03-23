export default function HomePage() {
	return (
		<div className="flex flex-col gap-4 text-lg">
			<h1 className="indent-6">
				Тестовое задание с поиском книг. Карточка книги содержит в себе
				обложку, название категории (зеленый цвет), а также авторов
				(оранжевый цвет). При нажатии на карточку книги открывается
				отдельная страница с описанием.
			</h1>
            <p>Стек:</p>
            <ul className="list-disc list-inside">
                <li>React</li>
                <li>TypeScript</li>
                <li>RTK Query</li>
                <li>React-router-dom</li>
                <li>Tailwind</li>
            </ul>
		</div>
	)
}
