import { compose, zipObj, includes } from 'ramda';
// import { startOfYear, sub, endOfDay, getTime } from 'date-fns';

export const tableSortingColumn: { [key: string]: string } = {
	startTime: '開始日期',
	endTime: '結束日期',
	listnum: '顯示順序',
	id: '任務ID',
	title: '名稱',
	status: '狀態',
	cate: '任務類別',
	zp: '金幣',
	prize: '獎勵文案',
	store: '客戶名稱',
};
