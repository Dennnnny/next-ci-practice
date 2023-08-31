import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import SubmitFormConfirmContent from './SubmitFormConfirmContent';
import { formData } from './SubmitFormConfirmContent.utils';

export default {
	title: 'Form/SubmitFormConfirmContent',
	component: SubmitFormConfirmContent,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof SubmitFormConfirmContent>;

const Template: StoryFn<typeof SubmitFormConfirmContent> = (args) => (
	<SubmitFormConfirmContent {...args} />
);

const defaultArgs = {
	tid: '6666',
	formData,
	dirtyFields: {},
	isPeriodModeRange: true,
};

export const Primary = Template.bind({});
Primary.args = {
	...defaultArgs,
};

export const HasDirtyFields = Template.bind({});
HasDirtyFields.args = {
	...defaultArgs,
	dirtyFields: {
		period: {
			start: true,
			end: true,
		},
		desc: true,
	},
};

export const IsEternalTask = Template.bind({});
IsEternalTask.args = {
	...defaultArgs,
	formData: {
		...defaultArgs.formData,
		period: undefined,
	},
	isPeriodModeRange: false,
};
