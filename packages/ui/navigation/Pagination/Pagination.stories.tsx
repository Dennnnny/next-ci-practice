import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Pagination from './index';

export default {
	title: 'Navigation/Pagination',
	component: Pagination,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args) => <Pagination {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	currentPage: 30,
	totalPages: 100,
};
export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};
