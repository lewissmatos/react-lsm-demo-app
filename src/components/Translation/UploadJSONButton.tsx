import { Button } from "@nextui-org/react";
import React, { FC } from "react";

type UploadJSONButtonProps = {
	addTranslationsToALanguage: (newTranslations: object) => void;
};
const UploadJSONButton: FC<UploadJSONButtonProps> = ({
	addTranslationsToALanguage,
}) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader();
		if (!e.target.files || !e.target.files.length) return;

		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			if (e.target?.result) {
				addTranslationsToALanguage(JSON.parse(e.target.result as string));
			}
		};
	};

	return (
		<>
			<input
				type="file"
				onChange={handleChange}
				className="hidden"
				ref={inputRef}
			/>
			<Button
				color="primary"
				onClick={() => {
					inputRef?.current?.click();
				}}
				variant="flat"
				isIconOnly
			>
				<span className="icon-[hugeicons--file-upload] text-2xl"></span>
			</Button>
		</>
	);
};

export default UploadJSONButton;
