import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import RecognitionCard from './RecognitionCard';
import { advancedFilterListType } from 'types/recognition';

const advancedFilterList: advancedFilterListType[] = [
	{
		filterType: 'invo_pd_name',
		logicType: 'REGEXP_CONTAINS',
		value: '奶粉',
	},
	{
		filterType: 'invo_pd_name',
		logicType: 'not REGEXP_CONTAINS',
		value:
			'奶粉[盒袋]|(封口|密封)[夾罐]|(儲存|塑膠)袋|膠囊|保鮮|分裝|湯匙|益生菌|淨水器|康芯|加購|奶嘴|[咬套]環|磁吸|送|贈品|存錢筒|鞋|筆|穀|烘焙|鳥|巴西|動物|勺|指環|面膜|現貨|粉撲|刮刮卡|掛鐘|狗|犬|貓|寵物|鸚鵡|凡士林|椰奶|洗衣精|攪拌機|行動電源|廚房|不鏽鋼|優格餅|軟糖|粉[圓粿條彩]|冰棒|波士頓派|零食|遊戲|口徑|吸[管涕]|烏龍|奶茶|鋼圈|內[褲衣]|甜度|冷熱|[大中小]杯|指甲油|凝膠|黃色小鴨',
	},
];

export default {
	title: 'dataDisplay/RecognitionCard',
	component: RecognitionCard,
} as Meta<typeof RecognitionCard>;

const Template: StoryFn<typeof RecognitionCard> = (args) => (
	<RecognitionCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	recognitionData: {
		eventType: 'event_invo',
		invoiceDataList: [{ column: 'invo_pd_record', invoiceNumber: 1 }],
		advancedFilterList: [
			{
				filterType: 'invo_pd_price',
				logicType: 'gte',
				value: 1,
			},
			...advancedFilterList,
		],
	},
	handleEditAction: () => {},
	handleDeleteAction: () => {},
};

export const EmptyStatus = Template.bind({});
EmptyStatus.args = {
	recognitionData: {
		eventType: 'event_invo',
		invoiceDataList: [],
		advancedFilterList: [],
	},
	handleEditAction: () => {},
	handleDeleteAction: () => {},
};
