import { tableSortingColumn } from 'utils/var';
import { TaskOverivewContext } from 'types/task';
import { SortingState } from '@tanstack/react-table';
import { nth } from 'ramda';
import { createMachine, assign } from 'xstate';

export const tableMachine = <T>(id: string = 'table') => {
	const machineId = id;
	return createMachine<TaskOverivewContext<T>>(
		{
			id: machineId,
			type: 'parallel',
			context: {
				tasks: [],

				paginationConfig: {
					page: 1,
					pageSize: 20,
				},
				totalPages: 0,

				filterConfig: {
					searchInput: '',
					startTime: '',
					endTime: '',
					store: [],
					status: [],
					executeStatus: [],
				},

				sortingConfig: [],
			},
			states: {
				LIST: {
					initial: 'FETCHING_TASK_LIST',
					states: {
						IDLE: {
							on: {
								FETCH: 'FETCHING_TASK_LIST',
								DELETE_TASK: 'DELETE_TASK',
								DOWNLOAD_TASK: 'DOWNLOAD_TASK',
							},
						},
						FETCHING_TASK_LIST: {
							invoke: {
								src: 'getTaskList',
								onDone: {
									target: ['IDLE', '#' + machineId + '.FILTERS.IDLE'],
									actions: 'setList',
								},
								onError: {
									target: 'ERRORS',
								},
							},
						},
						DELETE_TASK: {
							invoke: {
								src: 'deleteSelectedTask',
								onDone: {
									target: ['IDLE', '#' + machineId + '.FILTERS.IDLE'],
									actions: 'setList',
								},
								onError: {
									target: 'ERRORS',
								},
							},
						},
						DOWNLOAD_TASK: {
							invoke: {
								src: 'downloadSelectedTask',
								onDone: {
									target: ['IDLE', '#' + machineId + '.FILTERS.IDLE'],
									actions: 'setList',
								},
								onError: {
									target: 'ERRORS',
								},
							},
						},
						ERRORS: {
							on: {
								RETRY: {
									target: 'FETCHING_TASK_LIST',
									actions: '',
								},
							},
						},
					},
				},
				FILTERS: {
					initial: 'IDLE',
					states: {
						IDLE: {
							on: {
								SUBMIT_MODIFIED: {
									target: 'MODIFYING_DATA',
								},
								ON_CHANGE_FILTER: {
									target: 'MODIFIED',
									actions: 'setFilterValue',
								},
							},
						},
						MODIFIED: {
							on: {
								SUBMIT_MODIFIED: {
									target: 'MODIFYING_DATA',
								},
								ON_CHANGE_FILTER: {
									target: 'MODIFIED',
									actions: 'setFilterValue',
								},
							},
						},
						MODIFYING_DATA: {
							after: [
								{
									delay: 0,
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['goToFirstPage'],
								},
							],
						},
					},
				},
				PAGINATION: {
					initial: 'IDLE',
					states: {
						IDLE: {
							on: {
								NEXT_PAGE: {
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['setNextPage'],
								},
								PREV_PAGE: {
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['setPrevPage'],
								},
								GO_TO_FIRST_PAGE: {
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['goToFirstPage'],
								},
								GO_TO_LAST_PAGE: {
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['goToLastPage'],
								},
								CHANGE_PAGE: {
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['changePage'],
								},
							},
						},
					},
				},
				SORTING: {
					initial: 'IDLE',
					states: {
						IDLE: {
							after: [
								{
									delay: 0,
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['goToFirstPage'],
								},
							],
							on: {
								CHANGE_SORTING: {
									target: 'DESC',
									actions: ['setDescSorting', 'setSortingConfig'],
								},
							},
						},
						DESC: {
							after: [
								{
									delay: 0,
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['goToFirstPage'],
								},
							],

							on: {
								CHANGE_SORTING: [
									{
										cond: 'isSameSortingID',
										target: 'ASC',
										actions: ['setAscSorting', 'setSortingConfig'],
									},
									{
										cond: 'isDifferentSortingID',
										target: 'DESC',
										actions: ['setDescSorting', 'setSortingConfig'],
									},
								],
							},
						},
						ASC: {
							after: [
								{
									delay: 0,
									target: '#' + machineId + '.LIST.FETCHING_TASK_LIST',
									actions: ['goToFirstPage'],
								},
							],
							on: {
								CHANGE_SORTING: [
									{
										cond: 'isSameSortingID',
										target: 'IDLE',
										actions: 'resetSortingConfig',
									},
									{
										cond: 'isDifferentSortingID',
										target: 'DESC',
										actions: ['setDescSorting', 'setSortingConfig'],
									},
								],
							},
						},
					},
				},
			},
		},
		{
			actions: {
				setList: assign((ctx, event) => {
					const prevSortingConfig: SortingState = event.data.sortingConfig;

					const sortingConfig = prevSortingConfig.map((sortingConfig) => ({
						...sortingConfig,
						id: tableSortingColumn[sortingConfig.id],
					}));
					return {
						tasks: event.data.tasks,
						paginationConfig: {
							...ctx.paginationConfig,
							page: event.data.detail.page,
						},
						totalPages: event.data.detail.totalPages,
						filterConfig: event.data.filterConfig,
						sortingConfig,
						// 這邊之後可能會應應api而需要調整 連同handler的部分也是～
						// and filters and sorting and pages config
					};
				}),

				setFilterValue: assign((ctx, event) => {
					return {
						filterConfig: {
							...ctx.filterConfig,
							...event.data,
						},
					};
				}),
				setNextPage: assign((ctx, event) => {
					return {
						paginationConfig: {
							...ctx.paginationConfig,
							page: ctx.paginationConfig.page + 1,
						},
					};
				}),
				setPrevPage: assign((ctx, event) => {
					return {
						paginationConfig: {
							...ctx.paginationConfig,
							page: ctx.paginationConfig.page - 1,
						},
					};
				}),
				goToFirstPage: assign((ctx, event) => {
					return {
						paginationConfig: {
							...ctx.paginationConfig,
							page: 1,
						},
					};
				}),
				goToLastPage: assign((ctx, event) => {
					if (!ctx.totalPages) return {};
					return {
						paginationConfig: {
							...ctx.paginationConfig,
							page: ctx.totalPages,
						},
					};
				}),
				changePage: assign((ctx, event) => {
					const { page } = event;
					return {
						paginationConfig: {
							...ctx.paginationConfig,
							page,
						},
					};
				}),
				setDescSorting: assign((ctx, event) => {
					return {
						sortingConfig: [{ id: '', desc: true }],
					};
				}),
				setAscSorting: assign((ctx, event) => {
					return {
						sortingConfig: [{ id: '', desc: false }],
					};
				}),
				setSortingConfig: assign((ctx, event) => {
					const currentSortingConfigIndex = 0;
					const sortingConfig = nth(
						currentSortingConfigIndex,
						ctx.sortingConfig
					);
					return {
						sortingConfig: [{ ...sortingConfig, ...event.data }],
					};
				}),
				resetSortingConfig: assign((ctx, event) => {
					return {
						sortingConfig: [],
					};
				}),
			},
			services: {
				getTaskList: () => {
					return new Promise(() => {});
				},
				deleteSelectedTask: () => {
					return new Promise(() => {});
				},
				downloadSelectedTask: () => {
					return new Promise(() => {});
				},
			},
			guards: {
				isSameSortingID: (ctx, event) => {
					const currentSortingID = ctx.sortingConfig[0].id;
					const selectedId = event.data.id;

					return currentSortingID === selectedId;
				},
				isDifferentSortingID: (ctx, event) => {
					const currentSortingID = ctx.sortingConfig[0].id;
					const selectedId = event.data.id;

					return currentSortingID !== selectedId;
				},
			},
		}
	);
};
