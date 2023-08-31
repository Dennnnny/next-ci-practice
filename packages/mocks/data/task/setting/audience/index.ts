import {
	audienceOptionsFormat,
	transactionOptionsFormat,
} from 'utils/transform';

export const transactions = [
	{
		feature: 'point',
		id: 1,
		title: '帳號綁定會員載具',
	},
	{
		feature: 'point',
		id: 2,
		title: '歸戶任一張悠遊卡',
	},
	{
		feature: 'point',
		id: 3,
		title: '歸戶任一張信用卡',
	},
	{
		feature: 'point',
		id: 4,
		title: '歸戶任一張一卡通',
	},
	{
		feature: 'point',
		id: 5,
		title: '歸戶任一張i-Cash',
	},
	{
		feature: 'point',
		id: 6,
		title: '設定載具自動匯款帳戶',
	},
	{
		feature: 'point',
		id: 7,
		title: '每日簽到',
	},
	{
		feature: 'point',
		id: 9,
		title: '收集30張7-8月載具發票',
	},
];

// 後端api需要多新增description才會符合這個格式！
export const audiences = [
	{
		display: '3C_ElifeMall (v2)',
		id: '3C_ElifeMall',
		description: '可能是某些3c用品的人',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 23626,
		},
		version: 2,
	},
	{
		display: '3C_LIANGSHING (v2)',
		id: '3C_LIANGSHING',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 5241,
		},
		version: 2,
	},
	{
		display: 'affordable_lotion (v2)',
		id: 'affordable_lotion',
		description: '什麼乳液吧',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 26790,
		},
		version: 2,
	},
	{
		display: 'airconditioner (v2)',
		id: 'airconditioner',
		description: '冷氣',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 2941,
		},
		version: 2,
	},
	{
		display: 'airfryer (v2)',
		id: 'airfryer',
		description: '原來是氣炸鍋啊',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 16201,
		},
		version: 2,
	},
	{
		display: 'alcohol (v2)',
		id: 'alcohol',
		description: '飲酒請勿過量，開車不喝酒，喝酒不開車',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 686144,
		},
		version: 2,
	},
	{
		display: 'all (v2)',
		id: 'all',
		description: '全部',
		overview: {},
		version: 2,
	},
	{
		display: 'animate (v2)',
		id: 'animate',
		description: '動畫',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 4044,
		},
		version: 2,
	},
	{
		display: 'antrodia_cinnamomea (v2)',
		id: 'antrodia_cinnamomea',
		description: '看起來像是某種香菇',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 3581,
		},
		version: 2,
	},
	{
		display: 'aojiru (v2)',
		id: 'aojiru',
		description: '蔬菜汁',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 4538,
		},
		version: 2,
	},
	{
		display: 'apple-store (v2)',
		id: 'apple-store',
		description: '蘋果商店',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 30070,
		},
		version: 2,
	},
	{
		display: 'apple_music (v2)',
		id: 'apple_music',
		description: '蘋果音樂',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 315,
		},
		version: 2,
	},
	{
		display: 'baby_carrier (v2)',
		id: 'baby_carrier',
		description: '寶寶車',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 23381,
		},
		version: 2,
	},
	{
		display: 'baby_competitor_product_buyer (v2)',
		id: 'baby_competitor_product_buyer',
		description: '寶寶競品買者',
		overview: {},
		version: 2,
	},
	{
		display: 'baby_product (v2)',
		id: 'baby_product',
		description: '寶寶產品',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 355212,
		},
		version: 2,
	},
	{
		display: 'baby_product_premium (v2)',
		id: 'baby_product_premium',
		description: '高級寶寶用品',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 1841,
		},
		version: 2,
	},
	{
		display: 'baby_store (v2)',
		id: 'baby_store',
		description: '寶寶商店',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 2806,
		},
		version: 2,
	},
	{
		display: 'badge_all (v2)',
		id: 'badge_all',
		description: '徽章吧',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 1669683,
		},
		version: 2,
	},
	{
		display: 'badge_cosmetics (v2)',
		id: 'badge_cosmetics',
		description: '化妝品徽章',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 368339,
		},
		version: 2,
	},
	{
		display: 'badge_gas_motor (v2)',
		id: 'badge_gas_motor',
		description: '加油徽章',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 724283,
		},
		version: 2,
	},
	{
		display: 'badge_healthsupplement (v2)',
		id: 'badge_healthsupplement',
		description: '健康徽章',
		overview: {
			date: 'Sun, 19 Mar 2023 00:00:00 GMT',
			user_count: 196232,
		},
		version: 2,
	},
	{
		display: ' department_store_uni_president (v2)',
		id: ' department_store_uni_president',
		overview: {
			date: 'Mon, 24 Apr 2023 00:00:00 GMT',
			user_count: 62954,
		},
		version: 2,
	},
];

export const mockTransactionOptions = transactionOptionsFormat(transactions);

export const mockAudienceOptions = audienceOptionsFormat(audiences);
