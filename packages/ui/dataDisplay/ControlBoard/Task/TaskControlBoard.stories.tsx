import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TaskControlBoard from './TaskControlBoard';

export default {
	title: 'dataDisplay/ControlBoard/TaskControlBoard',
	component: TaskControlBoard,
} as Meta<typeof TaskControlBoard>;

const Template: StoryFn<typeof TaskControlBoard> = (args) => (
	<TaskControlBoard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	taskId: '6666',
	lastUpdateTime: new Date().getTime() - 1000 * 60 * 30,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
	isAppLoading: true,
};
