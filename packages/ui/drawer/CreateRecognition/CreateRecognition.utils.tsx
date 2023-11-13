export const parse = (val: string) => val.replace(/[-|+]/g, '');

export const recognitionOptions = [
	{ value: 'event_invo', label: '存入特定發票資料' },
	{ value: 'event_task', label: '追蹤碼' },
	{ value: 'event_hand', label: '手動名單' },
	{ value: 'event_set_profile', label: '會員資料填寫' },
	{ value: 'pass', label: '無條件' },
	{ value: 'event_recommend', label: '推薦人' },
	{ value: 'event_add_card', label: '載具歸戶' },
	{ value: 'event_add_vipcard', label: '新增會員卡' },
	{ value: 'event_payment', label: '繳費' },
];

export const taskStatusOptions = [{ value: 2, label: '任務完成' }];

export const recommendOptions = [
	{ value: 'recommend_accept', label: '填寫推薦人' },
	{ value: 'recommend_invite', label: '累積推薦人數量' },
];

export const tmpTagsOptions = [
	{
		label: '標籤範例1',
		value: {
			filterType: 'invo_pd_price',
			logicType: 'lte',
			value: 2,
		},
	},
	{
		label: '標籤範例2',
		value: {
			filterType: 'invo_pd_price',
			logicType: 'gte',
			value: 1,
		},
	},
];

export const eventInvoOptions = [
	{
		value: 'invo_pd_record',
		label: '明細筆數',
	},
	{
		value: 'invo_record',
		label: '發票張數',
	},
	{
		value: 'invo_pd_quant',
		label: '品項個數',
	},
	{
		value: 'invo_pd_total_price',
		label: '品項總金額',
	},
	{
		value: 'invo_price',
		label: '發票總金額',
	},
];

export const logicOptions = [
	{
		value: {
			column: 'regexp contains',
			display: '包含',
		},
		label: '包含',
	},
	{
		value: {
			column: 'not regexp contains',
			display: '不包含',
		},
		label: '不包含',
	},
	{
		value: {
			column: 'gte',
			display: '>=',
		},
		label: '大於且等於',
	},
	{
		value: {
			column: 'lte',
			display: '<=',
		},
		label: '小於且等於',
	},
	{
		value: {
			column: 'in',
			display: '=',
		},
		label: '等於',
	},
];

export const tmpFilterListOptions = [
	{
		value: {
			column: 'invo_pd_name',
			logic: ['regexp contains', 'not regexp contains'],
			data_type: 'string',
		},
		label: '商品名稱',
	},
	{
		value: {
			column: 'invo_seller_address',
			logic: ['regexp contains', 'not regexp contains'],
			data_type: 'string',
		},
		label: '商店地址',
	},
	{
		value: {
			column: 'invo_seller_name',
			logic: ['regexp contains', 'not regexp contains'],
			data_type: 'string',
		},
		label: '商店名稱',
	},
	{
		value: {
			column: 'invo_buildtime',
			logic: ['gte', 'lte'],
			data_type: 'date',
		},
		label: '發票匯入日期',
	},
	{
		value: {
			column: 'invo_datetime',
			logic: ['gte', 'lte'],
			data_type: 'date',
		},
		label: '發票消費日期',
	},
	{
		value: {
			column: 'invo_pd_price',
			logic: ['gte', 'lte'],
			data_type: 'number',
		},
		label: '商品價格',
	},
	{
		value: {
			column: 'invo_pd_quant',
			logic: ['gte', 'lte'],
			data_type: 'number',
		},
		label: '商品數量',
	},
	{
		value: {
			column: 'invo_pd_total_price',
			logic: ['gte', 'lte'],
			data_type: 'number',
		},
		label: '品項總金額',
	},
	{
		value: {
			column: 'invo_price',
			logic: ['gte', 'lte'],
			data_type: 'number',
		},
		label: '發票總金額',
	},
	{
		value: {
			column: 'invo_card_type',
			logic: ['in'],
			data_type: 'string',
		},
		label: '載具卡片',
	},
	{
		value: {
			column: 'invo_parent_seller',
			logic: ['in'],
			data_type: 'string',
		},
		label: '母公司名稱',
	},
	{
		value: {
			column: 'invo_seller',
			logic: ['in'],
			data_type: 'string',
		},
		label: '商店名稱',
	},
	{
		value: {
			column: 'invo_term',
			logic: ['in'],
			data_type: 'number',
		},
		label: '發票期數',
	},
];

export const tmpPaymentOptions = [
	{
		value: {
			paymentCidx: 1,
			paymentType: 4,
		},
		label: '台北市水費',
	},
	{
		value: {
			paymentCidx: 2,
			paymentType: 3,
		},
		label: '中華電信',
	},
	{
		value: {
			paymentCidx: 3,
			paymentType: 3,
		},
		label: '台灣大哥大',
	},
	{
		value: {
			paymentCidx: 6,
			paymentType: 2,
		},
		label: '台灣土地銀行',
	},
	{
		value: {
			paymentCidx: 6,
			paymentType: 2,
		},
		label: '合作金庫商業銀行',
	},
];

export const tmpPsellerOptions = [
	{
		value: 2,
		label: '全家',
	},
	{
		value: 3,
		label: '全聯',
	},
	{
		value: 4,
		label: '中油',
	},
	{
		value: 7,
		label: 'OK便利商店',
	},
	{
		value: 8,
		label: '美廉社',
	},
];

export const tmpCarrierOptions = [
	{
		value: '3J0002',
		label: '手機條碼',
	},
	{
		value: 'EK0002',
		label: '信用卡',
	},
	{
		value: '1K0001',
		label: '悠遊卡',
	},
	{
		value: 'ED0003',
		label: '台灣電力股份有限公司',
	},
	{
		value: 'EG0443',
		label: '全家會員',
	},
];

export const tmpProfileOptions = [
	{
		value: 'profile_birthy',
		label: '生日',
	},
	{
		value: 'profile_gender',
		label: '性別',
	},
	{
		value: 'profile_nick',
		label: '暱稱',
	},
];

export const conditionTree = {
	aggregate: {
		event_add_card: {
			count: {
				column: {
					einvo_card: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_add_vipcard: {
			count: {
				column: {
					vip_card: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_hand: {
			hand: {
				column: {
					hand: {
						data_type: 'bool',
					},
				},
				is_list: false,
			},
		},
		event_invo: {
			count: {
				column: {
					invo_pd_record: {
						data_type: 'int',
					},
					invo_record: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
			sum: {
				column: {
					invo_pd_quant: {
						data_type: 'int',
					},
					invo_pd_total_price: {
						data_type: 'int',
					},
					invo_price: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_payment: {
			count: {
				column: {
					payment_record: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_recommend: {
			action: {
				column: {
					recommend_accept: {
						data_type: 'bool',
					},
				},
				is_list: false,
			},
			count: {
				column: {
					recommend_invite: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_set_profile: {
			use: {
				column: {
					profile: {
						data_type: 'bool',
					},
				},
				is_list: false,
			},
		},
		event_task: {
			action: {
				column: {
					purchase: {
						data_type: 'bool',
					},
				},
				is_list: false,
			},
		},
		pass: {
			pass: {
				column: {
					pass: {
						data_type: 'bool',
					},
				},
				is_list: false,
			},
		},
	},
	filter: {
		event_add_card: {
			equal: {
				column: {
					cardtype: {
						data_type: 'str',
					},
				},
				is_list: false,
			},
		},
		event_add_vipcard: {
			equal: {
				column: {
					pseller: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_hand: {
			equal: {
				column: {
					hand_id: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_invo: {
			REGEXP_CONTAINS: {
				column: {
					invo_pd_name: {
						data_type: 'str',
					},
					invo_seller_address: {
						data_type: 'str',
					},
					invo_seller_name: {
						data_type: 'str',
					},
				},
				is_list: false,
			},
			gte: {
				column: {
					invo_buildtime: {
						data_type: 'datetime',
					},
					invo_datetime: {
						data_type: 'datetime',
					},
					invo_pd_price: {
						data_type: 'int',
					},
					invo_pd_quant: {
						data_type: 'int',
					},
					invo_pd_total_price: {
						data_type: 'int',
					},
					invo_price: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
			in: {
				column: {
					invo_card_type: {
						data_type: 'str',
					},
					invo_parent_seller: {
						data_type: 'str',
					},
					invo_seller: {
						data_type: 'str',
					},
					invo_term: {
						data_type: 'int',
					},
				},
				is_list: true,
			},
			lte: {
				column: {
					invo_buildtime: {
						data_type: 'datetime',
					},
					invo_datetime: {
						data_type: 'datetime',
					},
					invo_pd_price: {
						data_type: 'int',
					},
					invo_pd_quant: {
						data_type: 'int',
					},
					invo_pd_total_price: {
						data_type: 'int',
					},
					invo_price: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
			'not REGEXP_CONTAINS': {
				column: {
					invo_pd_name: {
						data_type: 'str',
					},
					invo_seller_address: {
						data_type: 'str',
					},
					invo_seller_name: {
						data_type: 'str',
					},
				},
				is_list: false,
			},
		},
		event_payment: {
			equal: {
				column: {
					payment_cidx: {
						data_type: 'int',
					},
					payment_type: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
		event_set_profile: {
			equal_column: {
				column: {
					profile_birthy: {
						data_type: 'bool',
					},
					profile_gender: {
						data_type: 'bool',
					},
					profile_nick: {
						data_type: 'bool',
					},
				},
				is_list: false,
			},
		},
		event_task: {
			equal: {
				column: {
					task_pchkid: {
						data_type: 'int',
					},
					task_status: {
						data_type: 'int',
					},
				},
				is_list: false,
			},
		},
	},
};
