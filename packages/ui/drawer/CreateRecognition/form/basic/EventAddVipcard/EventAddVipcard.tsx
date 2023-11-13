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
import { eventAddVipcard, RecognitionEvents } from 'types/recognition';
import useRecognitionOptions from 'hooks/useRecognitionOptions';

export default function EventAddVipcard({
	recognitionData,
	updateAction,
}: {
	recognitionData: eventAddVipcard;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const { eventType, number, pseller } = recognitionData;
	const psellerOptions: {
		value: number;
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
					<FormLabel>會員卡類型</FormLabel>
					<Select
						isLoading={isEmpty(psellerOptions)}
						instanceId="pseller-item"
						placeholder="請選擇會員卡類型"
						options={psellerOptions}
						value={psellerOptions.filter((item) => item.value === pseller)}
						onChange={(optionValue) => {
							updateAction({
								eventType,
								pseller: optionValue?.value,
							});
						}}
					/>
				</FormControl>
			</Flex>
		</Flex>
	);
}
