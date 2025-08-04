import React from "react";
import type { StockItem } from "../types/stock";

interface StockSearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  suggestions: StockItem[];
  highlightIndex: number;
  setHighlightIndex: (idx: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSelect: (item: StockItem) => void;
}

const StockSearchBar: React.FC<StockSearchBarProps> = ({
  query,
  setQuery,
  inputRef,
  suggestions,
  highlightIndex,
  // setHighlightIndex,
  handleKeyDown,
  handleSelect,
}) => (
  <div className="mb-6 relative">
    <div className="flex gap-2 mb-2">
      <input
        ref={inputRef}
        className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="종목명 또는 코드 입력"
      />
    </div>
    {/* 검색 결과 드롭다운 */}
    {query && suggestions && suggestions.length > 0 && (
      <div className="absolute z-10 left-0 right-2 top-full mt-1">
        <ul className="border border-gray-300 dark:border-gray-600 rounded divide-y dark:divide-gray-600 overflow-hidden max-h-60 overflow-y-auto bg-white dark:bg-gray-700 shadow-lg">
          {suggestions.map((item, index) => (
            <li
              key={item.code}
              onClick={() => handleSelect(item)}
              className={`px-3 py-2 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap ${
                highlightIndex === index
                  ? "bg-gray-200 dark:bg-gray-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.name} ({item.code})
            </li>
          ))}
        </ul>
      </div>
    )}
    {/* 검색 결과 없음 안내 */}
    {query && (!suggestions || suggestions.length === 0) && (
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        검색 결과가 없습니다.
      </div>
    )}
  </div>
);

export default StockSearchBar;
