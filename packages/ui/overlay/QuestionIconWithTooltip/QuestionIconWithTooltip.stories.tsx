import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import QuestionIconWithTooltip from './index';

export default {
	title: 'overlay/QuestionIconWithTooltip',
	component: QuestionIconWithTooltip,
} as Meta<typeof QuestionIconWithTooltip>;

const Template: StoryFn<typeof QuestionIconWithTooltip> = (args) => (
	<QuestionIconWithTooltip {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	tooltipText: '這是 tooltip !!!',
};
