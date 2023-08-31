import { FormConfigItemType } from 'types/task';

export const basicSettingFormConfig: FormConfigItemType[] = [
	{
		label: '名稱',
		dataKey: 'title',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '開放時間',
		dataKey: 'period',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '屬性',
		dataKey: 'cate',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '分類',
		dataKey: 'viewcate',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '顯示順序',
		dataKey: 'listnum',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: 'CTA 點擊行為',
		dataKey: 'page',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: 'CTA 網址',
		dataKey: 'actionUrl',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: 'CTA 按鈕文字',
		dataKey: 'cta',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '任務說明',
		dataKey: 'desc',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '任務主圖',
		dataKey: 'image',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '獎勵文案',
		dataKey: 'prize',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '圖片標籤(左上)',
		dataKey: 'imageTags',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '店家',
		dataKey: 'storeInfo',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '目標達成項目',
		dataKey: 'target',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '金幣獎勵iB',
		dataKey: 'zp',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '目標達成門檻(次數)',
		dataKey: 'nums',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '領取限制(次)',
		dataKey: 'times',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '總量限制(次)',
		dataKey: 'range',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '領取限制(天)',
		dataKey: 'timesAll',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '總量限制(天)',
		dataKey: 'rangeAll',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
	{
		label: '追蹤碼',
		dataKey: 'trackingCode',
		dataType: '',
		defaultValue: '',
		hintText: '',
		limitations: {
			required: false,
		},
	},
];

export const formData = {
	title: 'this is title',
	period: {
		start: new Date(1677639545127),
		end: new Date(1678244345127),
	},
	cate: {
		value: '0',
		label: '金幣任務',
	},
	viewcate: [
		{
			value: '0',
			label: '任務Tab1',
		},
		{
			value: '2',
			label: '任務Tab3',
		},
	],
	listnum: 0,
	page: {
		value: '1',
		label: '開啟網頁（需自訂 CTA 網址）',
	},
	actionUrl: 'https://www.invos.com.tw',
	cta: "Let's go",
	desc: '統一發票對獎機+發票存摺app是一款無廣告清爽介面的統一發票管理及對獎程式。',
	image: [],
	prize: '文案',
	imageTags: '送麥香奶茶',
	storeInfo: {
		value: '208',
		label: '店家1',
		storeName: '208',
		storeImgUrl: '/img/store/logo_00000208.png?t=1660286290',
	},
	target: { value: '0', label: '發票張數' },
	zp: 0,
	nums: 0,
	times: 0,
	range: 0,
	timesAll: 0,
	rangeAll: 0,
	trackingCode: '',
};
