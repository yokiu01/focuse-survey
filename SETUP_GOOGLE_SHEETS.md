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
세션ID | 시작시간 | 완료시간 | 기기 | 진행률 | 아침불안도 | 계획도구 | 도구이름 | 사용기간 | 월비용 | 불편한점 | 미사용이유 | 의사결정시간 | 집중도구사용 | 집중도구목록 | 그만둔이유 | 방해요소 | 실제완료 | 계획작업 | 완료율 | AI수용도 | AI선호이유 | AI거부이유 | 가치항목 | 가치기타 | 현재지출_약 | 현재지출_상담 | 현재지출_앱 | 지불의향 | 신뢰도점수 | 데이터완성도 | 베타이메일 | 이탈지점
```

### 3️⃣ Apps Script 설정

1. **도구 > Apps Script** 클릭
2. 기존 코드 삭제하고 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('응답데이터');
    const data = JSON.parse(e.postData.contents);

    // 데이터 행 구성
    const row = [
      data.sessionId || '',
      new Date(data.startTime || Date.now()),
      new Date(data.lastUpdated || Date.now()),
      data.deviceType || '',
      data.progress || 0,

      // Act 1
      data.act1?.morningAnxiety || '',
      data.act1?.planningTool || '',
      data.act1?.customToolName || '',
      data.act1?.toolUsageDuration || '',
      data.act1?.toolMonthlyFee || '',
      data.act1?.toolPainPoints?.join(', ') || '',
      data.act1?.noAppReason || '',
      data.act1?.prioritizationTime || '',

      // Act 2
      data.act2?.usedFocusTools || '',
      data.act2?.focusToolsList?.join(', ') || '',
      data.act2?.quitReason || '',
      data.act2?.mainDistractions?.join(', ') || '',

      // Act 3
      data.act3?.actualCompleted || '',
      data.act3?.plannedTasks || '',
      data.act3?.completionRate || '',
      data.act3?.aiSuggestionScore || '',
      data.act3?.aiLikeReason || '',
      data.act3?.aiDislikeReason || '',

      // Act 4
      data.act4?.valueGained?.join(', ') || '',
      data.act4?.valueOther || '',
      data.act4?.currentSpending?.medication || '',
      data.act4?.currentSpending?.therapy || '',
      data.act4?.currentSpending?.apps || '',
      data.act4?.willingnessToPay || '',

      // 메타데이터
      data.trustScore || '',
      data.dataCompleteness || '',
      data.betaSignup?.email || '',
      data.behavioral?.dropOffPoint || ''
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
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

### `.env` 파일 생성

프로젝트 루트에 `.env` 파일 생성:

```bash
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbxxx.../exec
```

위에서 복사한 웹 앱 URL을 붙여넣으세요!

---

## 🧪 테스트

### Apps Script에서 직접 테스트

```javascript
function testPost() {
  const testData = {
    sessionId: 'test_123',
    startTime: Date.now(),
    deviceType: 'desktop',
    progress: 100,
    act1: {
      morningAnxiety: 50,
      planningTool: 'notion'
    }
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
4. Google Sheets로 돌아가서 데이터 확인!

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
