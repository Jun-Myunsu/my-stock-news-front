import React, { useState } from "react";
import type { RegisteredStock } from "../types/registeredStock";
import type { DartDisclosure } from "../types/dartDisclosure";
import type { NewsArticle } from "../types/news";
import DisclosureLayer from "./DisclosureLayer";
import NewsLayer from "./NewsLayer";
import StockChart from "./StockChart";

export interface RegisteredStockItemProps {
  item: RegisteredStock;
  disclosures: DartDisclosure[];
  news: NewsArticle[];
  openLayer: boolean;
  openNewsLayer: boolean;
  onToggleLayer: () => void;
  onToggleNewsLayer: () => void;
  onDelete: () => void;
}

const RegisteredStockItem: React.FC<RegisteredStockItemProps> = ({
  item,
  disclosures,
  news,
  openLayer,
  openNewsLayer,
  onToggleLayer,
  onToggleNewsLayer,
  onDelete,
}) => {
  const [showChart, setShowChart] = useState(false);

  return (
  <li className="border dark:border-gray-700 rounded-md p-2 shadow-sm hover:shadow-md transition relative">
    <div className="flex justify-between items-start">
      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">
        {item.name} ({item.code})
      </div>
      <div className="flex gap-2 items-center">
        {disclosures && disclosures.length > 0 && (
          <button
            className="px-2 py-0.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-xs"
            onClick={onToggleLayer}
          >
            {openLayer ? "닫기" : "공시"}
          </button>
        )}
        {news && news.length > 0 && (
          <button
            className="px-2 py-0.5 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-xs flex items-center"
            onClick={onToggleNewsLayer}
            title="오늘의 뉴스"
          >
            📰 {openNewsLayer ? "닫기" : "뉴스"}
          </button>
        )}
        <button
          className="px-2 py-0.5 bg-green-500 text-white rounded-full hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-xs flex items-center"
          onClick={() => setShowChart(true)}
          title="차트 보기"
        >
          📈 차트
        </button>
        <button
          className="px-2 py-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-xs"
          onClick={onDelete}
        >
          🗑️
        </button>
      </div>
    </div>
    {openLayer && disclosures && disclosures.length > 0 && (
      <DisclosureLayer disclosures={disclosures} />
    )}
    {openNewsLayer && news && news.length > 0 && <NewsLayer news={news} />}
    {showChart && (
      <StockChart
        stockCode={item.code}
        stockName={item.name}
        onClose={() => setShowChart(false)}
      />
    )}
  </li>
  );
};

export default RegisteredStockItem;
