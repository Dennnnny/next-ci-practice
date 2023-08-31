// import { audienceOption, transactionOption } from '@/types/task-audience';
import { format } from 'date-fns';
import { map, test } from 'ramda';

export type audienceOption = {
	id: string;
	display: string;
	description?: string;
	overview: { date?: string; user_count?: number };
	version: number;
};

export type transactionOption = { feature: string; id: number; title: string };


export function dateFormat(date: string | number | Date): string {
	if (typeof date === 'string' && date.length === 8) {
		return `${date.substring(0, 4)}/${date.substring(4, 6)}/${date.substring(
			6
		)}`;
	}
	if (typeof date === 'string' && date.length === 24 && date.includes('T')) {
		const trimDate = date.split('T')[0].replace(/\-/gi, '');
		return dateFormat(trimDate);
	}
	if (typeof date === 'number' && date / 10 ** 12 >= 1) {
		// const DATE = date
		return new Date(date).toLocaleDateString('zh', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	}
	if (date instanceof Date) {
		return format(new Date(date), 'yyyy/MM/dd');
	}

	throw Error(
		'String should be 8 or 24 in legnth, and Number should be 13 in length'
	);
}

export function audienceOptionsFormat(audiences: audienceOption[]) {
	return audiences.map((item) => ({
		value: item.id,
		label: `
		${item.display} - 
		${item.description ?? ''} 
		(${item.overview.user_count ?? 0})
		`,
		id: item.id,
		count: item.overview.user_count ?? 0,
	}));
}

export function transactionOptionsFormat(transactions: transactionOption[]) {
	return transactions.map((item) => ({
		value: `${item.feature}-${item.id}`,
		label: `(ID:${item.id})${item.title}`,
	}));
}

export const dataToCSV = (dataKeys: string[], dataList: string[][]) => {
	let csvList = [],
		content = '';

	csvList = [
		dataKeys,
		...map(map((x: string) => (test(/^\d*-\d*$/gm)(x) ? ` ${x}` : x)))(
			dataList
		),
	];

	// 產生 csv 內容
	csvList.forEach(function (rowArray) {
		let row = rowArray
			.map((item) => {
				if (typeof item === 'string') {
					return `"${item.replaceAll('"', `""`)}"`;
				}
				return item;
			})
			.join(',');

		content += row + '\r\n';
	});

	return content;
};
