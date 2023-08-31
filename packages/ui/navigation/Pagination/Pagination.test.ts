import { generatorPagesList } from './Pagination.utils';

describe('pagination testing', () => {
	it('範例1, 總頁數5頁, 目前在第2頁', () => {
		const expectedList = [1, 2, 3, 4, 5];
		expect(generatorPagesList({ currentPage: 2, totalPages: 5 })).toEqual(
			expectedList
		);
	});

	it('範例2, 總頁數10頁, 目前在第4頁', () => {
		const expectedList = [2, 3, 4, 5, 6];
		expect(generatorPagesList({ currentPage: 4, totalPages: 10 })).toEqual(
			expectedList
		);
	});

	it('範例2-2, 總頁數10頁, 目前在第5頁', () => {
		const expectedList = [3, 4, 5, 6, 7];
		expect(generatorPagesList({ currentPage: 5, totalPages: 10 })).toEqual(
			expectedList
		);
	});

	it('範例3, 總頁數12頁, 目前在第11頁', () => {
		const expectedList = [8, 9, 10, 11, 12];
		expect(generatorPagesList({ currentPage: 11, totalPages: 12 })).toEqual(
			expectedList
		);
	});

	it('範例4, 總頁數12頁, 目前在第4頁', () => {
		const expectedList = [2, 3, 4, 5, 6];
		expect(generatorPagesList({ currentPage: 4, totalPages: 12 })).toEqual(
			expectedList
		);
	});

	it('範例5, 總頁數4頁, 目前在第1頁', () => {
		const expectedList = [1, 2, 3, 4];
		expect(generatorPagesList({ currentPage: 1, totalPages: 4 })).toEqual(
			expectedList
		);
	});

	it('範例5, 總頁數4頁, 目前在第4頁', () => {
		const expectedList = [1, 2, 3, 4];
		expect(generatorPagesList({ currentPage: 4, totalPages: 4 })).toEqual(
			expectedList
		);
	});
});
