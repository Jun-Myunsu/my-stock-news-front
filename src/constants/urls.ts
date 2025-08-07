export const EXTERNAL_URLS = {
  NAVER_CHART: 'https://finance.naver.com/item/fchart.naver',
} as const;

export const buildChartUrl = (stockCode: string): string => {
  return `${EXTERNAL_URLS.NAVER_CHART}?code=${stockCode}`;
};