const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// PPTX 프레젠테이션 생성
const pptx = new PptxGenJS();

// 색상 테마 정의 (HTML의 CSS 변수와 동일)
const colors = {
  bgPrimary: "0d1117",
  bgSecondary: "161b22",
  bgTertiary: "21262d",
  bgCard: "1c2128",
  textPrimary: "f0f6fc",
  textSecondary: "8b949e",
  textMuted: "6e7681",
  accentPrimary: "58a6ff",
  accentSecondary: "f85149",
  accentSuccess: "3fb950",
  terminalGreen: "00ff41",
  terminalYellow: "ffff00",
  terminalRed: "ff0040",
  borderColor: "30363d",
};

// 폰트 설정
const fontFamily = "맑은 고딕"; // JetBrains Mono는 PPTX에서 지원하지 않으므로 대체

// 슬라이드 1: Hero Section
function createHeroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: colors.bgPrimary };
  slide.transition = { type: "fade", duration: 400 };

  // 왼쪽: Hero 제목 (터미널 프롬프트 포함)
  slide.addText("> 안녕하세요,\n개발자 유치부입니다.", {
    x: 0.5,
    y: 0.8,
    w: 5.5,
    h: 1.5,
    fontSize: 44,
    fontFace: fontFamily,
    color: colors.textPrimary,
    bold: true,
    valign: "top",
  });

  // 왼쪽: Hero 부제목 (주석 표시 포함)
  slide.addText(
    "// 15년 6개월의 풍부한 개발 경험을 바탕으로\n// 안정적이고 확장 가능한 웹 서비스를 개발합니다.",
    {
      x: 0.5,
      y: 2.4,
      w: 5.5,
      h: 0.9,
      fontSize: 16,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
    }
  );

  // 왼쪽: Hero 버튼 영역 (시각적으로만 표시)
  slide.addText("프로젝트 보기  |  연락하기", {
    x: 0.5,
    y: 3.4,
    w: 5.5,
    h: 0.5,
    fontSize: 14,
    fontFace: fontFamily,
    color: colors.terminalGreen,
    valign: "top",
  });

  // 오른쪽: 프로필 카드 배경
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.5,
    y: 0.5,
    w: 3,
    h: 5.5,
    fill: { color: colors.bgCard },
    line: { color: colors.borderColor, width: 1 },
    rectRadius: 0.1,
  });

  // 프로필 카드 상단 컬러 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.5,
    y: 0.5,
    w: 3,
    h: 0.05,
    fill: {
      type: "solid",
      color: colors.terminalGreen,
    },
  });

  // 프로필 이미지 (이미지가 있는 경우)
  const profileImagePath = path.join(__dirname, "Images", "ycb_r.jpg");
  if (fs.existsSync(profileImagePath)) {
    slide.addImage({
      path: profileImagePath,
      x: 7,
      y: 0.8,
      w: 2.5,
      h: 3.5,
      rounding: true,
    });
  }

  // 프로필 정보
  slide.addText("유치부", {
    x: 6.5,
    y: 4.5,
    w: 3,
    h: 0.4,
    fontSize: 20,
    fontFace: fontFamily,
    color: colors.textPrimary,
    align: "center",
    bold: true,
  });

  slide.addText("웹/백엔드 개발자\n15년 6개월 경력", {
    x: 6.5,
    y: 4.9,
    w: 3,
    h: 0.6,
    fontSize: 14,
    fontFace: fontFamily,
    color: colors.textSecondary,
    align: "center",
    valign: "top",
  });
}

// 슬라이드 2: About Section
function createAboutSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: colors.bgSecondary }; // HTML과 동일한 배경색
  slide.transition = { type: "fade", duration: 400 };

  // 섹션 제목 (주석 표시 포함)
  slide.addText("// About Me", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 32,
    fontFace: fontFamily,
    color: colors.textPrimary,
    bold: true,
    align: "center",
  });

  // 섹션 제목 하단 그라데이션 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 4.5,
    y: 0.85,
    w: 1.5,
    h: 0.05,
    fill: { color: colors.terminalGreen },
  });

  // About 텍스트 영역 (왼쪽, 2fr)
  slide.addText("> 안정성과 성능을 중시하는 개발자", {
    x: 0.5,
    y: 1.2,
    w: 6.5,
    h: 0.4,
    fontSize: 20,
    fontFace: fontFamily,
    color: colors.terminalGreen,
    bold: true,
  });

  const aboutText = `지난 15년 6개월간 다양한 산업군에서 웹 및 백엔드 개발자로 근무하며, 결제 시스템, 교육 플랫폼, 투자 콘텐츠 서비스 등 여러 형태의 웹 서비스를 개발하고 운영해왔습니다.

최근에는 페이레터에서 아프리카TV 전용 헥토펌뱅, URL 결제, 애플페이 등 다양한 결제 서비스를 개발하였고, 기존 레거시(Classic ASP) 시스템을 .NET Core 기반으로 리팩토링하는 프로젝트를 진행했습니다.

'신뢰는 성실함에서 비롯된다'는 신조를 가지고, 맡은 일은 끝까지 책임지고 완수해왔습니다. 복잡한 시스템 구조 속에서도 문제의 본질을 파악하고, 해결책을 찾아내기 위해 끝까지 집중하는 것이 저의 강점입니다.

최근에는 Cursor AI를 활용하여 타워 디펜스 게임을 개발하는 등 새로운 기술과 도구에 대한 학습과 적용에도 적극적입니다.`;

  slide.addText(aboutText, {
    x: 0.5,
    y: 1.7,
    w: 6.5,
    h: 3.5,
    fontSize: 12,
    fontFace: fontFamily,
    color: colors.textSecondary,
    valign: "top",
    lineSpacing: 22,
  });

  // 통계 박스 영역 (오른쪽, 1fr)
  // 통계 박스 1
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.5,
    y: 1.5,
    w: 2,
    h: 1.5,
    fill: { color: colors.bgCard },
    line: { color: colors.borderColor, width: 1 },
    rectRadius: 0.1,
  });

  // 통계 박스 상단 애니메이션 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.5,
    y: 1.5,
    w: 2,
    h: 0.03,
    fill: { color: colors.terminalGreen },
  });

  slide.addText("15+", {
    x: 7.5,
    y: 1.7,
    w: 2,
    h: 0.6,
    fontSize: 36,
    fontFace: fontFamily,
    color: colors.terminalGreen,
    bold: true,
    align: "center",
    valign: "middle",
  });

  slide.addText("경력", {
    x: 7.5,
    y: 2.3,
    w: 2,
    h: 0.4,
    fontSize: 16,
    fontFace: fontFamily,
    color: colors.textSecondary,
    align: "center",
    valign: "middle",
  });

  // 통계 박스 2
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.5,
    y: 3.2,
    w: 2,
    h: 1.5,
    fill: { color: colors.bgCard },
    line: { color: colors.borderColor, width: 1 },
    rectRadius: 0.1,
  });

  // 통계 박스 상단 애니메이션 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.5,
    y: 3.2,
    w: 2,
    h: 0.03,
    fill: { color: colors.terminalGreen },
  });

  slide.addText("5+", {
    x: 7.5,
    y: 3.4,
    w: 2,
    h: 0.6,
    fontSize: 36,
    fontFace: fontFamily,
    color: colors.terminalGreen,
    bold: true,
    align: "center",
    valign: "middle",
  });

  slide.addText("근무 회사", {
    x: 7.5,
    y: 4,
    w: 2,
    h: 0.4,
    fontSize: 16,
    fontFace: fontFamily,
    color: colors.textSecondary,
    align: "center",
    valign: "middle",
  });
}

// 슬라이드 3: Work Experience (타임라인 형태)
function createExperienceSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: colors.bgPrimary };
  slide.transition = { type: "fade", duration: 400 };

  // 제목
  slide.addText("// Work Experience", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 32,
    fontFace: fontFamily,
    color: colors.textPrimary,
    bold: true,
    align: "center",
  });

  // 타임라인 중앙선 (세로 그라데이션)
  const centerX = 5; // 중앙 위치
  slide.addShape(pptx.ShapeType.line, {
    x: centerX,
    y: 1.2,
    w: 0,
    h: 5.5,
    line: { color: colors.terminalGreen, width: 2 },
  });

  // 경력 항목들
  const experiences = [
    {
      company: "페이레터",
      period: "2022.08 - 2025.04 (2년 9개월)",
      position: "페이먼츠플랫폼팀 선임/팀원",
      items: [
        "결제 서비스 리뉴얼 및 리팩토링 (Classic ASP → .NET Core)",
        "URL 결제 서비스, 헥토펌뱅 결제, 애플페이 결제 개발",
        "AML 개발 (자금세탁 방지를 위한 가맹점 정보 현행화)",
        "정산 및 통계 DB 분리 및 서비스 운영",
        "대규모 트래픽 환경에서 안정적인 결제 서비스 운영 경험",
      ],
      tech: [
        ".NET Core(C#)",
        "Classic ASP",
        "C/C++",
        "MS-SQL",
        "JQuery(JavaScript)",
      ],
    },
    {
      company: "핀업",
      period: "2017.06 - 2022.07 (5년 2개월)",
      position: "개발본부 차장/팀원",
      items: [
        "핀업 스탁 서비스 개발 (PC 웹, 모바일 웹, 관리자)",
        "슬기로운 투자생활 솔루션 개발",
        "투자 아카데미, 멘토링 서비스 개발",
        "사이트 리뉴얼 및 모바일 콘텐츠 일원화",
        "장기 운영 서비스의 성능 최적화 및 기능 고도화 주도",
      ],
      tech: ["ASP.NET(C#)", "MS-SQL", "JQuery(JavaScript)", "REST API"],
    },
    {
      company: "스트롱홀드",
      period: "2014.12 - 2015.10 (11개월)",
      position: "개발팀 과장/팀장",
      items: [
        "폴스타 글로벌 사이트 개발 및 유지보수",
        "AQK 사이트 유지보수 및 재개발",
        "스트롱홀드 홈페이지 유지보수",
        "소규모 팀 리딩과 프로젝트 일정·품질 관리 경험",
      ],
      tech: ["ASP.NET(C#)", "MS-SQL", "JQuery(JavaScript)"],
    },
    {
      company: "페이레터",
      period: "2011.07 - 2014.09 (3년 3개월)",
      position: "빌링 운영팀 대리/팀원",
      items: [
        "AfreecaTV, Qeon, SportsSeoul 등 업체 빌링 운영",
        "게임 빌링 시스템 운영 (카발온라인, 징기스칸)",
        "다양한 업체의 결제 시스템 운영 및 관리",
        "24/7 결제 시스템 모니터링 및 장애 대응 경험",
      ],
      tech: ["Classic ASP", "ASP.NET", "MS-SQL", "JQuery(JavaScript)"],
    },
    {
      company: "제이앤씨(J&C)",
      period: "2008.01 - 2011.06 (3년 6개월)",
      position: "웹개발 사원/팀원",
      items: [
        "자사 게임 홈페이지 개발 및 유지보수",
        "제이앤씨 홈페이지 유지보수 및 재개발",
        "초기 웹 서비스 개발 경험을 통해 기본기 및 실무 감각 확보",
      ],
      tech: ["Classic ASP", "MS-SQL", "JavaScript"],
    },
  ];

  // 타임라인 아이템 배치 (좌우 교차)
  const itemPositions = [
    { y: 1.3, side: "left" }, // 1번째: 왼쪽
    { y: 2.3, side: "right" }, // 2번째: 오른쪽
    { y: 3.3, side: "left" }, // 3번째: 왼쪽
    { y: 4.3, side: "right" }, // 4번째: 오른쪽
    { y: 5.3, side: "left" }, // 5번째: 왼쪽
  ];

  experiences.forEach((exp, index) => {
    const pos = itemPositions[index];
    const isLeft = pos.side === "left";

    // 타임라인 마커 (원형 점)
    slide.addShape(pptx.ShapeType.ellipse, {
      x: centerX - 0.15,
      y: pos.y + 0.1,
      w: 0.3,
      h: 0.3,
      fill: { color: colors.terminalGreen },
      line: { color: colors.bgPrimary, width: 0.08 },
    });

    // 타임라인 카드 배경
    const cardX = isLeft ? 0.5 : centerX + 0.5;
    const cardW = isLeft ? centerX - 1 : 4.5;

    slide.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: pos.y,
      w: cardW,
      h: 0.9,
      fill: { color: colors.bgCard },
      line: { color: colors.borderColor, width: 1 },
      rectRadius: 0.1,
    });

    // 회사명과 기간
    slide.addText(`> ${exp.company}`, {
      x: cardX + 0.2,
      y: pos.y + 0.1,
      w: cardW - 0.4,
      h: 0.2,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.terminalGreen,
      bold: true,
    });

    slide.addText(exp.period, {
      x: cardX + 0.2,
      y: pos.y + 0.1,
      w: cardW - 0.4,
      h: 0.2,
      fontSize: 9,
      fontFace: fontFamily,
      color: colors.textMuted,
      align: "right",
    });

    // 직책
    slide.addText(exp.position, {
      x: cardX + 0.2,
      y: pos.y + 0.3,
      w: cardW - 0.4,
      h: 0.15,
      fontSize: 11,
      fontFace: fontFamily,
      color: colors.textPrimary,
      bold: true,
    });

    // 주요 업무 (첫 2개만 표시)
    const itemsText = exp.items
      .slice(0, 2)
      .map((item) => `→ ${item}`)
      .join("\n");
    slide.addText(itemsText, {
      x: cardX + 0.2,
      y: pos.y + 0.48,
      w: cardW - 0.4,
      h: 0.35,
      fontSize: 8,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
      lineSpacing: 12,
    });

    // 기술 스택
    const techText = exp.tech.join("  ");
    slide.addText(techText, {
      x: cardX + 0.2,
      y: pos.y + 0.75,
      w: cardW - 0.4,
      h: 0.1,
      fontSize: 7,
      fontFace: fontFamily,
      color: colors.terminalGreen,
    });
  });
}

// 슬라이드 4-7: Key Projects (각 프로젝트당 1개 슬라이드)
function createProjectSlides() {
  const projects = [
    {
      title: "결제 서비스 리팩토링",
      period: "2024.01 - 2025.04",
      company: "페이레터",
      description:
        "기존 Classic ASP 기반 결제 시스템을 .NET Core로 마이그레이션하여 성능과 유지보수성을 대폭 개선했습니다.",
      tasks: [
        "프로젝트 마이그레이션 계획 수립 및 진행",
        "기존 Classic ASP 코드 분석 및 .NET Core 아키텍처 설계",
        "결제 서비스 웹 및 API 리팩토링",
        "가맹점 관리자 시스템 개선",
        "내부 관리자 시스템 현대화",
      ],
      technical: [
        "잠재적 오류 해결: Classic ASP의 잠재적 오류(ASP_0147,0148)를 .NET Core의 비동기 처리와 Connection Pooling으로 해결",
        "DB 연결 최적화: Entity Framework Core와 Connection Pooling 구현으로 DB 연결 효율성 향상",
        "보안 강화: JWT 토큰 기반 인증 시스템 구축 및 Parameterized Query 적용",
      ],
      achievements: [
        "잠재적 오류 해결로 인한 모니터링 감소",
        "데이터베이스 연결 코드 모듈화하여 유지보수성 향상",
        "Parameter 조작 위험성 해결로 보안 강화",
        "시스템 안정성 대폭 개선",
      ],
      tech: [
        ".NET Core(C#)",
        "Classic ASP",
        "C/C++",
        "MS-SQL",
        "Entity Framework Core",
        "JWT",
        "REST API",
        "jQuery(JavaScript)",
      ],
    },
    {
      title: "결제 서비스 개발",
      period: "2023.01 - 2023.12",
      company: "페이레터",
      description:
        "URL 결제, 헥토펌뱅 결제, 애플페이 등 다양한 결제 방식을 지원하는 서비스를 개발했습니다.",
      tasks: [
        "URL 결제 서비스 개발 (결제 서비스 웹, API, 관리자)",
        "헥토펌뱅 결제 시스템 개발 (아프리카TV 전용)",
        "애플페이 결제 시스템 개발 및 연동",
        "자금세탁방지(AML) 시스템 구축: 가맹점 정보 갱신 자동화 및 위험군 식별 로직 구현",
        "정산 및 통계 DB 구조 개선을 위한 DB 분리 설계 및 성능 최적화",
      ],
      technical: [
        "다양한 결제 방식 통합: URL 결제, 헥토펌뱅, 애플페이 등 각기 다른 결제 프로토콜을 통합하여 일관된 API 인터페이스 제공",
        "AML 시스템 구현: 자금세탁 방지 규정 준수를 위한 가맹점 정보 자동 갱신 시스템 및 위험군 식별 알고리즘 개발",
        "DB 성능 최적화: 정산 및 통계 DB 분리 설계로 대용량 데이터 처리 성능 향상 및 운영 안정성 확보",
      ],
      achievements: [
        "다양한 결제 방식 지원으로 서비스 확장성 향상",
        "AML 시스템 구축으로 규정 준수 및 리스크 관리 강화",
        "DB 분리 및 최적화로 대용량 데이터 처리 성능 개선",
        "안정적인 결제 서비스 운영으로 신뢰도 확보",
      ],
      tech: [
        ".NET Core(C#)",
        "C/C++",
        "MS-SQL",
        "REST API",
        "jQuery(JavaScript)",
      ],
    },
    {
      title: "핀업 스탁 서비스 개발",
      period: "2017.06 - 2022.07",
      company: "핀업",
      description:
        "투자 콘텐츠 전문 플랫폼의 핵심 서비스를 개발하고 운영하며, 초창기 멤버로서 회사의 성장 과정에 직접 참여했습니다.",
      tasks: [
        "슈퍼 스탁 K2~K7 서비스 개발 (웹/모바일/관리자 통합)",
        "슬기로운 투자생활 솔루션 개발",
        "투자 아카데미 및 멘토링 서비스 개발",
        "웹 기반 교육 콘텐츠 시스템, 사용자 리포트 기능, 랭킹 알고리즘 구현",
        "서비스 리뉴얼 및 통합 개발 (PC, 모바일, API 구조 일원화)",
      ],
      technical: [
        "초기 서비스 안정화: 초창기 서비스 런칭 및 안정화를 위해 집중적인 개발에 헌신하며, 빠른 기능 개발과 버그 수정을 통해 서비스 품질 확보",
        "통합 플랫폼 아키텍처: PC, 모바일, API 구조를 일원화하여 개발 및 유지보수 효율성 향상",
        "OAuth2 인증 구현: Apple SNS 연동을 포함한 다양한 소셜 로그인 방식 지원으로 사용자 편의성 향상",
      ],
      achievements: [
        "초창기 멤버(15명)로 입사하여 핵심 서비스 개발에 참여, 퇴사 시점까지 조직 규모 50명 이상으로 확장 및 연매출 50억원에서 200억원(4배 증가) 성장에 기여",
        "통합 플랫폼 개발로 서비스 일원화 및 운영 효율성 향상",
        "5년 이상 장기 운영을 통한 안정적인 서비스 제공",
      ],
      tech: [
        "ASP.NET(C#)",
        "MS-SQL",
        "REST API",
        "OAuth2",
        "jQuery(JavaScript)",
      ],
    },
    {
      title: "게임 빌링 시스템 운영",
      period: "2011.07 - 2014.09",
      company: "페이레터",
      description:
        "다양한 게임과 콘텐츠 업체의 결제 시스템을 운영하고 관리했습니다.",
      tasks: [
        "AfreecaTV, Qeon, 한경TV 등 파트너사별 빌링 로직 설계 및 커스터마이징",
        "카발온라인, 징기스칸 등 게임 빌링 시스템 운영",
        "Classic ASP + MS-SQL 기반 결제 API 운영 및 유지보수",
        "파트너별 운영 정책에 따른 유연한 로직 적용 및 서비스 유지",
      ],
      technical: [
        "파트너별 맞춤형 로직: 각 파트너사의 다양한 운영 정책에 맞는 유연한 빌링 로직 설계 및 구현",
        "레거시 시스템 운영: Classic ASP 기반 시스템을 안정적으로 운영하며 지속적인 개선 작업 수행",
        "장애 대응 및 모니터링: 24/7 결제 시스템 운영을 위한 모니터링 체계 구축 및 신속한 장애 대응 프로세스 수립",
      ],
      achievements: [
        "다양한 파트너사별 맞춤형 빌링 시스템 구축",
        "안정적인 결제 시스템 운영으로 서비스 신뢰도 확보",
        "3년 이상 장기 운영 경험을 통한 시스템 안정화",
      ],
      tech: ["ASP.NET", "Classic ASP", "MS-SQL", "jQuery(JavaScript)"],
    },
  ];

  projects.forEach((project) => {
    const slide = pptx.addSlide();
    slide.background = { color: colors.bgSecondary };
    slide.transition = { type: "fade", duration: 400 };

    // 프로젝트 카드 배경
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.3,
      w: 9,
      h: 6.2,
      fill: { color: colors.bgCard },
      line: { color: colors.borderColor, width: 1 },
      rectRadius: 0.1,
    });

    // 프로젝트 카드 상단 애니메이션 바 (그라데이션)
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.3,
      w: 9,
      h: 0.05,
      fill: { color: colors.terminalGreen },
    });

    // 프로젝트 제목
    slide.addText(`> ${project.title}`, {
      x: 0.7,
      y: 0.5,
      w: 6,
      h: 0.4,
      fontSize: 24,
      fontFace: fontFamily,
      color: colors.terminalGreen,
      bold: true,
    });

    // 기간
    slide.addText(project.period, {
      x: 6.7,
      y: 0.5,
      w: 2.6,
      h: 0.4,
      fontSize: 12,
      fontFace: fontFamily,
      color: colors.textMuted,
      align: "right",
    });

    // 회사명
    slide.addText(project.company, {
      x: 0.7,
      y: 0.95,
      w: 8.6,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.textPrimary,
      bold: true,
    });

    // 설명
    slide.addText(project.description, {
      x: 0.7,
      y: 1.3,
      w: 8.6,
      h: 0.5,
      fontSize: 12,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
    });

    // 구분선
    slide.addShape(pptx.ShapeType.line, {
      x: 0.7,
      y: 1.9,
      w: 8.6,
      h: 0,
      line: { color: colors.borderColor, width: 1 },
    });

    // 담당 업무
    slide.addText("담당 업무", {
      x: 0.7,
      y: 2.1,
      w: 4,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.accentPrimary,
      bold: true,
    });

    const tasksText = project.tasks.map((task, idx) => `▸ ${task}`).join("\n");
    slide.addText(tasksText, {
      x: 0.7,
      y: 2.4,
      w: 4.2,
      h: 1.8,
      fontSize: 10,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
      lineSpacing: 18,
    });

    // 기술적 문제 해결
    slide.addText("기술적 문제 해결", {
      x: 5,
      y: 2.1,
      w: 4.3,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.accentPrimary,
      bold: true,
    });

    const technicalText = project.technical
      .map((item, idx) => {
        const parts = item.split(":");
        return parts.length > 1 ? `▸ ${parts[0]}: ${parts[1]}` : `▸ ${item}`;
      })
      .join("\n");
    slide.addText(technicalText, {
      x: 5,
      y: 2.4,
      w: 4.3,
      h: 1.8,
      fontSize: 9,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
      lineSpacing: 16,
    });

    // 주요 성과
    slide.addText("주요 성과", {
      x: 0.7,
      y: 4.4,
      w: 8.6,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.accentPrimary,
      bold: true,
    });

    const achievementsText = project.achievements
      .map((achievement, idx) => `▸ ${achievement}`)
      .join("\n");
    slide.addText(achievementsText, {
      x: 0.7,
      y: 4.7,
      w: 8.6,
      h: 1,
      fontSize: 10,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
      lineSpacing: 18,
    });

    // 기술 스택
    const techText = project.tech.join("  ");
    slide.addText(techText, {
      x: 0.7,
      y: 5.9,
      w: 8.6,
      h: 0.3,
      fontSize: 9,
      fontFace: fontFamily,
      color: colors.terminalGreen,
      valign: "middle",
    });
  });
}

// 슬라이드 8-10: Personal Projects
function createPersonalProjectSlides() {
  const personalProjects = [
    {
      title: "타워 디펜스 게임",
      period: "2025.06 - 2025.06",
      company: "개인 프로젝트",
      description:
        "Cursor AI를 활용하여 개발한 웹 기반 타워 디펜스 게임입니다. 다양한 타워, 맵, 난이도, 특수 이벤트가 포함된 전략 시뮬레이션 게임입니다.",
      tasks: [
        "게임 전체 아키텍처 설계 및 개발",
        "Canvas API를 활용한 게임 렌더링 엔진 구현",
        "타워 배치, 업그레이드, 적 유닛 AI 로직 개발",
        "게임 밸런스 조정 및 난이도 시스템 설계",
        "로컬 스토리지를 활용한 게임 데이터 저장/불러오기 기능",
        "업적 시스템 및 통계 추적 기능 구현",
        "반응형 웹 디자인 및 다국어 지원 (한국어/영어)",
      ],
      technical: [
        "성능 최적화: Canvas 렌더링 최적화로 60fps 유지",
        "게임 로직: 복잡한 타워-적 상호작용 알고리즘 구현",
        "데이터 관리: 로컬 스토리지 기반 게임 상태 저장 시스템",
      ],
      achievements: [
        "15종 이상의 맵과 9가지 타워로 다양한 게임플레이 제공",
        "완전한 웹 기반 게임으로 별도 설치 없이 즉시 플레이 가능",
        "Cursor AI 활용으로 개발 시간 단축 및 학습 경험 확보",
        "GitHub Pages를 통한 무료 호스팅 및 배포",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Canvas API", "Cursor AI"],
      link: "https://chipgames.github.io/",
      images: ["Images/Tower/타워.png", "Images/Tower/타워2.png"],
    },
    {
      title: "로또 번호 생성기",
      period: "2025.11 - 2025.12",
      company: "개인 프로젝트 (Cursor AI 활용)",
      description:
        "통계 분석 기반의 지능형 로또 번호 추천 서비스입니다. 과거 당첨 번호 데이터를 체계적으로 분석하여 더 나은 번호 선택을 돕는 웹 애플리케이션입니다.",
      tasks: [
        "Next.js 기반 풀스택 웹 애플리케이션 설계 및 개발",
        "로또 당첨 번호 데이터 수집 및 저장 시스템 구축 (Firebase)",
        "통계 분석 알고리즘 개발 (출현 빈도, 구간 분포, 패턴 분석)",
        "세 가지 번호 생성 방식 구현 (랜덤, 통계 기반, 패턴 기반)",
        "React + TypeScript를 활용한 컴포넌트 기반 UI 개발",
        "Firebase를 활용한 서버리스 백엔드 구축",
      ],
      technical: [
        "데이터 분석: 대량의 당첨 번호 데이터를 효율적으로 분석하는 알고리즘 구현",
        "실시간 업데이트: 매주 당첨 번호 자동 수집 및 통계 갱신 시스템",
        "사용자 경험: 직관적인 UI/UX로 복잡한 통계 데이터를 쉽게 이해할 수 있도록 설계",
      ],
      achievements: [
        "회원가입 없이 무료로 사용 가능한 접근성 높은 서비스 제공",
        "다양한 통계 분석 기능으로 사용자에게 유용한 정보 제공",
        "Firebase 기반 안정적인 서비스 운영",
        "TypeScript를 활용한 타입 안정성 확보 및 유지보수성 향상",
      ],
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "TypeScript",
        "Next.js",
        "Firebase",
        "Cursor AI",
      ],
      link: "https://lotto-generato.web.app/",
      images: [
        "Images/Lotto/lotto.png",
        "Images/Lotto/lotto2.png",
        "Images/Lotto/lotto3.png",
      ],
    },
    {
      title: "토론 플랫폼",
      period: "2025.11 - 2025.12",
      company: "JAVA(Spring Boot), React 교육 팀 프로젝트 (4명 + AI 활용)",
      description:
        "온라인 토론 커뮤니티 플랫폼입니다. 사용자들이 다양한 주제에 대해 토론하고 의견을 교환할 수 있는 웹 서비스입니다.",
      tasks: [
        "팀 프로젝트에서 백엔드 및 인프라 구축 담당",
        "Spring Boot 기반 RESTful API 설계 및 개발",
        "WebSocket을 활용한 실시간 토론 및 의견 교환 기능 구현",
        "사용자 인증 및 권한 관리 시스템 개발 (JWT 기반)",
        "AWS EC2, Ubuntu, nginx를 활용한 서버 인프라 구축 및 배포",
        "데이터베이스 설계 및 최적화",
      ],
      technical: [
        "실시간 통신: WebSocket을 활용한 실시간 메시징 시스템 구현",
        "서버 인프라: AWS 기반 안정적인 서버 환경 구축 및 운영",
        "보안: JWT 기반 인증 시스템으로 안전한 사용자 인증 구현",
      ],
      achievements: [
        "팀 프로젝트에서 백엔드 및 인프라 전반을 담당하여 안정적인 서비스 구축",
        "실시간 토론 기능으로 사용자 간 활발한 소통 환경 제공",
        "AWS 기반 인프라로 확장 가능하고 안정적인 서비스 운영",
        "팀 협업 경험을 통한 협업 능력 및 커뮤니케이션 스킬 향상",
      ],
      tech: [
        "Team Collaboration",
        "HTML5",
        "CSS3",
        "React",
        "JAVA(Spring Boot)",
        "WebSocket",
        "AWS",
        "Linux(Ubuntu, nginx)",
        "Cursor AI",
      ],
      link: "https://debate.me.kr/",
      images: [
        "Images/Debate/debate.png",
        "Images/Debate/debate1.png",
        "Images/Debate/debate2.png",
      ],
    },
  ];

  personalProjects.forEach((project) => {
    const slide = pptx.addSlide();
    slide.background = { color: colors.bgPrimary };
    slide.transition = { type: "fade", duration: 400 };

    // 개인 프로젝트 카드 배경
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.3,
      w: 9,
      h: 6.2,
      fill: { color: colors.bgCard },
      line: { color: colors.borderColor, width: 1 },
      rectRadius: 0.1,
    });

    // 왼쪽 녹색 테두리 (4px)
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.3,
      w: 0.1,
      h: 6.2,
      fill: { color: colors.terminalGreen },
    });

    // 번개 아이콘 (상단 오른쪽)
    slide.addText("⚡", {
      x: 8.5,
      y: 0.4,
      w: 0.8,
      h: 0.4,
      fontSize: 24,
      fontFace: fontFamily,
      color: colors.terminalGreen,
      align: "right",
    });

    // 프로젝트 제목
    slide.addText(`> ${project.title}`, {
      x: 0.7,
      y: 0.5,
      w: 6,
      h: 0.4,
      fontSize: 24,
      fontFace: fontFamily,
      color: colors.terminalGreen,
      bold: true,
    });

    // 기간
    slide.addText(project.period, {
      x: 6.7,
      y: 0.5,
      w: 2.6,
      h: 0.4,
      fontSize: 12,
      fontFace: fontFamily,
      color: colors.textMuted,
      align: "right",
    });

    // 회사명
    slide.addText(project.company, {
      x: 0.7,
      y: 0.95,
      w: 8.6,
      h: 0.25,
      fontSize: 12,
      fontFace: fontFamily,
      color: colors.textPrimary,
      bold: true,
    });

    // 설명
    slide.addText(project.description, {
      x: 0.7,
      y: 1.3,
      w: 8.6,
      h: 0.5,
      fontSize: 12,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
    });

    // 구분선
    slide.addShape(pptx.ShapeType.line, {
      x: 0.7,
      y: 1.9,
      w: 8.6,
      h: 0,
      line: { color: colors.borderColor, width: 1 },
    });

    // 담당 업무 (왼쪽)
    slide.addText("담당 업무", {
      x: 0.7,
      y: 2.1,
      w: 4,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.accentPrimary,
      bold: true,
    });

    const tasksText = project.tasks.map((task, idx) => `▸ ${task}`).join("\n");
    slide.addText(tasksText, {
      x: 0.7,
      y: 2.4,
      w: 4.2,
      h: 1.8,
      fontSize: 10,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
      lineSpacing: 18,
    });

    // 기술적 도전과 해결 (오른쪽)
    slide.addText("기술적 도전과 해결", {
      x: 5,
      y: 2.1,
      w: 4.3,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.accentPrimary,
      bold: true,
    });

    const technicalText = project.technical
      .map((item, idx) => {
        const parts = item.split(":");
        return parts.length > 1 ? `▸ ${parts[0]}: ${parts[1]}` : `▸ ${item}`;
      })
      .join("\n");
    slide.addText(technicalText, {
      x: 5,
      y: 2.4,
      w: 4.3,
      h: 1.8,
      fontSize: 9,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
      lineSpacing: 16,
    });

    // 주요 성과
    slide.addText("주요 성과", {
      x: 0.7,
      y: 4.4,
      w: 4.2,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.accentPrimary,
      bold: true,
    });

    const achievementsText = project.achievements
      .map((achievement, idx) => `▸ ${achievement}`)
      .join("\n");
    slide.addText(achievementsText, {
      x: 0.7,
      y: 4.7,
      w: 4.2,
      h: 1,
      fontSize: 10,
      fontFace: fontFamily,
      color: colors.textSecondary,
      valign: "top",
      lineSpacing: 18,
    });

    // 프로젝트 이미지 (오른쪽)
    if (project.images && project.images.length > 0) {
      const imagePath = path.join(__dirname, project.images[0]);
      if (fs.existsSync(imagePath)) {
        slide.addImage({
          path: imagePath,
          x: 5.2,
          y: 4.4,
          w: 4.1,
          h: 1.3,
          rounding: true,
        });
      }
    }

    // 기술 스택 (노란색)
    const techText = project.tech.join("  ");
    slide.addText(techText, {
      x: 0.7,
      y: 5.9,
      w: 8.6,
      h: 0.3,
      fontSize: 9,
      fontFace: fontFamily,
      color: colors.terminalYellow,
      valign: "middle",
    });

    // 링크 (있는 경우)
    if (project.link) {
      slide.addText(`🔗 ${project.link}`, {
        x: 0.7,
        y: 6.2,
        w: 8.6,
        h: 0.25,
        fontSize: 10,
        fontFace: fontFamily,
        color: colors.accentPrimary,
        valign: "middle",
      });
    }
  });
}

// 슬라이드 11: Skills
function createSkillsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: colors.bgSecondary };
  slide.transition = { type: "fade", duration: 400 };

  // 제목
  slide.addText("// Technical Skills", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 32,
    fontFace: fontFamily,
    color: colors.textPrimary,
    bold: true,
    align: "center",
  });

  const skills = [
    {
      category: "Backend Development",
      items: [
        { name: ".NET Core(C#)", level: 80 },
        { name: "ASP.NET(C#)", level: 85 },
        { name: "JAVA(Spring Boot)", level: 60 },
        { name: "REST API", level: 80 },
        { name: "Classic ASP", level: 80 },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MS-SQL", level: 70 },
        { name: "MySQL", level: 50 },
        { name: "NoSQL", level: 50 },
      ],
    },
    {
      category: "Frontend Development",
      items: [
        { name: "React", level: 60 },
        { name: "jQuery", level: 80 },
        { name: "JavaScript", level: 80 },
        { name: "HTML5", level: 75 },
        { name: "CSS3", level: 50 },
        { name: "Canvas API", level: 50 },
      ],
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git/GitHub", level: 60 },
        { name: "Jira", level: 50 },
        { name: "C/C++", level: 30 },
      ],
    },
  ];

  let xPos = 0.5;
  const categoryWidth = 2.25;

  skills.forEach((skillCategory) => {
    // 카테고리 제목
    slide.addText(`> ${skillCategory.category}`, {
      x: xPos,
      y: 1.1,
      w: categoryWidth,
      h: 0.35,
      fontSize: 15,
      fontFace: fontFamily,
      color: colors.terminalGreen,
      bold: true,
    });

    // 스킬 항목들
    let yPos = 1.55;
    skillCategory.items.forEach((skill) => {
      // 스킬 아이템 카드 배경
      slide.addShape(pptx.ShapeType.rect, {
        x: xPos,
        y: yPos - 0.05,
        w: categoryWidth,
        h: 0.45,
        fill: { color: colors.bgCard },
        line: { color: colors.borderColor, width: 1 },
        rectRadius: 0.1,
      });

      // 스킬 이름
      slide.addText(skill.name, {
        x: xPos + 0.1,
        y: yPos,
        w: categoryWidth - 0.2,
        h: 0.2,
        fontSize: 10,
        fontFace: fontFamily,
        color: colors.textPrimary,
        bold: true,
      });

      // 진행률 바 배경
      slide.addShape(pptx.ShapeType.rect, {
        x: xPos + 0.1,
        y: yPos + 0.22,
        w: categoryWidth - 0.2,
        h: 0.08,
        fill: { color: colors.bgTertiary },
        line: { color: colors.borderColor, width: 1 },
        rectRadius: 0.02,
      });

      // 진행률 바 (그라데이션 효과를 위해 녹색 사용)
      const progressWidth = ((categoryWidth - 0.2) * skill.level) / 100;
      slide.addShape(pptx.ShapeType.rect, {
        x: xPos + 0.1,
        y: yPos + 0.22,
        w: progressWidth,
        h: 0.08,
        fill: { color: colors.terminalGreen },
        rectRadius: 0.02,
      });

      yPos += 0.5;
    });

    xPos += categoryWidth;
  });
}

// 슬라이드 12: Contact
function createContactSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: colors.bgPrimary };
  slide.transition = { type: "fade", duration: 400 };

  // 제목
  slide.addText("// Contact", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 32,
    fontFace: fontFamily,
    color: colors.textPrimary,
    bold: true,
    align: "center",
  });

  // 연락처 정보 영역 (왼쪽, 1fr)
  const contactInfo = [
    { icon: "📞", label: "Phone", value: "010-9344-4047" },
    { icon: "✉️", label: "Email", value: "dbclqn@gmail.com" },
    { icon: "📍", label: "Location", value: "경기도 광주시 고산동" },
  ];

  let yPos = 1.5;
  contactInfo.forEach((contact) => {
    // 연락처 아이템 카드
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: yPos - 0.1,
      w: 3,
      h: 0.7,
      fill: { color: colors.bgCard },
      line: { color: colors.borderColor, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText(`${contact.icon} ${contact.label}`, {
      x: 0.7,
      y: yPos,
      w: 2.6,
      h: 0.25,
      fontSize: 14,
      fontFace: fontFamily,
      color: colors.terminalGreen,
      bold: true,
    });

    slide.addText(contact.value, {
      x: 0.7,
      y: yPos + 0.3,
      w: 2.6,
      h: 0.25,
      fontSize: 12,
      fontFace: fontFamily,
      color: colors.textPrimary,
    });

    yPos += 0.9;
  });

  // 메시지 영역 (오른쪽, 2fr)
  slide.addText("> 함께 일하고 싶습니다", {
    x: 4,
    y: 1.5,
    w: 5.5,
    h: 0.3,
    fontSize: 18,
    fontFace: fontFamily,
    color: colors.terminalGreen,
    bold: true,
  });

  const message = `웹 개발 경험과 백엔드, DB, 프론트엔드 등 풍부한 기술 스택 경험을 바탕으로 안정적이고 확장 가능한 웹 서비스 개발에 기여하고 싶습니다.

서비스의 안정성과 유지보수성을 최우선으로 고려하며, 복잡한 시스템 구조 속에서도 문제의 본질을 파악하고 해결책을 찾아내는 것이 저의 강점입니다.`;

  slide.addText(message, {
    x: 4,
    y: 1.9,
    w: 5.5,
    h: 2.5,
    fontSize: 13,
    fontFace: fontFamily,
    color: colors.textSecondary,
    valign: "top",
    lineSpacing: 24,
  });
}

// 메인 함수
async function convertHtmlToPptx() {
  console.log("PPTX 변환을 시작합니다...");

  try {
    // 슬라이드 생성
    createHeroSlide(); // 슬라이드 1
    createAboutSlide(); // 슬라이드 2
    createExperienceSlide(); // 슬라이드 3
    createProjectSlides(); // 슬라이드 4-7
    createPersonalProjectSlides(); // 슬라이드 8-10
    createSkillsSlide(); // 슬라이드 11
    createContactSlide(); // 슬라이드 12

    // 프레젠테이션 속성 설정
    pptx.author = "유치부";
    pptx.company = "개발자 포트폴리오";
    pptx.title = "개발자 포트폴리오 - 웹/백엔드 개발자";
    pptx.subject = "포트폴리오";
    pptx.layout = "LAYOUT_WIDE"; // 와이드 레이아웃

    // 출력 파일 경로
    const outputFile = path.join(__dirname, "portfolio_ycb.pptx");

    // PPTX 파일 저장
    await pptx.writeFile({ fileName: outputFile });

    console.log("✅ PPTX 변환이 완료되었습니다!");
    console.log("출력 파일:", outputFile);
  } catch (error) {
    console.error("❌ PPTX 변환 중 오류가 발생했습니다:", error);
    process.exit(1);
  }
}

// 실행
convertHtmlToPptx();
