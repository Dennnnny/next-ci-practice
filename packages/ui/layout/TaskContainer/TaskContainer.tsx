import TaskControlBoard from 'ui/dataDisplay/ControlBoard/Task/TaskControlBoard';
import { Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Provider } from 'jotai';

export default function TaskContainerLayout({
	children,
}: {
	children: ReactNode;
}) {
	const router = useRouter();

	const { taskId } = router.query; //  task/setting/audience/1123 => taskId = 1123
	const currentTaskId = taskId as string;
	const isAppLoading = false;
	const lastUpdateTime = 162394818571923;

	return (
		<Provider>
			<Grid
				w="100%"
				h="100%"
				p="16px"
				bg="rgb(229, 229, 229)"
				templateAreas={`"control-board control-board"
                      "content-body content-body"`}
				gridTemplateColumns={'800px 360px'}
				gridTemplateRows={'84px 1fr'}
				gap="16px"
			>
				<GridItem area={'control-board'}>
					<TaskControlBoard
						taskId={currentTaskId}
						isAppLoading={isAppLoading}
						lastUpdateTime={lastUpdateTime}
					/>
				</GridItem>
				<GridItem area={'content-body'}>{children}</GridItem>
			</Grid>
		</Provider>
	);
}
