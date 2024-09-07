import Convarsations from "./Convarsations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider ox-3 "></div>
      <Convarsations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
