import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import CreateTask from './CreateTask';

export default {
	title: 'Drawer/CreateTask',
	component: CreateTask,
} as Meta<typeof CreateTask>;

const Template: StoryFn<typeof CreateTask> = (args) => {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	return (
		<Box>
			<Button onClick={onOpen}>open</Button>
			<CreateTask {...args} isOpen={isOpen} onClose={onClose} />
		</Box>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	hasSyncTaskIdArea: false,
	hasMultiTitleListArea: false,
};

export const HasAllArea = Template.bind({});
HasAllArea.args = {
	hasSyncTaskIdArea: true,
	hasMultiTitleListArea: true,
};
