import axios from "axios";
// import { DART_API_KEY } from "../config/dart";

export interface DartDisclosure {
  corp_code: string;
  corp_name: string;
  stock_code: string;
  report_nm: string;
  rcept_no: string;
  flr_nm: string;
  rcept_dt: string;
  rm: string;
}

export interface DartDisclosureResponse {
  status: string;
  message: string;
  page_no: number;
  page_count: number;
  total_count: number;
  total_page: number;
  list: DartDisclosure[];
}

// 오늘 날짜 YYYYMMDD
function getToday() {
  const now = new Date();
  now.setDate(now.getDate()); // 2일 전으로 설정
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

/**
 * DART 공시 API에서 오늘 날짜로 종목의 공시를 조회합니다.
 * @param stockCode 종목코드 (예: '005930')
 */
export async function fetchTodayDisclosures(
  corpCode: string
): Promise<DartDisclosure[]> {
  const today = getToday();
  const url = `/api/dart/list`;
  const params = {
    // crtfc_key: DART_API_KEY, // 백엔드에서 자동 주입
    corp_code: corpCode,
    bgn_de: today,
    end_de: today,
    page_count: 10,
  };
  const { data } = await axios.get<DartDisclosureResponse>(url, { params });
  if (data.status === "013" || !data.list) return [];
  return data.list;
}
