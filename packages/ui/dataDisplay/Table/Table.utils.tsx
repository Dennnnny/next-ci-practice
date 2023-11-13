import { Icon, Tooltip } from '@chakra-ui/react';
import { SortingState } from '@tanstack/react-table';
import { invertObj, isEmpty, isNil } from 'ramda';

export const tableLegends = {
	未開放: '#ff991f',
	執行中: '#36b37e',
	已結束: '#97a0af',
	已額滿: '#bf2600',
};

export const CircleIcon = ({ color = 'white' }: { color?: string }) => (
	<Tooltip label={invertObj(tableLegends)[color]}>
		<Icon
			viewBox="0 0 160 160"
			color={color}
			fontSize={16}
			lineHeight="1rem"
			verticalAlign="text-top"
		>
			<circle cx="80" cy="80" r="60" fill={color} />
		</Icon>
	</Tooltip>
);

export function handlePageChange(send: Function) {
	return (type: string, page?: number) => {
		if (isNil(page)) {
			send({ type });
		} else {
			send({ type, page });
		}
	};
}

export function handleSorting(send: Function, sortingConfig: SortingState) {
	return (columnId: string) => {
		const currentSortingID = isEmpty(columnId) ? sortingConfig[0].id : columnId;

		send({
			type: 'CHANGE_SORTING',
			data: { id: currentSortingID },
		});
	};
}
