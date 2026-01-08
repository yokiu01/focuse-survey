# 설문 질문 목록

## Chapter 1: 아침 루틴

### Scene 1: 알람이 울린다
**질문:** 07:30 AM 월요일 아침, 알람이 울립니다. 어떻게 하시나요?

| 선택지 | 값 | 설명 |
|--------|-----|------|
| 알람 끄고 5분만 더 눕기 | `snooze_alarm` | (진짜로 5분일 리 없지만...) |
| 바로 일어나서 할 일 목록 확인 | `wake_immediately` | 오늘은 달라질 거야! |
| 알람 미루기 버튼 3번 누르기 | `snooze_3times` | 딱 3번만... 정말로... |
| 핸드폰 집어들고 SNS부터 확인 | `check_sns` | 잠깐만... (30분 경과) |

**저장 필드:** `chapter1.morningRoutine`

---

### Scene 2: 할 일 목록 확인
**질문:** 당신의 할 일 목록을 엽니다. 얼마나 많은 할 일이 쌓여 있나요?

| 입력 타입 | 범위 | 기본값 |
|-----------|------|--------|
| 슬라이더 | 0 ~ 50개 | 10개 |

**반응:**
- 0-5개: "오, 미니멀리스트시군요!"
- 6-20개: "대부분 사람들이 이 정도예요"
- 21개+: "어... 이거 진짜 다 하실 건가요?"

**저장 필드:** `chapter1.todoCount`

---

### Scene 3: 우선순위의 지옥
**질문:** 출근하기 전 30분 남았습니다. 오늘 가장 먼저 할 일을 골라야 합니다.

| 선택지 | 값 | 설명 |
|--------|-----|------|
| 긴급: 오늘 오전 보고서 마감 | `report` | 제일 급하니까... |
| 중요: 기획안 3페이지 남음 | `planning` | 이게 더 중요한데... |
| 급한 이메일 5개 | `email` | 이것부터 처리하고... |
| 그냥 아무거나! | `random` | - |
| 너무 많아... 일단 유튜브 | `youtube` | - |

**추가 측정:** 결정 소요 시간 (초 단위)

**저장 필드:** `chapter1.priorityDecision`, `chapter1.priorityDecisionTime`

---

### Scene 4: 출근길 지하철
**질문:** 당신이 출근길에 보통 뭘 하나요?

| 선택지 | 값 | 설명 |
|--------|-----|------|
| SNS/유튜브 | `sns` | 잠깐만... (2시간 경과) |
| 뉴스/기사 읽기 | `news` | 세상 돌아가는 거 알아야지 |
| 음악 들으며 명상 | `music` | 마음의 평화를... |
| 공부하기 | `study` | 자기계발은 필수! |
| 게임하기 | `game` | 한 판만... 한 판만... |
| 오늘 할 일 다시 점검 | `planning` | 계획은 완벽하게! |
| 졸기... | `sleep` | 어제 또 늦게 잤지 |
| 직접 입력하기 | `custom` | 다른 활동을 하시나요? |

**저장 필드:** `chapter1.commuteActivity`

---

## Chapter 2: 도구와 시스템

### Scene 1: 도구의 무덤
**질문 1:** 할 일 관리, 지금 뭘 쓰고 계세요? (여러 개 선택 가능)

| 선택지 | 값 |
|--------|-----|
| Notion | `notion` |
| Todoist | `todoist` |
| Trello | `trello` |
| 종이 다이어리 | `paper` |
| Google 캘린더 | `google_calendar` |
| 포스트잇 | `post_it` |
| Excel/스프레드시트 | `excel` |
| 카카오톡 나에게 보내기 | `kakao` |
| 머릿속 (앱 같은 거 안 씀) | `none` |

**저장 필드:** `chapter2.currentTools` (배열)

**질문 2:** 그 앱들, 다 열어보세요? (선택한 각 도구에 대해)

| 선택지 | 값 |
|--------|-----|
| 매일 봅니다 | `daily` |
| 가끔... 생각날 때만 | `sometimes` |
| 깔아만 놨어요 | `installed` |

**저장 필드:** `chapter2.toolUsageFrequency` (객체)

---

### Scene 2: 유료 결제의 진실
**조건:** Scene 1에서 Notion, Todoist, Trello 중 하나라도 선택한 경우

**질문 1:** 돈 내고 쓰는 거 있어요? (선택한 앱별로)

| 선택지 |
|--------|
| 무료 (0원) |
| 5,000원/월 |
| 10,000원/월 |
| 15,000원+/월 |

**저장 필드:** `chapter2.paidTools` (객체)

**질문 2:** 왜 돈 내기로 하셨어요? (유료 결제한 경우)

| 선택지 (다중 선택) |
|--------|
| 기능 제한 때문에 |
| 광고 없애려고 |
| 진짜 도움돼서 |
| 그냥... 써보려고 |

**저장 필드:** `chapter2.paymentReasons` (배열)

---

### Scene 3: 과거의 무덤
**질문 1:** 예전에 깔았다가 지운 할 일 앱 있어요? (여러 개 선택 가능)

| 선택지 | 값 |
|--------|-----|
| Notion | `notion` |
| Todoist | `todoist` |
| Trello | `trello` |
| Evernote | `evernote` |
| Asana | `asana` |
| Monday.com | `monday` |
| ClickUp | `clickup` |
| Airtable | `airtable` |
| 버린 앱 없음 | `none` |

**저장 필드:** `chapter2.abandonedApps` (배열)

**질문 2:** 왜 버리셨어요? (앱별로, 여러 개 선택 가능)

| 선택지 |
|--------|
| 너무 복잡해요 |
| 필요 없는 기능이 너무 많아요 |
| 느려요 |
| 유료화 압박이 심해요 |
| 일단 깔았는데 안 쓰게 됐어요 |
| 다른 앱이 더 좋아보여서 |

**저장 필드:** `chapter2.abandonReasons` (객체)

---

### Scene 4: 뽀모도로 타이머
**질문 1:** 뽀모도로 타이머, 써보셨어요? (25분 일하고 5분 쉬는 그거요)

| 선택지 | 값 | 후속 질문 |
|--------|-----|----------|
| 지금도 쓰고 있어요 | `use_now` | 빈도 질문 |
| 써봤는데 그만뒀어요 | `tried_quit` | 포기 시간 + 이유 |
| 들어는 봤는데 안 써봤어요 | `heard_not_tried` | 없음 |
| 뽀모도로가 뭔가요? | `never_heard` | 없음 |

**저장 필드:** `chapter2.pomodoroExperience`

**후속 질문 (use_now 선택 시):** 하루에 몇 번 정도 쓰세요?
- 슬라이더: 1 ~ 20번

**저장 필드:** `chapter2.pomodoroFrequency`

**후속 질문 (tried_quit 선택 시):**
1. 얼마나 버티셨어요? (슬라이더: 1 ~ 30분)
2. 왜 그만두셨어요? (다중 선택)
   - 25분도 못 버티겠어요
   - 타이머 소리가 스트레스예요
   - 타이머 설정하는 게 귀찮아요
   - 휴식 시간에도 일 생각나요
   - 몰입하면 타이머 무시하게 돼요
   - 5분 쉬는 게 오히려 흐름 끊어요

**저장 필드:** `chapter2.pomodoroQuitTime`, `chapter2.pomodoroQuitReasons`

---

## Chapter 3: 일과 중 행동

### Scene 1: 오후 2시의 위기
**질문 1:** 오늘 할 일, 얼마나 했어요?

| 입력 | 범위 | 기본값 |
|------|------|--------|
| 완료한 일 | 0 ~ 50개 | 3개 |
| 총 할 일 | 0 ~ 50개 | 10개 |

**저장 필드:** `chapter3.completedTasks`, `chapter3.totalTasks`

**질문 2:** 지금 에너지 레벨은?
- 슬라이더: 0% (죽음) ~ 100% (완전 깨어남)

**저장 필드:** `chapter3.energyLevel`

**질문 3:** 불안/초조함 정도는?
- 슬라이더: 0% (여유로움) ~ 100% (패닉)

**저장 필드:** `chapter3.anxietyLevel`

---

### Scene 2: 방해의 파도
**질문 1:** 업무 중 핸드폰, 오전부터 지금까지 몇 번 보셨어요?
- 슬라이더: 0 ~ 50번

**저장 필드:** `chapter3.phoneCheckCount`

**질문 2:** 알림 오면 어떻게 하세요?

| 선택지 | 값 | 설명 |
|--------|-----|------|
| 다 무시합니다 | `ignore_all` | 집중 모드 ON |
| 카톡만 확인해요 | `check_kakao` | 급한 거 있을까봐... |
| 일단 다 봅니다 | `check_all` | SNS도 슥슥... |
| 아예 핸드폰 멀리 둡니다 | `escape` | 보지도 않을 거예요! |

**저장 필드:** `chapter3.interruptionResponse`

---

### Scene 3: 어제의 당신
**질문 1:** 어제 계획한 일들... 얼마나 했나요?

| 입력 | 범위 | 기본값 |
|------|------|--------|
| 완료한 일 | 0 ~ 50개 | 5개 |
| 계획한 일 | 0 ~ 50개 | 10개 |

**저장 필드:** `chapter3.yesterdayCompleted`, `chapter3.yesterdayPlanned`

**질문 2:** 왜 못 했을까요? (100% 미만인 경우, 다중 선택)

| 선택지 |
|--------|
| 계획을 너무 많이 세웠어요 |
| 예상보다 시간이 더 걸렸어요 |
| 중간에 급한 일이 생겼어요 |
| 집중이 안 됐어요 |
| 미루다가 못했어요 |
| 그냥... 하기 싫었어요 |

**저장 필드:** `chapter3.failureReasons` (배열)

---

### Scene 4: 도피의 유혹
**질문:** 일하기 싫을 때, 뭐 해요? (여러 개 선택 가능)

| 선택지 | 값 |
|--------|-----|
| SNS 무한 스크롤 | `sns` |
| 유튜브 쇼츠 | `youtube` |
| 뉴스/커뮤니티 | `news` |
| 온라인 쇼핑 | `shopping` |
| 모바일 게임 | `game` |
| 카톡/메신저 | `chat` |
| 간식 먹으러 가기 | `snack` |
| 커피 타러 가기 | `coffee` |
| 화장실 | `bathroom` |
| 책상/파일 정리 | `organize` |
| 도피 안 합니다 | `none` |

**저장 필드:** `chapter3.escapeActivities` (배열)

---

## Chapter 4: 마무리

### Scene 1: 오늘의 성적표
**질문 1:** "오늘도 계획대로 안 됐네..." 이런 좌절감, 얼마나 자주 느끼세요?

| 선택지 | 값 | 설명 |
|--------|-----|------|
| 매일 | `daily` | 하루도 빠짐없이... |
| 일주일에 3-4번 | `weekly_3_4` | 거의 매일이나 다름없죠 |
| 일주일에 1-2번 | `weekly_1_2` | 가끔 그래요 |
| 거의 없어요 | `rarely` | 운이 좋은 편이네요 |

**저장 필드:** `chapter4.frustrationFrequency`

**질문 2:** 그럴 때 어떻게 하세요?

| 선택지 | 값 | 설명 |
|--------|-----|------|
| 내 탓을 합니다 | `self_blame` | "나는 왜 이럴까..." |
| 야근으로 때웁니다 | `overtime` | 오늘 못한 건 밤에... |
| 포기하고 넘깁니다 | `give_up` | 내일 하면 되지 뭐 |
| 내일은 다를 거라 믿습니다 | `hope_tomorrow` | 내일의 나는 달라! |

**저장 필드:** `chapter4.copingStrategy`

---

### Scene 2: 돈과 시간의 투자
**질문:** 집중력/할 일 관리를 위해 한 달 평균 지출 (대략적으로만!)

| 카테고리 | 값 |
|----------|-----|
| ADHD 약물 | `medication` |
| 상담/코칭 | `therapy` |
| 할 일 관리 앱 | `apps` |
| 자기계발서 | `books` |
| 카페 작업 (집중용) | `cafe` |
| 노이즈캔슬링 이어폰 | `headphones` |

- 입력: 각 항목 0원 이상 (10,000원 단위)

**저장 필드:** `chapter4.adhdSpending` (객체, total 포함)

---

### Scene 3: 만약의 제안
**질문 1:** AI가 당신의 할 일을 파악하고 우선순위를 자동으로 정해준다면? 이런 서비스가 있다면 어떤 가치가 있을까요?
- 입력: 텍스트 (선택사항)

**저장 필드:** `chapter4.valueDescription`

**질문 2:** 한 달에 얼마까지 낼 수 있으세요?
- 슬라이더: 0 ~ 50,000원 (5,000원 단위)

**저장 필드:** `chapter4.willingToPay`

**질문 3:** 만약 이 서비스가 월 15,000원이라면?

| 선택지 | 값 |
|--------|-----|
| 괜찮은 가격이네요 | `ok` |
| 좀 비싼데요? | `expensive` |
| 너무 싼데 괜찮나? | `too_cheap` |
| 다른 가격 제안하기 | `custom` |

**저장 필드:** `chapter4.priceOpinion`

**후속 (custom 선택 시):** 적정 가격이 얼마라고 생각하세요?
- 입력: 숫자 (1,000원 단위)

**저장 필드:** `chapter4.customPrice`

---

### Scene 4: 베타 테스터 모집
**질문:** 베타 테스트에 참여하시겠어요?

| 선택지 | 동작 |
|--------|------|
| 네, 참여할게요! | 이메일 입력 필드 표시 |
| 나중에 알려주세요 | 이메일 없이 완료 |
| 관심 없어요 | 이유 입력 필드 표시 (선택사항) |

**저장 필드:**
- `betaSignup.interested` (boolean)
- `betaSignup.email` (string, 선택)
- `betaSignup.notInterestReason` (string, 선택)
- `betaSignup.notifyLater` (boolean)

---

## 데이터 구조 요약

```typescript
interface SurveyData {
  chapter1: {
    morningRoutine: 'snooze_3times' | 'wake_immediately' | 'snooze_alarm' | 'check_sns';
    todoCount: number;
    priorityDecision: 'report' | 'planning' | 'email' | 'random' | 'youtube';
    priorityDecisionTime: number;
    commuteActivity: string;
  };
  chapter2: {
    currentTools: string[];
    toolUsageFrequency: Record<string, 'daily' | 'sometimes' | 'installed'>;
    paidTools?: Record<string, number>;
    paymentReasons?: string[];
    abandonedApps: string[];
    abandonReasons?: Record<string, string[]>;
    pomodoroExperience: 'use_now' | 'tried_quit' | 'heard_not_tried' | 'never_heard';
    pomodoroFrequency?: number;
    pomodoroQuitTime?: number;
    pomodoroQuitReasons?: string[];
  };
  chapter3: {
    completedTasks: number;
    totalTasks: number;
    energyLevel: number;
    anxietyLevel: number;
    phoneCheckCount: number;
    interruptionResponse: 'ignore_all' | 'check_kakao' | 'check_all' | 'escape';
    yesterdayCompleted: number;
    yesterdayPlanned: number;
    failureReasons?: string[];
    escapeActivities: string[];
  };
  chapter4: {
    frustrationFrequency: 'daily' | 'weekly_3_4' | 'weekly_1_2' | 'rarely';
    copingStrategy: 'self_blame' | 'overtime' | 'give_up' | 'hope_tomorrow';
    adhdSpending: {
      medication: number;
      therapy: number;
      apps: number;
      books: number;
      cafe: number;
      headphones: number;
      total: number;
    };
    valueDescription?: string;
    willingToPay: number;
    priceOpinion: 'ok' | 'expensive' | 'too_cheap' | 'custom';
    customPrice?: number;
  };
  betaSignup: {
    interested: boolean;
    email?: string;
    notInterestReason?: string;
    notifyLater: boolean;
  };
}
```
