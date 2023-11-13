import React from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { isEmpty, compose, map, join, zip } from 'ramda';
import {
	Input,
	InputGroup,
	InputRightElement,
	IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const getPeriodDisplayValue = (value: string) =>
	compose(
		join('｜'),
		map(([label, value]) => (!isEmpty(value) ? `${label}: ${value}` : '')),
		zip(['開始日期', '結束日期'])
	)([...value]);

export default function PeriodPicker({
	isPeriodModeRange = true,
	datepickerValue = [],
	setDatepickerValue,
	clearDatepickerValue,
}: {
	isPeriodModeRange: boolean;
	datepickerValue: Date[] | [];
	setDatepickerValue: (date: DateObject) => void;
	clearDatepickerValue: () => void;
}) {
	return (
		<DatePicker
			range={isPeriodModeRange}
			value={datepickerValue}
			onChange={setDatepickerValue}
			fixMainPosition={true}
			containerStyle={{
				width: '100%',
			}}
			render={(value: string, openCalendar: () => void) => {
				const periodDisplayValue = getPeriodDisplayValue(value);

				return (
					<InputGroup size="md">
						<Input
							minW="400px"
							value={periodDisplayValue}
							onClick={openCalendar}
							placeholder="請選擇時間區間"
							readOnly
							disabled={!isPeriodModeRange}
						/>
						<InputRightElement>
							{!isEmpty(datepickerValue) ? (
								<IconButton
									aria-label="Delete period input"
									size="sm"
									variant="ghost"
									icon={<CloseIcon />}
									onClick={clearDatepickerValue}
								/>
							) : (
								<></>
							)}
						</InputRightElement>
					</InputGroup>
				);
			}}
		/>
	);
}
