import localforage from "localforage";
import corpRawData from "../assets/corpCode.json"; // json import 가능하도록 tsconfig 설정 필요

type RawCorpItem = {
  corp_code: [string];
  corp_name: [string];
  stock_code: [string];
  corp_eng_name?: [string];
  modify_date?: [string];
};

type CorpDataJson = {
  result: {
    list: RawCorpItem[];
  };
};

type ParsedCorpItem = {
  corp_code: string;
  corp_name: string;
  stock_code: string;
};

export const initCorpCodeDB = async () => {
  const isInitialized = await localforage.getItem("corp_init_done");
  if (isInitialized) return;

  const store = localforage.createInstance({ name: "corp-db" });

  const corpList = (corpRawData as CorpDataJson).result.list;

  for (const item of corpList) {
    const parsed: ParsedCorpItem = {
      corp_code: item.corp_code[0],
      corp_name: item.corp_name[0],
      stock_code: item.stock_code[0]?.trim() ?? "",
    };

    if (parsed.stock_code !== null && parsed.stock_code !== "") {
      await store.setItem(parsed.corp_name, parsed);
    }
  }

  await localforage.setItem("corp_init_done", true);
};
