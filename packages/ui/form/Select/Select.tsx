import { checkError } from 'utils/handleApi';
import { compose, isEmpty, isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import Select, { CSSObjectWithLabel, GroupBase, Props } from 'react-select';

export const customSelectStyles = {
	control: (baseStyles: CSSObjectWithLabel) => ({
		...baseStyles,
		borderColor: 'inherit',
		fontWeight: 'var(--chakra-fontWeights-normal)',
	}),
	placeholder: (baseStyles: CSSObjectWithLabel) => ({
		...baseStyles,
		color: 'var(--chakra-colors-gray-500)',
		fontWeight: 'var(--chakra-fontWeights-normal)',
	}),
	singleValue: (baseStyles: CSSObjectWithLabel) => ({
		...baseStyles,
		color: 'inherit',
		fontWeight: 'var(--chakra-fontWeights-normal)',
	}),
	option: (baseStyles: CSSObjectWithLabel) => ({
		...baseStyles,
		fontWeight: 'var(--chakra-fontWeights-normal)',
	}),
	multiValueLabel: (baseStyles: CSSObjectWithLabel) => ({
		...baseStyles,
		fontWeight: 'var(--chakra-fontWeights-normal)',
	}),
};

interface CustomSelectProps<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
	isInvalid?: boolean;
	remoteOptionPath?: string;
}

export default function SelectHOC<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>(props: CustomSelectProps<Option, IsMulti, Group>) {
	const { isInvalid, styles, remoteOptionPath, options } = props;
	const [optionList, setOptionList] = useState([]);
	const hasRemoteOptionPath =
		!isEmpty(remoteOptionPath) && !isNil(remoteOptionPath);

	useEffect(() => {
		if (!hasRemoteOptionPath) return;
		fetch(remoteOptionPath, {
			method: 'GET',
		})
			.then(checkError)
			.then((res) => {
				setOptionList(res);
			});
	}, [remoteOptionPath, hasRemoteOptionPath]);

	return (
		<Select
			{...props}
			options={options ?? optionList}
			isClearable={true}
			isLoading={hasRemoteOptionPath && isEmpty(optionList)}
			styles={{
				...customSelectStyles,
				control: (baseStyles) => ({
					...baseStyles,
					borderColor: isInvalid ? '#E53E3E' : 'inherit',
				}),
				...styles,
			}}
		/>
	);
}
