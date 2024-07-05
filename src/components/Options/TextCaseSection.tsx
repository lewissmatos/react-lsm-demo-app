import { Autocomplete, Select, SelectItem } from "@nextui-org/react";
import React, { FC, useEffect, useRef } from "react";
import { LsmTextCase } from "react-lsm";
import { LsmTranslationOptions, useLsmTranslation } from "react-lsm";

const TEXT_CASES = ["capitalize", "lowercase", "uppercase"];

type TextCaseSectionProps = {
	options: LsmTranslationOptions;
	setOptions: React.Dispatch<React.SetStateAction<LsmTranslationOptions>>;
};
const TextCaseSection: FC<TextCaseSectionProps> = ({ options, setOptions }) => {
	const { translate } = useLsmTranslation();

	return (
		<Select
			label={translate("optionsScreen.textCase")}
			className="mt-4"
			onChange={(e) => {
				if (e.target.value === "none") {
					const newOptions = {
						...options,
					};
					delete newOptions.textCase;
					setOptions({
						...newOptions,
					});
				} else {
					setOptions({
						...options,
						textCase: e.target.value as LsmTextCase,
					});
				}
			}}
			defaultSelectedKeys={[options.textCase as string]}
			key={options.textCase}
		>
			<SelectItem key="none" value="none">
				{translate("none")}
			</SelectItem>
			{
				TEXT_CASES.map((option) => (
					<SelectItem key={option} value={option}>
						{translate(option, { textCase: option as LsmTextCase })}
					</SelectItem>
				)) as any
			}
		</Select>
	);
};

export default TextCaseSection;
