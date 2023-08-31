import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import PeriodPicker from './PeriodPicker';

export default {
	title: 'Form/PeriodPicker',
	component: PeriodPicker,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof PeriodPicker>;

const Template: StoryFn<typeof PeriodPicker> = (args) => (
	<PeriodPicker {...args} />
);

const defaultArgs = {};

export const Primary = Template.bind({});
Primary.args = {
	...defaultArgs,
};
