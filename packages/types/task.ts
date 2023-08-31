import { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { ReactElement, ReactNode } from 'react';

export type TaskListData = {
	id: string;
	title: string;
	status: { value: string; label: string };
	executeStatus: { value: string; label: string };
	startTime: string;
	endTime: string;
	listnum: number;
	zp: string | null;
	prize: string | null;
	store: { value: number; label: string };
};

export type TrialWebData = {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
};

export type TaskOverivewContext<T> = {
	tasks: T[];

	paginationConfig: {
		page: number;
		pageSize: number;
	};
	totalPages?: number;
	filterConfig: FilterConfigType;
	sortingConfig: SortingState;
};

export type FilterConfigType = {
	searchInput: string;
	startTime: string;
	endTime: string;
	store: { value: string; label: string }[];
	status: { value: string; label: string }[];
	executeStatus: { value: string; label: string }[];
};

export type FilterAreaProps = {
	isModified: boolean;
	isLoading: boolean;
	filterConfig: FilterConfigType;
	send: Function;
};

export type FilterContainerProps = {
	children: ReactElement;
	filterLabel: string | string[];
};

export type Options = { value: string | number; label: string };

export type FilterSelectProps = {
	name: string;
	displayName: string;
	selectValue?: Options[];
	options?: Options[];
	send: Function;
	isSearchable?: boolean;
	remoteOptionsPath?: string;
};

export type FilterDatepickerProps = {
	name: string;
	dateValue: string;
	displayName: string;
	send: Function;
};

export type TableProps = {
	data: TaskListData[];
	isLoading: boolean;
	isDataEmpty: boolean;
	sorting: SortingState;
	handleSorting: Function;
};

export type CommonTableProps<T> = {
	data: T[];
	columns: ColumnDef<T>[];
	sorting?: SortingState;
	legends?: { [key: string]: string };
	handleSorting?: Function;
	renderRow: (value: Row<T>, index: number, array: Row<T>[]) => ReactNode;
	isLoading: boolean;
	isDataEmpty: boolean;
};

export interface FormConfigItemType {
	label: string;
	dataKey: string;
	dataType: string;
	defaultValue: string;
	hintText: string;
	limitations: {
		required: boolean;
	};
}

export interface ReactSelectOptionType {
	value: string;
	label: string;
}

export interface ReactSelectOptionDirtyFieldsType {
	value?: boolean;
	label?: boolean;
}

export interface TaskFormType {
	title: string;
	period:
		| {
				start: Date;
				end: Date;
		  }
		| undefined;
	cate: ReactSelectOptionType;
	viewcate: ReactSelectOptionType[];
	listnum: number;
	page: ReactSelectOptionType;
	actionUrl: string;
	cta: string;
	desc: string;
	image: File[];
	prize: string;
	imageTags: string;
	storeInfo: ReactSelectOptionType & {
		storeName: string;
		storeImgUrl: string;
	};
	target: ReactSelectOptionType;
	zp: number;
	nums: number;
	times: number;
	range: number;
	timesAll: number;
	rangeAll: number;
	trackingCode: string;
}

export interface TaskFormDirtyFields {
	title?: boolean;
	period?: {
		start?: boolean;
		end?: boolean;
	};
	cate?: ReactSelectOptionDirtyFieldsType;
	viewcate?: ReactSelectOptionDirtyFieldsType[];
	listnum?: boolean;
	page?: ReactSelectOptionDirtyFieldsType;
	actionUrl?: boolean;
	cta?: boolean;
	desc?: boolean;
	image?: boolean[];
	prize?: boolean;
	imageTags?: boolean;
	storeInfo?: ReactSelectOptionDirtyFieldsType & {
		storeName?: boolean;
		storeImgUrl?: boolean;
	};
	target?: ReactSelectOptionDirtyFieldsType;
	zp?: boolean;
	nums?: boolean;
	times?: boolean;
	range?: boolean;
	timesAll?: boolean;
	rangeAll?: boolean;
	trackingCode?: boolean;
}
