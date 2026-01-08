import { SurveyData, UserTypeResult } from '../types';

// 사용자 타입 분석 로직 (v2)
export const analyzeUserType = (data: SurveyData): UserTypeResult => {
  console.log('analyzeUserType - starting analysis with data:', data);

  const scores = {
    storm_multitasker: 0,
    perfectionist_procrastinator: 0,
    focus_survivor: 0,
    lost_navigator: 0
  };

  // 데이터 안전성 체크
  if (!data) {
    console.warn('analyzeUserType - missing data, using default');
    return getTypeResult('lost_navigator');
  }

  // Intro 분석 (아침 루틴)
  if (data.intro.morningRoutine === 'snooze' || data.intro.morningRoutine === 'stay_bed') {
    scores.perfectionist_procrastinator += 1;
    scores.lost_navigator += 1;
  } else if (data.intro.morningRoutine === 'sns') {
    scores.storm_multitasker += 2;
  } else if (data.intro.morningRoutine === 'wake_plan') {
    scores.focus_survivor += 2;
  }

  // Tools 분석
  if (data.tools.current) {
    const toolCount = data.tools.current.length;
    if (toolCount > 4) scores.storm_multitasker += 2;
    if (toolCount <= 2) scores.focus_survivor += 2;
    if (data.tools.current.includes('none')) scores.lost_navigator += 1;
  }

  // 버린 앱 분석
  if (data.tools.abandoned) {
    const abandonedCount = data.tools.abandoned.filter(app => app !== 'none').length;
    if (abandonedCount > 2) scores.lost_navigator += 2;
    if (abandonedCount > 1) scores.storm_multitasker += 1;
  }

  // 포기 이유 분석 (핵심 PMF)
  if (data.tools.abandonReasons) {
    if (data.tools.abandonReasons.includes('manual_planning')) {
      // "결국 내가 다 계획해야 해서" - 핵심 인사이트
      scores.lost_navigator += 2;
      scores.perfectionist_procrastinator += 1;
    }
    if (data.tools.abandonReasons.includes('complex')) {
      scores.lost_navigator += 1;
    }
    if (data.tools.abandonReasons.includes('too_many_features')) {
      scores.focus_survivor += 1;
    }
  }

  // Execution 분석
  if (data.execution.yesterday !== undefined) {
    if (data.execution.yesterday < 30) {
      scores.perfectionist_procrastinator += 2;
      scores.lost_navigator += 1;
    } else if (data.execution.yesterday > 70) {
      scores.focus_survivor += 2;
    }
  }

  if (data.execution.failFrequency) {
    if (data.execution.failFrequency === 'daily') {
      scores.perfectionist_procrastinator += 2;
      scores.lost_navigator += 2;
    } else if (data.execution.failFrequency === 'often') {
      scores.perfectionist_procrastinator += 1;
    } else if (data.execution.failFrequency === 'rarely') {
      scores.focus_survivor += 2;
    }
  }

  // 실패 원인 분석
  if (data.execution.failReasons) {
    if (data.execution.failReasons.includes('dont_know_priority')) {
      // "뭐부터 해야 할지 모르겠음" - 핵심 인사이트
      scores.lost_navigator += 2;
    }
    if (data.execution.failReasons.includes('too_many_plans')) {
      scores.storm_multitasker += 1;
    }
    if (data.execution.failReasons.includes('didnt_want_to')) {
      scores.perfectionist_procrastinator += 1;
    }
    if (data.execution.failReasons.includes('distracted')) {
      scores.storm_multitasker += 1;
    }
  }

  // Pain Point 분석
  if (data.painPoint.main) {
    if (data.painPoint.main === 'prioritizing') {
      scores.lost_navigator += 2;
    } else if (data.painPoint.main === 'starting') {
      scores.perfectionist_procrastinator += 2;
    } else if (data.painPoint.main === 'focusing') {
      scores.storm_multitasker += 2;
    } else if (data.painPoint.main === 'organizing') {
      scores.lost_navigator += 1;
    }
  }

  // Solution 관심도 분석
  if (data.solution.interest === 'want_now') {
    // 강한 관심 = 높은 고통
    scores.lost_navigator += 1;
    scores.perfectionist_procrastinator += 1;
  } else if (data.solution.interest === 'not_needed') {
    scores.focus_survivor += 1;
  }

  console.log('analyzeUserType - scores:', scores);

  // 가장 높은 점수의 타입 찾기
  const maxScore = Math.max(...Object.values(scores));
  const topTypes = Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([type, _]) => type);

  // 동점인 경우 우선순위: focus_survivor > perfectionist_procrastinator > storm_multitasker > lost_navigator
  const priorityOrder = ['focus_survivor', 'perfectionist_procrastinator', 'storm_multitasker', 'lost_navigator'];
  const selectedType = topTypes.sort((a, b) =>
    priorityOrder.indexOf(a) - priorityOrder.indexOf(b)
  )[0] as 'storm_multitasker' | 'perfectionist_procrastinator' | 'focus_survivor' | 'lost_navigator';

  return getTypeResult(selectedType);
};

const getTypeResult = (type: 'storm_multitasker' | 'perfectionist_procrastinator' | 'focus_survivor' | 'lost_navigator'): UserTypeResult => {
  const types = {
    storm_multitasker: {
      type: 'storm_multitasker' as const,
      title: '폭풍 멀티태스커',
      emoji: '🌪️',
      description: '동시에 여러 일을 처리하려는 에너지 넘치는 타입. 아이디어와 계획은 넘치지만, 모든 것을 다 하려다 보니 집중이 흐트러져요.',
      characteristics: [
        '할 일 목록이 항상 길고 다양해요',
        '여러 도구와 앱을 동시에 사용해요',
        '중간에 딴짓하며 시간이 흘러가요',
        '새로운 것에 대한 호기심이 많아요'
      ],
      pain: '너무 많은 것을 하려다 보니 정작 중요한 일은 미루게 되고, "오늘 뭐 했지?" 하는 생각이 들어요.',
      currentTool: '여러 도구를 사용하지만 제대로 활용하지 못하고 있어요.',
      spending: '새로운 도구에 투자하지만, 금방 사용을 중단해요.',
      percentage: 35
    },
    perfectionist_procrastinator: {
      type: 'perfectionist_procrastinator' as const,
      title: '완벽주의 미루기',
      emoji: '🐌',
      description: '완벽하게 하고 싶은 마음이 큰 당신. 하지만 완벽해야 한다는 압박감 때문에 시작조차 하지 못하고 미루게 돼요.',
      characteristics: [
        '계획은 완벽하게 세우지만 실행이 어려워요',
        '불안감과 자책감이 높아요',
        '"더 준비되면 시작해야지" 하며 미뤄요',
        '어제의 실패를 오늘도 반복해요'
      ],
      pain: '하루 종일 "해야 하는데..." 하며 죄책감에 시달려요. 자책의 반복입니다.',
      currentTool: '완벽한 도구를 찾아 헤매지만, 정작 도구를 제대로 쓰지 못해요.',
      spending: '자기계발에 투자하지만, 변화는 더디게 와요.',
      percentage: 28
    },
    focus_survivor: {
      type: 'focus_survivor' as const,
      title: '집중력 서바이버',
      emoji: '🎯',
      description: '집중력을 지키기 위해 나름의 전략을 가진 타입. 완벽하지는 않지만, 자신만의 방법으로 하루를 버텨내고 있어요.',
      characteristics: [
        '최소한의 도구만 사용해요',
        '방해 요소를 차단하려 노력해요',
        '나름의 루틴이 있어요',
        '계획대로 되는 날이 꽤 있어요'
      ],
      pain: '전략이 있어도 매일 완벽하게 지키기는 어려워요. 더 나은 방법이 있을까 궁금해요.',
      currentTool: '효과 있는 도구를 찾았고 꾸준히 사용 중이에요.',
      spending: '검증된 도구에 투자하고, 효과가 있으면 계속 사용해요.',
      percentage: 22
    },
    lost_navigator: {
      type: 'lost_navigator' as const,
      title: '방향 상실자',
      emoji: '🧭',
      description: '어디로 가야 할지 모르겠는 당신. 할 일은 많은데 뭐부터 해야 할지, 어떻게 해야 할지 막막한 타입이에요.',
      characteristics: [
        '우선순위를 정하는 게 너무 어려워요',
        '여러 도구를 시도했다가 포기한 경험이 많아요',
        '결국 내가 다 계획해야 해서 힘들어요',
        '어제와 똑같은 하루가 반복돼요'
      ],
      pain: '매일 같은 실패를 반복하는 것 같아요. "나는 왜 이럴까"하는 생각이 끊이지 않아요.',
      currentTool: '뭘 써도 소용없다는 생각이 들어요.',
      spending: '돈을 써봐도 변화가 없어서, 투자 자체를 포기했어요.',
      percentage: 15
    }
  };

  return types[type];
};

// 타입별 추천사항
export const getRecommendations = (type: string) => {
  const recommendations: Record<string, string[]> = {
    storm_multitasker: [
      '🎯 하루에 3가지 핵심 목표만 정하세요',
      '📱 알림을 대폭 줄이고, 정해진 시간에만 확인하세요',
      '⏰ 한 번에 하나의 일에만 집중하는 연습을 하세요',
      '✅ 완료한 일을 기록하고 축하하세요'
    ],
    perfectionist_procrastinator: [
      '⏱️ 2분 규칙: 2분 안에 할 수 있으면 바로 하세요',
      '📉 "못생긴 초안"을 만드는 걸 목표로 하세요',
      '🎯 완벽이 아닌 "충분히 좋음"을 목표로 하세요',
      '🎉 작은 진전도 진전입니다. 축하하세요'
    ],
    focus_survivor: [
      '📊 현재 전략을 기록하고 분석하세요',
      '🔄 효과 있는 것은 자동화하세요',
      '🎯 집중 시간을 조금씩 늘려보세요',
      '💪 이미 잘하고 있어요. 조금만 더 개선해봐요'
    ],
    lost_navigator: [
      '🧭 아침에 딱 1가지만 정하세요: "오늘은 이것"',
      '👥 누군가에게 도움을 요청하세요',
      '🌱 아주 작은 것부터 시작하세요',
      '❤️ 자신에게 좀 더 친절해지세요'
    ]
  };

  return recommendations[type] || [];
};
