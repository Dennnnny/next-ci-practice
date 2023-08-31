import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import {
	Flex,
	Heading,
	Text,
	HStack,
	Spinner,
	Tabs,
	TabList,
	Tab,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Divider,
	VStack,
	CircularProgress,
	CircularProgressLabel,
	Tooltip,
	Skeleton,
	useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { compose, includes, indexOf, isNil, map, path } from 'ramda';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { useAtom } from 'jotai';
import ConfirmAlertDialog from 'ui/overlay/ConfirmAlertDialog';
import { allowedChangeRoutesAtom } from 'ui/layout/TaskContainer/TaskContainer.utils';

const taskStatusList = {
	draft: '草稿',
	public: '開啟',
	close: '刪除',
};

const routeList: {
	name: string;
	path: string;
	isDisabled?: boolean;
	isChecked?: boolean;
}[] = [
	{ name: '基本設定', path: '/task/setting/basic/' },
	{ name: '受眾設定', path: '/task/setting/audience/' },
	{ name: '條件設定', path: '/task/setting/recognition/' },
	{ name: '手動名單', path: '/task/setting/manual/' },
];

export default function TaskControlBoard({
	taskId,
	isAppLoading,
	lastUpdateTime,
}: {
	taskId: string;
	isAppLoading: boolean;
	lastUpdateTime?: number;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const confirmRef = useRef<HTMLButtonElement>(null);
	const upcomingRoute = useRef('');

	const router = useRouter();
	const { pathname } = router;
	const [allowedChangeRoute, setAllowedChangeRoute] = useAtom(
		allowedChangeRoutesAtom
	);

	const tabDefaultIndex = compose(
		indexOf(true),
		map((routeConfig) =>
			includes(path(['path'])(routeConfig) as string, pathname)
		)
	)(routeList);

	return (
		<Flex
			h="100%"
			minH="84px"
			padding="12px 8px 0 8px"
			boxShadow="base"
			bg="#ffffff"
			borderRadius="12px"
		>
			<Flex
				flexFlow="column"
				h="100%"
				minH="72px"
				justifyContent="space-between"
			>
				<Flex flexShrink={0} alignItems="baseline" ml="8px">
					<Heading as="h2" size="md">
						任務設定
					</Heading>
					{isAppLoading ? (
						<Skeleton
							width="240px"
							height="20px"
							ml="12px"
							alignSelf="center"
						/>
					) : (
						<HStack ml="12px">
							<Text fontSize="sm">{`任務 ID: ${taskId}`}</Text>
							<Text fontSize="sm">
								{!isNil(lastUpdateTime)
									? `上次更新時間: ${formatDistanceToNow(lastUpdateTime, {
											locale: zhTW,
									  })}前`
									: null}
							</Text>
						</HStack>
					)}
				</Flex>
				<Tabs
					size="sm"
					// defaultIndex={tabDefaultIndex}
					index={tabDefaultIndex}
					ml="8px"
				>
					<TabList>
						{routeList.map(({ name, path, isDisabled, isChecked }, i) => {
							return (
								<Tab
									key={i}
									onClick={() => {
										if (allowedChangeRoute || includes(path, pathname)) {
											router.push(`${path}${taskId}`);
										} else {
											onOpen();
											upcomingRoute.current = path;
										}
									}}
									isDisabled={isDisabled}
								>
									{name}
									{!isNil(isChecked) && isChecked ? (
										<Tooltip label={`已完成${name}`}>
											<CheckCircleIcon ml="8px" />
										</Tooltip>
									) : null}
								</Tab>
							);
						})}
					</TabList>
				</Tabs>
			</Flex>
			<Divider orientation="vertical" margin="0 16px" />
			{isAppLoading ? (
				<Spinner
					thickness="2px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="lg"
				/>
			) : (
				<HStack gap="8px">
					<VStack w="56px" h="100%">
						<Heading as="h4" size="xs" color="#000">
							設定進度
						</Heading>
						<CircularProgress
							value={40}
							color="green.400"
							size="40px"
							thickness="12px"
						>
							<CircularProgressLabel>40%</CircularProgressLabel>
						</CircularProgress>
					</VStack>
					<VStack w="56px" h="100%">
						<Heading as="h4" size="xs" color="#000">
							任務狀態
						</Heading>
						<Flex w="40px" h="40px" alignItems="center">
							<Text>草稿</Text>
						</Flex>
					</VStack>
					<Menu>
						<MenuButton
							as={Button}
							variant="outline"
							rightIcon={<ChevronDownIcon />}
							colorScheme="blue"
							ml={4}
						>
							切換為
						</MenuButton>
						<MenuList>
							<MenuItem onClick={() => {}} isDisabled>
								開啟
							</MenuItem>
							<MenuItem onClick={() => {}}>刪除</MenuItem>
							<MenuItem onClick={() => {}}>草稿</MenuItem>
						</MenuList>
					</Menu>
					<ConfirmAlertDialog
						isOpen={isOpen}
						onClose={onClose}
						cancelRef={confirmRef}
						headerComponent="確認視窗"
						dialogBodyComponent="本次編輯內容尚未儲存，離開視窗將不會儲存本次異動，確定要結束編輯？"
						action={() => {
							router.push(`${upcomingRoute.current}${taskId}`);
							setAllowedChangeRoute(true);
						}}
					/>
				</HStack>
			)}
		</Flex>
	);
}
