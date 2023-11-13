type pagesProps = {
	currentPage: number;
	totalPages: number;
};

export const generatorPagesList = ({ currentPage, totalPages }: pagesProps) => {
	const renderPagesNumber = 5;
	const leftSpace = 2;
	const rightSpace = renderPagesNumber - leftSpace - 1; //右邊空間 = 總render頁數(空間) - 左邊預留空間 - 自己本身佔了一個空間

	// 總頁數4頁, [1,2,3,4]
	if (totalPages <= renderPagesNumber) {
		return Array.from({ length: totalPages }).map((_, index) => index + 1);
	}

	// 總頁數10頁 現在p2 [1,2*,3,4,5]
	if (currentPage <= leftSpace) {
		return Array.from({
			length: renderPagesNumber,
		}).map((_, index) => index + 1);
	}

	// 總頁數10頁 目前p9 [6,7,8,9*,10]
	if (currentPage > totalPages - rightSpace) {
		return Array.from({
			length: renderPagesNumber,
		}).map((_, index) => totalPages - leftSpace - rightSpace + index);
	}

	//  總頁數10頁, 目前在第4頁, [2,3,4,5,6]
	return Array.from({ length: renderPagesNumber }).map(
		(_, index) => index + (currentPage - leftSpace)
	);
};
