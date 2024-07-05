import React, { FC, memo, useEffect, useRef, useState } from "react";
import { LsmTranslationOptions, useLsmTranslation } from "react-lsm";
import { Button, Checkbox, Input, Switch } from "@nextui-org/react";

type ReplaceSectionProps = {
	options: LsmTranslationOptions;
	setOptions: React.Dispatch<React.SetStateAction<LsmTranslationOptions>>;
};
const ReplaceSection: FC<ReplaceSectionProps> = ({ options, setOptions }) => {
	const { translate } = useLsmTranslation();
	const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

	function addKeyValuePair() {
		setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
	}

	function updateKeyValuePair(index: number, part: string, value: string) {
		const updatedPairs = keyValuePairs.map((pair, i) => {
			if (i === index) {
				return { ...pair, [part]: value };
			}
			return pair;
		});
		setKeyValuePairs(updatedPairs);
	}

	const removeKeyValuePair = (indexToRemove: number) => {
		setKeyValuePairs(
			keyValuePairs.filter((_, index) => index !== indexToRemove)
		);
	};

	function submitKeyValuePairs() {
		const newValues = keyValuePairs.reduce((acc, { key, value }) => {
			if (key) acc[key as never] = value as never;
			return acc;
		}, {});

		setOptions({
			...options,
			replace: {
				...options.replace,
				values: newValues,
			},
		});
	}

	useEffect(() => {
		// Check if options.replace and options.replace.values exist
		if (options.replace?.values) {
			// Transform options.replace.values into the format [{ key: '', value: '' }, ...]
			const pairs = Object.entries(options.replace.values).map(
				([key, value]) => ({
					key,
					value,
				})
			);
			setKeyValuePairs(pairs as []);
		} else {
			// Reset to initial state if options.replace.values is not available
			setKeyValuePairs([{ key: "", value: "" }]);
		}
	}, [options.replace?.values]);

	const isReplaceActive = !!options?.replace;

	return (
		<div className="mt-4">
			<div className="flex flex-row items-center gap-1 justify-between">
				<Switch
					onChange={(e) => {
						let newOptions = {
							...options,
						};
						if (!e.target.checked) {
							delete newOptions?.replace;
						} else {
							newOptions = {
								...newOptions,
								replace: {
									values: {},
								},
							};
						}
						setOptions({
							...newOptions,
						});
					}}
					key={isReplaceActive ? "replace" : "no-replace"}
					defaultSelected={isReplaceActive}
					size="sm"
				>
					{translate("optionsScreen.replace")}
				</Switch>
				<Checkbox
					onChange={(e) => {
						setOptions({
							...options,
							replace: {
								...options.replace,
								values: options.replace?.values ?? {},
								withTranslation: e.target.checked,
							},
						});
					}}
					key={
						options.replace?.withTranslation
							? "withTranslation"
							: "withoutTranslation"
					}
					defaultSelected={!!options.replace?.withTranslation}
					size="sm"
				>
					{translate("optionsScreen.withTranslation")}
				</Checkbox>
			</div>
			{!!options.replace && (
				<div className="mt-2 flex flex-col gap-1">
					{keyValuePairs.map((pair, index) => (
						<div key={index} className="flex flex-row items-center mt-1 gap-2">
							<Input
								size="sm"
								label={translate("optionsScreen.replaceableKey")}
								value={pair.key}
								onChange={(e) =>
									updateKeyValuePair(index, "key", e.target.value)
								}
							/>
							<Input
								size="sm"
								label={translate("optionsScreen.replaceableValue")}
								value={pair.value}
								onChange={(e) =>
									updateKeyValuePair(index, "value", e.target.value)
								}
							/>
							<Button
								color="danger"
								onClick={() => removeKeyValuePair(index)}
								isIconOnly
								variant="flat"
							>
								<span className="icon-[mono-icons--delete] text-xl" />
							</Button>
						</div>
					))}
					<div className="flex flex-row gap-1 mt-1 justify-between">
						<Button variant="flat" onClick={addKeyValuePair} isIconOnly>
							<span className="icon-[gg--add] text-xl" />
						</Button>
						<Button color="primary" onClick={submitKeyValuePairs}>
							{translate("optionsScreen.applyReplacements")}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReplaceSection;
