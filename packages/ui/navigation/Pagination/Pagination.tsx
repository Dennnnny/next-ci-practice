import { PaginationProps } from 'types/navigation';
import { Box, Flex, VStack, Button, ButtonProps } from '@chakra-ui/react';
import { generatorPagesList } from './Pagination.utils';

export default function Pagination({
	currentPage,
	totalPages,
	isLoading = false,
	handleChangePage,
}: PaginationProps) {
	const pageList = generatorPagesList({ currentPage, totalPages });

	if (isLoading) {
		return null;
	}

	return (
		<VStack
			w="max-content"
			mt={10}
			mb={5}
			mx={'auto'}
			zIndex={10}
			position="relative"
		>
			<Flex gap={4}>
				<PageButton
					onClick={() => handleChangePage('GO_TO_FIRST_PAGE')}
					isDisabled={currentPage === 1}
				>
					{'|<'}
				</PageButton>
				<PageButton
					onClick={() => handleChangePage('PREV_PAGE')}
					isDisabled={currentPage === 1}
				>
					{'<'}
				</PageButton>
				{pageList.map((page, index) => {
					const isCurrentPage = currentPage === page;
					return (
						<PageButton
							key={index}
							borderColor={isCurrentPage ? '#00aeef' : ''}
							borderWidth={isCurrentPage ? '2px' : ''}
							onClick={() => handleChangePage('CHANGE_PAGE', page)}
						>
							{page}
						</PageButton>
					);
				})}
				<PageButton
					onClick={() => handleChangePage('NEXT_PAGE')}
					isDisabled={currentPage === totalPages}
				>
					{'>'}
				</PageButton>
				<PageButton
					onClick={() => handleChangePage('GO_TO_LAST_PAGE')}
					isDisabled={currentPage === totalPages}
				>
					{'>|'}
				</PageButton>
			</Flex>
			<Box>共{totalPages}頁</Box>
		</VStack>
	);
}

function PageButton({ children, ...args }: ButtonProps) {
	return (
		<Button
			w={'2rem'}
			h={'2rem'}
			textAlign="center"
			border="1px solid darkgray"
			color="text"
			borderRadius="0.3rem"
			display="flex"
			alignItems="center"
			justifyContent="center"
			{...args}
		>
			{children}
		</Button>
	);
}
