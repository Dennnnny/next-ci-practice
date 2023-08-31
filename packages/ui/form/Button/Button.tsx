import { ButtonGroup, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ButtonProps = {
	action?: () => {};
	text?: string;
	children?: string | ReactNode;
	loadingText?: string;
	isLoading?: boolean;
	isDisabled?: boolean;
};

export default function ButtonComponent({ children, ...props }: ButtonProps) {
	return (
		<ButtonGroup>
			<Button {...props}>{children}</Button>
		</ButtonGroup>
	);
}
