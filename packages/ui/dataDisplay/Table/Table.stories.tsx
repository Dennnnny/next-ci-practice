import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Table from './Table';
import { tableData } from '../../../../../mocks/data/task/overview/tableData';
import { TaskListData } from 'types/task';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { Td, Tr } from '@chakra-ui/react';

export default {
	title: 'DataDisplay/TaskListTables',
	component: Table,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table<TaskListData>> = (args) => (
	<Table {...args} />
);

const mockColumns: ColumnDef<TaskListData>[] = [
	{
		header: '任務ID',
		accessorFn: (row) => row.id,
	},
	{
		header: '名稱',
		accessorFn: (row) => row.title,
	},
	{
		header: '客戶名稱',
		accessorFn: (row) => row.store.label,
		maxSize: 120,
	},
	{
		header: '狀態',
		accessorFn: (row) => row.status.label,
	},
	{
		header: '開始日期',
		accessorFn: (row) => row.startTime,
	},
	{
		header: '結束日期',
		accessorFn: (row) => row.endTime,
	},

	{ header: '金幣', accessorFn: (row) => row.zp },
	{ header: '獎勵文案', accessorFn: (row) => row.prize, maxSize: 120 },
	{ header: '顯示順序', accessorFn: (row) => row.listnum },
];

export const Empty = Template.bind({});
Empty.args = {
	data: [],
	columns: [],
	isDataEmpty: true,
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};

export const Normal = Template.bind({});
Normal.args = {
	isLoading: false,
	isDataEmpty: false,
	data: tableData,
	columns: mockColumns,
	sorting: [],
	renderRow: (row, index) => {
		return (
			<Tr
				key={row.id}
				_hover={{
					cursor: 'pointer',
					background: 'gray.100',
				}}
				transition={'0.1s'}
				color="text"
			>
				{row.getVisibleCells().map((cell) => (
					<Td
						key={cell.id}
						fontSize="sm"
						textOverflow="ellipsis"
						maxWidth={`${cell.column.columnDef.maxSize}px`}
						overflow="hidden"
						whiteSpace="pre"
						padding="16px"
						onClick={() => {}}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</Td>
				))}
			</Tr>
		);
	},
};
