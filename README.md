# My Stock News

AI 기반 주식 뉴스 분석 및 채팅 플랫폼

## 프로젝트 목적

사용자가 등록한 종목의 뉴스와 공시 정보를 실시간으로 수집하고, AI를 활용해 투자자에게 맞춤형 분석과 인사이트를 제공하는 웹 애플리케이션입니다.

## 주요 기능

### 주식 검색 및 관리

- 한국 상장 기업 실시간 검색
- 관심 종목 등록 및 관리 (드래그 앤 드롭 지원)
- 종목별 뉴스 및 공시 정보 조회

### AI 채팅 분석

- Gemini AI를 활용한 주식 분석 채팅
- 종목별 맞춤 질문 템플릿 제공
- 대화 내용 Notion 데이터베이스 자동 저장

### 뉴스 & 공시 정보

- DeepSearch API를 통한 실시간 뉴스 수집
- DART API를 통한 공시 정보 조회
- 종목별 필터링 및 정렬 기능

### 사용자 경험

- 다크/라이트 테마 지원
- 로컬 스토리지를 통한 데이터 영속성

## 🛠 기술 스택

### Frontend

- **React 19** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** (스타일링)
- **Zustand** (상태 관리)
- **React Query** (서버 상태 관리)
- **DND Kit** (드래그 앤 드롭)

### Backend (API 요청을 위해 백엔드 서버가 필요함. Render에 별도 배포)

- **https://my-stock-new-server.onrender.com/**
- **Node.js** + **Express**
- **CORS** (Cross-Origin Resource Sharing)

### API 연동

- **DeepSearch API** (주식 뉴스)
- **DART API** (공시 정보)
- **Gemini API** (AI 채팅)
- **Notion API** (데이터 저장)

## 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd my-stock-news
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

```bash
# server/.env 파일 생성
cp server/.env.example server/.env
```

필요한 API 키들을 발급받아 `.env` 파일에 입력:

- `DEEPSEARCH_API_KEY`: DeepSearch API 키
- `DART_API_KEY`: DART 공시 API 키
- `GEMINI_API_KEY`: Google Gemini API 키
- `NOTION_TOKEN`: Notion Integration 토큰
- `NOTION_DATABASE_ID`: Notion 데이터베이스 ID

> 자세한 API 키 발급 방법은 [api_key_setup_guide.md](api_key_setup_guide.md)를 참고하세요.

### 4. 서버 실행

```bash
# 백엔드 서버 실행 (포트 4000)
npm run server

# 프론트엔드 개발 서버 실행 (포트 3000)
npm run dev
```

### 5. 브라우저에서 접속

```
http://localhost:3000
```

## 📁 프로젝트 구조

```
my-stock-news/
├── src/                    # 프론트엔드 소스
│   ├── components/         # React 컴포넌트
│   ├── api/               # API 호출 함수
│   ├── store/             # Zustand 스토어
│   ├── types/             # TypeScript 타입 정의
│   └── utils/             # 유틸리티 함수
├── server/                # 백엔드 서버(Render)
│   ├── server.cjs         # Express 서버
│   ├── newsProxy.cjs      # 뉴스 API 프록시
│   ├── dartProxy.cjs      # DART API 프록시
│   ├── geminiProxy.cjs    # Gemini API 프록시
│   └── notionProxy.cjs    # Notion API 프록시
└── public/                # 정적 파일
```

## 🎮 사용법

### 1. 종목 검색 및 등록

- 검색창에 기업명 또는 종목코드 입력
- 검색 결과에서 원하는 종목 선택(키보드 이동키, 엔터 사용가능)
- "등록" 버튼으로 관심 종목에 추가

### 2. 뉴스 및 공시 조회(기준 오늘)

- 페이지 최초 접속 시 정보 자동 업데이트
- Info 버튼 실행 시 수동 정보 업데이트
- 기사보기 -> 뉴스 사이트 이동
- 공시 -> 공시 사이트 Dirt 이동
- 차트 -> 네이버 주식 차트 이동

### 3. AI 채팅 분석

- 우측 채팅 패널에서 AI와 대화
- 빠른 질문 템플릿 활용
- 답변을 저장하고 싶을 경우 Notion 등록 버튼 실행
- Notion 이동 버튼 실행 시 등록된 Notion 페이지로 이동

### 4. 추후 기능 추가

- 현재 주가 출력
- 매수수량, 매수가 입력시 자동 수익 계산 출력

## 테스트

```bash
# 단위 테스트 실행
npm run test

# 테스트 UI 실행
npm run test:ui
```

## 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 보안 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- API 키는 외부에 노출되지 않도록 주의하세요
- 프로덕션 환경에서는 환경 변수를 안전하게 관리하세요

## 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.
