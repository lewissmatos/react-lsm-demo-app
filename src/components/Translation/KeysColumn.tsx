import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import NewElementPopover from "./NewElementPopover";
import DownloadAsJSONButton from "./DownloadAsJSONButton";
import { useLsmTranslation } from "react-lsm";

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
					<Button variant="light" color="danger" onClick={() => removeKey(key)}>
						<span className="icon-[mono-icons--delete] text-xl"></span>
					</Button>
					<Input
						key={key}
						defaultValue={key}
						onChange={(e) => {
							const formattedValue = e.target.value.replace(/ /g, "_");
							updateKey(key, formattedValue);
						}}
						placeholder="Key"
						// autoFocus
					/>
				</div>
			))}
			<div className="flex flex-row gap-2 justify-start">
				<Button className="invisible" />
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
		</div>
	);
};

export default KeysColumn;
