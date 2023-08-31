import { isEmpty } from 'ramda';
import { validatedItemType } from 'types/manualSetting';

export function handleValidation(textareaValue: string): validatedItemType[] {
	const phone_regex = new RegExp('^\\+?(886)?0?9(\\d{8})$');
	const number_regex = new RegExp(/^(?!0)\d+$/);
	if (isEmpty(textareaValue)) return [];

	function getFormatValue(input: string): string {
		const isPhoneNumber = phone_regex.test(input);
		const isNumber = number_regex.test(input);

		if (isPhoneNumber) {
			return input.replace(phone_regex, '09$2');
		}
		if (isNumber) {
			return `M-${input}`;
		}

		return '';
	}

	return textareaValue
		.split(/\r?\n|\s|,/)
		.filter((input) => !isEmpty(input))
		.map((input, order) => {
			const value = getFormatValue(input);

			return {
				order,
				input,
				validation: !isEmpty(value),
				value,
			};
		});
}

export const scrollToPosition = ({
	target,
	distanceToTop,
}: {
	target: HTMLTextAreaElement | null;
	distanceToTop: number;
}) => {
	if (target) {
		target.scrollTo({
			top: distanceToTop,
			left: 0,
			behavior: 'smooth',
		});
	}
};
