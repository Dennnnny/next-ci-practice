import {
	Flex,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormControl,
	FormLabel,
	HStack,
} from '@chakra-ui/react';
import { compose, isEmpty } from 'ramda';
import Select from 'ui/form/Select';
import { parse } from 'ui/drawer/CreateRecognition/CreateRecognition.utils';
import { eventPayment, RecognitionEvents } from 'types/recognition';
import useRecognitionOptions from 'hooks/useRecognitionOptions';

export default function EventPayment({
	recognitionData,
	updateAction,
}: {
	recognitionData: eventPayment;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const { eventType, paymentCidx, paymentType, number } = recognitionData;
	const paymentOptions: {
		value: {
			paymentCidx: number;
			paymentType: number;
		};
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
			<HStack mt="16px">
				<FormControl>
					<FormLabel>繳費項目</FormLabel>
					<Select
						isLoading={isEmpty(paymentOptions)}
						instanceId="payment-item"
						placeholder="請選擇繳費項目"
						options={paymentOptions}
						value={paymentOptions.filter(
							(item) =>
								item.value.paymentCidx === paymentCidx &&
								item.value.paymentType === paymentType
						)}
						onChange={(optionValue) => {
							updateAction({
								eventType,
								paymentCidx: optionValue?.value.paymentCidx,
								paymentType: optionValue?.value.paymentType,
							});
						}}
					/>
				</FormControl>
			</HStack>
		</Flex>
	);
}
