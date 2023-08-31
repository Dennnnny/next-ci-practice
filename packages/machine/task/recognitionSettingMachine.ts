import { createMachine, assign, DoneEventObject } from 'xstate';
import { values } from 'ramda';
import { checkError } from 'utils/handleApi';
import { RecognitionEvents } from 'types/recognition';

const recognitionSettingMachine = () => {
	return createMachine<{
		tid: string;
		lastUpdateTime: number;
		defaultSettingValues: {};
		latestSettingValue: RecognitionEvents[];
		currentEditingRecognitionData: RecognitionEvents;
		isDirty: boolean;
	}>(
		{
			id: 'recognitionSetting',
			initial: 'INIT',
			context: {
				tid: '',
				lastUpdateTime: 0,
				defaultSettingValues: {},
				latestSettingValue: [],
				currentEditingRecognitionData: {
					eventType: '',
				},
				isDirty: false,
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
						SET_EDIT_RECOGNITION_DATA: {
							actions: ['setCurrentEditingRecognitionData'],
						},
						UPDATE_SETTING_VALUE: {
							actions: ['updateLatestSettingValue'],
						},
						DELETE_SETTING_VALUE: {
							actions: ['deleteLatestSettingValue'],
						},
						RESET_SETTING_VALUE: {
							actions: ['restSettingValue'],
						},
						CLEAR_ALL_SETTING_VALUE: {
							actions: ['clearAllSettingValue'],
						},
						SUBMIT_SETTING_VALUE: {
							target: 'UPDATE_RECOGNITION_DATA',
						},
					},
				},
				UPDATE_RECOGNITION_DATA: {
					invoke: {
						src: 'updateRecognitionData',
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
						latestSettingValue: values(defaultValues),
						isDirty: false,
					};
				}),
				setCurrentEditingRecognitionData: assign((context, event) => ({
					...context,
					currentEditingRecognitionData: event.data,
				})),
				updateLatestSettingValue: assign((context, event) => {
					const prevLatestSettingValue = context.latestSettingValue;
					const updatedRecognitionDataItem = event.data;
					const hasPrevSettingValue =
						prevLatestSettingValue.filter(
							(item) => item.eventType === updatedRecognitionDataItem.eventType
						).length > 0;
					const updatedLatestSettingValue = hasPrevSettingValue
						? prevLatestSettingValue.map((item) => {
								if (item.eventType === updatedRecognitionDataItem.eventType) {
									return updatedRecognitionDataItem;
								}
								return item;
						  })
						: [updatedRecognitionDataItem, ...prevLatestSettingValue];

					return {
						...context,
						latestSettingValue: updatedLatestSettingValue,
						isDirty: true,
					};
				}),
				deleteLatestSettingValue: assign((context, event) => {
					const prevLatestSettingValue = context.latestSettingValue;
					const deleteRecognitionDataEventType = event.data.eventType;
					const updatedLatestSettingValue = prevLatestSettingValue.filter(
						(item) => item.eventType !== deleteRecognitionDataEventType
					);

					return {
						...context,
						latestSettingValue: updatedLatestSettingValue,
						isDirty: true,
					};
				}),
				restSettingValue: assign((context) => {
					const defaultSettingValues = context.defaultSettingValues;

					return {
						...context,
						latestSettingValue: values(defaultSettingValues),
						isDirty: false,
					};
				}),
				clearAllSettingValue: assign((context) => {
					return {
						...context,
						latestSettingValue: [],
					};
				}),
			},
			services: {
				initFetch: (context) => {
					const currentTid = context.tid;

					return fetch(`/task/setting/recognition?tid=${currentTid}`, {
						method: 'GET',
					})
						.then(checkError)
						.then((res) => res);
				},
				updateRecognitionData: (context) => {
					const currentTid = context.tid;
					const updateValues = context.latestSettingValue;

					return fetch('/task/setting/recognition', {
						method: 'POST',
						body: JSON.stringify({
							tid: currentTid,
							updateValues,
						}),
					})
						.then(checkError)
						.then((res) => res);
				},
			},
		}
	);
};

export default recognitionSettingMachine;
