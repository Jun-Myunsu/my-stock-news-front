import { useState, useEffect, useRef } from "react";
import { useStockSearch } from "../hooks/useStockSearch";
import { useDebounce } from "../hooks/useDebounce";
import type { StockItem } from "../types/stock";
import { fetchTodayDisclosures } from "../types/dartDisclosure";
import { fetchStockNews } from "../utils/fetchStockNews";
import StockSearchBar from "./StockSearchBar";
import RegisteredStockList from "./RegisteredStockList";
import { useStockStore } from "../store/stockStore";
import { useLoading } from "../contexts/LoadingContext";

const StockSearchManager = () => {
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null!);

  const {
    registeredStocks,
    disclosures,
    news,
    openLayers,
    openNewsLayers,
    addStock,
    removeStock,
    setDisclosures,
    setNews,
    setOpenLayers,
    setOpenNewsLayers,
    toggleLayer,
    toggleNewsLayer,
    loadFromStorage,
  } = useStockStore();

  const { setLoading } = useLoading();

  // 종목 검색 결과 (검색어 입력 시) - debounce 적용
  const debouncedQuery = useDebounce(query, 300);
  const { data: suggestions } = useStockSearch(debouncedQuery);

  const fetchAndSetDisclosuresAndNews = async () => {
    setLoading(true);
    const disclosuresResults: Record<number, any[]> = {};
    const newsResults: Record<number, any[]> = {};

    await Promise.all(
      registeredStocks.map(async (item) => {
        try {
          const data = await fetchTodayDisclosures(item.corp_code);
          disclosuresResults[item.id] = data;
        } catch {
          disclosuresResults[item.id] = [];
        }
        try {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, "0");
          const dd = String(today.getDate()).padStart(2, "0");
          const dateStr = `${yyyy}-${mm}-${dd}`;
          const newsData = await fetchStockNews(item.code, dateStr);
          newsResults[item.id] = newsData;
        } catch {
          newsResults[item.id] = [];
        }
      })
    );

    setDisclosures(disclosuresResults);
    setNews(newsResults);

    const open: Record<number, boolean> = {};
    const openNews: Record<number, boolean> = {};
    registeredStocks.forEach((item) => {
      open[item.id] = true;
      openNews[item.id] = false;
    });
    setOpenLayers(open);

    const newOpenNewsLayers: Record<number, boolean> = {};
    Object.entries(newsResults).forEach(([stockCode, articles]) => {
      newOpenNewsLayers[parseInt(stockCode)] = articles && articles.length > 0;
    });
    setOpenNewsLayers(newOpenNewsLayers);

    setLoading(false);
  };

  useEffect(() => {
    loadFromStorage().then(() => {
      if (registeredStocks.length > 0) {
        fetchAndSetDisclosuresAndNews();
      }
    });
  }, []);

  const handleDelete = (id: number) => {
    removeStock(id);
  };

  // 검색창 키보드 이벤트 처리 (위/아래/엔터)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev + 1 >= suggestions.length ? -1 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= -1 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0) {
        handleSelect(suggestions[highlightIndex]);
      } else {
        setQuery("");
        setHighlightIndex(-1);
      }
    }
  };

  const handleSelect = (item: StockItem) => {
    if (registeredStocks.some((stock) => stock.code === item.code)) {
      alert("이미 등록된 종목입니다.");
      setQuery("");
      setHighlightIndex(-1);
      return;
    }
    const newItem = { ...item, id: Date.now() };
    addStock(newItem);
    setQuery("");
    setHighlightIndex(-1);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInfoClick = async () => {
    await fetchAndSetDisclosuresAndNews();
  };

  const handleSortEnd = (newList: any[]) => {
    useStockStore.setState({ registeredStocks: newList });
  };

  return (
    <div className="font-sans text-gray-900 dark:text-gray-100">
      <div className="border rounded-lg shadow overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        {/* 상단: 타이틀/설명/정보확인 버튼 */}
        <div className="bg-gray-100 dark:bg-gray-900/50 px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">📘 종목 등록</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              종목을 검색해 등록할 수 있어요.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 w-20 h-10 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center transform hover:-translate-y-0.5"
              onClick={handleInfoClick}
            >
              <span className="text-xs">Info</span>
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          {/* 종목 검색/등록 영역 */}
          <StockSearchBar
            query={query}
            setQuery={setQuery}
            inputRef={inputRef}
            suggestions={suggestions || []}
            highlightIndex={highlightIndex}
            setHighlightIndex={setHighlightIndex}
            handleKeyDown={handleKeyDown}
            handleSelect={handleSelect}
          />
          <div>
            <h3 className="text-lg font-semibold mb-4">📋 등록된 종목</h3>
            {registeredStocks.length > 0 ? (
              <RegisteredStockList
                registered={registeredStocks}
                disclosures={disclosures}
                news={news}
                openLayers={openLayers}
                openNewsLayers={openNewsLayers}
                onToggleLayer={toggleLayer}
                onToggleNewsLayer={toggleNewsLayer}
                onDelete={handleDelete}
                onSortEnd={handleSortEnd}
              />
            ) : (
              <div className="py-10 flex justify-center text-sm text-gray-500 dark:text-gray-400">
                아직 등록된 종목이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockSearchManager;
