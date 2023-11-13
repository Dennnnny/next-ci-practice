import React from 'react';
import {
	Flex,
	Box,
	Image,
	Button,
	Heading,
	Avatar,
	Text,
	Badge,
	Img,
} from '@chakra-ui/react';
import { isEmpty, test } from 'ramda';

interface PreviewTaskTypes {
	previewMode: 'detail' | 'list';
	imageUrl: string;
	imageTags: string;
	title: string;
	desc: string;
	prize: string;
	storeName: string;
	storeImgUrl: string;
	periodEndDate: string;
	// actionUrl: string;
	ctaBtnText: string;
}

// depend on task status ?? or ??

function PreviewTask({
	previewMode = 'detail',
	imageUrl = '',
	imageTags = '',
	title = '',
	desc = '',
	prize = '',
	storeName = '',
	storeImgUrl = '',
	periodEndDate = '',
	ctaBtnText = '',
}: PreviewTaskTypes) {
	const isPreviewModeDetail = previewMode === 'detail';
	const isPreviewModeList = previewMode === 'list';

	return (
		<Flex flexFlow="column" bg="rgb(229, 229, 229)" maxW={360}>
			<Box position="relative">
				<Badge
					position="absolute"
					top="12px"
					left="12px"
					variant="outline"
					colorScheme="blue"
					bg="#fff"
					fontSize="14px"
					borderRadius="4px"
				>
					{imageTags}
				</Badge>
				<Box minW={326} minH={163} maxW={360} maxH={180}>
					{!isEmpty(imageUrl) ? (
						<Image
							src={imageUrl}
							alt="任務主圖預覽"
							minW="inherit"
							minH="inherit"
						/>
					) : (
						<Flex
							flexFlow="column"
							alignItems="center"
							justifyContent="center"
							minW="inherit"
							minH="inherit"
							border="dashed 1px #000000"
						>
							<Text>任務圖片預覽</Text>
							<Text>（建議尺寸 1600 x 800）</Text>
						</Flex>
					)}
				</Box>
			</Box>
			<Box padding="8px 16px" bg="#ffffff">
				<Flex justifyContent="space-between" w="100%">
					<Flex flexFlow="column" w="100%">
						<Heading
							as="h2"
							size="sm"
							color="#000000"
							width={isPreviewModeDetail ? '240px' : '100%'}
							overflow="hidden"
							textOverflow="ellipsis"
							lineHeight="24px"
							minH="30px"
							maxH="48px"
						>
							{title || '這裡是任務名稱'}
						</Heading>
						<Flex justifyContent="space-between">
							<Flex>
								<Text fontSize="12px">任務獎勵</Text>
								<Flex ml="8px">
									{test(/^\+\d+/)(prize) ? (
										<Img
											src="/assets/images/icon/invos_coin.svg"
											alt="金幣"
											mr="4px"
										/>
									) : null}
									<Text fontSize="14px" fontWeight="bolder" color="#F0B900">
										{prize || '金幣'}
									</Text>
								</Flex>
							</Flex>
							{isPreviewModeList ? (
								<Flex flexFlow="column">
									<Text
										fontSize="12px"
										color="#00AEEF"
										borderBottom="solid 2px #999"
										padding="0 12px 4px 4px"
									>
										V 已達成 0/1
									</Text>
								</Flex>
							) : null}
						</Flex>
					</Flex>
					{isPreviewModeDetail ? (
						<Avatar
							name="商店圖片"
							src={`https://invoice.tw/${storeImgUrl}`}
							size="sm"
							border="solid 1px #eee"
						/>
					) : null}
				</Flex>
				{isPreviewModeDetail ? (
					<Text
						color="#4A4A4A"
						fontSize="14px"
						lineHeight="20px"
						mt="8px"
						overflow="hidden"
					>
						{desc ||
							'任務說明還沒有設定，沒設定此區塊會是空白喔！我是預設文字預設文字預設文字預設文字預設文字預設文字'}
					</Text>
				) : null}
			</Box>
			{isPreviewModeDetail ? (
				<Box mt="12px" mb="32px" bg="#ffffff" pl="16px">
					<Flex
						justifyContent="space-between"
						padding="10px 16px 10px 0"
						borderBottom="solid 1px #CCCCCC"
					>
						<Text color="#000000" whiteSpace="nowrap" mr="16px">
							品牌
						</Text>
						<Text color="#4A4A4A">{storeName || '發票存摺'}</Text>
					</Flex>
					<Flex
						justifyContent="space-between"
						padding="10px 16px 10px 0"
						borderBottom="solid 1px #CCCCCC"
					>
						<Text color="#000000">任務截止日</Text>
						<Text color="#4A4A4A">
							{!isEmpty(periodEndDate) ? periodEndDate : '無限期'}
						</Text>
					</Flex>
					<Flex
						justifyContent="space-between"
						padding="10px 16px 10px 0"
						borderBottom="solid 1px #CCCCCC"
					>
						<Text color="#000000">未領取/已領取獎勵</Text>
						<Text color="#4A4A4A">0/8</Text>
					</Flex>
					<Flex justifyContent="space-between" padding="10px 16px 10px 0">
						<Text color="#000000">任務進度</Text>
						<Text color="#4A4A4A">20/70</Text>
					</Flex>
				</Box>
			) : null}
			<Box padding="10px 16px" bg="#ffffff">
				<Button
					colorScheme="blue"
					backgroundColor="#00AEEF"
					width="100%"
					fontSize="14px"
					borderRadius="24px"
				>
					{ctaBtnText || '自定義 CTA 文字'}
				</Button>
			</Box>
		</Flex>
	);
}

export default PreviewTask;
