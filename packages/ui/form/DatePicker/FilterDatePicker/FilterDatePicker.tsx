import FilterContainer from 'ui/filter/task/FilterContainer';
import { FilterDatepickerProps } from 'types/task';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex } from '@chakra-ui/react';
import { isEmpty } from 'ramda';
import DatePicker from 'react-multi-date-picker';

export default function FilterDatepicker({
	dateValue,
	displayName,
	name,
	send,
}: FilterDatepickerProps) {
	const isDateEmpty = isEmpty(dateValue);
	return (
		<FilterContainer filterLabel={isDateEmpty ? '' : displayName}>
			<DatePicker
				onChange={(date) => {
					send({
						type: 'ON_CHANGE_FILTER',
						data: { [name]: date?.toString() },
					});
				}}
				render={(_: string, openCalendar: () => void) => {
					return (
						<Box
							width={120}
							fontSize={14}
							onClick={isDateEmpty ? openCalendar : () => {}}
							as={Button}
							zIndex={10}
						>
							{isDateEmpty ? (
								displayName
							) : (
								<Flex
									fontSize={14}
									justifyContent="space-between"
									alignItems="center"
									gap={2}
								>
									<Box onClick={openCalendar}>{dateValue}</Box>
									<CloseIcon
										_hover={{ color: 'red.500', background: 'transparent' }}
										onClick={() =>
											send({
												type: 'ON_CHANGE_FILTER',
												data: { [name]: '' },
											})
										}
										width={2}
									/>
								</Flex>
							)}
						</Box>
					);
				}}
			/>
		</FilterContainer>
	);
}
