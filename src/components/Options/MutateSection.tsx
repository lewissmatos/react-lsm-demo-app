import { Checkbox, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import React, { FC } from "react";
import { LsmTranslationOptions, useLsmTranslation } from "react-lsm";

type MutateSectionProps = {
	options: LsmTranslationOptions;
	setOptions: React.Dispatch<React.SetStateAction<LsmTranslationOptions>>;
};
const MutateSection: FC<MutateSectionProps> = ({ options, setOptions }) => {
	const { translate } = useLsmTranslation();

	const isMutateActive = !!options?.mutate;
	return (
		<div className="mt-4">
			<div className="flex flex-row items-center gap-1 justify-between mt-1">
				<Switch
					onChange={(e) => {
						let newOptions = {
							...options,
						};
						if (!e.target.checked) {
							delete newOptions?.mutate;
						} else {
							newOptions = {
								...newOptions,
								mutate: {
									when: false,
									value: "",
								},
							};
						}
						setOptions({
							...newOptions,
						});
					}}
					key={isMutateActive ? "mutate" : "no-mutate"}
					defaultSelected={isMutateActive}
					size="sm"
				>
					{translate("optionsScreen.mutate")}
				</Switch>
				<Checkbox
					onChange={(e) => {
						setOptions({
							...options,
							mutate: {
								...options.mutate,
								when: options.mutate?.when ?? false,
								value: options.mutate?.value ?? "",
								withTranslation: e.target.checked,
							},
						});
					}}
					key={
						options.mutate?.withTranslation
							? "withTranslation"
							: "withoutTranslation"
					}
					defaultSelected={!!options.mutate?.withTranslation}
					size="sm"
				>
					{translate("optionsScreen.withTranslation")}
				</Checkbox>
			</div>
			{!!options.mutate && (
				<div className="mt-2 flex flex-row gap-2">
					<Select
						size="sm"
						onChange={(e) =>
							setOptions({
								...options,
								mutate: {
									...options.mutate,
									value: options.mutate?.value ?? "",
									when: Boolean(e.target.value),
								},
							})
						}
						label={translate("optionsScreen.when")}
						defaultSelectedKeys={[options.mutate.when ? "true" : "false"]}
						key={options.mutate.when ? "true" : "false"}
					>
						<SelectItem key="true" value={1}>
							{translate("true")}
						</SelectItem>
						<SelectItem key="false" value={0}>
							{translate("false")}
						</SelectItem>
					</Select>
					<Input
						size="sm"
						label={translate("optionsScreen.replaceableKey")}
						onChange={(e) => {
							setOptions({
								...options,
								mutate: {
									...options.mutate,
									when: options.mutate?.when ?? false,
									value: e.target.value,
								},
							});
						}}
						defaultValue={options.mutate.value}
					/>
				</div>
			)}
		</div>
	);
};

export default MutateSection;
