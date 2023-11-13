import { memo, useRef } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Text,
	IconButton,
	Flex,
	Heading,
	Badge,
	useDisclosure,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Divider,
} from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';
import { compose, filter, identity, isEmpty, isNil, keys, map } from 'ramda';
import { RecognitionEvents } from 'types/recognition';
import {
	eventInvoOptions,
	recognitionOptions,
	tmpPaymentOptions,
	tmpPsellerOptions,
	tmpCarrierOptions,
	tmpProfileOptions,
	tmpFilterListOptions,
	logicOptions,
	taskStatusOptions,
} from 'ui/drawer/CreateRecognition/CreateRecognition.utils';
import ConfirmAlertDialog from 'ui/overlay/ConfirmAlertDialog';

type tableViewListType = {
	name: string;
	logic?: string;
	value: string | number | undefined;
};

const TableDisplayArea = ({
	tableViewList = [],
}: {
	tableViewList: tableViewListType[];
}) => {
	return (
		<Flex mt="12px" flexWrap="wrap">
			<TableContainer width="100%" fontWeight="normal">
				<Table size="sm">
					<Thead>
						<Tr>
							<Th>欄位名稱</Th>
							<Th>計算方式</Th>
							<Th>值</Th>
						</Tr>
					</Thead>
					{tableViewList
						.filter((item) => !isEmpty(item))
						.map(({ name, logic, value }, i) => {
							return (
								<Tbody key={i}>
									<Tr>
										<Td width="150px">{name}</Td>
										<Td width="120px">
											<Badge variant="subtle" colorScheme="green">
												{logic ?? '等於'}
											</Badge>
										</Td>
										<Td whiteSpace="normal" lineHeight="20px">
											{value}
										</Td>
									</Tr>
								</Tbody>
							);
						})}
				</Table>
			</TableContainer>
		</Flex>
	);
};

const HeaderArea = ({
	title,
	handleEditAction,
	handleDeleteAction,
}: {
	title: string;
	handleEditAction: Function;
	handleDeleteAction: Function;
}) => {
	return (
		<Flex alignItems="center" justifyContent="space-between">
			<Flex alignItems="center">
				<Heading size="md">{title}</Heading>
				<IconButton
					size="sm"
					ml="8px"
					aria-label="add"
					borderRadius="full"
					variant="ghost"
					icon={<EditIcon />}
					onClick={() => handleEditAction()}
				/>
			</Flex>
			<IconButton
				size="sm"
				ml="8px"
				aria-label="add"
				borderRadius="full"
				variant="ghost"
				icon={<CloseIcon />}
				onClick={() => handleDeleteAction()}
			/>
		</Flex>
	);
};

function handleRecognitionCardDisplayData(recognitionData: RecognitionEvents): {
	title: string;
	tableViewList?: tableViewListType[];
} {
	const eventType = recognitionData.eventType;
	const title = recognitionOptions.filter((item) => item.value === eventType)[0]
		.label;

	switch (eventType) {
		case 'event_add_card': {
			const { number, cardtype } = recognitionData;
			const carrierName = tmpCarrierOptions.filter(
				(item) => item.value === cardtype
			)[0]?.label;

			return {
				title,
				tableViewList: [
					{ name: '載具類別', value: carrierName },
					{ name: '數量', value: number ?? '' },
				],
			};
		}
		case 'event_add_vipcard': {
			const { number, pseller } = recognitionData;
			const psellerName = tmpPsellerOptions.filter(
				(item) => item.value === pseller
			)[0]?.label;

			return {
				title,
				tableViewList: [
					{ name: '會員卡名稱', value: psellerName },
					{ name: '數量', value: number ?? '' },
				],
			};
		}
		case 'event_hand': {
			const { hand_id } = recognitionData;
			return {
				title,
				tableViewList: [{ name: '任務 ID', value: hand_id }],
			};
		}
		case 'event_invo': {
			const { invoiceDataList, advancedFilterList } = recognitionData;
			const rawSource = invoiceDataList?.map(({ column, invoiceNumber }) => {
				const columnLabel = eventInvoOptions.filter(
					(item) => item.value === column
				)[0]?.label;

				return [columnLabel, invoiceNumber];
			});
			const rawSourceAdvanced = advancedFilterList?.map(
				({ filterType, logicType, value }) => {
					const filterTypeLabel = tmpFilterListOptions.filter(
						(item) => item.value.column === filterType
					)[0]?.label;
					const logicLabel = logicOptions.filter(
						(item) => item.value.column === logicType
					)[0]?.label;

					return [filterTypeLabel, logicLabel, value];
				}
			);

			const tableView =
				(rawSource?.map(([columnLabel, invoiceNumber]) => ({
					name: columnLabel,
					value: invoiceNumber,
				})) as tableViewListType[]) ?? [];
			const tableViewAdvanced =
				(rawSourceAdvanced?.map(([filterTypeLabel, logicLabel, value]) => ({
					name: filterTypeLabel,
					logic: logicLabel,
					value: value,
				})) as tableViewListType[]) ?? [];

			return {
				title,
				tableViewList: [...tableView, ...tableViewAdvanced],
			};
		}
		case 'event_payment': {
			const { number, paymentCidx, paymentType } = recognitionData;
			const paymentName = tmpPaymentOptions.filter(
				(item) =>
					item.value.paymentCidx === paymentCidx &&
					item.value.paymentType === paymentType
			)[0]?.label;

			return {
				title,
				tableViewList: [
					{ name: '繳費項目', value: paymentName },
					{ name: '數量', value: number ?? '' },
				],
			};
		}
		case 'event_recommend': {
			const { recommend_accept, recommend_invite } = recognitionData;

			return {
				title,
				tableViewList: recommend_accept
					? [{ name: '填寫推薦人', value: undefined }]
					: [{ name: '累積推薦人數量', value: recommend_invite ?? '' }],
			};
		}
		case 'event_set_profile': {
			const { eventType, ...restProfileItems } = recognitionData;
			const profileNameList = compose(
				map(
					(profileItemKey) =>
						tmpProfileOptions.filter((item) => item.value === profileItemKey)[0]
							?.label
				),
				keys,
				filter(identity as <T>(value: T) => value is NonNullable<T>)
			)(restProfileItems);

			return {
				title,
				tableViewList: profileNameList.map((name) => ({
					name,
					value: '填寫',
				})),
			};
		}
		case 'event_task': {
			const { taskPchkid, taskStatus } = recognitionData;
			const taskStatusDisplayText = taskStatusOptions.filter(
				(item) => item.value === taskStatus
			)[0]?.label;

			return {
				title,
				tableViewList: [
					{ name: '任務 ID', value: taskPchkid },
					{ name: '任務狀態', value: taskStatusDisplayText },
				],
			};
		}
		case 'pass': {
			return {
				title,
				tableViewList: [
					{
						name: '無條件認列',
						value: '任務會讓符合條件的受眾可以直接領取任務獎勵。',
					},
				],
			};
		}
		default:
			return {
				title: '',
			};
	}
}

function RecognitionCard({
	recognitionData,
	handleEditAction,
	handleDeleteAction,
}: {
	recognitionData: RecognitionEvents;
	handleEditAction: Function;
	handleDeleteAction: Function;
}) {
	const { title, tableViewList } =
		handleRecognitionCardDisplayData(recognitionData);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteRef = useRef(null);

	return (
		<Card maxW="full" minW="sm">
			<CardHeader>
				<HeaderArea
					title={title}
					handleEditAction={handleEditAction}
					handleDeleteAction={onOpen}
				/>
			</CardHeader>
			<Divider color="#c0c0c0" />
			<CardBody pt="0">
				<Heading size="sm" mt="20px">
					認列條件設定
				</Heading>
				<Flex flexFlow="column">
					{!isNil(tableViewList) && !isEmpty(tableViewList) ? (
						<TableDisplayArea tableViewList={tableViewList} />
					) : (
						<Text fontWeight="normal" fontSize="14px" mt="8px">
							尚未設定任務認列條件
						</Text>
					)}
				</Flex>
			</CardBody>
			<ConfirmAlertDialog
				isOpen={isOpen}
				cancelRef={deleteRef}
				onClose={onClose}
				headerComponent="刪除條件設定"
				dialogBodyComponent={`你確認要刪除「${title}」的條件設定嗎？刪除後將無法回復。`}
				confirmBtnText="刪除"
				action={() => {
					handleDeleteAction();
					onClose();
				}}
			/>
		</Card>
	);
}

export default memo(RecognitionCard);
