# 환경 변수 API 키 발급 방법 (.env 설정 가이드)

이 문서는 `.env` 파일에 사용되는 주요 API 키들의 발급 및 설정 방법을 정리한 가이드입니다.  
각 서비스별로 키를 발급받는 절차와 `.env`에 입력하는 방법을 단계별로 설명합니다.

---

## 1. DEEPSEARCH_API_KEY

### 서비스 설명  
DeepSearch는 국내 기업의 재무 정보, 공시, 뉴스 등을 제공하는 기업 분석 플랫폼으로, 개발자를 위한 API를 통해 데이터를 조회할 수 있습니다.

### 발급 절차
1. DeepSearch 홈페이지에 접속: https://www.deepsearch.com/
2. 회원가입 또는 로그인
3. 우측 상단 사용자 메뉴 클릭 후 "API 서비스" 또는 "내 정보 > API KEY 관리" 선택
4. API 키 발급 버튼 클릭
5. 생성된 키 복사

### 환경 변수 설정
```env
DEEPSEARCH_API_KEY=발급받은_키
```

---

## 2. DART_API_KEY

### 서비스 설명  
DART(Digitalized Data Analysis and Retrieval Tool)는 금융감독원이 운영하는 전자공시시스템으로, 기업의 공시자료를 제공하는 API를 사용할 수 있습니다.

### 발급 절차
1. DART 오픈 API 사이트 접속: https://opendart.fss.or.kr/
2. 회원가입 후 로그인
3. 상단 메뉴에서 "정보마당 > 오픈 API 안내" 선택
4. 좌측 메뉴에서 "API 키 신청" 클릭
5. 약관 동의 후 발급받은 API 키 확인

### 공식 문서
- https://opendart.fss.or.kr/guide/main.do?apiGrpCd=DS001

### 환경 변수 설정
```env
DART_API_KEY=발급받은_키
```

---

## 3. GEMINI_API_KEY

### 서비스 설명  
Gemini API는 Google이 제공하는 대형 멀티모달 AI 모델입니다. 텍스트, 이미지 등의 입력을 처리할 수 있으며, Google Cloud의 AI Studio에서 키를 발급받을 수 있습니다.

### 발급 절차
1. Google AI Studio 접속: https://aistudio.google.com/app
2. Google 계정으로 로그인
3. 좌측 사이드바에서 "API Keys" 메뉴 클릭
4. "Create API Key" 버튼 클릭
5. 생성된 API 키 복사

### 공식 문서
- https://ai.google.dev/

### 환경 변수 설정
```env
GEMINI_API_KEY=발급받은_키
```

---

## 4. NOTION_TOKEN, NOTION_DATABASE_ID

### 서비스 설명  
Notion API는 사용자의 워크스페이스 내 페이지와 데이터베이스에 접근하여 읽기/쓰기 작업을 할 수 있도록 지원합니다.

---

### 4.1 NOTION_TOKEN 발급 방법 (Integration Token)

1. Notion Integration 생성 페이지 접속: https://www.notion.so/my-integrations
2. "New integration" 클릭
3. 아래 항목 입력
   - Integration 이름: 예) Stock Ai Chat
   - Workspace 선택: 현재 사용하는 워크스페이스 선택
4. 권한 설정
   - 권한 요청 항목 중 다음 항목 모두 선택:
     - Read content
     - Insert content
     - Update content
     - Delete content (선택 사항)
5. Integration 생성 후 나오는 "Internal Integration Token" 복사

#### 환경 변수 설정
```env
NOTION_TOKEN=발급받은_토큰
```

---

### 4.2 NOTION_DATABASE_ID 추출 방법

1. Notion에서 데이터베이스 페이지 열기
2. 브라우저 주소창(URL) 확인

예시:
```
https://www.notion.so/workspace_name/23ca19d44ff88049ba5dc23677b5578c?v=abc123...
```

→ `23ca19d44ff88049ba5dc23677b5578c` 부분이 DATABASE_ID임

#### 환경 변수 설정
```env
NOTION_DATABASE_ID=복사한_데이터베이스_ID
```

---

### 4.3 Integration과 데이터베이스 연결 (중요)

Notion API가 데이터베이스에 접근하기 위해서는 Integration이 해당 DB에 초대되어야 합니다.

1. 데이터베이스 페이지 오른쪽 상단 "공유" 버튼 클릭
2. 하단에 있는 "연동 추가하기" 또는 "Integration 추가" 클릭
3. 앞서 만든 Integration (`Stock Ai Chat` 등)을 선택하고 초대
4. 권한은 "전체 권한(Full access)"으로 설정

이 작업을 하지 않으면 API 사용 시 `404 object_not_found` 오류가 발생할 수 있습니다.

---

## 보안 주의사항

- `.env` 파일에는 중요한 인증 정보가 포함되므로, 반드시 `.gitignore`에 `.env`를 추가하여 Git에 업로드되지 않도록 해야 합니다.
- API 키는 외부에 노출되면 제3자에 의해 악용될 수 있으므로, 필요시 키를 재발급하고 사용처를 제한하세요.
