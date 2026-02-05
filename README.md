# StoreHub - GTM Strategy

Go-to-Market 전략 수립을 위한 **Market Landscape** 분석 대시보드입니다.  
MSME 거시경제 지표와 기업 금융 행태 지표를 20개국 기준으로 시각화합니다.

## GitHub에 푸시하기

저장소가 이미 초기화되어 있고 첫 커밋이 완료된 상태입니다. GitHub에 올리려면:

1. [GitHub](https://github.com/new)에서 새 저장소(Repository)를 만듭니다. (이름 예: `StoreHub-GTM`)
2. 터미널에서 프로젝트 폴더로 이동한 뒤 아래를 실행합니다.

```bash
git remote add origin https://github.com/본인아이디/저장소이름.git
git branch -M main
git push -u origin main
```

- 이미 `origin`이 있다면 `git remote set-url origin https://github.com/...` 로 주소만 바꿀 수 있습니다.
- 기본 브랜치가 `master`라면 `git push -u origin master` 로 푸시하면 됩니다.

## 포함 국가 (20개국)

- **Malaysia**, **Thailand**, **Philippines** (필수 3국)
- 필요 시 `data/market-landscape.json`에 국가를 추가할 수 있습니다.

---

## 대시보드 보는 방법

### 방법 1: 단일 HTML 파일 (권장 · npm 불필요)

**`dashboard/Market-Landscape-Dashboard.html`** 파일을 더블클릭하거나 브라우저에서 열면 됩니다.  
인터넷만 되면 Chart.js CDN으로 차트가 로드되며, 데이터는 파일 안에 포함되어 있습니다.

- 데이터를 바꾸려면 HTML 파일을 열어 `const DATA = { ... };` 부분의 JSON만 수정하면 됩니다.

### 방법 2: React 개발 서버 (npm 필요)

```bash
cd dashboard
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

---

## 데이터 출처 및 추출 가이드

### 1. MSME 거시경제 데이터

**출처:** [ADB Asia SME Monitor 2025](https://www.adb.org/sites/default/files/publication/1096981/asia-sme-monitor-2025.pdf)  
**경로:** Part II: Country Reviews → 각 국가별 챕터

| # | 지표 | 추출 위치 | 비고 |
|---|------|-----------|------|
| 1 | **MSME GDP (M USD)** | Table 2: MSME Landscape → "MSME GDP 2023-2024" | 현지 통화면 리포트 첫 페이지 연평균 환율로 M USD 환산 |
| 2 | **MSME GDP to total (% to GDP)** | Table 2 → "MSME GDP to total (%)" 행, 2023-2024 |
| 3 | **MSME Loans to Total (%)** | Table 3: MSME Financing → "MSME loans to total loans (%)" 행, 2023-2024 |
| 4 | **MSME Employees to Total (%)** | Table 2 → "MSME employees to total (%)" 행, 2023-2024 |
| 5 | **MSMEs by sector (%)** | Table 2 → "MSMEs by sector ~ Others" 행 (Manufacturing, Services, Trade, Others), 2023-2024 |

### 2. 기업 금융 행태 데이터

**출처:** [World Bank Enterprise Surveys - Economy Data](https://www.enterprisesurveys.org/en/data/exploreeconomies)  
**조작:** 필터에서 국가(Malaysia, Thailand, Philippines) 선택 → **Topic: Finance** 선택

| # | 지표 | WB 위치 | Indicator ID | 의미 |
|---|------|---------|--------------|------|
| 6 | **% of firms with checking/savings account** | Finance → Sub-Topic: Credit and Loans | 291 | 정식 법인 계좌 보유 기업 비율 |
| 7 | **% of firms using banks for working capital** | Finance → Sub-Topic: Working Capital Financing | 294 | 운전자금 조달 시 은행 이용 기업 비율 (낮을수록 예치금 기반 솔루션 필요성↑) |
| 8 | **% of payments made electronically** | Finance → Sub-Topic: Electronic Payments | 310 | 전자 결제 비중 (QR 등 디지털 솔루션 수용 잠재력) |

---

## 데이터 파일 구조

실제 수치로 갱신할 파일:

- **프로젝트 루트:** `data/market-landscape.json`
- **대시보드에서 사용:** `dashboard/public/data/market-landscape.json`

두 파일을 동일한 내용으로 유지하거나, 대시보드만 쓸 경우 `dashboard/public/data/market-landscape.json` 만 수정하면 됩니다.

### JSON 구조 예시

```json
{
  "meta": {
    "description": "Market landscape for Go-to-market strategy",
    "period": "2023-2024",
    "msme_source": "ADB Asia SME Monitor 2025 - Part II: Country Reviews",
    "msme_url": "https://www.adb.org/sites/default/files/publication/1096981/asia-sme-monitor-2025.pdf",
    "wb_source": "World Bank Enterprise Surveys - Economy Data, Finance topic",
    "wb_url": "https://www.enterprisesurveys.org/en/data/exploreeconomies"
  },
  "countries": [
    {
      "code": "MYS",
      "name": "Malaysia",
      "msme_gdp_m_usd": 125000,
      "msme_gdp_to_total_pct": 38.5,
      "msme_loans_to_total_pct": 42.1,
      "msme_employees_to_total_pct": 66.2,
      "msmes_by_sector_pct": {
        "manufacturing": 18,
        "services": 45,
        "trade": 28,
        "others": 9
      },
      "pct_firms_checking_savings": 92,
      "pct_firms_bank_working_capital": 28,
      "pct_payments_electronically": 65
    }
  ]
}
```

- **국가 추가:** `countries` 배열에 동일한 키를 가진 객체를 추가하면 됩니다.
- **값 없음:** `null` 로 두면 차트/카드에서 "–" 로 표시됩니다.

---

## Vibe Coding / AI에게 시키기 위한 최종 프롬프트 (복사용)

```
위 가이드를 바탕으로 Malaysia, Thailand, Philippines 3개국을 반드시 포함한 주요 국가들에 대해 다음 8가지 데이터를 2023-2024 최신 버전으로 추출해줘.

1) MSME GDP (M USD)
2) MSME GDP to total (% to GDP)
3) MSME Loans to Total (%)
4) MSME Employees to Total
5) MSMEs by sector (%)
6) % of firms with a checking/savings account
7) % of firms using banks for working capital
8) % of payments made electronically
```

추출한 수치를 `data/market-landscape.json` 및 `dashboard/public/data/market-landscape.json` 의 해당 국가/필드에 반영하면 대시보드에 즉시 반영됩니다.
