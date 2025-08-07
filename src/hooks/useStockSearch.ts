import { useQuery } from "@tanstack/react-query";
import type { StockItem } from "../types/stock";
import localforage from "localforage";

// 로컬 forage 인스턴스 생성
const corpStore = localforage.createInstance({ name: "corp-db" });

// 내부 캐시: 외부에서 접근 못하도록 모듈 내부에 유지
let cachedKeys: string[] | null = null;

export const useStockSearch = (query: string) => {
  return useQuery<StockItem[]>({
    queryKey: ["stock-search", query],
    queryFn: async () => {
      const trimmedQuery = query.trim().toLowerCase();

      // 빈 검색어는 무시하고 바로 빈 배열 반환
      if (!trimmedQuery) return [];

      if (!cachedKeys) {
        try {
          cachedKeys = await corpStore.keys();
        } catch (err) {
          console.error("키 불러오기 실패:", err);
          return [];
        }
      }

      const filteredKeys = cachedKeys
        .filter((key) => key.toLowerCase().includes(trimmedQuery))
        .slice(0, 10); // 더 많이 가져와서 필터링 후 5개 보장

      const matched = await Promise.all(
        filteredKeys.map(async (key) => {
          try {
            const value = await corpStore.getItem(key);
            if (
              typeof value === "object" &&
              value !== null &&
              "corp_name" in value &&
              "stock_code" in value &&
              "corp_code" in value
            ) {
              const name =
                typeof value.corp_name === "string" ? value.corp_name : "";
              const code =
                typeof value.stock_code === "string" ? value.stock_code : "";
              const corp_code =
                typeof value.corp_code === "string" ? value.corp_code : "";
              return { name, code, corp_code };
            }
          } catch (err) {
            console.warn(`"${key}" 항목 로드 실패`, err);
          }
          return null;
        })
      );

      return matched
        .filter((item): item is StockItem => item !== null)
        .slice(0, 5); // 최종적으로 5개로 제한
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
