import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import PreviewListItem from './PreviewListItem';

export default {
	title: 'dataDisplay/PreviewListItem',
	component: PreviewListItem,
} as Meta<typeof PreviewListItem>;

const Template: StoryFn<typeof PreviewListItem> = (args) => (
	<PreviewListItem {...args} />
);

const previewListItemData = {
	storeImgUrl: '/img/store/logo_00000208.png?t=1660286290',
	title: '這裡是任務名稱',
	desc: '統一發票對獎機+發票存摺app是一款無廣告清爽介面的統一發票管理及對獎程式。',
	ctaBtnText: '',
};

export const ModeA = Template.bind({});
ModeA.args = {
	previewMode: 'inListView',
	...previewListItemData,
};

export const ModeB = Template.bind({});
ModeB.args = {
	previewMode: 'inDetailView',
	...previewListItemData,
};
