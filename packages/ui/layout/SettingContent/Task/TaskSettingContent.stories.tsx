import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TaskSettingContent from './TaskSettingContent';

export default {
	title: 'layout/SettingContent/TaskSettingContent',
	component: TaskSettingContent,
} as Meta<typeof TaskSettingContent>;

const Template: StoryFn<typeof TaskSettingContent> = (args) => (
	<TaskSettingContent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	children: <>任務資料</>,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
	title: '資料載入中',
	isLoading: true,
};
