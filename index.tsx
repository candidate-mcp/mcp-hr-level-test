
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const quizQuestions = [
  {
    question: "🚨 지원자에게 연락할 때 주로 쓰는 방법은?",
    options: [
      "이메일로 안내해요. (포멀하게! 근데 잘 볼지는 모르겠어요…)",
      "전화로 직접 안내해요. (다정한 목소리는 덤!)",
      "문자로 보내요. (바로 확인하고 답장하지 않을까요?)",
      "…사실 연락하는 걸 깜빡할 때도 있어요. (진심 고백…)",
      "삐삐...? (혹시 저만 아는 건가요?)",
    ],
    scores: [2, 1, 3, 0, 0],
  },
  {
    question: "😥 면접 보고 간 지원자, 결과는 알려주나요?",
    options: [
      "결과는 안 알려줘요. (그냥… 그런 문화?)",
      "합격한 분께만 연락드려요. (불합격은 눈치로…?)",
      "합격하면 전화로 바로 다음 단계까지 안내드려요!",
      "이메일로 합격/불합격 모두 정중히 안내드려요.",
      "문자로 간결하게 합격/불합격 안내드려요.",
    ],
    scores: [0, 1, 2, 4, 3],
  },
  {
    question: "📅 우리 회사는 인재를 어떻게 채용하나요?",
    options: [
      "누가 퇴사하면 그때부터 급히 시작해요.",
      "상시 채용 중! 늘 좋은 인재를 기다려요.",
      "분기마다 정기 채용을 진행해요.",
      "채용… 어떻게 하는 건지 아직 잘 몰라요.",
    ],
    scores: [1, 4, 3, 0],
  },
  {
    question: "👻 면접 당일 갑자기 연락두절된 지원자… 당신의 반응은?",
    options: [
      "안 올 거면 미리 말하지 ㅠㅠ",
      "무슨 일이 있었나 걱정돼요. (혹시 길 잃었을지도…)",
      "노쇼 방지 시스템 총가동! 다시는 이런 일 없게 하죠.",
      "노쇼 원인 분석하고 채용 프로세스 개선까지 제안해요!",
      "그냥 제 운이 없는 걸로 위로합니다…😔",
    ],
    scores: [1, 2, 3, 4, 0],
  },
  {
    question: "⏰ 면접관이 자주 늦으시나요…?",
    options: [
      "저희 면접관은 칼같이 시간 지키세요!",
      "가끔 늦으시긴 해요. 뭐, 그럴 수도 있죠!",
      "면접 일정이 자꾸 헷갈리신대요…",
      "사람이니까 늦을 수도 있죠… 이해합니다!",
      "그래서 매번 미리 리마인드해드려요! (메신저, 전화 등 총동원!)",
    ],
    scores: [4, 1, 0, 1, 3],
  },
];

const resultsData = {
    1: {
        level: "레벨 1 - HR 생존형",
        title: "“채용은 매번 전쟁 같아요.”",
        features: [
            "지원자 연락을 수동으로 하다 보니 누락되거나 지연되기 쉬워요.",
            "면접 일정은 수기로 관리해, 잦은 착오나 혼선이 생겨요.",
            "면접관에게 일정을 매번 직접 전달해야 해요.",
            "면접 결과를 늦게 보내거나, 보내지 않을 때도 있어요.",
            "노쇼나 지각 상황에 별다른 대응이 어려워요。",
        ],
        diagnosis: "기본적인 채용 커뮤니케이션조차 수작업으로 진행되고 있어, 실수와 혼선이 반복되는 상태입니다.",
        solution: "HR 업무 기본부터 자동화해, 실수 없는 채용을 시작하세요! 지원자 일정 자동 안내, 면접관 리마인드 메시지, 면접 결과 일괄 안내 기능으로 커뮤니케이션을 정리하세요.",
    },
    2: {
        level: "레벨 2 - HR 개선형",
        title: "“덜 혼란스러운데, 아직 번거로워요.”",
        features: [
            "지원자에게 연락하는 방식이 통일되지 않아 시간이 오래 걸려요.",
            "면접 일정을 캘린더에 수동으로 넣고, 수시로 면접관에게 전달해요.",
            "결과 안내는 하고 있지만, 방법이 팀마다 달라 일관성이 부족해요.",
            "노쇼가 발생하면 담당자가 직접 전화하거나 사후 처리만 하고 있어요.",
        ],
        diagnosis: "채용 과정의 흐름은 잡혔지만, 반복되는 수작업과 커뮤니케이션 부담이 여전히 큰 단계입니다.",
        solution: "반복 업무 자동화로 채용의 품질과 속도를 동시에 높이세요! 일정 등록 시 자동 안내 & 리마인드, Google Calendar 연동, 지원자별 커뮤니케이션 이력 관리로 소통의 일관성을 유지하세요.",
    },
    3: {
        level: "레벨 3 - HR 성장형",
        title: "“일정도 관리되고, 안내도 잘해요. 이젠 효율이 문제!”",
        features: [
            "면접 일정은 잘 등록하고, 지원자에게 잘 안내하고 있어요.",
            "면접관에게 일정 리마인드를 해줘서 지각이 줄었어요.",
            "불합격자에게도 결과를 안내하며 지원자 경험을 신경 써요.",
            "노쇼 발생 시 기록은 하지만, 체계적인 원인 분석은 하지 않아요.",
            "반복되는 일정을 등록하고 관리하는 일이 여전히 번거로워요.",
        ],
        diagnosis: "기본적인 자동화는 갖췄지만, 반복되는 일에 시간을 쓰고 있고, 데이터 기반 개선이 부족한 상태입니다.",
        solution: "수고는 줄이고, 전략은 살리는 HR을 만들어보세요! 채용 일정 안내 템플릿, 캘린더 팀 공유 기능, 면접 일정 자동 안내&리마인드로 효율을 개선하세요.",
    },
    4: {
        level: "레벨 4 - HR 혁신형",
        title: "“지원자도, 면접관도 모두 편한 채용 경험을 만들고 있어요.”",
        features: [
            "지원자와 면접관 모두 자동으로 일정을 받아보고, 변경 사항도 빠르게 공유돼요.",
            "면접관 리마인드, 지원자 일정 안내가 전부 자동화돼 누락이 없어요.",
            "채용 프로세스에서 발생하는 데이터를 모아, 개선 포인트를 찾고 있어요.",
            "Google Calendar와 연동해 팀 전체 일정을 조율하기 쉬워요.",
            "채용이 회사의 ‘이미지’로 연결되는 걸 인식하고 있어요.",
        ],
        diagnosis: "자동화 중심의 채용 운영이 정착된 단계. 이제는 지원자 경험을 브랜드로 전환할 수 있는 시점입니다.",
        solution: "지원자를 존중하는 기업이라는 이미지를 확실하게 각인시키세요! 자사 채용 사이트와 위젯, 단계별 맞춤 안내, 실시간 팀워크 강화로 채용 브랜딩을 완성하세요.",
    },
    5: {
        level: "레벨 5 - HR 선도형",
        title: "“채용은 이미 끝났습니다. 우리는 이제, AI로 ‘모든 일정’을 관리하세요.”",
        features: [
            "채용은 이미 체계적이고 자동화된 시스템 안에서 자연스럽게 굴러가는 일이 되었어요.",
            "팀원 모두가 예상 가능한 일정, 예측 가능한 대응, 완성도 높은 지원자 경험에 익숙합니다.",
            "이제 채용을 넘어, 모든 조직 운영 일정까지 AI와 함께 관리하는 단계로 진입했어요.",
            "더 이상 ‘어떻게 운영할까’를 고민하지 않습니다. 우리는 AI를 활용해 더 나은 결정을 준비합니다.",
            "HR은 ‘업무’가 아닌, 조직의 흐름을 디자인하는 전략적인 일이 되었어요.",
        ],
        diagnosis: "조직 내 채용과 커뮤니케이션 전반을 이미 마스터한 단계입니다. AI를 통해 모든 팀의 일정을 연결하고 확장해보세요.",
        solution: "채용을 넘어 전사 커뮤니케이션을 설계하세요. 조직 전체가 한 리듬으로 움직이는 일정 기반 협업 문화와 경험을 구축하세요.",
    },
};

const Character = ({ size = 'medium' }) => {
    const dimensions = {
        large: { width: 180, height: 180 },
        medium: { width: 150, height: 150 },
    };
    const { width, height } = dimensions[size] || dimensions.medium;

    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 160 160" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="characterTitle"
        >
            <title id="characterTitle">A cute and friendly cloud fairy character holding a star.</title>
            <g>
                {/* Star */}
                <path d="M125.7,58.3c-0.4-1.2-1.5-2-2.8-2h-13.8c-0.8,0-1.6-0.5-2-1.2l-6.2-11.3c-0.6-1.1-1.8-1.8-3-1.8c-1.2,0-2.4,0.7-3,1.8l-6.2,11.3c-0.4,0.7-1.2,1.2-2,1.2H73c-1.3,0-2.4,0.8-2.8,2c-0.4,1.2,0,2.6,1.1,3.4l10.8,7.8c0.7,0.5,1,1.4,0.8,2.2l-4.1,13.8c-0.3,1.2,0.4,2.5,1.6,3.1c1.2,0.6,2.6,0.2,3.4-0.8L95,79.9c0.3-0.3,0.7-0.5,1-0.5c0.3,0,0.7,0.2,1,0.5l9.9,7.9c0.8,0.9,2.2,1.4,3.4,0.8c1.2-0.6,1.9-1.9,1.6-3.1l-4.1-13.8c-0.2-0.8,0.1-1.7,0.8-2.2L124.6,61.7C125.6,60.9,126.1,59.5,125.7,58.3z" fill="#FFD700" stroke="#FDB813" strokeWidth="2.5"/>

                {/* Body */}
                <path d="M108.5,138C98.4,149.3,83.9,155,70,155c-27.6,0-50-22.4-50-50c0-11.4,3.8-21.9,10.2-30.3c3.5-4.6,9.1-7.7,15.1-7.7h29.4c6,0,11.6,3.1,15.1,7.7C104.7,87.1,108.5,97.6,108.5,109C108.5,119.3,113.3,128.8,108.5,138z" fill="#E6F7FF" stroke="#B3E5FC" strokeWidth="3"/>
                <path d="M39.3,101c-5.5,0-10-4.5-10-10s4.5-10,10-10h4c5.5,0,10,4.5,10,10S48.8,101,43.3,101H39.3z" fill="#E6F7FF" stroke="#B3E5FC" strokeWidth="3"/>
                
                {/* Face */}
                <circle cx="62" cy="112" r="4.5" fill="#333"/>
                <circle cx="82" cy="112" r="4.5" fill="#333"/>
                
                <circle cx="58" cy="110" r="1.5" fill="white"/>
                <circle cx="78" cy="110" r="1.5" fill="white"/>
                
                <path d="M68,122c2,2,6,2,8,0" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
                
                <ellipse cx="53" cy="118" rx="7" ry="5" fill="#FFC0CB" opacity="0.7"/>
                <ellipse cx="91" cy="118" rx="7" ry="5" fill="#FFC0CB" opacity="0.7"/>
            </g>
        </svg>
    );
};


const App = () => {
  const [step, setStep] = useState('intro'); // 'intro', 'quiz', 'result'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleStart = () => {
    setStep('quiz');
  };

  const handleAnswer = (score, optionIndex) => {
    setSelectedOption(optionIndex);
    setTimeout(() => {
        const nextAnswers = [...answers, score];
        setAnswers(nextAnswers);
        setSelectedOption(null);
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStep('result');
        }
    }, 300);
  };

  const resultLevel = useMemo(() => {
    if (step !== 'result') return null;
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    if (totalScore <= 4) return 1;
    if (totalScore <= 8) return 2;
    if (totalScore <= 12) return 3;
    if (totalScore <= 16) return 4;
    return 5;
  }, [step, answers]);
  
  const result = resultLevel ? resultsData[resultLevel] : null;

  const Intro = () => (
    <div className="content-wrapper">
      <div className="character-container intro-character">
        <Character size="large" />
      </div>
      <h1 className="title">우리 회사 HR 레벨 테스트</h1>
      <h2 className="subtitle">나는 어떤 HR 레벨의 회사에 있을까?</h2>
      <p className="description">지원자 연락부터 면접 안내까지!<br/>우리 회사 HR 운영 방식, 레벨 테스트로 확인해보세요.</p>
      <button onClick={handleStart} className="btn btn-primary">테스트 시작하기</button>
      <p className="info">총 5문항: 소요 시간 약 1~2분</p>
    </div>
  );

  const Quiz = () => {
    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
    return (
      <div className="content-wrapper quiz-wrapper">
        <div className="progress-container-wrapper">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
        </div>
        <div>
            <p className="question-number" aria-live="polite">Question {currentQuestionIndex + 1}/{quizQuestions.length}</p>
            <h2 className="question-text">{question.question}</h2>
            <div className="options-grid">
            {question.options.map((option, index) => (
                <button
                key={index}
                className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(question.scores[index], index)}
                >
                {option}
                </button>
            ))}
            </div>
        </div>
      </div>
    );
  };

  const Result = () => (
    <div className="content-wrapper">
      <div className="result-header">
        <h1 className="title">🌟 HR 레벨 테스트 결과는? 🌟</h1>
        <p className="description">'우리 회사 HR 레벨 테스트'에 참여해주셔서 감사합니다.<br/>아래에서 <strong>회사 HR 레벨</strong>을 확인하고, <strong>맞춤형 솔루션</strong>까지 지금 확인해보세요!</p>
      </div>

      <div className="character-container">
        <Character size="medium"/>
      </div>

      <div className="result-card">
        <p className="result-level">{result.level}</p>
        <h3 className="result-level-name">{result.title}</h3>
        
        <div className="result-section">
            <h4 className="result-section-title">주요 특징</h4>
            <ul className="result-features">
            {result.features.map((feature, index) => <li key={index}>{feature}</li>)}
            </ul>
        </div>

        <div className="result-section">
            <h4 className="result-section-title">진단 결과</h4>
            <p className="result-text">{result.diagnosis}</p>
        </div>
        
        <div className="result-section">
            <h4 className="result-section-title">솔루션 제안</h4>
            <p className="result-text">{result.solution}</p>
        </div>
      </div>

      <div className="cta-section">
        <h3>우리 회사 HR 레벨을 최대한 끌어올리고 싶으신가요?</h3>
        <div className="cta-buttons">
          <a href="https://www.candidate.im/candidate-remote-consultation?utm_source=aistudio&utm_medium=display&utm_campaign=hr-level&utm_content=cta" target="_blank" rel="noopener noreferrer" className="btn btn-primary">상담 문의하기</a>
          <a href="https://www.candidate.im/biz/home" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">서비스 둘러보기</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="background-gradient"></div>
      {step === 'intro' && <Intro />}
      {step === 'quiz' && <Quiz />}
      {step === 'result' && result && <Result />}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);