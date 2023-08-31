import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from './Button';

export default {
	title: 'Form/Button',
	component: Button,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

const defaultArgs = {
	children: 'buttton',
};

export const Loading = Template.bind({});
Loading.args = {
	...defaultArgs,
	isLoading: true,
};

export const CustomLoading = Template.bind({});
CustomLoading.args = {
	...defaultArgs,
	loadingText: 'wait...',
	// spinner: //can change too,
	isLoading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	...defaultArgs,
	isDisabled: true,
};

export const Normal = Template.bind({});
Normal.args = {
	...defaultArgs,
};
