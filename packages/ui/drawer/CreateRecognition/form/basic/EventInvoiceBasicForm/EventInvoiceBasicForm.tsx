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
	Text,
} from '@chakra-ui/react';
import Select from 'ui/form/Select';
import {
	eventInvoOptions,
	parse,
} from 'ui/drawer/CreateRecognition/CreateRecognition.utils';
import {
	eventInvoColumns,
	invoiceDataListType,
	RecognitionEvents,
} from 'types/recognition';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { compose, isEmpty } from 'ramda';

const eventType = 'event_invo';
const defaultInvoiceDataItem: invoiceDataListType = {
	column: '',
	invoiceNumber: 0,
};

export default function EventInvoiceBasicForm({
	defaultInvoiceDataList = [defaultInvoiceDataItem],
	updateAction,
}: {
	defaultInvoiceDataList: invoiceDataListType[] | undefined;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	return (
		<Flex flexFlow="column" alignItems="flex-start" width="100%">
			{isEmpty(defaultInvoiceDataList) ? (
				<Text mb="8px">點擊＋新增發票資料</Text>
			) : (
				defaultInvoiceDataList.map(({ column, invoiceNumber }, renderIndex) => {
					const isHeadRow = renderIndex === 0;

					return (
						<HStack key={renderIndex} mb="16px" width="100%" align="flex-end">
							<FormControl isRequired>
								{isHeadRow ? <FormLabel>發票資料類型</FormLabel> : <></>}
								<Select
									required
									name={`invoice-data-${renderIndex}`}
									instanceId={`invoice-data-${renderIndex}`}
									placeholder="請選擇發票資料類型"
									options={eventInvoOptions}
									value={eventInvoOptions.filter(
										(item) => item.value === column
									)}
									onChange={(optionValue) => {
										const updatedInvoiceDataList = defaultInvoiceDataList.map(
											(item, index) => {
												if (renderIndex === index) {
													return {
														...item,
														column: optionValue?.value as eventInvoColumns,
													};
												}
												return item;
											}
										);

										updateAction({
											eventType,
											invoiceDataList: updatedInvoiceDataList,
										});
									}}
								/>
							</FormControl>
							<FormControl isRequired>
								{isHeadRow ? <FormLabel>數量</FormLabel> : <></>}
								<NumberInput
									onChange={(valueString) => {
										const updatedInvoiceDataList = defaultInvoiceDataList.map(
											(item, index) => {
												if (renderIndex === index) {
													return {
														...item,
														invoiceNumber:
															valueString === ''
																? ('' as '')
																: compose(Number, parse)(valueString),
													};
												}
												return item;
											}
										);

										updateAction({
											eventType,
											invoiceDataList: updatedInvoiceDataList,
										});
									}}
									value={invoiceNumber}
									min={0}
								>
									<NumberInputField placeholder="請輸入數量" />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</FormControl>
							<IconButton
								aria-label="Delete invoice data row"
								size="sm"
								variant="ghost"
								borderRadius="full"
								icon={<CloseIcon />}
								onClick={() => {
									const updatedInvoiceDataList = defaultInvoiceDataList.filter(
										(item, i) => renderIndex !== i
									);

									updateAction({
										eventType,
										invoiceDataList: updatedInvoiceDataList,
									});
								}}
							/>
						</HStack>
					);
				})
			)}
			<IconButton
				size="md"
				aria-label="add"
				borderRadius="full"
				variant="solid"
				icon={<AddIcon />}
				onClick={() => {
					updateAction({
						eventType,
						invoiceDataList: [
							...defaultInvoiceDataList,
							defaultInvoiceDataItem,
						],
					});
				}}
			/>
		</Flex>
	);
}
