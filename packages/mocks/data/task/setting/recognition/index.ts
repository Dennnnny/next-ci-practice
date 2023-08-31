export const initRecognitionData = {
	event_invo: {
		eventType: 'event_invo',
		invoiceDataList: [{ column: 'invo_pd_record', invoiceNumber: 1 }],
		advancedFilterList: [
			{
				filterType: 'invo_pd_price',
				logicType: 'gte',
				value: 1,
			},
			{
				filterType: 'invo_pd_name',
				logicType: 'regexp contains',
				value:
					'(d)g|[點套號特]餐|主菜|[少微去中]冰|常溫|福[袋箱]|香水|便當|-特?[大中小LMS]|[大中小LMS]杯|咖啡|沙瓦|奶蓋|[牛鮮]奶|歐[雷蕾]|拿鐵|禮包|隨手包|雞|肉|蛋糕|[蛋脆]捲|(鳳梨|方塊)酥|(威化|鬆)餅|薯[餅條]|[甜溫糖]度|冰塊|加大|外送|[謝感]謝|您好|不好意思|麻煩|堡|請|要|為|改|換|或|任何|全部都|全[部都]|備註|附餐|封口|茶湯會|([杯套壺單加H溫熱冷冰大中小LMS])|布丁|芋[圓園]|橘皮|波霸|珍珠|(茶|仙草)凍|雪碧|可樂|七喜|折抵|環保|自[帶備]|茄醬|壺|袋|招待|吸管|開幕慶|促銷|活動|評論|贈|正常|茶包|招待|湯匙|早餐店|茶粉|茶包|沖泡|豆漿|冰淇淋|烘焙專用|炸物|拼盤|沙拉|葵瓜子',
			},
		],
	},
	pass: {
		eventType: 'pass',
	},
	event_task: {
		eventType: 'event_task',
		taskPchkid: '1697',
		taskStatus: 2,
	},
	event_add_card: {
		eventType: 'event_add_card',
		number: 2,
		cardtype: '3J0002',
	},
	event_hand: {
		eventType: 'event_hand',
		hand_id: '1697',
	},
	event_set_profile: {
		eventType: 'event_set_profile',
		profile_birthy: true,
	},
	event_recommend: {
		eventType: 'event_recommend',
		recommend_invite: 3,
	},
	event_add_vipcard: {
		eventType: 'event_add_vipcard',
		number: 2,
		pseller: 8,
	},
	event_payment: {
		eventType: 'event_payment',
		number: 1,
		paymentCidx: 2,
		paymentType: 3,
	},
};
