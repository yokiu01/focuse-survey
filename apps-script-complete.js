// Google Apps Script - ADHD Survey Data Collection
// 이 코드를 전체 복사해서 Apps Script에 붙여넣으세요

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('응답데이터');
    const data = JSON.parse(e.postData.contents);

    // 디버깅: 받은 데이터 로그
    Logger.log('받은 데이터: ' + JSON.stringify(data));

    // 배열을 문자열로 변환하는 헬퍼 함수
    const arrayToString = (arr) => Array.isArray(arr) ? arr.join(', ') : '';

    // 객체를 JSON 문자열로 변환하는 헬퍼 함수
    const objectToString = (obj) => obj ? JSON.stringify(obj) : '';

    // 데이터 행 구성 - 헤더 순서와 정확히 일치해야 함
    const row = [
      // 1. 제출시간
      new Date(data.lastUpdated || Date.now()),

      // 2. 세션ID
      data.sessionId || '',

      // 3. 기기타입
      data.deviceType || '',

      // 4. 진행률
      data.progress || 0,

      // === Chapter 1: 아침의 혼돈 (5개 필드) ===
      // 5. 아침루틴
      data.chapter1?.morningRoutine || '',

      // 6. 할일개수
      data.chapter1?.todoCount || '',

      // 7. 우선순위결정
      data.chapter1?.priorityDecision || '',

      // 8. 우선순위시간(초)
      data.chapter1?.priorityDecisionTime || '',

      // 9. 출근활동
      data.chapter1?.commuteActivity || '',

      // === Chapter 2: 오전 업무 (11개 필드) ===
      // 10. 현재도구
      arrayToString(data.chapter2?.currentTools),

      // 11. 도구사용빈도
      objectToString(data.chapter2?.toolUsageFrequency),

      // 12. 유료도구
      objectToString(data.chapter2?.paidTools),

      // 13. 유료전환이유
      arrayToString(data.chapter2?.paymentReasons),

      // 14. 무료고수이유
      arrayToString(data.chapter2?.freeReasons),

      // 15. 버린앱
      arrayToString(data.chapter2?.abandonedApps),

      // 16. 버린앱이유
      objectToString(data.chapter2?.abandonReasons),

      // 17. 포모도로경험
      data.chapter2?.pomodoroExperience || '',

      // 18. 포모도로그만둔시간
      data.chapter2?.pomodoroQuitTime || '',

      // 19. 포모도로그만둔이유
      arrayToString(data.chapter2?.pomodoroQuitReasons),

      // 20. 포모도로빈도
      data.chapter2?.pomodoroFrequency || '',

      // === Chapter 3: 오후 집중력 전투 (10개 필드) ===
      // 21. 완료작업수
      data.chapter3?.completedTasks || '',

      // 22. 총작업수
      data.chapter3?.totalTasks || '',

      // 23. 에너지레벨
      data.chapter3?.energyLevel || '',

      // 24. 불안레벨
      data.chapter3?.anxietyLevel || '',

      // 25. 폰확인횟수
      data.chapter3?.phoneCheckCount || '',

      // 26. 방해응답
      data.chapter3?.interruptionResponse || '',

      // 27. 어제완료
      data.chapter3?.yesterdayCompleted || '',

      // 28. 어제계획
      data.chapter3?.yesterdayPlanned || '',

      // 29. 실패이유
      arrayToString(data.chapter3?.failureReasons),

      // 30. 도피활동
      arrayToString(data.chapter3?.escapeActivities),

      // === Chapter 4: 퇴근 후 반성 (12개 필드) ===
      // 31. 좌절빈도
      data.chapter4?.frustrationFrequency || '',

      // 32. 대처전략
      data.chapter4?.copingStrategy || '',

      // 33. ADHD지출_약
      data.chapter4?.adhdSpending?.medication || '',

      // 34. ADHD지출_상담
      data.chapter4?.adhdSpending?.therapy || '',

      // 35. ADHD지출_앱
      data.chapter4?.adhdSpending?.apps || '',

      // 36. ADHD지출_책
      data.chapter4?.adhdSpending?.books || '',

      // 37. ADHD지출_카페
      data.chapter4?.adhdSpending?.cafe || '',

      // 38. ADHD지출_헤드폰
      data.chapter4?.adhdSpending?.headphones || '',

      // 39. 가치설명
      data.chapter4?.valueDescription || '',

      // 40. 지불의향
      data.chapter4?.willingToPay || '',

      // 41. 가격의견
      data.chapter4?.priceOpinion || '',

      // 42. 맞춤가격
      data.chapter4?.customPrice || '',

      // === 베타 신청 (3개 필드) ===
      // 43. 베타관심
      data.betaSignup?.interested || '',

      // 44. 베타이메일
      data.betaSignup?.email || '',

      // 45. 베타미관심이유
      data.betaSignup?.notInterestReason || '',

      // === 메타데이터 (2개 필드) ===
      // 46. 신뢰도점수
      data.trustScore || '',

      // 47. 데이터완성도
      data.dataCompleteness || '',

      // === 행동 데이터 (3개 필드) ===
      // 48. 씬체류시간
      objectToString(data.behavioral?.sceneTimings),

      // 49. 뒤로가기횟수
      data.behavioral?.backButtonClicks || 0,

      // 50. 이탈지점
      data.behavioral?.dropOffPoint || '',

      // === 결과 (2개 필드) ===
      // 51. 사용자타입
      data.result?.userType || '',

      // 52. 완료시간(분)
      data.result?.completionTime || ''
    ];

    // 총 52개 필드 확인
    Logger.log('Row 배열 길이: ' + row.length);

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '데이터가 저장되었습니다',
      rowLength: row.length
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

// 테스트 함수
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
      toolUsageFrequency: { 'Notion': 'daily', 'Todoist': 'sometimes' },
      paidTools: { 'Notion': 5000, 'Todoist': 3000 },
      paymentReasons: ['더 많은 기능'],
      freeReasons: undefined,
      abandonedApps: ['Asana'],
      abandonReasons: { 'Asana': ['너무 복잡함'] },
      pomodoroExperience: 'tried_quit',
      pomodoroQuitTime: 15,
      pomodoroQuitReasons: ['너무 짧음'],
      pomodoroFrequency: 3
    },

    chapter3: {
      completedTasks: 3,
      totalTasks: 10,
      energyLevel: 50,
      anxietyLevel: 70,
      phoneCheckCount: 20,
      interruptionResponse: 'check_kakao',
      yesterdayCompleted: 5,
      yesterdayPlanned: 10,
      failureReasons: ['산만함'],
      escapeActivities: ['유튜브']
    },

    chapter4: {
      frustrationFrequency: 'daily',
      copingStrategy: 'self_blame',
      adhdSpending: {
        medication: 50000,
        therapy: 100000,
        apps: 10000,
        books: 20000,
        cafe: 30000,
        headphones: 150000
      },
      valueDescription: '테스트 가치',
      willingToPay: 10000,
      priceOpinion: 'ok',
      customPrice: undefined
    },

    betaSignup: {
      interested: true,
      email: 'test@example.com',
      notInterestReason: undefined
    },

    behavioral: {
      sceneTimings: { 'ch1-s1': 10, 'ch1-s2': 5, 'ch2-s1': 8 },
      backButtonClicks: 2,
      dropOffPoint: undefined
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

  Logger.log('테스트 결과: ' + result.getContent());
}
