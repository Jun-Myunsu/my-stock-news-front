import React from "react";
import type { NewsArticle } from "../types/news";

interface NewsLayerProps {
  news: NewsArticle[];
}

const NewsLayer: React.FC<NewsLayerProps> = ({ news }) => (
  <div className="mt-2 bg-gray-50 dark:bg-gray-800/50 border border-yellow-300 dark:border-yellow-900/50 rounded shadow-lg p-3 text-xs max-w-full overflow-x-auto">
    <ul className="space-y-1">
      {news.map((n, idx) => (
        <li key={n.link + idx} className="truncate flex items-center gap-2">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {n.title.length > 25 ? n.title.slice(0, 25) + "..." : n.title}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            {n.publisher}
          </span>
          <span className="ml-2 text-gray-400 dark:text-gray-500">
            {n.published_at?.slice(0, 10)}
          </span>
          <a
            href={n.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-yellow-700 dark:text-yellow-400 underline hover:text-yellow-800 dark:hover:text-yellow-300"
          >
            기사보기
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default NewsLayer;
