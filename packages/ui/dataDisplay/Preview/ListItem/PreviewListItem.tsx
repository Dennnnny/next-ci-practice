import React from 'react';
import { Avatar, Button, Flex, Heading, Text } from '@chakra-ui/react';

interface PreviewListItemTypes {
	previewMode: 'inListView' | 'inDetailView';
	storeImgUrl: string;
	title: string;
	desc: string;
	ctaBtnText: string;
}

export default function PreviewListItem({
	previewMode = 'inListView',
	storeImgUrl = '',
	title = '',
	desc = '',
	ctaBtnText = '',
}: PreviewListItemTypes) {
	const isPreviewModeListView = previewMode === 'inListView';

	return (
		<Flex maxW={360} alignItems="center" padding="12px">
			{isPreviewModeListView ? (
				<Avatar
					name="商店圖片"
					src={`https://invoice.tw/${storeImgUrl}`}
					size="sm"
					border="solid 1px #eee"
				/>
			) : (
				<Avatar
					name="愛心 Logo"
					src="/assets/images/icon/Icon_Dialog_Love_Filled.svg"
					size="sm"
				/>
			)}
			<Flex flexFlow="column" margin="0 12px">
				<Heading
					as="h2"
					size={isPreviewModeListView ? 'md' : 'sm'}
					color="#000000"
					lineHeight="30px"
					minH="30px"
					maxW="180px"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{title || '這裡是任務名稱'}
				</Heading>
				<Text
					color="#4A4A4A"
					fontSize="14px"
					lineHeight="20px"
					minH="20px"
					maxW="180px"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{desc ||
						'任務說明還沒有設定，沒設定此區塊會是空白喔！我是預設文字預設文字預設文字預設文字預設文字預設文字'}
				</Text>
			</Flex>
			<Button
				colorScheme="blue"
				backgroundColor="#00AEEF"
				size="sm"
				borderRadius="16px"
			>
				{ctaBtnText || '自訂 CTA'}
			</Button>
		</Flex>
	);
}
