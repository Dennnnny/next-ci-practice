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
	IconButton,
	Divider,
	Input,
	InputRightElement,
	InputGroup,
	Text,
	Textarea,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import Select from 'ui/form/Select';
import {
	tmpFilterListOptions,
	logicOptions,
} from 'ui/drawer/CreateRecognition/CreateRecognition.utils';
import {
	logicTypes,
	advancedFilterListType,
	RecognitionEvents,
} from 'types/recognition';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import DatePicker from 'react-multi-date-picker';
import { isEmpty, isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { checkError } from 'utils/handleApi';

const eventType = 'event_invo';
const defaultAdvancedFilterListItem: advancedFilterListType = {
	filterType: 'invo_datetime',
	logicType: '',
	value: '',
};

function advancedFilterValueInput({
	renderIndex,
	currentValueType,
	value,
	currentAdvancedFilterList,
	updateAction,
}: {
	renderIndex: number;
	currentValueType: string;
	value: number | string;
	currentAdvancedFilterList: advancedFilterListType[];
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	if (currentValueType === 'string') {
		return (
			<Textarea
				size="sm"
				rows={1}
				placeholder="請輸入值"
				value={value}
				onChange={(e) => {
					const updatedAdvancedFilterList = currentAdvancedFilterList.map(
						(item, i) => {
							if (renderIndex === i) {
								return {
									...item,
									value: e.target.value,
								};
							}
							return item;
						}
					);

					updateAction({
						eventType,
						advancedFilterList: updatedAdvancedFilterList,
					});
				}}
			/>
		);
	}
	if (currentValueType === 'number') {
		return (
			<NumberInput
				onChange={(valueString) => {
					const updatedAdvancedFilterList = currentAdvancedFilterList.map(
						(item, i) => {
							if (renderIndex === i) {
								return {
									...item,
									value: valueString === '' ? '' : Number(valueString),
								};
							}
							return item;
						}
					);

					updateAction({
						eventType,
						advancedFilterList: updatedAdvancedFilterList,
					});
				}}
				value={value}
				min={0}
			>
				<NumberInputField placeholder="請輸入值" />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		);
	}
	if (currentValueType === 'date') {
		return (
			<DatePicker
				range={false}
				value={value}
				calendarPosition="top-center"
				fixMainPosition={true}
				onChange={(dateObject) => {
					const updatedAdvancedFilterList = currentAdvancedFilterList.map(
						(item, i) => {
							if (renderIndex === i) {
								return {
									...item,
									value: dateObject?.toString() ?? '',
								};
							}
							return item;
						}
					);

					updateAction({
						eventType,
						advancedFilterList: updatedAdvancedFilterList,
					});
				}}
				containerStyle={{
					width: '100%',
				}}
				render={(value: string, openCalendar: () => void) => {
					return (
						<InputGroup size="md">
							<Input
								value={value}
								onClick={openCalendar}
								placeholder="請選擇日期"
								readOnly
							/>
							<InputRightElement>
								{!isEmpty(value) ? (
									<IconButton
										aria-label="Delete date input"
										size="xs"
										variant="ghost"
										icon={<CloseIcon />}
										color="hsl(0, 0%, 80%)"
										onClick={() => {
											const updatedAdvancedFilterList =
												currentAdvancedFilterList.map((item, i) => {
													if (renderIndex === i) {
														return {
															...item,
															value: '',
														};
													}
													return item;
												});

											updateAction({
												eventType,
												advancedFilterList: updatedAdvancedFilterList,
											});
										}}
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

	return <Input isDisabled />;
}

export default function EventInvoiceAdvancedForm({
	defaultAdvancedFilterList = [defaultAdvancedFilterListItem],
	updateAction,
}: {
	defaultAdvancedFilterList: advancedFilterListType[] | undefined;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const [showImportCurrentTagSelect, setShowImportCurrentTagSelect] =
		useState(false);
	const [currentTagOptions, setCurrentTagOptions] = useState<
		{ label: string; value: advancedFilterListType }[]
	>([]);
	const isCurrentTagOptionsEmpty = isEmpty(currentTagOptions);

	useEffect(() => {
		if (showImportCurrentTagSelect && isCurrentTagOptionsEmpty) {
			fetch('/tag/options', {
				method: 'GET',
			})
				.then(checkError)
				.then((res) => {
					setCurrentTagOptions(res.options);
				});
		}
	}, [showImportCurrentTagSelect, isCurrentTagOptionsEmpty]);

	return (
		<Flex flexFlow="column" alignItems="flex-start" mt="16px">
			{isEmpty(defaultAdvancedFilterList) ||
			isNil(defaultAdvancedFilterList) ? (
				<Text mb="8px">點擊＋新增篩選條件</Text>
			) : (
				defaultAdvancedFilterList.map(
					({ filterType, logicType, value }, renderIndex) => {
						const isHeadRow = renderIndex === 0;
						const currentFilterListValue = tmpFilterListOptions.filter(
							(item) => item.value.column === filterType
						);
						const currentLogicItem =
							currentFilterListValue[0]?.value.logic.map((item) => {
								const logicOptionLabel = logicOptions.filter(
									(logicOption) => logicOption.value.column === item
								)[0].label;

								return {
									value: item as logicTypes | '',
									label: logicOptionLabel,
								};
							}) ?? [];
						const currentLogicValue =
							currentLogicItem.length === 1
								? currentLogicItem
								: currentLogicItem.filter((item) => item.value === logicType);
						const currentValueType = currentFilterListValue[0]?.value.data_type;

						return (
							<Flex key={renderIndex} flexFlow="column" mb="16px" width="100%">
								<HStack align="flex-start">
									<FormControl isRequired>
										{isHeadRow ? <FormLabel>欄位名稱</FormLabel> : <></>}
										<Select
											required
											name={`filter-list-${renderIndex}`}
											instanceId={`filter-list-${renderIndex}`}
											placeholder="請選擇欄位"
											options={tmpFilterListOptions}
											value={currentFilterListValue}
											onChange={(optionValue) => {
												const updatedAdvancedFilterList =
													defaultAdvancedFilterList.map((item, i) => {
														if (renderIndex === i) {
															return {
																...item,
																filterType: optionValue?.value.column ?? '',
																value: '',
															};
														}
														return item;
													});

												updateAction({
													eventType,
													advancedFilterList: updatedAdvancedFilterList,
												});
											}}
										/>
									</FormControl>
									<FormControl isRequired>
										{isHeadRow ? <FormLabel>計算方式</FormLabel> : <></>}
										<Select
											required
											name={`logic-item-${renderIndex}`}
											instanceId={`logic-item-${renderIndex}`}
											placeholder="請選擇關聯"
											options={currentLogicItem}
											value={currentLogicValue}
											onChange={(optionValue) => {
												const updatedAdvancedFilterList =
													defaultAdvancedFilterList.map((item, i) => {
														if (renderIndex === i) {
															return {
																...item,
																logicType: optionValue?.value ?? '',
															};
														}
														return item;
													});

												updateAction({
													eventType,
													advancedFilterList: updatedAdvancedFilterList,
												});
											}}
										/>
									</FormControl>
									<FormControl mt="4px" isRequired>
										{isHeadRow ? <FormLabel>值</FormLabel> : <></>}
										{advancedFilterValueInput({
											renderIndex,
											currentValueType,
											value,
											currentAdvancedFilterList: defaultAdvancedFilterList,
											updateAction,
										})}
									</FormControl>
									<IconButton
										icon={<CloseIcon />}
										aria-label="Delete invoice data row"
										size="sm"
										variant="ghost"
										borderRadius="full"
										alignSelf="flex-end"
										onClick={() => {
											const updatedAdvancedFilterList =
												defaultAdvancedFilterList.filter(
													(item, i) => renderIndex !== i
												);

											updateAction({
												eventType,
												advancedFilterList: updatedAdvancedFilterList,
											});
										}}
									/>
								</HStack>
								{defaultAdvancedFilterList.length - 1 !== renderIndex ? (
									<Divider mt="16px" />
								) : null}
							</Flex>
						);
					}
				)
			)}
			{showImportCurrentTagSelect ? (
				<>
					<Divider mb="16px" />
					<FormControl mb="16px">
						<FormLabel>載入現有標籤</FormLabel>
						<HStack align="flex-end">
							<Select
								isLoading={isCurrentTagOptionsEmpty}
								instanceId="current-tag-item"
								placeholder="請輸入關鍵字搜尋現有標籤"
								options={currentTagOptions}
								onKeyDown={(e) => {
									if (e.key === 'Enter') e.preventDefault();
								}}
								onChange={(optionValue) => {
									if (isNil(optionValue)) return;

									updateAction({
										eventType,
										advancedFilterList: [
											...defaultAdvancedFilterList,
											optionValue.value,
										],
									});
									setShowImportCurrentTagSelect(false);
								}}
								styles={{
									container: (baseStyles) => ({
										...baseStyles,
										width: '100%',
									}),
								}}
							/>
							<IconButton
								aria-label="Delete current tag select"
								size="sm"
								variant="ghost"
								borderRadius="full"
								icon={<CloseIcon />}
								onClick={() => setShowImportCurrentTagSelect(false)}
							/>
						</HStack>
					</FormControl>
				</>
			) : (
				<></>
			)}
			<Menu>
				<MenuButton
					as={IconButton}
					icon={<AddIcon />}
					aria-label="add"
					size="md"
					variant="solid"
					borderRadius="full"
				/>
				<MenuList>
					<MenuItem
						onClick={() => {
							updateAction({
								eventType,
								advancedFilterList: [
									...defaultAdvancedFilterList,
									{
										...defaultAdvancedFilterListItem,
										filterType:
											defaultAdvancedFilterList.length > 0
												? ''
												: defaultAdvancedFilterListItem.filterType,
									} as advancedFilterListType,
								],
							});
						}}
					>
						自訂篩選類型
					</MenuItem>
					<MenuItem
						onClick={() => setShowImportCurrentTagSelect((prev) => !prev)}
						isDisabled={showImportCurrentTagSelect}
					>
						載入現有標籤
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}
