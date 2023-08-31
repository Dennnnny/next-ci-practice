import React, { useRef } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import ConfirmAlertDialog from './ConfirmAlertDialog';

export default {
	title: 'overlay/ConfirmAlertDialog',
	component: ConfirmAlertDialog,
} as Meta<typeof ConfirmAlertDialog>;

const Template: StoryFn<typeof ConfirmAlertDialog> = (args) => {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	const cancelRef = useRef<HTMLButtonElement>(null);

	return (
		<Box>
			<Button onClick={onOpen}>open</Button>
			<ConfirmAlertDialog
				{...args}
				isOpen={isOpen}
				onClose={onClose}
				cancelRef={cancelRef}
			/>
		</Box>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	headerComponent: '提醒',
	dialogBodyComponent: <>點選確認將會還原到前次設定。</>,
	cancelBtnText: 'cancel',
	confirmBtnText: 'GO',
	action: () => alert(123),
};
