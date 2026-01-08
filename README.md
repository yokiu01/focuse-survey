# INTENTIO - ADHD 생산성 도구 설문

ADHD를 가진 사람들의 실제 경험을 이해하고 더 나은 생산성 도구를 만들기 위한 인터랙티브 설문 애플리케이션입니다.

## ✨ 주요 기능

### 📊 설문 구조 (v2 - 14개 질문)
- **예상 소요 시간**: 5-7분
- **The Mom Test 기반**: 과거 행동 중심 질문
- **PMF 검증**: 가격 반응 및 지불 의향 측정

### 🎯 질문 구성

| 챕터 | 질문 | 목적 |
|------|------|------|
| Intro | Q1: 아침 루틴 | 몰입 유도 |
| Chapter 1 | Q2-Q6: 도구 사용 패턴 | 현재 행동 파악 |
| Chapter 2 | Q7-Q9: 실행 패턴 | 페인포인트 발굴 |
| Chapter 3 | Q10-Q13: 솔루션 반응 | PMF 검증 (핵심) |
| Outro | Q14-Q15: 베타 신청 | 리드 수집 |

### 🔒 보안 기능
- Vercel Serverless Functions를 통한 API 보호
- Google Sheets URL 서버 사이드 은닉
- Rate Limiting (1분당 5회)
- 입력 데이터 검증 및 XSS 방지
- 보안 헤더 적용

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 (CSS Variables, 모바일 최적화)
- **Backend**: Vercel Serverless Functions
- **Database**: Google Sheets (Apps Script)
- **Storage**: LocalStorage (중간 저장)
- **Deployment**: Vercel

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### Vercel 로컬 개발 (API 포함)
```bash
npm i -g vercel
vercel dev
```

### 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

```
survey/
├── api/                        # Vercel Serverless Functions
│   └── submit.ts               # 데이터 제출 API (보안)
├── src/
│   ├── components/             # 공용 컴포넌트
│   │   ├── PrivacyConsent.tsx  # 첫 페이지 (동의)
│   │   ├── ProgressBar.tsx     # 진행률 표시
│   │   └── ResultPage.tsx      # 결과 페이지
│   ├── scenes/                 # 설문 씬 컴포넌트
│   │   ├── IntroScene.tsx      # Q1: 아침 루틴
│   │   ├── Chapter1Scene1-5.tsx # Q2-Q6: 도구 패턴
│   │   ├── Chapter2Scene1-3.tsx # Q7-Q9: 실행 패턴
│   │   ├── Chapter3Scene1-4.tsx # Q10-Q13: 솔루션 반응
│   │   ├── OutroScene1-2.tsx   # Q14-Q15: 베타 신청
│   │   └── SceneStyles.css     # 공통 씬 스타일
│   ├── utils/
│   │   ├── storage.ts          # LocalStorage 관리
│   │   ├── analytics.ts        # 행동 데이터 추적
│   │   ├── googleSheets.ts     # API 호출
│   │   └── typeAnalyzer.ts     # 사용자 타입 분석
│   ├── types.ts                # TypeScript 타입
│   ├── App.tsx                 # 메인 앱
│   └── main.tsx                # 엔트리포인트
├── vercel.json                 # Vercel 설정
├── .env.example                # 환경 변수 예시
└── QUESTIONS_v2.md             # 질문 목록 문서
```

## 🚀 배포 (Vercel)

### 1. 환경 변수 설정
Vercel Dashboard > Settings > Environment Variables:

```
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
ALLOWED_ORIGIN=https://your-domain.vercel.app
```

### 2. 배포
```bash
vercel --prod
```

또는 GitHub 연동 시 자동 배포

### 3. Google Apps Script 설정
1. `apps-script-v2.js` 내용을 Google Apps Script에 붙여넣기
2. `createHeaders()` 함수 실행 (헤더 생성)
3. 배포 > 새 배포 > 웹 앱
4. 배포 URL을 Vercel 환경 변수에 설정

## 📊 수집 데이터

### 핵심 PMF 지표
- **Q12 가격 반응**: 4,900원에 대한 반응 (will_pay 비율 목표 > 40%)
- **Q5 포기 이유**: "결국 내가 다 계획해야 해서" 선택률
- **Q9 실패 원인**: "뭐부터 해야 할지 모르겠음" 선택률
- **Q14 이메일 수집률**: 목표 > 30%

### 사용자 타입 분류
| 타입 | 설명 |
|------|------|
| 🌪️ 폭풍 멀티태스커 | 여러 도구, 많은 계획, 산만함 |
| 🐌 완벽주의 미루기 | 완벽한 계획, 실행 어려움 |
| 🎯 집중력 서바이버 | 나름의 전략, 유지 중 |
| 🧭 방향 상실자 | 우선순위 어려움, 포기 경험 |

## 🔒 개인정보 보호

- 모든 응답은 익명 처리
- 서버 사이드 API를 통한 안전한 데이터 전송
- 베타 신청 시에만 이메일 수집 (선택)
- LocalStorage 데이터 7일 후 자동 삭제

## 📱 반응형 디자인

- 모바일 우선 설계
- 터치 최적화 (엄지 영역 버튼 배치)
- 가독성 있는 폰트 크기
- 부드러운 애니메이션

---

**개발**: INTENTIO Team
**문의**: dlgusdn06@naver.com
**2026년 상반기 출시 예정**
