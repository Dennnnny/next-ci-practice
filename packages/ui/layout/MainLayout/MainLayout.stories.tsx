import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import MainLayout from './MainLayout';
import { Box } from '@chakra-ui/react';

export default {
	title: 'Layout/MainLayout',
	component: MainLayout,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof MainLayout>;

const Template: StoryFn<typeof MainLayout> = (args) => <MainLayout {...args} />;

const defaultArgs = {};

export const Noraml = Template.bind({});
Noraml.args = {
	...defaultArgs,
	header: (
		<Box h="100%" boxShadow={'base'}>
			HEADER
		</Box>
	),
	sidebar: (
		<Box h="100%" boxShadow={'base'}>
			SIDDDDD
		</Box>
	),
	children: (
		<Box h="100%" boxShadow={'base'}>
			main content
		</Box>
	),
};
