import {
	Flex,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup,
} from '@chakra-ui/react';
import {
	compose,
	filter,
	identity,
	keys,
	toPairs,
	fromPairs,
	map,
	head,
} from 'ramda';
import { eventSetProfile, RecognitionEvents } from 'types/recognition';

export default function EventProfile({
	recognitionData,
	updateAction,
}: {
	recognitionData: eventSetProfile;
	updateAction: (updatedData: RecognitionEvents) => void;
}) {
	const { eventType, ...restItems } = recognitionData;
	const radioValue = compose(
		(keysArray: string[]) => head<string>(keysArray),
		keys,
		filter(identity as <T>(value: T) => value is NonNullable<T> & boolean)
	)(restItems);
	const updatedObj = compose(
		fromPairs,
		map(([key, value]: [string, boolean]) => [key, false] as [string, boolean]),
		toPairs
	)(restItems);

	return (
		<FormControl>
			<FormLabel>會員資料欄位</FormLabel>
			<RadioGroup
				onChange={(value) => {
					updateAction({
						eventType,
						...updatedObj,
						[value]: true,
					});
				}}
				value={radioValue}
			>
				<Flex flexFlow="column" sx={{ '> *': { marginTop: '8px' } }}>
					<Radio value="profile_birthy">生日</Radio>
					<Radio value="profile_gender">性別</Radio>
					<Radio value="profile_nick">暱稱</Radio>
				</Flex>
			</RadioGroup>
		</FormControl>
	);
}
