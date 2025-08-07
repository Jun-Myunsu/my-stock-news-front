import { useEffect } from "react";
import { initCorpCodeDB } from "./utils/initCorpCodeDB";
import StockSearchManager from "./components/StockSearchManager";
import StockChatPanel from "./components/StockChatPanel";
import ThemeManager from "./components/ThemeManager";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  useEffect(() => {
    initCorpCodeDB();
  }, []);

  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ThemeManager />
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggleButton />
        </div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <StockSearchManager />
            <div className="sticky top-6">
              <StockChatPanel />
            </div>
          </div>
        </div>
      </div>
    </LoadingProvider>
  );
}

export default App;
