import Logo from "./Logo";
import LogoutBtn from "./LogoutBtn";
import ToggleTheme from "./toggle-theme";

const Header = () => {
  return (
    <header className="py-3 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-x-2">
        <LogoutBtn />
        <ToggleTheme />
      </div>
    </header>
  );
};
export default Header;
