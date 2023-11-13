import { useEffect, useState } from 'react';
import { isNil } from 'ramda';
import { checkError } from 'utils/handleApi';
import { RecognitionEventType } from 'types/recognition';

export default function useRecognitionOptions({
	eventType,
}: {
	eventType: RecognitionEventType;
}) {
	const [recognitionOptions, setRecognitionOptions] = useState([]);

	useEffect(() => {
		fetch(`/recognition/options?option-type=${eventType}`, {
			method: 'GET',
		})
			.then(checkError)
			.then((res) => {
				if (!isNil(res)) {
					setRecognitionOptions(res.options);
				}
			})
			.catch((rej) => console.log(rej));
	}, [eventType]);

	return recognitionOptions;
}
