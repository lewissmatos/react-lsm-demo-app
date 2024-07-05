import { Button, Input } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import NewElementPopover from "./NewElementPopover";
import DownloadAsJSONButton from "./DownloadAsJSONButton";
import { useLsmTranslation } from "react-lsm";

type TranslationKeyInputProps = {
	defaultValue: string;
	updateKey: (key: string, value: string) => void;
	propKey: string;
};
const TranslationKeyInput: FC<TranslationKeyInputProps> = ({
	defaultValue,
	updateKey,
	propKey,
}) => {
	const [inputValue, setInputValue] = useState("");
	useEffect(() => {
		setInputValue(defaultValue);
	}, [defaultValue]);

	return (
		<Input
			defaultValue={propKey}
			onChange={(e) => {
				const formattedValue = e.target.value.replace(/ /g, "_");
				setInputValue(formattedValue);
			}}
			placeholder="Key"
			endContent={
				<Button
					variant="light"
					color="primary"
					isIconOnly
					size="sm"
					className={
						inputValue.length > 0 && inputValue !== defaultValue
							? ""
							: "opacity-0"
					}
					onClick={() => updateKey(propKey, inputValue)}
				>
					<span className="icon-[solar--document-add-broken] text-xl"></span>
				</Button>
			}
		/>
	);
};
type KeysColumnProps = {
	keys: string[];
	addKey: (key: string) => void;
	removeKey: (key: string) => void;
	updateKey: (key: string, value: string) => void;
};
const KeysColumn: FC<KeysColumnProps> = ({
	keys,
	addKey,
	removeKey,
	updateKey,
}) => {
	const { translate } = useLsmTranslation();

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-2xl text-center">Key</h3>
			{keys.map((key) => (
				<div className="flex flex-row gap-2" key={key}>
					<Button
						variant="flat"
						color="danger"
						onClick={() => removeKey(key)}
						isIconOnly
					>
						<span className="icon-[mono-icons--delete] text-xl"></span>
					</Button>
					<TranslationKeyInput
						updateKey={updateKey}
						key={key}
						defaultValue={key}
						propKey={key}
					/>
				</div>
			))}
			<div className="flex flex-row justify-between w-full">
				<NewElementPopover
					isDisabled={(newKey) => keys.includes(newKey as string)}
					placeholder={translate("enterANewKey")}
					label={translate("addKey")}
					action={(key) => addKey(key)}
				/>
				<DownloadAsJSONButton
					data={keys.reduce((acc, key) => {
						acc[key] = key;
						return acc;
					}, {} as Record<string, string>)}
					fileName={`translation-keys`}
				/>
			</div>
		</div>
	);
};

export default KeysColumn;
