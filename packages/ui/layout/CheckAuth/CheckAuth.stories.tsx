import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CheckAuth from './index';

export default {
	title: 'Layout/CheckAuth',
	component: CheckAuth,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof CheckAuth>;

const Template: StoryFn<typeof CheckAuth> = (args) => (
	<CheckAuth>
		<>children</>
	</CheckAuth>
);

export const Unauthenticated = Template.bind({});
Unauthenticated.args = {};
Unauthenticated.parameters = {
	nextAuthMock: {
		session: {
			status: 'unauthenticated',
		},
	},
};

export const Authenticated = Template.bind({});
Authenticated.args = {};
Authenticated.parameters = {
	nextAuthMock: {
		session: {
			status: 'authenticated',
		},
	},
};

export const Loading = Template.bind({});
Loading.args = {};
Loading.parameters = {
	nextAuthMock: {
		session: {
			status: 'loading',
		},
	},
};
