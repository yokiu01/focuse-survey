// Google Apps Script - ExecuteAI Survey v2
// 이 코드를 전체 복사해서 Apps Script에 붙여넣으세요

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('응답데이터');
    const data = JSON.parse(e.postData.contents);

    // 디버깅: 받은 데이터 로그
    Logger.log('받은 데이터: ' + JSON.stringify(data));

    // 데이터 행 구성 - v2 구조 (28개 필드)
    const row = [
      // === 세션 정보 (5개 필드) ===
      // 1. 제출시간
      new Date(data.lastUpdated || Date.now()),

      // 2. 세션ID
      data.sessionId || '',

      // 3. 시작시간
      data.startTime ? new Date(data.startTime) : '',

      // 4. 기기타입
      data.deviceType || '',

      // 5. 진행률
      data.progress || 0,

      // === Intro (1개 필드) ===
      // 6. 아침루틴 (Q1)
      data.intro_morningRoutine || '',

      // === Tools (4개 필드) ===
      // 7. 현재도구 (Q2)
      data.tools_current || '',

      // 8. 도구사용빈도 (Q3)
      data.tools_frequency || '',

      // 9. 버린도구 (Q4)
      data.tools_abandoned || '',

      // 10. 버린이유 (Q5)
      data.tools_abandonReasons || '',

      // === Spending (1개 필드) ===
      // 11. 현재지출 (Q6)
      data.spending_current || '',

      // === Execution (3개 필드) ===
      // 12. 어제실행률 (Q7)
      data.execution_yesterday !== undefined ? data.execution_yesterday : '',

      // 13. 실패빈도 (Q8)
      data.execution_failFrequency || '',

      // 14. 실패이유 (Q9)
      data.execution_failReasons || '',

      // === Pain Point (1개 필드) ===
      // 15. 메인페인포인트 (Q10)
      data.painPoint_main || '',

      // === Solution (1개 필드) ===
      // 16. 솔루션관심도 (Q11)
      data.solution_interest || '',

      // === Pricing - PMF 핵심 (2개 필드) ===
      // 17. 4900원반응 (Q12)
      data.pricing_reaction4900 || '',

      // 18. 지불의향가격 (Q13)
      data.pricing_willingToPay !== undefined ? data.pricing_willingToPay : '',

      // === Beta Signup (2개 필드) ===
      // 19. 베타이메일 (Q14)
      data.betaSignup_email || '',

      // 20. 베타스킵여부
      data.betaSignup_skipped !== undefined ? data.betaSignup_skipped : '',

      // === Feedback (1개 필드) ===
      // 21. 피드백텍스트 (Q15)
      data.feedback_openText || '',

      // === 메타데이터 (2개 필드) ===
      // 22. 신뢰도점수
      data.trustScore || '',

      // 23. 데이터완성도
      data.dataCompleteness || '',

      // === 행동 데이터 (3개 필드) ===
      // 24. 씬체류시간
      data.behavioral_sceneTimings || '',

      // 25. 뒤로가기횟수
      data.behavioral_backButtonClicks || 0,

      // 26. 이탈지점
      data.behavioral_dropOffPoint || '',

      // === 결과 (2개 필드) ===
      // 27. 사용자타입
      data.result_userType || '',

      // 28. 완료시간(분)
      data.result_completionTime || ''
    ];

    // 총 28개 필드 확인
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
    message: 'ExecuteAI Survey v2 API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}

// 헤더 행 자동 생성 함수 - 시트가 비어있을 때 한 번 실행
function createHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('응답데이터');

  const headers = [
    '제출시간',
    '세션ID',
    '시작시간',
    '기기타입',
    '진행률',
    'Q1_아침루틴',
    'Q2_현재도구',
    'Q3_도구사용빈도',
    'Q4_버린도구',
    'Q5_버린이유',
    'Q6_현재지출',
    'Q7_어제실행률',
    'Q8_실패빈도',
    'Q9_실패이유',
    'Q10_페인포인트',
    'Q11_솔루션관심도',
    'Q12_4900원반응',
    'Q13_지불의향가격',
    'Q14_베타이메일',
    '베타스킵여부',
    'Q15_피드백',
    '신뢰도점수',
    '데이터완성도',
    '씬체류시간',
    '뒤로가기횟수',
    '이탈지점',
    '사용자타입',
    '완료시간_분'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');

  Logger.log('헤더 생성 완료: ' + headers.length + '개');
}

// 테스트 함수
function testPost() {
  const testData = {
    sessionId: 'test_' + Date.now(),
    startTime: Date.now() - 600000, // 10분 전
    lastUpdated: Date.now(),
    deviceType: 'desktop',
    progress: 100,

    // v2 플랫 구조
    intro_morningRoutine: 'snooze',

    tools_current: 'Notion, Todoist',
    tools_frequency: '{"Notion":"daily","Todoist":"sometimes"}',
    tools_abandoned: 'Forest, Asana',
    tools_abandonReasons: 'manual_planning, complex',

    spending_current: '~5000',

    execution_yesterday: 40,
    execution_failFrequency: 'often',
    execution_failReasons: 'dont_know_priority, distracted',

    painPoint_main: 'prioritizing',

    solution_interest: 'want_now',

    pricing_reaction4900: 'will_pay',
    pricing_willingToPay: 4900,

    betaSignup_email: 'test@example.com',
    betaSignup_skipped: false,

    feedback_openText: '캘린더 연동이 되면 좋겠어요',

    behavioral_sceneTimings: '{"intro":15,"ch1-q2":20}',
    behavioral_backButtonClicks: 2,
    behavioral_dropOffPoint: '',

    result_userType: 'lost_navigator',
    result_completionTime: 8.5,

    trustScore: 85,
    dataCompleteness: 95
  };

  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });

  Logger.log('테스트 결과: ' + result.getContent());
}
