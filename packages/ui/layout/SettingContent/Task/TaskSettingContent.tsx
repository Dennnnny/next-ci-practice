import { ReactElement } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';

export default function TaskSettingContent({
	title = '',
	isLoading = false,
	children,
}: {
	title: string;
	isLoading: boolean;
	children: ReactElement | ReactElement[];
}) {
	return (
		<Box
			w="100%"
			h="100%"
			overflow="scroll"
			sx={{
				msOverflowStyle: 'none',
				scrollbarWidth: 'none',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				'> *': { marginBottom: '12px' },
			}}
			p="16px"
		>
			{isLoading ? (
				<>
					<Heading as="h3" size="md" color="#000" mt="8px">
						{title}
					</Heading>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
						mt="16px"
					/>
				</>
			) : (
				children
			)}
		</Box>
	);
}
