import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { useLsmTranslation } from "react-lsm";
const LanguageSelector = () => {
	const { translate, language, setLanguage } = useLsmTranslation();

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="solid" color="primary">
					{translate("appLanguage", {
						replace: { values: { currentLanguage: language } },
					})}
					<span className="icon-[ion--chevron-down-outline] text-xl" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="solid">
				<DropdownItem
					key="en-US"
					onClick={() => setLanguage("en-US")}
					textValue="en-US"
				>
					<span className={language === "en-US" ? "font-bold" : ""}>en-US</span>
				</DropdownItem>
				<DropdownItem
					key="es-MX"
					onClick={() => setLanguage("es-MX")}
					textValue="es-MX"
				>
					<span className={language === "es-MX" ? "font-bold" : ""}>es-MX</span>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default LanguageSelector;
