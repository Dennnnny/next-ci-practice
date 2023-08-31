import { useEffect, useState } from 'react';
import {
	Flex,
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	FormControl,
	FormLabel,
	Divider,
	Text,
} from '@chakra-ui/react';
import { isEmpty, isNil } from 'ramda';
import Select from 'ui/form/Select';
import { recognitionOptions } from './CreateRecognition.utils';
import { RecognitionEvents, RecognitionEventType } from 'types/recognition';
import {
	EventInvoiceBasicForm,
	EventAddCard,
	EventAddVipcard,
	EventPayment,
	EventProfile,
	EventTask,
	EventHand,
	EventRecommend,
} from './form/basic';
import { EventInvoiceAdvancedForm } from './form/advanced';

function getSettingFormComponent({
	currentRecognitionData,
	updateCurrentRecognitionData,
}: {
	currentRecognitionData: RecognitionEvents;
	updateCurrentRecognitionData: (updatedData: RecognitionEvents) => void;
}): JSX.Element {
	const handleSettingFormComponents = (
		currentRecognitionData: RecognitionEvents
	) => {
		const eventType = currentRecognitionData.eventType;
		switch (eventType) {
			case 'event_invo': {
				const { invoiceDataList, advancedFilterList } = currentRecognitionData;

				return (
					<Flex flexFlow="column" width="100%">
						<EventInvoiceBasicForm
							defaultInvoiceDataList={invoiceDataList}
							updateAction={updateCurrentRecognitionData}
						/>
						<Divider mt="16px" />
						<EventInvoiceAdvancedForm
							defaultAdvancedFilterList={advancedFilterList}
							updateAction={updateCurrentRecognitionData}
						/>
					</Flex>
				);
			}
			case 'event_task': {
				return (
					<EventTask
						recognitionData={currentRecognitionData}
						updateAction={updateCurrentRecognitionData}
					/>
				);
			}
			case 'event_hand': {
				return (
					<EventHand
						recognitionData={currentRecognitionData}
						updateAction={updateCurrentRecognitionData}
					/>
				);
			}
			case 'event_set_profile': {
				return (
					<EventProfile
						recognitionData={currentRecognitionData}
						updateAction={updateCurrentRecognitionData}
					/>
				);
			}
			case 'event_recommend': {
				return (
					<EventRecommend
						recognitionData={currentRecognitionData}
						updateAction={updateCurrentRecognitionData}
					/>
				);
			}
			case 'event_payment': {
				return (
					<EventPayment
						recognitionData={currentRecognitionData}
						updateAction={updateCurrentRecognitionData}
					/>
				);
			}
			case 'event_add_card': {
				return (
					<EventAddCard
						recognitionData={currentRecognitionData}
						updateAction={updateCurrentRecognitionData}
					/>
				);
			}
			case 'event_add_vipcard': {
				return (
					<EventAddVipcard
						recognitionData={currentRecognitionData}
						updateAction={updateCurrentRecognitionData}
					/>
				);
			}
			case 'pass': {
				return (
					<Text fontSize="12px">
						無條件認列的任務會讓符合條件的受眾可以直接領取任務獎勵。
					</Text>
				);
			}
			default:
				return null;
		}
	};

	const settingFormComponent = handleSettingFormComponents(
		currentRecognitionData
	);

	if (isNil(settingFormComponent)) {
		return <></>;
	}

	return <Flex mt="16px">{settingFormComponent}</Flex>;
}

export default function CreateRecognition({
	taskId = '',
	isOpen = false,
	onClose = () => {},
	currentSettingValueLabelList = [],
	defaultRecognitionData = {
		eventType: '',
	},
	onHandleUpdateRecognitionData = () => {},
}: {
	taskId: string;
	isOpen: boolean;
	onClose: () => void;
	currentSettingValueLabelList: string[];
	defaultRecognitionData: RecognitionEvents;
	onHandleUpdateRecognitionData: (
		updatedRecognitionData: RecognitionEvents
	) => void;
}) {
	const hasRecognitionType = !isEmpty(defaultRecognitionData.eventType);
	const actionText = hasRecognitionType ? '編輯' : '新增';
	const [currentRecognitionData, setCurrentRecognitionData] = useState(
		() => defaultRecognitionData
	);
	const currentRecognitionType = currentRecognitionData.eventType;

	const updateCurrentRecognitionData = (updatedData: RecognitionEvents) => {
		setCurrentRecognitionData((prev) => ({
			...prev,
			...updatedData,
		}));
	};

	useEffect(() => {
		if (!isOpen) return;
		setCurrentRecognitionData(defaultRecognitionData);
	}, [defaultRecognitionData, isOpen]);

	useEffect(() => {
		if (
			currentRecognitionType !== 'event_hand' &&
			currentRecognitionType !== 'event_task'
		)
			return;

		setCurrentRecognitionData((prev) => {
			const { eventType } = prev;

			if (eventType === 'event_hand') {
				const { hand_id } = prev;
				return {
					...prev,
					hand_id: isNil(hand_id) ? taskId : hand_id,
				};
			}
			if (eventType === 'event_task') {
				const { taskPchkid } = prev;
				return {
					...prev,
					taskPchkid: isNil(taskPchkid) ? taskId : taskPchkid,
				};
			}
			return prev;
		});
	}, [currentRecognitionType, taskId]);

	return (
		<Drawer
			onClose={onClose}
			isOpen={isOpen}
			size={currentRecognitionType === 'event_invo' ? 'lg' : 'md'}
		>
			<DrawerOverlay />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onHandleUpdateRecognitionData(currentRecognitionData);
					onClose();
				}}
			>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{actionText}任務認列條件</DrawerHeader>
					<DrawerBody>
						<FormControl>
							<FormLabel fontSize="18px" fontWeight="extrabold">
								認列類型
							</FormLabel>
							<Select
								instanceId="recognition-item"
								placeholder="請選擇任務認列類型"
								options={recognitionOptions.filter(
									(item) => !currentSettingValueLabelList.includes(item.value)
								)}
								value={recognitionOptions.filter(
									(item) => item.value === currentRecognitionType
								)}
								onChange={(optionValue) => {
									setCurrentRecognitionData(() => ({
										eventType:
											(optionValue?.value as RecognitionEventType) ?? '',
									}));
								}}
								isDisabled={hasRecognitionType}
							/>
						</FormControl>
						{getSettingFormComponent({
							currentRecognitionData,
							updateCurrentRecognitionData,
						})}
					</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<Button variant="outline" mr={3} onClick={onClose}>
							取消
						</Button>
						<Button
							colorScheme="blue"
							type="submit"
							isDisabled={isEmpty(currentRecognitionType)}
						>
							確認{actionText}
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</form>
		</Drawer>
	);
}
