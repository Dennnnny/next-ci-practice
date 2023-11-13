import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { eventHand, RecognitionEvents } from 'types/recognition';

export default function EventHand({
	recognitionData,
	updateAction,
}: {
	recognitionData: eventHand;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const { eventType, hand_id } = recognitionData;

	return (
		<Flex>
			<FormControl isRequired>
				<FormLabel>任務 ID</FormLabel>
				<Input
					placeholder="請輸入任務 ID"
					value={hand_id}
					onChange={(e) => {
						updateAction({
							eventType,
							hand_id: e.target.value,
						});
					}}
					minH="36px"
					variant="unstyled"
					isReadOnly
				/>
			</FormControl>
		</Flex>
	);
}
