import React from 'react';

interface StockChartProps {
  stockCode: string;
  stockName: string;
  onClose: () => void;
}

const StockChart: React.FC<StockChartProps> = ({ stockCode, stockName, onClose }) => {
  // 네이버 금융 차트 URL
  const chartUrl = `https://finance.naver.com/item/fchart.naver?code=${stockCode}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] h-[80vh] max-w-6xl">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            📈 {stockName} ({stockCode}) 차트
          </h3>
          <button
            onClick={onClose}
            className="px-3 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="p-4 h-[calc(100%-4rem)]">
          <iframe
            src={chartUrl}
            className="w-full h-full border-0 rounded"
            title={`${stockName} 차트`}
          />
        </div>
      </div>
    </div>
  );
};

export default StockChart;