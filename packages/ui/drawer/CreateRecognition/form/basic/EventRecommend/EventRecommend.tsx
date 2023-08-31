import React from 'react';
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
import { isNil } from 'ramda';
import Select from 'ui/form/Select';
import { eventRecommend, RecognitionEvents } from 'types/recognition';
import { recommendOptions } from 'ui/drawer/CreateRecognition/CreateRecognition.utils';

export default function EventRecommend({
	recognitionData,
	updateAction,
}: {
	recognitionData: eventRecommend;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const { eventType, recommend_accept, recommend_invite } = recognitionData;

	return (
		<Flex flexFlow="column">
			<FormControl isRequired>
				<FormLabel>推薦類型</FormLabel>
				<Select
					required
					name="recommend-item"
					instanceId="recommend-item"
					placeholder="請選擇推薦類型"
					options={recommendOptions}
					value={
						isNil(recommend_accept) && isNil(recommend_invite)
							? undefined
							: recommend_accept
							? recommendOptions[0]
							: recommendOptions[1]
					}
					onChange={(optionValue) => {
						const valueInOption = optionValue?.value;
						const isTypeRecommendAccept = valueInOption === 'recommend_accept';
						if (isNil(valueInOption)) {
							updateAction({
								eventType,
								recommend_accept: undefined,
								recommend_invite: undefined,
							});
							return;
						}
						updateAction({
							eventType,
							recommend_accept: isTypeRecommendAccept,
							recommend_invite: isTypeRecommendAccept ? undefined : 0,
						});
					}}
				/>
			</FormControl>
			{!isNil(recommend_invite) ? (
				<FormControl isRequired mt="16px">
					<FormLabel>數量</FormLabel>
					<NumberInput
						onChange={(valueString) => {
							updateAction({
								eventType,
								recommend_invite: valueString === '' ? '' : Number(valueString),
							});
						}}
						value={recommend_invite}
						min={0}
					>
						<NumberInputField placeholder="請輸入數量" />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</FormControl>
			) : (
				<></>
			)}
		</Flex>
	);
}
