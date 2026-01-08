# ExecuteAI Survey v2 - 질문 목록

## 설문 개요
- **버전**: v2 (PMF 중심 설계)
- **총 질문 수**: 14개
- **예상 소요 시간**: 7-10분
- **핵심 목표**: The Mom Test 기반 실제 행동 데이터 수집

---

## Intro (몰입 유도) - Q1

### Q1. 아침 알람
**Scene**: `IntroScene.tsx`
**Data Field**: `intro.morningRoutine`

> 어제 아침,
> 알람이 울렸을 때 당신은?

| 값 | 라벨 |
|---|------|
| `snooze` | 알람 끄고 5분만... (반복) |
| `wake_plan` | 일어나서 오늘 할 일 계획 |
| `sns` | 누워서 SNS/뉴스부터 체크 |
| `stay_bed` | 일어나기 싫어서 계속 누워있음 |

**Type**: `string` (단일 선택)

---

## Chapter 1: 도구 사용 패턴 (Q2-Q6)

### Q2. 현재 사용 도구
**Scene**: `Chapter1Scene1.tsx`
**Data Field**: `tools.current`

> 요즘 사용 중인 도구는?
> (복수 선택 가능)

| 값 | 라벨 |
|---|------|
| `notion` | Notion |
| `todoist` | Todoist |
| `ticktick` | TickTick |
| `google_calendar` | Google Calendar |
| `apple_reminders` | Apple 미리알림 |
| `paper` | 종이/플래너 |
| `notes` | 메모 앱 |
| `none` | 아무것도 안 씀 |
| `other` | 기타 |

**Type**: `string[]` (복수 선택)

---

### Q3. 도구 사용 빈도
**Scene**: `Chapter1Scene2.tsx`
**Data Field**: `tools.frequency`

> 선택한 도구들을 얼마나 자주 사용하나요?

각 선택된 도구에 대해:
| 값 | 라벨 |
|---|------|
| `daily` | 매일 사용 |
| `sometimes` | 가끔 사용 |
| `installed_only` | 깔아만 놨음 |

**Type**: `Record<string, 'daily' | 'sometimes' | 'installed_only'>`

---

### Q4. 버린 도구
**Scene**: `Chapter1Scene3.tsx`
**Data Field**: `tools.abandoned`

> 시도했다가 포기한 앱/도구가 있나요?
> (복수 선택 가능)

| 값 | 라벨 |
|---|------|
| `notion` | Notion |
| `todoist` | Todoist |
| `ticktick` | TickTick |
| `google_calendar` | Google Calendar |
| `forest` | Forest (집중 앱) |
| `pomodoro_apps` | 뽀모도로 앱들 |
| `routinery` | Routinery/습관 앱 |
| `paper` | 종이/플래너 |
| `none` | 없음 |
| `other` | 기타 |

**Type**: `string[]` (복수 선택)

---

### Q5. 포기 이유 (핵심 PMF)
**Scene**: `Chapter1Scene4.tsx`
**Data Field**: `tools.abandonReasons`
**조건**: `tools.abandoned`에서 'none' 외 선택 시에만 표시

> 왜 포기하게 됐나요?
> (해당하는 것 모두)

| 값 | 라벨 | PMF 인사이트 |
|---|------|-------------|
| `forgot_to_use` | 쓰는 걸 잊어버림 | 습관화 실패 |
| `manual_planning` | 결국 내가 다 계획해야 해서 | **핵심 페인포인트** |
| `complex` | 기능이 너무 복잡함 | UX 문제 |
| `too_many_features` | 필요 없는 기능이 너무 많음 | 기능 과잉 |
| `expensive` | 유료라서 | 가격 장벽 |
| `no_effect` | 효과가 없어서 | 가치 불명확 |

**Type**: `string[]` (복수 선택)

---

### Q6. 현재 지출
**Scene**: `Chapter1Scene5.tsx`
**Data Field**: `spending.current`

> 생산성 앱/도구에 현재 지출하는 금액은?
> (월 기준)

| 값 | 라벨 |
|---|------|
| `0` | 0원 (무료만 사용) |
| `~5000` | ~5,000원 |
| `~10000` | ~10,000원 |
| `15000+` | 15,000원 이상 |

**Type**: `string` (단일 선택)

---

## Chapter 2: 실행 패턴 (Q7-Q9)

### Q7. 어제 실행률
**Scene**: `Chapter2Scene1.tsx`
**Data Field**: `execution.yesterday`

> 어제 계획한 일 중
> 실제로 완료한 건 몇 %?

**Type**: `number` (0-100, 슬라이더)

---

### Q8. 실패 빈도
**Scene**: `Chapter2Scene2.tsx`
**Data Field**: `execution.failFrequency`

> 계획대로 안 되는 날이 얼마나 자주 있나요?

| 값 | 라벨 |
|---|------|
| `daily` | 거의 매일 |
| `often` | 자주 (주 3-4회) |
| `sometimes` | 가끔 (주 1-2회) |
| `rarely` | 드물게 |

**Type**: `string` (단일 선택)

---

### Q9. 실패 원인 (핵심)
**Scene**: `Chapter2Scene3.tsx`
**Data Field**: `execution.failReasons`

> 계획대로 안 될 때,
> 주로 어떤 이유인가요?

| 값 | 라벨 | PMF 인사이트 |
|---|------|-------------|
| `dont_know_priority` | 뭐부터 해야 할지 모르겠음 | **핵심 페인포인트** |
| `too_many_plans` | 계획을 너무 많이 세움 | 과도한 계획 |
| `emergency` | 급한 일이 생김 | 외부 요인 |
| `didnt_want_to` | 그냥 하기 싫었음 | 동기 부족 |
| `distracted` | 딴짓하다 시간 감 | 집중력 문제 |
| `forgot` | 해야 할 일을 잊어버림 | 기억력/시스템 문제 |

**Type**: `string[]` (복수 선택)

---

## Chapter 3: 솔루션 반응 (Q10-Q13) - PMF 핵심

### Q10. 페인포인트
**Scene**: `Chapter3Scene1.tsx`
**Data Field**: `painPoint.main`

> 일 관리에서 가장 힘든 건 뭔가요?

| 값 | 라벨 |
|---|------|
| `organizing` | 할 일 정리하기 |
| `prioritizing` | 우선순위 정하기 |
| `planning` | 계획 세우기 |
| `starting` | 시작하기 |
| `focusing` | 집중 유지하기 |

**Type**: `string` (단일 선택)

---

### Q11. 솔루션 제시
**Scene**: `Chapter3Scene2.tsx`
**Data Field**: `solution.interest`

> **"AI가 당신의 할 일을 분석해서
> 오늘 뭐부터 할지 자동으로 정해주는 앱"**
>
> 이런 게 있다면?

| 값 | 라벨 |
|---|------|
| `want_now` | 당장 쓰고 싶다! |
| `looks_ok` | 괜찮아 보인다 |
| `unsure` | 잘 모르겠다 |
| `not_needed` | 필요 없을 것 같다 |

**Type**: `string` (단일 선택)

---

### Q12. 가격 반응 (PMF 검증)
**Scene**: `Chapter3Scene3.tsx`
**Data Field**: `pricing.reaction4900`

> 이 앱이 월 4,900원이라면?

| 값 | 라벨 | 의미 |
|---|------|------|
| `will_pay` | 괜찮다, 쓸 것 같다 | **강한 PMF 신호** |
| `only_free` | 무료면 쓸 것 같다 | 약한 관심 |
| `too_expensive` | 너무 비싸다 | 가격 저항 |
| `no_interest` | 관심 없다 | PMF 부족 |

**Type**: `string` (단일 선택)

---

### Q13. 가격 탐색
**Scene**: `Chapter3Scene4.tsx`
**Data Field**: `pricing.willingToPay`
**조건**: Q12에서 'will_pay' 또는 'only_free' 선택 시

> 얼마까지라면 괜찮을까요?

**Type**: `number` (1,000 ~ 10,000원 슬라이더, 500원 단위)

---

## Outro: 베타 신청 (Q14-Q15)

### Q14. 이메일 수집
**Scene**: `OutroScene1.tsx`
**Data Field**: `betaSignup.email`, `betaSignup.skipped`

> **설문에 응해주셔서 감사합니다!**
>
> 베타 테스트에 참여하시겠어요?
> 선착순 50명에게 3개월 무료 + 평생 50% 할인 제공

**Type**:
- `email`: `string` (이메일 입력)
- `skipped`: `boolean` (건너뛰기 여부)

---

### Q15. 피드백 (선택)
**Scene**: `OutroScene2.tsx`
**Data Field**: `feedback.openText`

> 마지막으로...
> 이런 앱이 있으면 좋겠다, 또는
> 하고 싶은 말 있으세요?

**Type**: `string` (자유 텍스트, 선택)

---

## 결과 페이지

### 사용자 타입 분류
**Component**: `ResultPage.tsx`
**분석 로직**: `typeAnalyzer.ts`

| 타입 | 이름 | 이모지 |
|-----|-----|-------|
| `storm_multitasker` | 폭풍 멀티태스커 | 🌪️ |
| `perfectionist_procrastinator` | 완벽주의 미루기 | 🐌 |
| `focus_survivor` | 집중력 서바이버 | 🎯 |
| `lost_navigator` | 방향 상실자 | 🧭 |

---

## 데이터 구조 (SurveyData)

```typescript
interface SurveyData {
  // 세션 정보
  userId: string;
  sessionId: string;
  startTime: number;
  lastUpdated: number;
  deviceType: 'mobile' | 'desktop';
  currentScene: number;
  progress: number;

  // 설문 응답
  intro: {
    morningRoutine?: 'snooze' | 'wake_plan' | 'sns' | 'stay_bed';
  };

  tools: {
    current?: string[];
    frequency?: Record<string, 'daily' | 'sometimes' | 'installed_only'>;
    abandoned?: string[];
    abandonReasons?: string[];
  };

  spending: {
    current?: '0' | '~5000' | '~10000' | '15000+';
  };

  execution: {
    yesterday?: number;
    failFrequency?: 'daily' | 'often' | 'sometimes' | 'rarely';
    failReasons?: string[];
  };

  painPoint: {
    main?: 'organizing' | 'prioritizing' | 'planning' | 'starting' | 'focusing';
  };

  solution: {
    interest?: 'want_now' | 'looks_ok' | 'unsure' | 'not_needed';
  };

  pricing: {
    reaction4900?: 'will_pay' | 'only_free' | 'too_expensive' | 'no_interest';
    willingToPay?: number;
  };

  betaSignup: {
    email?: string;
    skipped?: boolean;
  };

  feedback: {
    openText?: string;
  };

  // 결과
  result?: {
    userType?: string;
    completionTime?: number;
    sharedResult?: boolean;
  };

  // 행동 데이터
  behavioral: {
    sceneTimings: Record<string, number>;
    backButtonClicks: number;
    dropOffPoint?: string;
  };

  // 메타데이터
  trustScore?: number;
  dataCompleteness?: number;
}
```

---

## PMF 핵심 지표

### 1차 지표 (Must Track)
- **Q12 will_pay 비율**: 목표 > 40%
- **Q5 manual_planning 선택률**: 핵심 페인포인트 검증
- **Q9 dont_know_priority 선택률**: 우선순위 문제 검증
- **Q14 이메일 수집률**: 목표 > 30%

### 2차 지표
- 설문 완료율
- 평균 완료 시간
- 타입별 분포
- 가격 저항점 (Q13 평균값)
