import { createMachine, assign, DoneEventObject } from 'xstate';
import { isEmpty } from 'ramda';
import { checkError } from 'utils/handleApi';

const createTaskMachine = () => {
	return createMachine<{
		taskTitles: string[];
		syncTaskConfig?: {
			tid: '';
			fields?: string[];
		};
		updatedTaskList: { id: string; title: string }[];
		failedResult: string;
	}>(
		{
			id: 'createTask',
			initial: 'IDLE',
			context: {
				taskTitles: [''],
				updatedTaskList: [],
				failedResult: '',
			},
			states: {
				IDLE: {
					on: {
						CREATE_TASK: {
							target: 'CHECK_TASK_VALUE',
							actions: ['updateFetchConfig'],
						},
					},
				},
				CHECK_TASK_VALUE: {
					always: [
						{
							cond: 'hasMainTitleValue',
							target: 'CREATEING_TASK',
						},
						{
							target: 'IDLE',
						},
					],
				},
				CREATEING_TASK: {
					invoke: {
						src: 'createTask',
						onDone: {
							target: 'SUCCESS',
							actions: ['onSuccessAction'],
						},
						onError: {
							target: 'ERRORS',
							actions: ['onErrorAction'],
						},
					},
				},
				SUCCESS: {
					on: {
						INIT_NEW_TASK: {
							target: 'IDLE',
						},
					},
				},
				ERRORS: {
					on: {
						INIT_NEW_TASK: {
							target: 'IDLE',
						},
					},
				},
			},
		},
		{
			guards: {
				hasMainTitleValue: (context) => {
					const mainTitle = context.taskTitles[0];

					return !isEmpty(mainTitle);
				},
			},
			actions: {
				updateFetchConfig: assign((context, event) => {
					const updatedTitleList = event.data.titleList;

					return { ...context, taskTitles: updatedTitleList };
				}),
				onErrorAction: assign((context, event: DoneEventObject) => {
					return { ...context, failedResult: event.data.message };
				}),
				onSuccessAction: assign((context, event: DoneEventObject) => {
					const updatedTaskList = event.data.taskList;
					return { ...context, updatedTaskList };
				}),
			},
			services: {
				createTask: (context) => {
					const title = context.taskTitles[0];
					const titleList = context.taskTitles;

					return fetch('/task/create', {
						method: 'POST',
						body: JSON.stringify({ titleList }),
					})
						.then(checkError)
						.then((res) => res);
				},
			},
		}
	);
};

export default createTaskMachine;
