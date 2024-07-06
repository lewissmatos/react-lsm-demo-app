import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@nextui-org/react";
import React, { FC } from "react";
import { useLsmTranslation } from "react-lsm";

type AddKeyPopoverProps = {
	addKey: (key: string) => void;
	isDisabled: (element: string | string[]) => boolean;
};

const AddKeyPopover: FC<AddKeyPopoverProps> = ({ addKey, isDisabled }) => {
	const { translate } = useLsmTranslation();
	const [keyVal, setKeyVal] = React.useState("");
	return (
		<Popover placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<Button className="w-max" variant="flat">
					{translate("addKey")}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex flex-row gap-1">
					<Input
						size="sm"
						placeholder={translate("enterANewKey")}
						onChange={(e) => setKeyVal(e.target.value)}
					/>
					<Button
						size="sm"
						isDisabled={isDisabled(keyVal) || !keyVal || keyVal.length === 0}
						onClick={() => {
							if (isDisabled(keyVal) || !keyVal) return;
							addKey(keyVal.replace(/ /g, "_"));
							setKeyVal("");
						}}
					>
						{translate("add")}
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default AddKeyPopover;
