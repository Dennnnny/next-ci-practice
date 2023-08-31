import { Input, FormControl, FormLabel, HStack } from '@chakra-ui/react';
import Select from 'ui/form/Select';
import { eventTask, RecognitionEvents } from 'types/recognition';
import { taskStatusOptions } from 'ui/drawer/CreateRecognition/CreateRecognition.utils';

export default function EventTask({
	recognitionData,
	updateAction,
}: {
	recognitionData: eventTask;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const { eventType, taskPchkid, taskStatus } = recognitionData;

	return (
		<HStack width="100%">
			<FormControl isRequired>
				<FormLabel>任務 ID</FormLabel>
				<Input
					placeholder="請輸入任務 ID"
					value={taskPchkid}
					onChange={(e) => {
						updateAction({
							eventType,
							taskPchkid: e.target.value,
						});
					}}
					minH="36px"
					variant="unstyled"
					isReadOnly
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>認列行為</FormLabel>
				<Select
					required
					name="task-status-item"
					instanceId="task-status-item"
					placeholder="請選擇發票資料類型"
					options={taskStatusOptions}
					value={taskStatusOptions.filter((item) => item.value === taskStatus)}
					onChange={(optionValue) => {
						updateAction({
							eventType,
							taskStatus: optionValue?.value,
						});
					}}
				/>
			</FormControl>
		</HStack>
	);
}
