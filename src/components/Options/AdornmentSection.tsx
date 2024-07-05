import { Input, Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { LsmTranslationOptions, useLsmTranslation } from "react-lsm";

type AdornmentsSectionProps = {
	options: LsmTranslationOptions;
	setOptions: React.Dispatch<React.SetStateAction<LsmTranslationOptions>>;
	property: "prefixContent" | "suffixContent";
};
const AdornmentsSection: FC<AdornmentsSectionProps> = ({
	options,
	setOptions,
	property,
}) => {
	const { translate } = useLsmTranslation();
	return (
		<div className="mt-2">
			<div className="mt-2 flex flex-row gap-2">
				<Select
					size="sm"
					onChange={(e) => {
						let newOptions = {
							...options,
						};
						if (!Boolean(Number(e.target.value))) {
							delete newOptions?.[property];
						} else {
							newOptions[property] = {
								when: Boolean(Number(e.target.value)),
								value: newOptions?.[property]?.value ?? "",
							};
						}
						setOptions({
							...newOptions,
						});
					}}
					label={translate(`optionsScreen.${property}`)}
					defaultSelectedKeys={[options?.[property]?.when ? "1" : "0"]}
					key={options?.[property]?.when ? "1" : "0"}
				>
					<SelectItem key={"1"}>{translate("true")}</SelectItem>
					<SelectItem key={"0"}>{translate("false")}</SelectItem>
				</Select>
				<Input
					size="sm"
					label={translate("optionsScreen.content")}
					value={options?.[property]?.value ?? ""}
					onChange={(e) => {
						setOptions({
							...options,
							[property]: {
								...(options?.[property] as {}),
								value: e.target.value,
							},
						});
					}}
				/>
			</div>
		</div>
	);
};

export default AdornmentsSection;
