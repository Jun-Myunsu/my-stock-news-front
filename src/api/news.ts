import axios from "axios";
import type { NewsArticle } from "../types/news";

interface NaverNewsItem {
  title: string;
  link: string;
  pubDate: string;
}

/**
 * Naver News API에서 종목 관련 뉴스를 검색합니다.
 * @param query - 검색할 종목명 또는 키워드
 */
export async function fetchNewsForStock(query: string): Promise<NewsArticle[]> {
  // 백엔드 프록시를 통해 Naver News API 호출
  const url = `/api/news`;
  try {
    const { data } = await axios.get<{ items: NaverNewsItem[] }>(url, {
      params: { query },
    });

    if (!data.items) return [];

    // API 응답을 NewsArticle 형태로 변환
    return data.items.map((item) => ({
      title: item.title.replace(/<[^>]*>?/g, ""),
      link: item.link,
      publisher: item.pubDate, // API 응답에 따라 적절히 수정 필요
      published_at: new Date(item.pubDate).toLocaleString(),
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
