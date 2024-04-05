import logoSrc from "./logo.svg";
import { ArrowDownIcon } from "./icons/arrow-down-icon";
import { UiButton } from "@/shared/uikit/ui-button";
import { Profile } from "@/entities/user";

export function Header() {
  return (
    <header className="flex h-20 items-center px-8 bg-white shadow-lg">
      <img src={logoSrc} alt="logo" className=" h-12" />
      <div className="w-px h-8 bg-slate-200 mx-6" />
      <UiButton className="w-44" variant="primary" size="lg">
        Играть
      </UiButton>
      <button className="ml-auto flex items-center gap-2 text-start text-teal-600 ">
        <Profile name="Paromovevg" rating="1230" />
        <ArrowDownIcon />
      </button>
    </header>
  );
}
