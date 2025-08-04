import { renderHook, waitFor } from "@testing-library/react";
import { useStockSearch } from "../hooks/useStockSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, beforeEach } from "vitest";
import localforage from "localforage";

type Props = { children: React.ReactNode };
const wrapper = ({ children }: Props) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("useStockSearch (localforage 기반)", () => {
  const mockStore = localforage.createInstance({ name: "corp-db" });

  beforeEach(async () => {
    await mockStore.clear();
    await mockStore.setItem("삼성전자", {
      corp_name: ["삼성전자"],
      stock_code: ["005930"],
    });
    await mockStore.setItem("LG화학", {
      corp_name: ["LG화학"],
      stock_code: ["051910"],
    });
  });

  it("기업명으로 종목정보를 성공적으로 가져온다", async () => {
    const { result } = renderHook(() => useStockSearch("삼성"), { wrapper });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.data).toEqual([{ name: "삼성전자", code: "005930" }]);
  });

  it("존재하지 않는 이름일 경우 빈 배열을 반환한다", async () => {
    const { result } = renderHook(() => useStockSearch("없는회사"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.data).toEqual([]);
  });

  it("종목코드 일부로 검색할 수 있다", async () => {
    const { result } = renderHook(() => useStockSearch("051"), { wrapper });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.data).toEqual([{ name: "LG화학", code: "051910" }]);
  });
});
