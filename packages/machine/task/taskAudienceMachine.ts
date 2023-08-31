import { createMachine, assign } from 'xstate';
import { checkError } from 'utils/handleApi';
import { equals } from 'ramda';
import { Options } from 'types/task';

export const taskAudienceMachine = createMachine<{
	tid: string;
	audienceList: Options[];
	audienceOptions: Options[];
	transactionList: {
		and: Options[];
		or: Options[];
		not: Options[];
	};
	transactionOptions: [];
	isDirty: boolean;
}>(
	{
		id: 'task_audience',
		initial: 'INIT',
		context: {
			tid: '',
			audienceList: [],
			audienceOptions: [],
			transactionList: {
				and: [],
				or: [],
				not: [],
			},
			transactionOptions: [],
			isDirty: false,
		},
		states: {
			INIT: {
				on: {
					GET_INIT: { target: 'INIT_OPTIONS_FETCHING', actions: 'setTaskId' },
				},
			},
			TASK_AUDIENCE_FETCHING: {
				invoke: {
					src: 'initFetch',
					onDone: {
						target: 'IDLE',
						actions: ['setTask'],
					},
					onError: {
						target: 'ERRORS',
					},
				},
			},
			INIT_OPTIONS_FETCHING: {
				invoke: {
					src: 'initOptions',
					onDone: {
						target: 'TASK_AUDIENCE_FETCHING',
						actions: ['setInitOptions'],
					},
					onError: {
						target: 'ERRORS',
					},
				},
			},
			AUDIENCE_UPDATING: {
				invoke: {
					src: 'submitAudience',
					onDone: {
						target: 'IDLE',
						actions: ['setTask'],
					},
					onError: {
						target: 'ERRORS',
					},
				},
			},
			IDLE: {
				on: {
					SET_TRANSACTION: {
						target: 'IDLE',
						actions: ['setTransaction', 'setIsDirty'],
					},
					SET_AUDIENCE: {
						target: 'IDLE',
						actions: ['setAudience', 'setIsDirty'],
					},
					SUBMIT: {
						target: ['AUDIENCE_UPDATING'],
						actions: 'setIsDirtyFalse',
					},
					HANDLE_DELETE_AUDIENCE: {
						target: 'IDLE',
						actions: ['deleteAudience'],
					},
					HANDLE_DELETE_TRANSACTION: {
						target: 'IDLE',
						actions: ['deleteTransaction'],
					},
				},
			},
			ERRORS: {},
		},
	},
	{
		actions: {
			setTaskId: assign((context, event) => {
				return { tid: event.data.tid };
			}),
			setInitOptions: assign((context, event) => {
				const { audience, transaction } = event.data;

				return {
					...context,
					audienceOptions: audience,
					transactionOptions: transaction,
				};
			}),
			setTask: assign((context, event) => {
				return { ...context, ...event.data };
			}),
			setTransaction: assign((context, event) => {
				const { transaction, type } = event.data;

				return {
					...context,
					transactionList: {
						...context.transactionList,
						[type]: transaction,
					},
				};
			}),
			deleteTransaction: assign((context, event) => {
				const { deleteItem } = event.data;
				const type: 'and' | 'or' | 'not' = event.data.type;

				const afterDeleteTransactionList = context.transactionList[type].filter(
					(item) => !equals(item, deleteItem)
				);

				return {
					...context,
					transactionList: {
						...context.transactionList,
						[type]: afterDeleteTransactionList,
					},
				};
			}),
			setAudience: assign((context, event) => {
				const { audience } = event.data;

				return {
					...context,
					audienceList: audience,
				};
			}),
			deleteAudience: assign((context, event) => {
				const { deleteItem } = event.data;

				const afterDeleteAudienceList = context.audienceList.filter(
					(item) => !equals(item, deleteItem)
				);

				return { ...context, audienceList: afterDeleteAudienceList };
			}),
			setIsDirty: assign((context, event) => {
				return { ...context, isDirty: true };
			}),
			setIsDirtyFalse: assign((context, event) => {
				return { ...context, isDirty: false };
			}),
		},
		services: {
			initOptions: () => {
				return fetch(`/task/setting/audience-list`, {
					method: 'GET',
				}).then(checkError);
			},
			initFetch: (context) => {
				const currentTid = context.tid;

				return fetch(`/task/setting/audience?tid=${currentTid}`, {
					method: 'GET',
				}).then(checkError);
			},
			submitAudience: (context) => {
				const currentTid = context.tid;
				const audienceList = context.audienceList;
				const transactionList = context.transactionList;

				return fetch(`/task/setting/audience`, {
					method: 'POST',
					body: JSON.stringify({
						tid: currentTid,
						audienceList,
						transactionList,
					}),
				});
			},
		},
		guards: {},
	}
);
