import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Sidebar from './index';
import MainLayout from '../MainLayout';

export default {
	title: 'Layout/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Sidebar>;

const Template: StoryFn<typeof Sidebar> = (args) => (
	<MainLayout header={<></>} sidebar={<Sidebar />}>
		children...
	</MainLayout>
);

export const Normal = Template.bind({});
Normal.args = {};
