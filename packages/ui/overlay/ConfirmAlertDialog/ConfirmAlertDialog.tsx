import React, { ReactElement, RefObject } from 'react';
import {
	AlertDialog,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogBody,
	ButtonGroup,
	Button,
} from '@chakra-ui/react';

export default function ConfirmAlertDialog({
	isOpen,
	onClose,
	cancelRef,
	headerComponent,
	dialogBodyComponent,
	cancelBtnText,
	confirmBtnText,
	action,
}: {
	isOpen: boolean;
	onClose: () => void;
	cancelRef: RefObject<HTMLButtonElement>;
	headerComponent: ReactElement | string;
	dialogBodyComponent: ReactElement | string;
	cancelBtnText?: string;
	confirmBtnText?: string;
	action?: () => void;
}) {
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{headerComponent}
					</AlertDialogHeader>
					<AlertDialogBody>{dialogBodyComponent}</AlertDialogBody>
					<AlertDialogFooter>
						<ButtonGroup>
							<Button ref={cancelRef} onClick={onClose}>
								{cancelBtnText ?? '取消'}
							</Button>
							<Button
								colorScheme="blue"
								onClick={() => {
									if (action) {
										action();
									}
									onClose();
								}}
							>
								{confirmBtnText ?? '確認'}
							</Button>
						</ButtonGroup>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}
