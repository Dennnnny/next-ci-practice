import { Box, Divider, Flex, Heading, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { nth, path, compose, split } from 'ramda';
import { Fragment } from 'react';

type linkProps = {
	pathname: string;
	title: string;
};

type sidebarLinkProps = {
	[key: string]: linkProps[];
};

const sidebarLink: sidebarLinkProps = {
	tester: [
		{
			pathname: '/task/overview',
			title: '任務總覽',
		},
		{
			pathname: '/tag/overview',
			title: '標籤總覽',
		},
	],
};

type DictionaryProps = {
	[key: string]: string;
};

const linkDictionary: DictionaryProps = {
	tester: 'TESTER',
};

function pathCategory(path: string) {
	// path structure: "/task/overview"
	const pickedRoutesIndex = 1;
	return compose(nth(pickedRoutesIndex), split('/'))(path) ?? '';
}

export default function Sidebar() {
	const router = useRouter();
	const currentRoute = path<string>(['pathname'])(router) ?? '';
	const linkList = Object.entries(sidebarLink);

	return (
		<Box h="100%" shadow="base" padding={4}>
			<Flex alignItems="center" gap="2" direction="column" my={2}>
				{linkList.map(([link, linkConfig], index) => {
					return (
						<Flex key={index} flexFlow="column" w="100%">
							<Heading size="lg" color="text" mt={4} pl="6px">
								{linkDictionary[link]}
							</Heading>
							<Divider margin="16px 0 12px 0" />
							<VStack w="100%">
								{linkConfig.map(({ pathname, title }, linkIndex) => {
									const isActived =
										pathCategory(currentRoute) === pathCategory(pathname);
									return (
										<Link
											key={linkIndex}
											as={NextLink}
											href={pathname}
											fontWeight={isActived ? 'extrabold' : 'normal'}
											w="100%"
											textAlign="center"
											borderRadius="0.5rem"
											py={2}
											color={isActived ? 'active_link' : 'link'}
											background={isActived ? 'gray.100' : 'initial'}
											_hover={{
												background: 'gray.100',
												color: 'active_link',
											}}
										>
											{title}
										</Link>
									);
								})}
							</VStack>
						</Flex>
					);
				})}
			</Flex>
		</Box>
	);
}
