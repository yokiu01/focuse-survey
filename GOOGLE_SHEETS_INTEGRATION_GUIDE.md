# 📊 Google Sheets 연동 가이드

## 목차
1. [개요](#개요)
2. [수집되는 데이터 구조](#수집되는-데이터-구조)
3. [Google Sheets 설정](#google-sheets-설정)
4. [Apps Script 설정](#apps-script-설정)
5. [데이터 분석 및 활용](#데이터-분석-및-활용)
6. [트러블슈팅](#트러블슈팅)

---

## 개요

이 가이드는 ADHD Survival Simulator의 설문 데이터를 Google Sheets로 자동 수집하고 분석하는 방법을 설명합니다.

### 시스템 구조

```
설문 앱 (React)
    ↓
submitSurveyData() (utils/api.ts)
    ↓
Google Apps Script (웹 앱)
    ↓
Google Sheets (데이터 저장)
```

---

## 수집되는 데이터 구조

### 1. 세션 정보
| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| sessionId | string | 고유 세션 ID | "sess_abc123..." |
| startTime | number | 시작 시간 (timestamp) | 1703001234567 |
| deviceType | string | 기기 유형 | "mobile" / "desktop" |
| lastUpdated | number | 마지막 업데이트 시간 | 1703001234567 |
| progress | number | 진행률 (0-100) | 75 |

### 2. Act 1: 아침의 혼돈
| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| morningAnxiety | number | 아침 불안도 (0-100) | 65 |
| planningTool | string | 사용 도구 | "todoist" / "notion" / "paper" / "none" |
| customToolName | string? | 기타 도구 이름 | "Google Keep" |
| toolUsageDuration | string? | 도구 사용 기간 | "3-6개월" |
| toolMonthlyFee | number? | 월 구독료 | 5000 |
| toolPainPoints | string[]? | 불편한 점 | ["#복잡해", "#느려"] |
| noAppReason | string? | 앱 미사용 이유 | "너무 복잡해서" |
| prioritizationTime | number? | 우선순위 결정 시간 (초) | 45.3 |

### 3. Act 2: 집중력 전쟁
| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| usedFocusTools | boolean | 집중 도구 사용 여부 | true |
| focusToolsList | string[]? | 사용한 도구 목록 | ["Forest", "Focus To-Do"] |
| quitReason | string? | 이탈 이유 | "알림 때문에" |
| mainDistractions | string[]? | 주요 방해 요소 | ["메신저", "이메일"] |

### 4. Act 3: 오후의 타협
| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| actualCompleted | number | 실제 완료 개수 | 3 |
| plannedTasks | number | 계획한 작업 개수 | 8 |
| completionRate | number | 완료율 (자동 계산) | 37.5 |
| aiSuggestionScore | number | AI 제안 수용도 (0-100) | 72 |
| aiLikeReason | string? | AI 선호 이유 | "우선순위를 명확히 해줘서" |
| aiDislikeReason | string? | AI 거부 이유 | "내가 정하고 싶어서" |

### 5. Act 4: 저녁 회고
| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| valueGained | string[] | 완료 시 얻는 가치 | ["성취감", "인정"] |
| currentSpending.medication | number? | 약물 비용 | 30000 |
| currentSpending.therapy | number? | 치료 비용 | 80000 |
| currentSpending.apps | number? | 앱 비용 | 15000 |
| mostEffective | string | 가장 효과적인 방법 | "약물 치료" |
| willingnessToPay | number | 지불 의향 금액 (원/월) | 10000 |

### 6. 행동 데이터
| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| sceneTimings | object | 각 씬 체류 시간 (초) | {"act1-1": 45, "act1-2": 78} |
| backButtonClicks | number | 뒤로가기 횟수 | 2 |
| dropOffPoint | string? | 중도 이탈 지점 | "act2-1" |

### 7. 베타 신청
| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| email | string? | 이메일 주소 | "user@example.com" |
| timestamp | number? | 신청 시간 | 1703001234567 |

---

## Google Sheets 설정

### 1단계: 새 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. **빈 스프레드시트** 생성
3. 시트 이름을 **"ADHD Survey Data"**로 변경

### 2단계: 헤더 행 설정

첫 번째 행에 다음 컬럼 헤더를 입력하세요:

```
A1: 제출시간
B1: 세션ID
C1: 기기타입
D1: 진행률
E1: 아침불안도
F1: 계획도구
G1: 기타도구명
H1: 도구사용기간
I1: 월구독료
J1: 도구불편점
K1: 앱미사용이유
L1: 우선순위결정시간
M1: 집중도구사용
N1: 집중도구목록
O1: 이탈이유
P1: 주요방해요소
Q1: 실제완료개수
R1: 계획작업개수
S1: 완료율
T1: AI제안수용도
U1: AI선호이유
V1: AI거부이유
W1: 얻는가치
X1: 약물비용
Y1: 치료비용
Z1: 앱비용
AA1: 가장효과적인방법
AB1: 지불의향금액
AC1: 씬체류시간
AD1: 뒤로가기횟수
AE1: 이탈지점
AF1: 베타이메일
AG1: 베타신청시간
```

### 3단계: 데이터 유효성 검사 (선택사항)

특정 컬럼에 드롭다운 메뉴를 추가하여 데이터 품질을 향상시킬 수 있습니다:

#### 기기타입 (C열)
- 데이터 → 데이터 유효성 검사
- 조건: **목록 (항목 하나)**
- 값: `mobile,desktop`

#### 계획도구 (F열)
- 값: `todoist,notion,paper,none,other`

---

## Apps Script 설정

### 1단계: Apps Script 열기

1. Google Sheets에서 **확장 프로그램** → **Apps Script** 클릭
2. 기본 코드 삭제

### 2단계: 코드 작성

아래 코드를 복사하여 붙여넣으세요:

```javascript
/**
 * ADHD Survival Simulator - Google Sheets Integration
 * 설문 데이터를 자동으로 수집하고 저장합니다.
 */

// 시트 이름 설정
const SHEET_NAME = 'ADHD Survey Data';

/**
 * POST 요청 처리
 * @param {Object} e - 요청 이벤트 객체
 * @returns {Object} JSON 응답
 */
function doPost(e) {
  try {
    // 요청 본문 파싱
    const data = JSON.parse(e.postData.contents);

    // 데이터 검증
    if (!data.sessionId) {
      return createResponse(false, '세션 ID가 없습니다.');
    }

    // 스프레드시트에 데이터 저장
    appendToSheet(data);

    // 성공 응답
    return createResponse(true, '데이터가 성공적으로 저장되었습니다.');

  } catch (error) {
    Logger.log('Error in doPost: ' + error);
    return createResponse(false, '데이터 저장 중 오류가 발생했습니다: ' + error.message);
  }
}

/**
 * 스프레드시트에 데이터 추가
 * @param {Object} data - 설문 데이터
 */
function appendToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('시트를 찾을 수 없습니다: ' + SHEET_NAME);
  }

  // 현재 시간
  const now = new Date();

  // 배열로 변환 (헤더 순서와 동일해야 함)
  const row = [
    now, // 제출시간
    data.sessionId,
    data.deviceType,
    data.progress,

    // Act 1
    data.act1?.morningAnxiety,
    data.act1?.planningTool,
    data.act1?.customToolName,
    data.act1?.toolUsageDuration,
    data.act1?.toolMonthlyFee,
    JSON.stringify(data.act1?.toolPainPoints),
    data.act1?.noAppReason,
    data.act1?.prioritizationTime,

    // Act 2
    data.act2?.usedFocusTools,
    JSON.stringify(data.act2?.focusToolsList),
    data.act2?.quitReason,
    JSON.stringify(data.act2?.mainDistractions),

    // Act 3
    data.act3?.actualCompleted,
    data.act3?.plannedTasks,
    data.act3?.completionRate,
    data.act3?.aiSuggestionScore,
    data.act3?.aiLikeReason,
    data.act3?.aiDislikeReason,

    // Act 4
    JSON.stringify(data.act4?.valueGained),
    data.act4?.currentSpending?.medication,
    data.act4?.currentSpending?.therapy,
    data.act4?.currentSpending?.apps,
    data.act4?.mostEffective,
    data.act4?.willingnessToPay,

    // 행동 데이터
    JSON.stringify(data.behavioral?.sceneTimings),
    data.behavioral?.backButtonClicks,
    data.behavioral?.dropOffPoint,

    // 베타 신청
    data.betaSignup?.email,
    data.betaSignup?.timestamp ? new Date(data.betaSignup.timestamp) : null
  ];

  // 행 추가
  sheet.appendRow(row);
}

/**
 * JSON 응답 생성
 * @param {boolean} success - 성공 여부
 * @param {string} message - 메시지
 * @returns {ContentService.TextOutput}
 */
function createResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET 요청 처리 (테스트용)
 */
function doGet(e) {
  return createResponse(true, 'ADHD Survey API is running. Use POST to submit data.');
}
```

### 3단계: 배포

1. **배포** → **새 배포** 클릭
2. **유형 선택** → **웹 앱** 선택
3. 설정:
   - **실행 계정**: 나
   - **액세스 권한**: **모든 사용자**
4. **배포** 클릭
5. **웹 앱 URL** 복사

### 4단계: 환경변수 설정

프로젝트 루트의 `.env` 파일에 Apps Script URL을 추가하세요:

```bash
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## 데이터 분석 및 활용

### 기본 통계 시트 추가

새 시트를 추가하고 **"통계"**로 이름을 변경한 후, 다음 수식을 사용하세요:

#### 1. 기본 지표

```
A1: 총 응답 수
B1: =COUNTA('ADHD Survey Data'!A:A)-1

A2: 평균 완료율
B2: =AVERAGE('ADHD Survey Data'!D:D)

A3: 평균 아침 불안도
B3: =AVERAGE('ADHD Survey Data'!E:E)

A4: 평균 완료율 (작업)
B4: =AVERAGE('ADHD Survey Data'!S:S)

A5: 평균 지불 의향 금액
B5: =AVERAGE('ADHD Survey Data'!AB:AB)
```

#### 2. 도구 사용 현황

```
A7: 계획 도구별 분포
A8: Todoist
B8: =COUNTIF('ADHD Survey Data'!F:F,"todoist")
A9: Notion
B9: =COUNTIF('ADHD Survey Data'!F:F,"notion")
A10: 종이
B10: =COUNTIF('ADHD Survey Data'!F:F,"paper")
A11: 없음
B11: =COUNTIF('ADHD Survey Data'!F:F,"none")
A12: 기타
B12: =COUNTIF('ADHD Survey Data'!F:F,"other")
```

#### 3. 기기별 분포

```
A14: 기기별 분포
A15: 모바일
B15: =COUNTIF('ADHD Survey Data'!C:C,"mobile")
A16: 데스크톱
B16: =COUNTIF('ADHD Survey Data'!C:C,"desktop")
```

#### 4. 베타 신청률

```
A18: 베타 신청률
B18: =COUNTA('ADHD Survey Data'!AF:AF)/COUNTA('ADHD Survey Data'!A:A)*100&"%"
```

### 피벗 테이블 생성

1. **삽입** → **피벗 테이블** 클릭
2. 다음과 같은 분석을 수행할 수 있습니다:
   - 도구별 평균 불안도
   - 기기별 완료율
   - 지불 의향 금액 분포

### 차트 생성

#### 1. 아침 불안도 분포 (히스토그램)

1. 데이터: E열 (아침불안도)
2. 차트 유형: **히스토그램**
3. 범위 크기: 10

#### 2. 도구별 사용자 수 (파이 차트)

1. 데이터: F열 (계획도구)
2. 차트 유형: **원형 차트**

#### 3. 지불 의향 금액 분포 (막대 그래프)

1. 데이터: AB열 (지불의향금액)
2. 차트 유형: **세로 막대형 차트**
3. 범위: 0-5000, 5000-10000, 10000-15000, 15000+

### 조건부 서식

데이터를 시각적으로 구분하기 위해 조건부 서식을 적용하세요:

#### 1. 진행률 (D열)
- 범위: D2:D
- 서식 규칙:
  - 90 이상: 초록색
  - 50-89: 노란색
  - 50 미만: 빨간색

#### 2. 완료율 (S열)
- 범위: S2:S
- 서식 규칙:
  - 70 이상: 초록색
  - 30-69: 노란색
  - 30 미만: 빨간색

---

## 트러블슈팅

### 문제 1: 데이터가 저장되지 않음

**증상**: 설문 제출 후 Google Sheets에 데이터가 나타나지 않음

**해결 방법**:

1. **Apps Script 로그 확인**
   - Apps Script 편집기 → **실행 로그** 확인
   - 오류 메시지가 있는지 확인

2. **권한 확인**
   - 배포 시 **"모든 사용자"** 권한이 설정되었는지 확인
   - 재배포 후 새로운 URL로 업데이트

3. **환경변수 확인**
   - `.env` 파일의 URL이 올바른지 확인
   - 개발 서버 재시작

4. **CORS 오류**
   - Apps Script는 자동으로 CORS를 처리하므로 문제없어야 함
   - 브라우저 콘솔에서 네트워크 탭 확인

### 문제 2: 배열 데이터가 제대로 표시되지 않음

**증상**: `toolPainPoints`, `focusToolsList` 등이 "[object Object]"로 표시됨

**해결 방법**:

Apps Script 코드에서 `JSON.stringify()`를 사용했는지 확인하세요. 이미 위 코드에 포함되어 있습니다.

### 문제 3: 시간대가 맞지 않음

**증상**: 제출시간이 실제 시간과 다름

**해결 방법**:

Google Sheets 설정에서 시간대를 확인하세요:
1. **파일** → **설정** → **일반**
2. **시간대**: 대한민국 (GMT+09:00) 선택

### 문제 4: "스크립트에 액세스할 권한이 없습니다" 오류

**증상**: 설문 제출 시 권한 오류 발생

**해결 방법**:

1. Apps Script 편집기에서 **권한 검토** 클릭
2. Google 계정으로 로그인
3. **허용** 클릭하여 권한 부여
4. 재배포 (새 배포 → 웹 앱)

### 문제 5: 데이터가 중복 저장됨

**증상**: 같은 세션 데이터가 여러 번 저장됨

**해결 방법**:

이는 사용자가 여러 번 제출한 경우일 수 있습니다. 중복을 방지하려면 Apps Script에 다음 함수를 추가하세요:

```javascript
/**
 * 세션 ID 중복 확인
 * @param {string} sessionId - 세션 ID
 * @returns {boolean} 중복 여부
 */
function isDuplicateSession(sessionId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const sessionIds = sheet.getRange('B:B').getValues();

  for (let i = 1; i < sessionIds.length; i++) {
    if (sessionIds[i][0] === sessionId) {
      return true;
    }
  }

  return false;
}

// appendToSheet 함수 시작 부분에 추가:
function appendToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  // 중복 체크
  if (isDuplicateSession(data.sessionId)) {
    Logger.log('Duplicate session: ' + data.sessionId);
    return; // 중복이면 저장하지 않음
  }

  // ... 나머지 코드
}
```

---

## 추가 기능

### 1. 이메일 알림 설정

새 응답이 제출될 때마다 이메일 알림을 받으려면:

```javascript
function sendEmailNotification(data) {
  const email = 'your-email@example.com';
  const subject = '새로운 설문 응답 도착';
  const body = `
    세션 ID: ${data.sessionId}
    기기: ${data.deviceType}
    진행률: ${data.progress}%
    베타 이메일: ${data.betaSignup?.email || '없음'}
  `;

  MailApp.sendEmail(email, subject, body);
}

// appendToSheet 함수 끝에 추가:
// sendEmailNotification(data);
```

### 2. Slack 알림

Slack 웹훅 URL을 사용하여 알림을 보낼 수 있습니다:

```javascript
function sendSlackNotification(data) {
  const webhookUrl = 'YOUR_SLACK_WEBHOOK_URL';

  const payload = {
    text: `새 설문 응답: ${data.sessionId}`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*새 설문 응답 도착!*\n세션: ${data.sessionId}\n진행률: ${data.progress}%`
        }
      }
    ]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(webhookUrl, options);
}
```

### 3. 자동 백업

매일 자동으로 데이터를 백업하려면:

```javascript
function dailyBackup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  // 새 시트 생성
  const today = Utilities.formatDate(new Date(), 'GMT+9', 'yyyy-MM-dd');
  const backupName = `Backup_${today}`;

  // 기존 백업이 있으면 삭제
  const existingBackup = ss.getSheetByName(backupName);
  if (existingBackup) {
    ss.deleteSheet(existingBackup);
  }

  // 시트 복사
  sheet.copyTo(ss).setName(backupName);
}

// 트리거 설정: Apps Script 편집기 → 트리거 → 함수 dailyBackup, 일별, 오전 1-2시
```

---

## 데이터 내보내기

### CSV 내보내기

Google Sheets에서:
1. **파일** → **다운로드** → **쉼표로 구분된 값(.csv, 현재 시트)**

### JSON 내보내기

Apps Script로 JSON API를 만들 수 있습니다:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const jsonData = rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 보안 및 개인정보

### 중요 사항

1. **이메일 주소 보호**
   - 베타 이메일 (AF열)은 민감한 개인정보입니다
   - 시트 공유 시 이 열을 숨기거나 제외하세요

2. **액세스 권한 관리**
   - 스프레드시트는 필요한 사람에게만 공유
   - 편집 권한은 최소한으로 제한

3. **데이터 보관 기간**
   - GDPR/PIPA 준수: 수집 목적 달성 후 삭제
   - 권장: 6개월~1년

4. **익명화**
   - 세션 ID는 임의의 문자열이므로 개인 식별 불가
   - 이메일 외에는 개인정보 없음

---

## 문의

질문이나 문제가 있으시면:
- 이메일: contact@flowlabs.com
- GitHub Issues: [프로젝트 저장소]

---

**© 2024 Flow Labs. All rights reserved.**
