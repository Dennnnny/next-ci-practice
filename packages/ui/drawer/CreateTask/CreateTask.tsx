import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
	Flex,
	Input,
	Button,
	IconButton,
	Switch,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Divider,
	Text,
	Heading,
	Spinner,
	Tooltip,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { isEmpty } from 'ramda';
import { useMachine } from '@xstate/react';
import createTaskMachine from 'machine/task/createTaskMachine';

function CreateTaskProcess({
	isLoading,
	isSucessed,
	isFailed,
	updatedTaskList,
	failedResult,
}: {
	isLoading: boolean;
	isSucessed: boolean;
	isFailed: boolean;
	updatedTaskList: { id: string; title: string }[];
	failedResult: string;
}) {
	const router = useRouter();
	if (isSucessed) {
		return (
			<Flex flexFlow="column" alignItems="flex-start">
				<Text fontWeight="bold" mb="16px">
					成功新增任務！
				</Text>
				{!isEmpty(updatedTaskList) ? (
					<>
						{updatedTaskList.map((task) => {
							const { id, title } = task;
							return (
								<Flex key={id} mb="8px" alignItems="center">
									<Tooltip label={title} aria-label="A tooltip">
										<Text
											mr="16px"
											maxW="268px"
											whiteSpace="nowrap"
											overflow="hidden"
											textOverflow="ellipsis"
										>
											名稱：{title}
										</Text>
									</Tooltip>
									<Button
										rightIcon={<ArrowForwardIcon />}
										colorScheme="blue"
										variant="outline"
										onClick={() => router.push(`/task/setting/basic/${id}`)}
									>
										前往設定任務
									</Button>
								</Flex>
							);
						})}
					</>
				) : (
					<></>
				)}
			</Flex>
		);
	}
	if (isFailed) {
		return (
			<Flex flexFlow="column" alignItems="flex-start">
				<Text fontWeight="bold" mb="16px">
					任務新增失敗
				</Text>
				<Text>失敗原因：{failedResult}</Text>
			</Flex>
		);
	}

	return isLoading ? (
		<>
			<Heading as="h3" size="md" color="#000" marginTop="8px">
				處理中
			</Heading>
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
				marginTop="16px"
			/>
		</>
	) : (
		<>something wrong...</>
	);
}

export default function CreateTask({
	isOpen = false,
	onClose = () => {},
	hasSyncTaskIdArea = false,
	hasMultiTitleListArea = false,
}: {
	isOpen: boolean;
	onClose: () => void;
	hasSyncTaskIdArea: boolean;
	hasMultiTitleListArea: boolean;
}) {
	const [mainTitle, setMainTitle] = useState('');
	const [isMainTitleInputValid, setIsMainTitleInputValid] = useState(true);
	const [restTitleList, setRestTitleList] = useState<string[]>([]);
	const [isTidEditable, setIsTidEditable] = useState(false);
	const [syncTaskId, setSyncTaskId] = useState('');
	const [appState, send] = useMachine(() => {
		return createTaskMachine();
	});
	const appStateValue = appState.value;
	const isStatusIdle = appStateValue === 'IDLE';
	const isCreatingTask = appStateValue === 'CREATEING_TASK';
	const isCreateTaskSuccess = appStateValue === 'SUCCESS';
	const isCreateTaskFail = appStateValue === 'ERRORS';
	const updatedTaskList = appState.context.updatedTaskList;
	const failedResult = appState.context.failedResult;

	function handleTitleListUpdate(index: number, inputValue: string) {
		const updatedValue = restTitleList.map((t, i) => {
			if (i === index) {
				return inputValue;
			} else {
				return t;
			}
		});
		setRestTitleList(updatedValue);
	}
	function resetAllState() {
		setMainTitle('');
		setRestTitleList([]);
		setIsTidEditable(false);
		setSyncTaskId('');
	}

	return (
		<Drawer onClose={onClose} isOpen={isOpen} size={'md'}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>新增任務</DrawerHeader>
				<DrawerBody>
					{isStatusIdle ? (
						<FormControl isInvalid={!isMainTitleInputValid} isRequired>
							<FormLabel>名稱</FormLabel>
							<Input
								type="text"
								placeholder="請輸入任務名稱"
								value={mainTitle}
								onChange={(e) => {
									e.preventDefault();
									setIsMainTitleInputValid(true);
									setMainTitle(e.target.value);
								}}
							/>
							{isMainTitleInputValid ? (
								<FormHelperText fontSize="12px">
									必填欄位，之後還可以修改。
								</FormHelperText>
							) : (
								<FormErrorMessage fontSize="12px">
									此欄位不得為空!
								</FormErrorMessage>
							)}
						</FormControl>
					) : (
						<CreateTaskProcess
							isLoading={isCreatingTask}
							isSucessed={isCreateTaskSuccess}
							isFailed={isCreateTaskFail}
							updatedTaskList={updatedTaskList}
							failedResult={failedResult}
						/>
					)}
					{isStatusIdle && hasMultiTitleListArea ? (
						<Flex
							flexFlow="column"
							alignItems="flex-start"
							sx={{ '> *': { 'margin-top': '8px' } }}
						>
							<Divider mt="12px" borderColor="#d4d4d4" />
							<Text fontWeight="bold">我想同時新增多個任務</Text>
							{!isEmpty(restTitleList) ? (
								<Flex
									flexFlow="column"
									sx={{ '> *': { 'margin-top': '8px' } }}
									width="100%"
								>
									{restTitleList.map((titleText, i) => {
										return (
											<Flex key={i} alignItems="center" width="100%">
												<Input
													type="text"
													mr="8px"
													placeholder="請輸入任務名稱"
													value={titleText}
													onChange={(e) => {
														e.preventDefault();
														handleTitleListUpdate(i, e.target.value);
													}}
												/>
												<IconButton
													aria-label="Delete input"
													isRound={true}
													variant="ghost"
													icon={<DeleteIcon />}
													onClick={() =>
														setRestTitleList((prev) => {
															prev.splice(i, 1);
															return [...prev];
														})
													}
												/>
											</Flex>
										);
									})}
								</Flex>
							) : (
								<></>
							)}
							<Text fontSize="12px">點選下方 + 按鈕以新增其他任務標題</Text>
							<IconButton
								aria-label="Add new task"
								isRound={true}
								variant="ghost"
								icon={<AddIcon />}
								onClick={() => setRestTitleList((prev) => [...prev, ''])}
							/>
						</Flex>
					) : (
						<></>
					)}
					{isStatusIdle && hasSyncTaskIdArea ? (
						<Flex
							flexFlow="column"
							alignItems="flex-start"
							sx={{ '> *': { 'margin-top': '8px' } }}
						>
							<Divider mt="12px" borderColor="#d4d4d4" />
							<Flex alignItems="center">
								<Text fontWeight="bold">我想帶入指定任務資料</Text>
								<Switch
									isChecked={isTidEditable}
									onChange={() => setIsTidEditable((prev) => !prev)}
									ml="12px"
								/>
							</Flex>
							<FormControl>
								<Flex alignItems="center">
									<Input
										type="text"
										placeholder="請輸入任務ID"
										isDisabled={!isTidEditable}
										value={syncTaskId}
										onChange={(e) => {
											e.preventDefault();
											setSyncTaskId(e.target.value);
										}}
									/>
								</Flex>
								<FormHelperText fontSize="12px">
									新增任務時將帶入的此ID的資料
								</FormHelperText>
							</FormControl>
						</Flex>
					) : (
						<></>
					)}
				</DrawerBody>

				<DrawerFooter borderTopWidth="1px">
					<Button
						variant="outline"
						mr={3}
						onClick={onClose}
						isDisabled={isCreatingTask}
					>
						取消
					</Button>
					{isCreateTaskSuccess || isCreateTaskFail ? (
						<Button
							colorScheme="blue"
							onClick={() => {
								resetAllState();
								send({
									type: 'INIT_NEW_TASK',
								});
							}}
						>
							再新增一筆任務
						</Button>
					) : (
						<Button
							colorScheme="blue"
							isLoading={isCreatingTask}
							isDisabled={isCreateTaskFail}
							onClick={() => {
								if (isEmpty(mainTitle)) {
									setIsMainTitleInputValid(false);
									return;
								}
								const titleList = [mainTitle, ...restTitleList].filter(
									(titleText) => !isEmpty(titleText)
								);

								send({
									type: 'CREATE_TASK',
									data: {
										titleList,
									},
								});
							}}
						>
							確認新增
						</Button>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
