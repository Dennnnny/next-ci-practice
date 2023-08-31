import React from 'react';
import { Text } from '@chakra-ui/react';
import {
	isNil,
	path,
	compose,
	toPairs,
	map,
	indexBy,
	join,
	values,
	omit,
} from 'ramda';
import { format } from 'date-fns';
import {
	FormConfigItemType,
	TaskFormType,
	TaskFormDirtyFields,
} from 'types/task';
import { basicSettingFormConfig } from './SubmitFormConfirmContent.utils';

const handleCheckFormData = (formData: TaskFormType) => {
	const {
		cate,
		viewcate,
		period,
		image,
		page,
		storeInfo,
		target,
		times,
		timesAll,
		range,
		rangeAll,
	} = formData;
	const updatedDisplayFormData = omit([
		'times',
		'timesAll',
		'range',
		'rangeAll',
	])(formData);

	return {
		...updatedDisplayFormData,
		cate: path(['label'])(cate) ?? '',
		viewcate: !isNil(viewcate)
			? compose(join(','), map(path(['label'])))(viewcate)
			: '',
		period: !isNil(period)
			? compose(
					join('～'),
					map((t: Date) => format(new Date(t), 'yyyy/MM/dd')),
					values
			  )(period)
			: '',
		image: path(['0', 'name'])(image) ?? '',
		page: path(['label'])(page) ?? '',
		storeName: path(['label'])(storeInfo) ?? '',
		target: path(['label'])(target) ?? '',
		amountInLimitTime: `${timesAll} 天領 ${times} 次`,
		amountInAllPeriod: `${rangeAll} 天領 ${range} 次`,
	};
};

export default function SubmitFormConfirmContent({
	tid,
	formData,
	dirtyFields,
	isPeriodModeRange,
}: {
	tid: string;
	formData: TaskFormType;
	dirtyFields: TaskFormDirtyFields;
	isPeriodModeRange: boolean;
}) {
	const basicSettingFormConfigDictionary = indexBy(
		(obj: FormConfigItemType) => obj.dataKey
	)(basicSettingFormConfig);

	const renderData = map(([datakey, formValue]) => {
		const label = path([datakey, 'label'])(basicSettingFormConfigDictionary);
		const updatedFormValue =
			datakey === 'period' && !isPeriodModeRange ? '永久任務' : formValue;

		return (
			<Text
				key={datakey}
				fontWeight={path([datakey])(dirtyFields) ? 'extrabold' : 'normal'}
			>{`${label}(${datakey}): ${updatedFormValue}`}</Text>
		);
	});

	return (
		<>
			<Text>{`任務ID(tid): ${tid}`}</Text>
			{compose(renderData, toPairs, handleCheckFormData)(formData)}
		</>
	);
}
