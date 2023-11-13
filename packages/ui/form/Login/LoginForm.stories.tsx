import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import LoginForm from './LoginForm';

export default {
	title: 'form/LoginForm',
	component: LoginForm,
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = () => <LoginForm />;

export const Primary = Template.bind({});
