export interface IBooksRequest {
    title: string
    startIndex: number
    orderBy: OrderBy
}

export enum Category {
	ALL = 'all',
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