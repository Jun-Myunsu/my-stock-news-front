import { useThemeStore } from "../store/themeStore";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const icons = {
    light: <SunIcon className="w-6 h-6" />,
    dark: <MoonIcon className="w-6 h-6" />,
  };

  const titles = {
    light: "라이트 모드",
    dark: "다크 모드",
  };

  return (
    <button
      onClick={handleThemeChange}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      title={`현재: ${titles[theme as keyof typeof titles] || titles.light}, 클릭하여 변경`}
    >
      {icons[theme as keyof typeof icons] || icons.light}
    </button>
  );
};

export default ThemeToggleButton;
