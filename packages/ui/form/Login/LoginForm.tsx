import React from 'react';
import {
	Center,
	Button,
	ButtonGroup,
	VStack,
	Divider,
	Box,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
	return (
		<Center h="100vh" bg="rgb(229, 229, 229)">
			<VStack
				gap="16px"
				boxShadow="base"
				padding="24px"
				borderRadius="8px"
				bg="#fff"
			>
				<Box>title</Box>
				<Divider />

				<ButtonGroup alignSelf="flex-end" gap="12px">
					<Button onClick={() => signIn('google', { callbackUrl: '/' })}>
						GOOGLE登入
					</Button>
				</ButtonGroup>
			</VStack>
		</Center>
	);
}
