import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import FilterDatePicker from './index';
import { Box } from '@chakra-ui/react';

export default {
	title: 'Form/DatePicker/FilterDatePicker',
	component: FilterDatePicker,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof FilterDatePicker>;

const Template: StoryFn<typeof FilterDatePicker> = (args) => (
	<Box position="absolute" left={10} top={10} right={10}>
		<FilterDatePicker {...args} />
	</Box>
);

export const WithoutValue = Template.bind({});
WithoutValue.args = {
	dateValue: '',
	displayName: '開始日期',
	name: 'startTime',
	send: () => {},
};

export const WithValue = Template.bind({});
WithValue.args = {
	dateValue: '2022/01/01',
	displayName: '開始日期',
	name: 'startTime',
	send: () => {},
};
