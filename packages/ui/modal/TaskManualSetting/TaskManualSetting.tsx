import { useState, useRef } from 'react';
import {
	Button,
	Flex,
	Textarea,
	Badge,
	Heading,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Divider,
	Box,
	ButtonGroup,
	useDisclosure,
	Switch,
	HStack,
} from '@chakra-ui/react';
import { isEmpty, isNil, uniq } from 'ramda';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { validatedItemType } from 'types/manualSetting';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { handleValidation, scrollToPosition } from './TaskManualSetting.utils';
import ConfirmAlertDialog from 'ui/overlay/ConfirmAlertDialog';

export default function TaskManualSetting({
	isOpen,
	onClose,
	handleAction,
}: {
	isOpen: boolean;
	onClose: () => void;
	handleAction: (val: validatedItemType[]) => void;
}) {
	const textareaLineHeight = 32;
	const [textareaValue, setTextareaValue] = useState('');
	const [isTextareaDirty, setIsTextareaDirty] = useState(false);
	const [validatedList, setValidatedList] = useState<validatedItemType[]>([]);
	const [isFailedItemsDisplay, setIsFailedItemsDisplay] = useState(false);
	const [distanceToTop, setDistanceToTop] = useState(0);
	const [isAnchorShow, setIsAnchorShow] = useState(false);
	const textAreaContainer = useRef<HTMLTextAreaElement>(null);
	const cancelRef = useRef<HTMLButtonElement>(null);
	const {
		isOpen: isPopOpen,
		onOpen: onPopOpen,
		onClose: onPopClose,
	} = useDisclosure();
	const validatedListLength = validatedList.length;
	const correctValidatedList = validatedList.filter(
		({ validation }) => validation
	);
	const failedValidatedList = validatedList.filter(
		({ validation }) => !validation
	);
	const failedValidatedListLength = failedValidatedList.length;
	const uniqValidatedNumber = uniq(
		correctValidatedList.map(({ value }) => value)
	).length;
	const duplicatedNumber = correctValidatedList.length - uniqValidatedNumber;

	const handleClose = () => {
		onClose();
		setTextareaValue('');
		setValidatedList([]);
	};

	const anchorPositionToTop = (function handlePositionToTop() {
		const defaultAnchorPositionToTop = 17;
		const textareaContainerHeight = textAreaContainer.current?.offsetHeight;
		const textareaContentHeight = validatedListLength * textareaLineHeight;

		if (isNil(textareaContainerHeight)) return 0;
		if (textareaContainerHeight > textareaContentHeight) {
			return distanceToTop + defaultAnchorPositionToTop;
		}

		return textareaContentHeight - distanceToTop > textareaContainerHeight
			? defaultAnchorPositionToTop
			: textareaContainerHeight - (textareaContentHeight - distanceToTop);
	})();

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose} size="4xl">
				<ModalOverlay />
				<ModalContent my="auto">
					<ModalHeader fontSize="2xl">新增名單</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex>
							<Flex flexFlow="column" width="45%">
								<Heading size="md" whiteSpace="nowrap">
									輸入欄位
								</Heading>
								<Box minH="48px" mt="4px" mb="8px">
									<Text fontSize="14px" color="grey">
										請輸入手動設定名單（user ID or
										手機號碼），用逗號或是換行隔開文字。
									</Text>
								</Box>
								<Box w="100%" h="50vh" position="relative">
									<Textarea
										w="100%"
										h="100%"
										maxH="50vh"
										lineHeight={`${textareaLineHeight}px`}
										placeholder="Ex: 1234, 2234, 3234"
										value={textareaValue}
										onChange={(e) => {
											setTextareaValue(e.target.value);
											setIsTextareaDirty(true);
										}}
										ref={textAreaContainer}
										onFocus={() => setIsAnchorShow(false)}
									/>
									{isAnchorShow && validatedListLength > 0 ? (
										<ChevronRightIcon
											position="absolute"
											top={`${anchorPositionToTop}px`}
											left="-20px"
											transitionProperty="top"
											transitionDuration="0.25s"
											background="green"
											color="white"
											rounded="lg"
										/>
									) : null}
								</Box>
							</Flex>
							<Flex
								flexFlow="column"
								width="10%"
								alignItems="center"
								justifyContent="center"
								margin="0 16px"
							>
								<ButtonGroup flexFlow="column" alignItems="center" gap="8px">
									<Button
										colorScheme="blue"
										onClick={() => {
											const validatedValue = handleValidation(textareaValue);
											const lineBreakTextareaValue = validatedValue
												.map(({ input }) => input)
												.join('\n');
											setValidatedList(validatedValue);
											setTextareaValue(lineBreakTextareaValue);
											setIsFailedItemsDisplay(false);
											setIsTextareaDirty(false);
										}}
									>
										驗證
									</Button>
								</ButtonGroup>
							</Flex>
							<Flex flexFlow="column" width="45%">
								<Heading size="md">驗證資料</Heading>
								<Flex
									flexFlow="column"
									justifyContent="space-between"
									minH="48px"
									mt="4px"
									mb="8px"
								>
									<Text fontSize="14px" color="grey">
										若資料有誤，可修改左方輸入欄位後重新驗證資料。
									</Text>
									{validatedListLength > 0 ? (
										<Flex alignSelf="flex-end" alignItems="center">
											<Text fontSize="12px">
												共驗證 {validatedListLength} 筆資料
											</Text>
											{failedValidatedListLength > 0 ? (
												<HStack alignItems="center">
													<Text fontSize="12px">｜只呈現</Text>
													<Badge variant="subtle" colorScheme="red">
														有誤
													</Badge>
													<Switch
														isChecked={isFailedItemsDisplay}
														onChange={() =>
															setIsFailedItemsDisplay((prev) => !prev)
														}
													/>
												</HStack>
											) : null}
										</Flex>
									) : null}
								</Flex>
								<Divider />
								{!isEmpty(validatedList) ? (
									<Flex flexFlow="column" w="100%" h="50vh">
										<Flex
											h="24px"
											width="100%"
											justifyContent="space-around"
											alignItems="center"
											fontSize="12px"
											fontWeight="bold"
											borderBottom="solid 1px #eee"
										>
											<Box textAlign="center" minW="32px">
												順序
											</Box>
											<Box textAlign="center" minW="108px">
												輸入
											</Box>
											<Box textAlign="center" minW="32px">
												驗證
											</Box>
											<Box textAlign="center" minW="120px">
												值
											</Box>
										</Flex>
										<Flex height="calc(50vh - 24px)" width="100%">
											<AutoSizer>
												{({
													height,
													width,
												}: {
													height: number;
													width: number;
												}) => {
													if (isNil(height) || isNil(width)) return <></>;

													return (
														<List
															height={height}
															width={width}
															itemCount={
																isFailedItemsDisplay
																	? failedValidatedListLength
																	: validatedListLength
															}
															itemSize={35}
														>
															{({ index, style }) => {
																const { input, validation, value, order } =
																	isFailedItemsDisplay
																		? failedValidatedList[index]
																		: validatedList[index];

																return (
																	<Flex
																		style={style}
																		justifyContent="space-around"
																		alignItems="center"
																		fontSize="14px"
																		onClick={() => {
																			const latestDistanceToTop =
																				order * textareaLineHeight;
																			setDistanceToTop(latestDistanceToTop);
																			scrollToPosition({
																				target: textAreaContainer.current,
																				distanceToTop: latestDistanceToTop,
																			});
																			setIsAnchorShow(true);
																		}}
																		cursor="pointer"
																		sx={{
																			_hover: { background: '#eee' },
																		}}
																		borderBottom="solid 1px #eee"
																	>
																		<Box textAlign="center" minW="32px">
																			{order + 1}
																		</Box>
																		<Box textAlign="center" minW="108px">
																			{input}
																		</Box>
																		<Box textAlign="center" minW="32px">
																			<Badge
																				variant="subtle"
																				colorScheme={
																					validation ? 'green' : 'red'
																				}
																			>
																				{validation ? '正確' : '有誤'}
																			</Badge>
																		</Box>
																		<Box textAlign="center" minW="120px">
																			{value}
																		</Box>
																	</Flex>
																);
															}}
														</List>
													);
												}}
											</AutoSizer>
										</Flex>
									</Flex>
								) : (
									<Text mt="4px">尚無資料</Text>
								)}
							</Flex>
						</Flex>
					</ModalBody>

					<ModalFooter flexFlow="column" alignItems="flex-end">
						<Text color="grey" fontSize="12px" minH="18px" mb="4px">
							{isTextareaDirty ? '輸入欄位有異動，請重新驗證。' : ''}
						</Text>
						<ButtonGroup>
							<Button variant="ghost" onClick={handleClose}>
								取消
							</Button>
							<Button
								isDisabled={isEmpty(validatedList) || isTextareaDirty}
								colorScheme="blue"
								onClick={() => {
									if (failedValidatedListLength > 0 || duplicatedNumber > 0) {
										onPopOpen();
										return;
									}
									handleAction(validatedList);
									handleClose();
								}}
							>
								確認新增
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<ConfirmAlertDialog
				isOpen={isPopOpen}
				cancelRef={cancelRef}
				onClose={onPopClose}
				headerComponent="請確認輸入資料"
				dialogBodyComponent={
					<>
						<Heading
							size="md"
							mb="8px"
						>{`共輸入 ${validatedListLength} 筆`}</Heading>
						<Text>{`重複：${duplicatedNumber} 筆`}</Text>
						<Text>{`驗證有誤：${failedValidatedListLength} 筆`}</Text>
						<Text>
							{`系統將自動排除有誤並去重後新增
								${uniqValidatedNumber} 筆資料。`}
						</Text>
					</>
				}
				cancelBtnText="繼續編輯"
				confirmBtnText="仍要新增"
				action={() => {
					onPopClose();
					handleAction(correctValidatedList);
					handleClose();
				}}
			/>
		</>
	);
}
