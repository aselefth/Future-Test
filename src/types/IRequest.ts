export interface IBooksRequest {
    title: string
    startIndex: number
    orderBy: OrderBy
	subject: Category
}

export enum Category {
	ALL = '',
	ART = 'Art',
	BIOGRAPHY = 'Biography',
	COMPUTERS = 'Computers',
	HISTORY = 'History',
	MEDICAL = 'Medical',
	POETRY = 'Poetry'
}

export enum OrderBy {
    RELEVANCE = 'relevance',
    NEWEST = 'newest'
}