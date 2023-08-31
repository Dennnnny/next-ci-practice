export type logicTypes =
	| 'REGEXP_CONTAINS'
	| 'not REGEXP_CONTAINS'
	| 'gte'
	| 'lte'
	| 'in';

export type eventInvoColumns =
	| 'invo_pd_record'
	| 'invo_record'
	| 'invo_pd_quant'
	| 'invo_pd_total_price'
	| 'invo_price';

export type invoiceDataListType = {
	column: eventInvoColumns | '';
	invoiceNumber: number | '';
};
export type advancedFilterListType = {
	filterType: string;
	logicType: logicTypes | '';
	value: string | number;
};

export interface eventInvo {
	eventType: 'event_invo';
	invoiceDataList?: invoiceDataListType[];
	advancedFilterList?: advancedFilterListType[];
}
export interface eventTask {
	eventType: 'event_task';
	taskPchkid?: string;
	taskStatus?: number;
}
export interface eventHand {
	eventType: 'event_hand';
	hand_id?: string;
}
export interface eventSetProfile {
	eventType: 'event_set_profile';
	profile_birthy?: boolean;
	profile_gender?: boolean;
	profile_nick?: boolean;
}
export interface eventPass {
	eventType: 'pass';
}
export interface eventRecommend {
	eventType: 'event_recommend';
	recommend_accept?: boolean;
	recommend_invite?: number | '';
}
export interface eventAddCard {
	eventType: 'event_add_card';
	number?: number | '';
	cardtype?: string;
}
export interface eventAddVipcard {
	eventType: 'event_add_vipcard';
	number?: number | '';
	pseller?: number;
}
export interface eventPayment {
	eventType: 'event_payment';
	number?: number | '';
	paymentCidx?: number;
	paymentType?: number;
}

export type RecognitionEvents =
	| eventInvo
	| eventTask
	| eventPass
	| eventHand
	| eventSetProfile
	| eventRecommend
	| eventAddCard
	| eventAddVipcard
	| eventPayment
	| { eventType: '' };

export type RecognitionEventType = RecognitionEvents['eventType'];
