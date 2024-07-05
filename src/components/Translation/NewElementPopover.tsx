import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@nextui-org/react";
import React, { FC } from "react";

type NewElementPopoverProps = {
	placeholder: string;
	label: string;
	action: (key: string) => void;
	isDisabled: (element: string | string[]) => boolean;
};

const NewElementPopover: FC<NewElementPopoverProps> = ({
	placeholder,
	action,
	isDisabled,
	label,
}) => {
	const [keyVal, setKeyVal] = React.useState("");
	return (
		<Popover placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<Button
					isDisabled={isDisabled(keyVal)}
					className="w-max"
					variant="flat"
				>
					{label}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex flex-row gap-1">
					<Input
						size="sm"
						placeholder={placeholder}
						onChange={(e) => setKeyVal(e.target.value)}
					/>
					<Button
						size="sm"
						isDisabled={isDisabled(keyVal) || !keyVal}
						onClick={() => {
							if (isDisabled(keyVal) || !keyVal) return;
							action(keyVal.replace(/ /g, "_"));
							setKeyVal("");
						}}
					>
						Add
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default NewElementPopover;
