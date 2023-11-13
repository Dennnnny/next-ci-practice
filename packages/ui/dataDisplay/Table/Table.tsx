import { CommonTableProps } from 'types/task';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Flex,
	Box,
	Skeleton,
	Container,
	List,
	ListItem,
	ListIcon,
} from '@chakra-ui/react';

import { isEmpty, isNil } from 'ramda';
import { CircleIcon } from './Table.utils';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

export default function TableComponent<T>({
	data,
	columns,
	sorting,
	legends,
	handleSorting,
	renderRow,
	isLoading,
	isDataEmpty,
}: CommonTableProps<T>) {
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: !isNil(handleSorting)
			? (v) => {
					const value = typeof v === 'function' ? v(sorting!) : [];
					const sortingId = isEmpty(value) ? '' : value[0].id;
					handleSorting(sortingId);
			  }
			: () => {},
		getCoreRowModel: getCoreRowModel(),
	});

	if (isLoading) {
		return (
			<Table>
				{Array.from({ length: 10 }).map((_, i) => (
					<Tbody key={i}>
						<Tr>
							<Td>
								<Skeleton height="20px" />
							</Td>
						</Tr>
					</Tbody>
				))}
			</Table>
		);
	}

	if (isDataEmpty) {
		return (
			<Container>
				<Flex justifyContent="center">沒找到資料，請重新檢查篩選條件!</Flex>
			</Container>
		);
	}

	return (
		<>
			{!isNil(legends) && (
				<List display="flex" gap={2} mb={2}>
					{Object.entries(legends).map(([label, color], index) => (
						<ListItem
							key={label}
							color={color}
							fontSize="sm"
							display="flex"
							alignItems="center"
						>
							<ListIcon as={() => <CircleIcon color={color} />} color={color} />
							{label}
						</ListItem>
					))}
				</List>
			)}
			<Table>
				<Thead>
					{table.getHeaderGroups().map((headerGroup) => {
						return (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th key={header.id} colSpan={header.colSpan} padding="16px">
											{header.isPlaceholder ? null : (
												<Flex
													alignItems="center"
													width="max-content"
													justifyContent="flex-start"
													pos="relative"
													color="text"
												>
													<Box
														fontSize="md"
														onClick={header.column.getToggleSortingHandler()}
														_hover={{
															cursor: header.column.getCanSort()
																? 'pointer'
																: 'default',
														}}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
														{{
															asc: (
																<TriangleUpIcon
																	pos="absolute"
																	right={-5}
																	aria-label="sorted ascending"
																/>
															),
															desc: (
																<TriangleDownIcon
																	pos="absolute"
																	right={-5}
																	aria-label="sorted descending"
																/>
															),
														}[header.column.getIsSorted() as string] ?? null}
													</Box>
												</Flex>
											)}
										</Th>
									);
								})}
							</Tr>
						);
					})}
				</Thead>
				<Tbody>
					{table
						.getRowModel()
						.rows // .rows.slice(0, 5)
						.map(renderRow)}
				</Tbody>
			</Table>
		</>
	);
}
