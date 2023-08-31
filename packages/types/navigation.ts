export type PaginationProps = {
	totalPages: number;
	currentPage: number;
	isLoading: boolean;
	handleChangePage: (type: string, page?: number) => void;
};
