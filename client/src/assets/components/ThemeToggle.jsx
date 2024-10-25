import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = ({ otherClassName }) => {
    const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
    return (
        <button className={otherClassName} onClick={toggleDarkTheme}>
            {isDarkTheme ? <BsFillMoonFill /> : <BsFillSunFill />}
        </button>
    );
};
export default ThemeToggle;
