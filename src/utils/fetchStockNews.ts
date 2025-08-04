import type { NewsArticle } from '../types/news';

interface DeepSearchNewsItem {
  title: string;
  content_url: string;
  publisher: string;
  published_at: string;
  image_url?: string;
}

/**
 * Fetch news articles for a given stock code and date from DeepSearch API.
 * @param stockCode - e.g. '005930'
 * @param date - e.g. '2024-04-25'
 */
export async function fetchStockNews(stockCode: string, date: string): Promise<NewsArticle[]> {
  const url = `/api/news?symbol=${stockCode}&date=${date}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('fetchStockNews: fetch failed', res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    return (data.articles || []).map((item: DeepSearchNewsItem) => ({
      title: item.title,
      link: item.content_url,
      publisher: item.publisher,
      published_at: item.published_at,
      image_url: item.image_url,
    }));
  } catch (error) {
    console.error('fetchStockNews: error', error);
    return [];
  }
} 