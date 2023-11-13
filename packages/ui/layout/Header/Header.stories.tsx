import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Header from './index';

export default {
	title: 'Layout/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header />;

export const Normal = Template.bind({});
Normal.args = {};
