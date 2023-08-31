import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import TaskManualSetting from './TaskManualSetting';

export default {
	title: 'modal/TaskManualSetting',
	component: TaskManualSetting,
} as Meta<typeof TaskManualSetting>;

const Template: StoryFn<typeof TaskManualSetting> = (args) => {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	return (
		<Box>
			<Button onClick={onOpen}>open</Button>
			<TaskManualSetting {...args} isOpen={isOpen} onClose={onClose} />
		</Box>
	);
};

export const Primary = Template.bind({});
Primary.args = {};
