import { useEffect } from 'react';
import { isNil } from 'ramda';

export default function useLeavingCurrentRoute({
	isDirty,
	handler,
}: {
	isDirty: boolean;
	handler?: Function;
}) {
	useEffect(() => {
		if (!isNil(handler)) {
			handler(!isDirty);
		}

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (isDirty) {
				event.preventDefault();
				event.returnValue = '';
				return '';
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [isDirty]);
}
