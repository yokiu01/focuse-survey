# Google Sheets 백엔드 설정 가이드

## 📋 단계별 설정 (5분 소요)

### 1️⃣ Google Sheets 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. **새 스프레드시트 만들기**
3. 이름: `ADHD 설문 응답 데이터`

### 2️⃣ 시트 구조 설정

**Sheet1 이름 변경**: `응답데이터`

**첫 번째 행 (헤더)에 다음 입력:**

```
제출시간 | 세션ID | 기기타입 | 진행률 | 아침루틴 | 할일개수 | 우선순위결정 | 우선순위시간(초) | 출근활동 | 현재도구 | 도구사용빈도 | 유료도구 | 유료전환이유 | 무료고수이유 | 버린앱 | 버린앱이유 | 포모도로경험 | 포모도로그만둔시간 | 포모도로그만둔이유 | 포모도로빈도 | 완료작업수 | 총작업수 | 에너지레벨 | 불안레벨 | 폰확인횟수 | 방해응답 | 어제완료 | 어제계획 | 실패이유 | 도피활동 | 좌절빈도 | 대처전략 | ADHD지출_약 | ADHD지출_상담 | ADHD지출_앱 | ADHD지출_책 | ADHD지출_카페 | ADHD지출_헤드폰 | 가치설명 | 지불의향 | 가격의견 | 맞춤가격 | 베타관심 | 베타이메일 | 베타미관심이유 | 신뢰도점수 | 데이터완성도 | 씬체류시간 | 뒤로가기횟수 | 이탈지점 | 사용자타입 | 완료시간(분)
```

### 3️⃣ Apps Script 설정

1. **도구 > Apps Script** 클릭
2. 기존 코드 삭제하고 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('응답데이터');
    const data = JSON.parse(e.postData.contents);

    // 배열을 문자열로 변환하는 헬퍼 함수
    const arrayToString = (arr) => Array.isArray(arr) ? arr.join(', ') : '';

    // 객체를 JSON 문자열로 변환하는 헬퍼 함수
    const objectToString = (obj) => obj ? JSON.stringify(obj) : '';

    // 데이터 행 구성
    const row = [
      new Date(data.lastUpdated || Date.now()), // 제출시간
      data.sessionId || '',
      data.deviceType || '',
      data.progress || 0,

      // Chapter 1: 아침의 혼돈
      data.chapter1?.morningRoutine || '',
      data.chapter1?.todoCount || '',
      data.chapter1?.priorityDecision || '',
      data.chapter1?.priorityDecisionTime || '',
      data.chapter1?.commuteActivity || '',

      // Chapter 2: 오전 업무 (도구 탐색)
      arrayToString(data.chapter2?.currentTools),
      objectToString(data.chapter2?.paidTools),
      arrayToString(data.chapter2?.paymentReasons),
      arrayToString(data.chapter2?.freeReasons),
      arrayToString(data.chapter2?.abandonedApps),
      data.chapter2?.pomodoroExperience || '',
      data.chapter2?.pomodoroQuitTime || '',
      arrayToString(data.chapter2?.pomodoroQuitReasons),

      // Chapter 3: 오후 집중력 전투
      data.chapter3?.completedTasks || '',
      data.chapter3?.totalTasks || '',
      data.chapter3?.energyLevel || '',
      data.chapter3?.anxietyLevel || '',
      data.chapter3?.phoneCheckCount || '',
      data.chapter3?.interruptionResponse || '',
      data.chapter3?.yesterdayCompleted || '',
      data.chapter3?.yesterdayPlanned || '',
      arrayToString(data.chapter3?.failureReasons),
      arrayToString(data.chapter3?.escapeActivities),

      // Chapter 4: 퇴근 후 반성 (지불 의향)
      data.chapter4?.frustrationFrequency || '',
      data.chapter4?.copingStrategy || '',
      data.chapter4?.adhdSpending?.medication || '',
      data.chapter4?.adhdSpending?.therapy || '',
      data.chapter4?.adhdSpending?.apps || '',
      data.chapter4?.adhdSpending?.books || '',
      data.chapter4?.adhdSpending?.cafe || '',
      data.chapter4?.adhdSpending?.headphones || '',
      data.chapter4?.valueDescription || '',
      data.chapter4?.willingToPay || '',
      data.chapter4?.priceOpinion || '',
      data.chapter4?.customPrice || '',

      // 베타 신청
      data.betaSignup?.interested || '',
      data.betaSignup?.email || '',
      data.betaSignup?.notInterestReason || '',

      // 메타데이터
      data.trustScore || '',
      data.dataCompleteness || '',

      // 행동 데이터
      objectToString(data.behavioral?.sceneTimings),
      data.behavioral?.backButtonClicks || 0,
      data.behavioral?.dropOffPoint || '',

      // 결과
      data.result?.userType || '',
      data.result?.completionTime || ''
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 테스트용
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'ADHD Survey API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. **저장** (💾 아이콘 또는 Ctrl+S)
4. 프로젝트 이름: `ADHD Survey API`

### 4️⃣ 배포

1. **배포 > 새 배포** 클릭
2. **유형 선택** ⚙️ 클릭 → **웹 앱** 선택
3. 설정:
   - 설명: `ADHD Survey Data Collection`
   - 실행 계정: **나**
   - 액세스 권한: **모든 사용자** (익명 접근 허용)
4. **배포** 클릭
5. **액세스 승인** → 본인 Google 계정 선택
6. **고급** → **[프로젝트명](안전하지 않음)으로 이동** 클릭
7. **허용** 클릭

### 5️⃣ 웹 앱 URL 복사

배포 완료 후 나오는 **웹 앱 URL** 복사
- 형식: `https://script.google.com/macros/s/AKfycbxxx.../exec`
- 이 URL을 프론트엔드에 입력해야 합니다!

---

## ⚙️ 프론트엔드 설정

### 로컬 개발 환경

프로젝트 루트에 `.env` 파일 생성:

```bash
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbxxx.../exec
```

위에서 복사한 웹 앱 URL을 붙여넣으세요!

### Vercel 배포 환경 설정

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 배포한 프로젝트 선택

2. **환경 변수 추가**
   - **Settings** → **Environment Variables** 클릭
   - 새 환경 변수 추가:
     - **Name**: `VITE_GOOGLE_SHEETS_URL`
     - **Value**: `https://script.google.com/macros/s/AKfycbxxx.../exec` (위에서 복사한 URL)
     - **Environment**: Production, Preview, Development 모두 선택
   - **Save** 클릭

3. **재배포**
   - **Deployments** 탭으로 이동
   - 가장 최근 배포 옆 **⋮** 클릭 → **Redeploy** 선택
   - 또는 GitHub에 커밋하면 자동으로 재배포됩니다

```bash
git add .
git commit -m "Add Google Sheets integration"
git push
```

---

## 🧪 테스트

### Apps Script에서 직접 테스트

```javascript
function testPost() {
  const testData = {
    sessionId: 'test_' + Date.now(),
    lastUpdated: Date.now(),
    deviceType: 'desktop',
    progress: 100,

    chapter1: {
      morningRoutine: 'snooze_3times',
      todoCount: 15,
      priorityDecision: 'random',
      priorityDecisionTime: 120,
      commuteActivity: 'sns'
    },

    chapter2: {
      currentTools: ['Notion', 'Todoist'],
      paidTools: { 'Notion': 5000, 'Todoist': 3000 },
      pomodoroExperience: 'tried_quit'
    },

    chapter3: {
      completedTasks: 3,
      totalTasks: 10,
      energyLevel: 50,
      anxietyLevel: 70
    },

    chapter4: {
      frustrationFrequency: 'daily',
      copingStrategy: 'self_blame',
      adhdSpending: {
        medication: 50000,
        therapy: 100000
      },
      willingToPay: 10000
    },

    betaSignup: {
      interested: true,
      email: 'test@example.com'
    },

    behavioral: {
      sceneTimings: { 'ch1-s1': 10, 'ch1-s2': 5 },
      backButtonClicks: 2
    },

    result: {
      userType: 'focus_survivor',
      completionTime: 15.5
    },

    trustScore: 85,
    dataCompleteness: 90
  };

  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });

  Logger.log(result.getContent());
}
```

1. 위 코드를 Apps Script에 추가
2. **testPost** 함수 선택
3. **실행** 클릭
4. **보기 > 로그** 에서 결과 확인
5. Google Sheets로 돌아가서 데이터 행이 추가되었는지 확인!

---

## ✅ 설정 완료 체크리스트

- [ ] Google Sheets 생성 및 헤더 입력
- [ ] Apps Script 코드 붙여넣기 및 저장
- [ ] 웹 앱 배포 및 URL 복사
- [ ] `.env` 파일에 URL 입력
- [ ] testPost() 함수로 테스트
- [ ] 실제 설문 제출 테스트

---

## 🔧 문제 해결

### "승인이 필요합니다" 오류
→ **고급** → **안전하지 않음으로 이동** → **허용**

### "액세스 권한 없음" 오류
→ 배포 시 **액세스 권한**을 **모든 사용자**로 설정했는지 확인

### 데이터가 안 들어감
→ Apps Script에서 `testPost()` 함수 실행하여 오류 확인

---

## 📊 데이터 분석

### 간단한 통계
- **완료율**: `=AVERAGE(E:E)`
- **평균 불안도**: `=AVERAGE(F:F)`
- **지불 의향 평균**: `=AVERAGE(AC:AC)`

### 필터 및 정렬
- 상단 메뉴: **데이터 > 필터 만들기**
- 신뢰도 점수 낮은 응답 제외 가능

---

**설정 완료되면 알려주세요!** 🚀
