import { Button, Link, Tooltip } from "@nextui-org/react";
import { useLsmTranslation } from "react-lsm";
import LanguageSelector from "./LanguageSelector";

const AppHeader = () => {
	const { translate } = useLsmTranslation();
	return (
		<header className="flex flex-row gap-2 justify-between">
			<h1 className="text-4xl font-bold">React LSM</h1>
			<div className="flex flex-row gap-2">
				<Tooltip content={translate("donateOnKofi")}>
					<Link href="https://ko-fi.com/lewissmatos" target="_blank">
						<Button color="primary" variant="flat" isIconOnly>
							<span className="icon-[simple-icons--kofi] text-xl  text-white"></span>
						</Button>
					</Link>
				</Tooltip>
				<Tooltip content={translate("npmRepository")}>
					<Link
						href="https://www.npmjs.com/package/react-lsm?activeTab=readme"
						target="_blank"
					>
						<Button color="primary" variant="flat" isIconOnly>
							<span className="icon-[iconoir--npm] text-xl  text-white"></span>
						</Button>
					</Link>
				</Tooltip>
				<Tooltip content={translate("githubRepository")}>
					<Link
						href="https://github.com/lewissmatos/react-lsm#readme"
						target="_blank"
					>
						<Button color="primary" variant="flat" isIconOnly>
							<span className="icon-[iconoir--github] text-xl text-white"></span>
						</Button>
					</Link>
				</Tooltip>
				<Tooltip content={translate("microsoftLanguagesReference")}>
					<Link
						href="https://learn.microsoft.com/es-es/partner-center/developer/partner-center-supported-languages-and-locales"
						target="_blank"
					>
						<Button color="primary" variant="flat" isIconOnly>
							<span className="icon-[logos--microsoft-icon] text-md"></span>
						</Button>
					</Link>
				</Tooltip>
				<LanguageSelector />
			</div>
		</header>
	);
};

export default AppHeader;
