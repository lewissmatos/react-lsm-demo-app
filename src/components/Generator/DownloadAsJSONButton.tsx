import { Button } from "@nextui-org/react";
import { FC } from "react";

type Props = {
	data: any;
	fileName: string;
};
const DownloadAsJSONButton: FC<Props> = ({ data, fileName }) => {
	const downloadJSON = () => {
		const jsonData = new Blob([JSON.stringify(data)], {
			type: "application/json",
		});
		const jsonURL = URL.createObjectURL(jsonData);
		const link = document.createElement("a");
		link.href = jsonURL;
		link.download = `${fileName}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<Button color="primary" onClick={downloadJSON} variant="flat">
			<span className="icon-[tabler--download] text-xl"></span>
		</Button>
	);
};

export default DownloadAsJSONButton;
