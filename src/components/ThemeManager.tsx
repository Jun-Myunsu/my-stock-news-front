import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

const ThemeManager = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default ThemeManager;
