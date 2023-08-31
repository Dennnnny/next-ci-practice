import { Options } from './task';

export type audienceOption = {
	id: string;
	display: string;
	description?: string;
	overview: { date?: string; user_count?: number };
	version: number;
};

export type transactionOption = { feature: string; id: number; title: string };

export type AudienceSelectProps = {
	handleChange: Function;
	handleDelete: Function;
	options: Options[];
	audienceList: AudienceOption[];
};

export type AudienceOption = Options & { count?: number };

export type TransactionSelectProps = {
	type: 'and' | 'or' | 'not';
	handleChange: Function;
	handleDelete: Function;
	options: Options[];
	transactionList: Options[];
};
