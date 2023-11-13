import {
	Flex,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import { compose, isEmpty } from 'ramda';
import Select from 'ui/form/Select';
import { parse } from 'ui/drawer/CreateRecognition/CreateRecognition.utils';
import { eventAddCard, RecognitionEvents } from 'types/recognition';
import useRecognitionOptions from 'hooks/useRecognitionOptions';

export default function EventAddCard({
	recognitionData,
	updateAction,
}: {
	recognitionData: eventAddCard;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const { eventType, number, cardtype } = recognitionData;
	const carrierOptions: {
		value: string;
		label: string;
	}[] = useRecognitionOptions({ eventType });

	return (
		<Flex flexFlow="column">
			<FormControl isRequired>
				<FormLabel>數量</FormLabel>
				<NumberInput
					onChange={(valueString) => {
						updateAction({
							eventType,
							number:
								valueString === '' ? '' : compose(Number, parse)(valueString),
						});
					}}
					value={number}
					min={0}
				>
					<NumberInputField placeholder="請輸入數量" />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</FormControl>
			<Flex mt="16px">
				<FormControl>
					<FormLabel>載具類型</FormLabel>
					<Select
						isLoading={isEmpty(carrierOptions)}
						instanceId="card-type-item"
						placeholder="請選擇載具類型"
						options={carrierOptions}
						value={carrierOptions.filter((item) => item.value === cardtype)}
						onChange={(optionValue) => {
							updateAction({
								eventType,
								cardtype: optionValue?.value,
							});
						}}
					/>
				</FormControl>
			</Flex>
		</Flex>
	);
}
