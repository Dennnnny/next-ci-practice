import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	Spacer,
	useColorMode,
	IconButton,
	Link,
	Img,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function HeaderComponent() {
	const { status } = useSession();
	const isLoading = status === 'loading';

	return (
		<Box h="100%" shadow="base" padding="4px 12px">
			<Flex alignItems="center" gap="2">
				<Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
					<Box h={'100%'}>HOME</Box>
				</Link>
				<Spacer />
				<ButtonGroup gap="1">
					<DarkModeSwitch />
					<Button
						size="sm"
						colorScheme="blue"
						onClick={() => signOut({ callbackUrl: '/' })}
						isLoading={isLoading}
					>
						登出
					</Button>
				</ButtonGroup>
			</Flex>
		</Box>
	);
}

export const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	return (
		<IconButton
			size="sm"
			icon={isDark ? <SunIcon /> : <MoonIcon />}
			aria-label="Toggle Theme"
			colorScheme="teal"
			onClick={toggleColorMode}
		/>
	);
};
