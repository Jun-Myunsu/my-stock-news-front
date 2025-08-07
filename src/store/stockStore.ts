import { create } from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";
import type { RegisteredStock } from "../types/registeredStock";
import type { DartDisclosure } from "../types/dartDisclosure";
import type { NewsArticle } from "../types/news";
import { STORAGE_KEYS } from "../constants/storage";

interface StockState {
  // 등록된 종목
  registeredStocks: RegisteredStock[];
  // 공시 데이터
  disclosures: Record<number, DartDisclosure[]>;
  // 뉴스 데이터
  news: Record<number, NewsArticle[]>;
  // 공시 레이어 오픈 상태
  openLayers: Record<number, boolean>;
  // 뉴스 레이어 오픈 상태
  openNewsLayers: Record<number, boolean>;
  // Actions
  addStock: (stock: RegisteredStock) => void;
  removeStock: (id: number) => void;
  setRegisteredStocks: (stocks: RegisteredStock[]) => void;
  setDisclosures: (disclosures: Record<number, DartDisclosure[]>) => void;
  setNews: (news: Record<number, NewsArticle[]>) => void;
  setOpenLayers: (layers: Record<number, boolean>) => void;
  setOpenNewsLayers: (layers: Record<number, boolean>) => void;
  toggleLayer: (id: number) => void;
  toggleNewsLayer: (id: number) => void;

  loadFromStorage: () => Promise<void>;
}

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      registeredStocks: [],
      disclosures: {},
      news: {},
      openLayers: {},
      openNewsLayers: {},


      addStock: (stock) =>
        set((state) => ({
          registeredStocks: [...state.registeredStocks, stock],
        })),

      removeStock: (id) =>
        set((state) => ({
          registeredStocks: state.registeredStocks.filter((stock) => stock.id !== id),
        })),

      setRegisteredStocks: (stocks) => set({ registeredStocks: stocks }),

      setDisclosures: (disclosures) => set({ disclosures }),

      setNews: (news) => set({ news }),

      setOpenLayers: (layers) => set({ openLayers: layers }),

      setOpenNewsLayers: (layers) => set({ openNewsLayers: layers }),

      toggleLayer: (id) =>
        set((state) => ({
          openLayers: { ...state.openLayers, [id]: !state.openLayers[id] },
        })),

      toggleNewsLayer: (id) =>
        set((state) => ({
          openNewsLayers: { ...state.openNewsLayers, [id]: !state.openNewsLayers[id] },
        })),



      loadFromStorage: async () => {
        const saved = await localforage.getItem<RegisteredStock[]>(STORAGE_KEYS.REGISTERED_STOCKS);
        if (saved) {
          set({ registeredStocks: saved });
        }
      },
    }),
    {
      name: "stock-store",
      partialize: (state) => ({ registeredStocks: state.registeredStocks }),
    }
  )
);