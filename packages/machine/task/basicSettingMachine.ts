import { createMachine, assign, DoneEventObject } from 'xstate';
import { checkError } from 'utils/handleApi';

const basicSettingMachine = () => {
	return createMachine<{
		tid: string;
		taskStatus: 'draft' | 'public' | 'close';
		nextTaskStatus: string;
		lastUpdateTime: number;
		defaultFormValues: {};
		latestFormValue: {};
	}>(
		{
			id: 'basicSetting',
			initial: 'INIT',
			context: {
				tid: '',
				taskStatus: 'draft',
				nextTaskStatus: '',
				lastUpdateTime: 0,
				defaultFormValues: {},
				latestFormValue: {},
			},
			states: {
				INIT: {
					on: {
						GET_INIT_TASK: {
							target: 'INIT_TASK_FETCH',
							actions: ['setCurrentTid'],
						},
					},
				},
				IDLE: {
					on: {
						UPDATE_TASK_FORM: {
							target: 'FORM_UPDATING',
							actions: ['handleSubmitFormData'],
						},
						UPDATE_TASK_STATUS: {
							target: 'STATUS_UPDATING',
							actions: ['updateNextTaskStatus'],
						},
					},
				},
				INIT_TASK_FETCH: {
					invoke: {
						src: 'initFetch',
						onDone: {
							target: 'IDLE',
							actions: [
								'updateTaskStatusValue',
								'setupFormDefaultValues',
								'saveDefaultValues',
							],
						},
						onError: {
							target: 'ERRORS',
						},
					},
				},
				FORM_UPDATING: {
					invoke: {
						src: 'updateTask',
						onDone: {
							target: 'IDLE',
							actions: [
								'setupFormDefaultValues',
								'saveDefaultValues',
								'actionsAfterUpdated',
							],
						},
						onError: {
							target: 'IDLE',
							actions: ['actionsAfterFailed'],
						},
					},
				},
				STATUS_UPDATING: {
					invoke: {
						src: 'updateTaskStatus',
						onDone: {
							target: 'IDLE',
							actions: ['updateTaskStatusValue', 'actionsAfterUpdated'],
						},
						onError: {
							target: 'IDLE',
							actions: ['actionsAfterFailed'],
							// actions: assign({ error: (context, event) => event.data }),
						},
					},
				},
				STATUS_UPDATE_SUCCESS: {
					entry: ['actionsAfterUpdated'],
					always: {
						target: 'IDLE',
					},
				},
				STATUS_UPDATE_FAIL: {
					entry: ['actionsAfterFailed'],
					always: {
						target: 'IDLE',
					},
				},
				ERRORS: {},
			},
		},
		{
			guards: {},
			actions: {
				actionsAfterUpdated: () => {},
				actionsAfterFailed: () => {},
				setupFormDefaultValues: () => {},
				setCurrentTid: assign((context, event: DoneEventObject) => {
					return {
						...context,
						tid: event.data.tid,
					};
				}),
				updateTaskStatusValue: assign((context, event: DoneEventObject) => {
					return {
						...context,
						tid: event.data.tid,
						taskStatus: event.data.taskStatus,
						lastUpdateTime: event.data.lastUpdateTime,
					};
				}),
				updateNextTaskStatus: assign((context, event: DoneEventObject) => {
					return {
						...context,
						nextTaskStatus: event.data.nextTaskStatus,
					};
				}),
				saveDefaultValues: assign((context, event: DoneEventObject) => {
					return {
						...context,
						tid: event.data.tid,
						defaultFormValues: event.data.defaultValues,
						lastUpdateTime: event.data.lastUpdateTime,
					};
				}),
				handleSubmitFormData: assign((context, event: DoneEventObject) => {
					const latestFormValue = event.data.formData;
					return {
						...context,
						latestFormValue,
					};
				}),
			},
			services: {
				initFetch: (context) => {
					const currentTid = context.tid;

					return fetch(`/task/setting/basic?tid=${currentTid}`, {
						method: 'GET',
					})
						.then(checkError)
						.then((res) => res);
				},
				updateTask: (context) => {
					const currentTid = context.tid;
					const updateValues = context.latestFormValue;

					return fetch('/task/setting/basic', {
						method: 'POST',
						body: JSON.stringify({
							tid: currentTid,
							updateType: 'task-data',
							updateValues,
						}),
					})
						.then(checkError)
						.then((res) => res);
				},
				updateTaskStatus: (context, event) => {
					const currentTid = context.tid;
					const nextTaskStatus = event.data.nextTaskStatus;

					return fetch('/task/setting/basic', {
						method: 'POST',
						body: JSON.stringify({
							tid: currentTid,
							updateType: 'task-status',
							nextTaskStatus,
						}),
					})
						.then(checkError)
						.then((res) => res);
				},
			},
		}
	);
};

export default basicSettingMachine;
