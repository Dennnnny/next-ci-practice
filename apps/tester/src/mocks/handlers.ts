import { rest } from 'msw';
import { tableData } from 'mocks/data/task/overview/tableData';
import { basicSettingDefaultValues } from 'mocks/data/task/setting/formDefaultValue';
import { includes, isEmpty, isNil, splitEvery } from 'ramda';
import { dateFormat } from 'utils/transform';
import { FilterConfigType, TaskListData } from 'types/task';
import { initRecognitionData } from 'mocks/data/task/setting/recognition';
import { initManualSettingData } from 'mocks/data/task/setting/manualSetting';
import { storesData } from 'mocks/data/basic/storesData';
import {
	tmpCarrierOptions,
	tmpPaymentOptions,
	tmpPsellerOptions,
	tmpTagsOptions,
} from 'ui/drawer/CreateRecognition/CreateRecognition.utils';
import { manualSettingDataType, validatedItemType } from 'types/manualSetting';
import {
	mockAudienceOptions,
	mockTransactionOptions,
} from 'mocks/data/task/setting/audience';

type SortingConfig = { id: keyof TaskListData; desc: boolean };
type ValuesOf<T> = T[keyof T];
type ItemType = ValuesOf<TaskListData>;

function getSortItem(currentSortingConfig: SortingConfig, item: ItemType) {
	return !isNil(currentSortingConfig) && !isNil(item)
		? typeof item === 'object'
			? item.value
			: currentSortingConfig.id === 'id'
			? Number(item)
			: item
		: 0;
}
export const handlers = [
	rest.get('/basic/stores', (req, res, ctx) => {
		const storesOptionList = storesData.map(({ storeid, storename, img }) => ({
			label: `(${storeid}) ${storename}`,
			value: `${storeid}`,
			storeName: storename,
			storeImgUrl: img,
		}));

		return res(ctx.status(200), ctx.delay(500), ctx.json(storesOptionList));
	}),
	rest.get('/basic/cta', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json([
				{ value: '0', label: '發票制縣' },
				{
					value: '1',
					label: '開啟網頁（需自訂 CTA 連結）',
				},
			])
		);
	}),
	rest.get('/basic/target', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json([
				{ value: '0', label: '發票張數' },
				{ value: '1', label: '外部任務' },
				{ value: '2', label: '推薦好友' },
			])
		);
	}),
	rest.get('/basic/viewcate', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json([
				{ value: '0', label: 'Tab 分類1' },
				{ value: '1', label: 'Tab 分類2' },
				{ value: '2', label: 'Tab 分類3' },
				{ value: '3', label: 'Tab 分類4' },
			])
		);
	}),
	rest.post('/list', async (req, res, ctx) => {
		console.log('list .... ');

		const {
			page,
			pageSize,
			sortingConfig,
			filterConfig,
		}: {
			page: number;
			pageSize: number;
			filterConfig: FilterConfigType;
			sortingConfig: SortingConfig[];
		} = await req.json();

		const { searchInput } = filterConfig;
		const currentSortingConfig = sortingConfig[0];

		const filteredData = tableData
			.filter((item) =>
				isEmpty(searchInput)
					? true
					: item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
					  item.id.toLowerCase().includes(searchInput.toLowerCase())
			)
			.filter((item) =>
				isEmpty(filterConfig.startTime)
					? true
					: dateFormat(item.startTime) > filterConfig.startTime
			)
			.filter((item) =>
				isEmpty(filterConfig.endTime)
					? true
					: dateFormat(item.endTime) < filterConfig.endTime
			)
			.filter((item) =>
				isEmpty(filterConfig.store)
					? true
					: includes(
							`${item.store.value}`,
							filterConfig.store.map((store) => store.value)
					  )
			)
			.filter((item) =>
				isEmpty(filterConfig.status)
					? true
					: includes(item.status, filterConfig.status)
			)
			.filter((item) =>
				isEmpty(filterConfig.executeStatus)
					? true
					: includes(item.executeStatus, filterConfig.executeStatus)
			)
			.sort((a, b) => {
				const itemA = a[currentSortingConfig?.id ?? ''];
				const itemB = b[currentSortingConfig?.id ?? ''];

				const prevItem = getSortItem(currentSortingConfig, itemA);
				const nextItem = getSortItem(currentSortingConfig, itemB);

				return !isEmpty(sortingConfig)
					? currentSortingConfig.desc
						? prevItem < nextItem
							? 1
							: -1
						: prevItem > nextItem
						? 1
						: -1
					: 1;
			});

		const totalPages = Math.ceil(filteredData.length / pageSize);
		const currentPageIndex = page <= totalPages ? page - 1 : 0;
		const perPageData = splitEvery(pageSize, filteredData);
		const responsePage = totalPages === 0 ? 0 : page <= totalPages ? page : 1;

		return res(
			ctx.status(200),
			ctx.delay(1000),
			ctx.json({
				tasks: perPageData[currentPageIndex] ?? [],
				detail: { page: responsePage, totalPages },
				filterConfig,
				sortingConfig,
			})
		);
	}),
	rest.get('/task/setting/basic', (req, res, ctx) => {
		// req get status form all
		const tid = req.url.searchParams.get('tid');

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				tid,
				taskStatus: 'draft',
				defaultValues: basicSettingDefaultValues,
				lastUpdateTime: 1676822400000,
			})
		);
	}),
	rest.post('/task/setting/basic', async (req, res, ctx) => {
		// req update status form
		const updateInfos: {
			tid: string;
			updateType: 'task-status' | 'task-data';
			nextTaskStatus?: string;
			updateValues?: {};
		} = await req.json().then((res) => res);
		const { tid, updateType } = updateInfos;

		if (updateType === 'task-status') {
			const { nextTaskStatus } = updateInfos;
			if (nextTaskStatus === 'close') {
				return res(
					ctx.status(500),
					ctx.delay(500),
					ctx.json({
						tid,
						info: '',
					})
				);
			}

			return res(
				ctx.status(200),
				ctx.delay(500),
				ctx.json({
					tid,
					taskStatus: nextTaskStatus,
					lastUpdateTime: new Date().getTime(),
				})
			);
		}
		if (updateType === 'task-data') {
			const { updateValues } = updateInfos;
			return res(
				ctx.status(200),
				ctx.delay(500),
				ctx.json({
					tid,
					defaultValues: updateValues,
					lastUpdateTime: new Date().getTime(),
				})
			);
		}
	}),
	rest.post('/task/create', async (req, res, ctx) => {
		const createInfos: { titleList: string[] } = await req
			.json()
			.then((res: { titleList: string[] }) => res);
		const { titleList } = createInfos;
		const title = titleList[0];

		if (title === 'NO') {
			return res(
				ctx.status(403),
				ctx.delay(500),
				ctx.json({
					errorMessage: 'BlaBla',
				})
			);
		}

		const taskList = titleList.map((title, index) => ({
			id: `${index + 1}`,
			title,
		}));

		return res(
			ctx.status(200),
			ctx.delay(2000),
			ctx.json({
				info: `TaskList is just created, nice !!!`,
				taskList,
			})
		);
	}),
	rest.get('/task/setting/audience-list', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				audience: mockAudienceOptions,
				transaction: mockTransactionOptions,
			})
		);
	}),
	rest.get('/task/setting/audience', (req, res, ctx) => {
		const tid = req.url.searchParams.get('tid');

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				tid,
				audienceList:
					tid === '6666'
						? [
								{
									label: 'baby_carrier (v2) - 寶寶車 (23381)',
									value: 'baby_carrier (v2)',
									count: 23381,
								},
								{
									label: 'apple_music (v2) - 蘋果音樂 (315)',
									value: 'apple_music (v2)',
									count: 315,
								},
						  ]
						: [], // { label: 'audience - 1', value: 'audience-1' }
				transactionList: {
					and: [], // { label: '(ID:1)and', value: 'and-1' }
					or: [],
					not: [],
				},
			})
		);
	}),
	rest.post('/task/setting/audience', async (req, res, ctx) => {
		const updateInfos = await req.json().then((res) => res);
		const { tid, audienceList, transactionList } = updateInfos;

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				tid,
				audienceList,
				transactionList,
			})
		);
	}),
	rest.get('/task/setting/recognition', (req, res, ctx) => {
		const tid = req.url.searchParams.get('tid');

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				tid,
				defaultValues: tid === '6666' ? initRecognitionData : [],
				lastUpdateTime: 1676822400000,
			})
		);
	}),
	rest.post('/task/setting/recognition', async (req, res, ctx) => {
		const updateInfos: {
			tid: string;
			updateValues: {};
		} = await req.json().then((res) => res);
		const { tid, updateValues } = updateInfos;

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				tid,
				defaultValues: updateValues,
				lastUpdateTime: new Date().getTime(),
			})
		);
	}),
	rest.get('/recognition/options', (req, res, ctx) => {
		const optionType = req.url.searchParams.get('option-type') as
			| 'event_add_card'
			| 'event_payment'
			| 'event_add_vipcard';
		const optionDictionary = {
			event_add_card: tmpCarrierOptions,
			event_payment: tmpPaymentOptions,
			event_add_vipcard: tmpPsellerOptions,
		};
		const options = optionDictionary[optionType];

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				options,
			})
		);
	}),
	rest.get('/tag/options', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.delay(2000),
			ctx.json({
				options: tmpTagsOptions,
			})
		);
	}),
	rest.get('/task/setting/manual', (req, res, ctx) => {
		const tid = req.url.searchParams.get('tid');

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				tid,
				defaultValues: tid === '6666' ? initManualSettingData : [],
				lastUpdateTime: 1676822400000,
			})
		);
	}),
	rest.post('/task/setting/manual', async (req, res, ctx) => {
		const updateInfos: {
			tid: string;
			updateValues: validatedItemType[];
		} = await req.json().then((res) => res);
		const { tid, updateValues } = updateInfos;
		const updatedManualSettingData: manualSettingDataType[] = updateValues.map(
			({ value }) => {
				return {
					value,
					creator: 'Han',
					createTime: '2023/05/12',
					status: '待處理',
				};
			}
		);

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				tid,
				defaultValues:
					tid === '6666'
						? [...updatedManualSettingData, ...initManualSettingData]
						: updatedManualSettingData,
				lastUpdateTime: new Date().getTime(),
			})
		);
	}),
	rest.post('/api/login', async (req, res, ctx) => {
		const { username, password }: { username: string; password: string } =
			await req.json().then((res) => res);

		if (username === 'invosadmin' && password === 'invosadmin2023') {
			localStorage.setItem(
				'loginState',
				JSON.stringify({ isLoggedIn: 'true' })
			);

			return res(ctx.status(200), ctx.json({ username }));
		} else {
			return res(ctx.status(401), ctx.json({ message: '錯誤的帳號密碼。' }));
		}
	}),
	rest.post('/api/logout', (req, res, ctx) => {
		localStorage.removeItem('loginState');

		return res(ctx.status(200));
	}),
	rest.get('/api/checkLogin', (req, res, ctx) => {
		const loginState = localStorage.getItem('loginState');
		const isLoggedIn =
			loginState && JSON.parse(loginState).isLoggedIn === 'true';

		if (isLoggedIn) {
			return res(
				ctx.status(200),
				ctx.delay(500),
				ctx.json({ username: 'user' })
			);
		} else {
			return res(
				ctx.status(401),
				ctx.delay(500),
				ctx.json({ message: 'Unauthorized' })
			);
		}
	}),
];
