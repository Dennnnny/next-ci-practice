import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import CreateRecognition from './CreateRecognition';

export default {
	title: 'Drawer/CreateRecognition',
	component: CreateRecognition,
} as Meta<typeof CreateRecognition>;

const Template: StoryFn<typeof CreateRecognition> = (args) => {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	return (
		<Box>
			<Button onClick={onOpen}>open</Button>
			<CreateRecognition {...args} isOpen={isOpen} onClose={onClose} />
		</Box>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	defaultRecognitionData: {
		eventType: '',
	},
};

export const DefaultEventInvo = Template.bind({});
DefaultEventInvo.args = {
	defaultRecognitionData: { eventType: 'event_invo' },
};

export const DefaultEventTask = Template.bind({});
DefaultEventTask.args = {
	defaultRecognitionData: { eventType: 'event_task' },
};

export const DefaultEventHand = Template.bind({});
DefaultEventHand.args = {
	defaultRecognitionData: { eventType: 'event_hand' },
};

export const DefaultEventSetProfile = Template.bind({});
DefaultEventSetProfile.args = {
	defaultRecognitionData: {
		eventType: 'event_set_profile',
		profile_birthy: true,
	},
};

export const DefaultPass = Template.bind({});
DefaultPass.args = {
	defaultRecognitionData: { eventType: 'pass' },
};

export const DefaultEventRecommend = Template.bind({});
DefaultEventRecommend.args = {
	defaultRecognitionData: { eventType: 'event_recommend' },
};

export const DefaultEventAddCard = Template.bind({});
DefaultEventAddCard.args = {
	defaultRecognitionData: { eventType: 'event_add_card' },
};

export const DefaultEventAddVipcard = Template.bind({});
DefaultEventAddVipcard.args = {
	defaultRecognitionData: { eventType: 'event_add_vipcard' },
};

export const DefaultEventPayment = Template.bind({});
DefaultEventPayment.args = {
	defaultRecognitionData: { eventType: 'event_payment' },
};
