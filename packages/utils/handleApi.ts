import { isNil, path } from 'ramda';
// import fetch, { Response } from "node-fetch"
// import { API_URL } from './var';

async function checkError(response: Response) {
	if (response.status >= 200 && response.status <= 299) {
		return response.json();
	} else {
		const errorCode = response.status;
		const errorResponce = await response
			.json()
			.then((res: any) => path(['detail'])(res));

		throw Error(`${errorCode}|${errorResponce}`);
	}
}

function apiToCall(endPoint: string, configs: {}) {
	return fetch(`${endPoint}`, {
		...configs,
	}).then(checkError);
}

function apiCallWrapper(
	endPoint: string,
	{
		method,
		body,
		signal,
		...customConfig
	}: { method: 'post' | 'get'; body: {}; signal: {} }
) {
	const configs = isNil(body)
		? {
				method,
				signal,
				headers: {
					'Content-Type': 'application/json',
					...customConfig,
				},
		  }
		: {
				method,
				signal,
				headers: {
					'Content-Type': 'application/json',
					...customConfig,
				},
				body: JSON.stringify(body),
		  };

	return apiToCall(endPoint, configs);
}

export { checkError, apiToCall, apiCallWrapper };
