import React from 'react';
import { QuestionIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';

export default function QuestionIconWithTooltip({
	tooltipText = '',
}: {
	tooltipText: string;
}) {
	return (
		<Tooltip label={tooltipText}>
			<QuestionIcon ml="4px" mb="2px" sx={{ cursor: 'pointer' }} />
		</Tooltip>
	);
}
