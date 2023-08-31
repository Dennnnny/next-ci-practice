import { createMachine, assign, DoneEventObject } from 'xstate';
import { values } from 'ramda';
import { checkError } from 'utils/handleApi';

const manualSettingMachine = () => {
	return createMachine<{
		tid: string;
		lastUpdateTime: number;
		defaultSettingValues: [];
		manualSettingValues: [];
	}>(
		{
			id: 'manualSetting',
			initial: 'INIT',
			context: {
				tid: '',
				lastUpdateTime: 0,
				defaultSettingValues: [],
				manualSettingValues: [],
			},
			states: {
				INIT: {
					on: {
						START_INIT_FETCH: {
							target: 'INIT_FETCH',
							actions: ['setCurrentTid'],
						},
					},
				},
				INIT_FETCH: {
					invoke: {
						src: 'initFetch',
						onDone: {
							target: 'IDLE',
							actions: ['handleInitSettingValues'],
						},
						onError: {
							target: 'ERRORS',
						},
					},
				},
				IDLE: {
					on: {
						UPDATE_SETTING_VALUE: {
							actions: ['updateManualSettingValues'],
						},
						SUBMIT_SETTING_VALUE: {
							target: 'UPDATE_MANUAL_SETTING_DATA',
							actions: ['updateManualSettingValues'],
						},
					},
				},
				UPDATE_MANUAL_SETTING_DATA: {
					invoke: {
						src: 'updateManualSettingData',
						onDone: {
							target: 'IDLE',
							actions: ['handleInitSettingValues'],
						},
						onError: {
							target: 'ERRORS',
						},
					},
				},
				ERRORS: {},
			},
		},
		{
			guards: {},
			actions: {
				// actionsAfterUpdated: () => {},
				// actionsAfterFailed: () => {},
				// setupFormDefaultValues: () => {},
				setCurrentTid: assign((context, event: DoneEventObject) => {
					return {
						...context,
						tid: event.data.tid,
					};
				}),
				handleInitSettingValues: assign((context, event) => {
					const { tid, defaultValues, lastUpdateTime } = event.data;

					return {
						...context,
						tid,
						lastUpdateTime,
						defaultSettingValues: defaultValues,
					};
				}),
				updateManualSettingValues: assign((context, event) => {
					return {
						...context,
						manualSettingValues: event.data.manualSettingValues,
					};
				}),
			},
			services: {
				initFetch: (context) => {
					const currentTid = context.tid;

					return fetch(`/task/setting/manual?tid=${currentTid}`, {
						method: 'GET',
					})
						.then(checkError)
						.then((res) => res);
				},
				updateManualSettingData: (context) => {
					const currentTid = context.tid;
					const manualSettingValues = context.manualSettingValues;

					return fetch(`/task/setting/manual`, {
						method: 'POST',
						body: JSON.stringify({
							tid: currentTid,
							updateValues: manualSettingValues,
						}),
					})
						.then(checkError)
						.then((res) => res);
				},
			},
		}
	);
};

export default manualSettingMachine;
