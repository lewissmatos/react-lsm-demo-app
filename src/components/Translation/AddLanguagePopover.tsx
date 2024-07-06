import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@nextui-org/react";
import React, { FC } from "react";
import { useLsmTranslation } from "react-lsm";

type AddLanguagePopoverProps = {
	addLanguage: (language: string) => void;
	isDisabled: boolean;
};

const AddLanguagePopover: FC<AddLanguagePopoverProps> = ({
	addLanguage,
	isDisabled,
}) => {
	const { translate } = useLsmTranslation();
	const [keyVal, setKeyVal] = React.useState("");
	return (
		<Popover placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<Button isDisabled={isDisabled} className="w-max" variant="flat">
					{translate("addLanguage")}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex flex-row gap-1">
					<Input
						size="sm"
						placeholder={translate("enterNewLanguage")}
						onChange={(e) => setKeyVal(e.target.value)}
					/>
					<Button
						size="sm"
						isDisabled={isDisabled}
						onClick={() => {
							if (isDisabled || !keyVal) return;
							addLanguage(keyVal.replace(/ /g, "_"));
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

export default AddLanguagePopover;
