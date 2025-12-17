const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function convertHtmlToPdf() {
  const htmlFile = path.join(__dirname, "index_ycb.html");
  const outputFile = path.join(__dirname, "portfolio_ycb.pdf");

  // HTML 파일이 존재하는지 확인
  if (!fs.existsSync(htmlFile)) {
    console.error("HTML 파일을 찾을 수 없습니다:", htmlFile);
    process.exit(1);
  }

  console.log("PDF 변환을 시작합니다...");
  console.log("입력 파일:", htmlFile);
  console.log("출력 파일:", outputFile);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // 데스크탑 User-Agent 설정 (모바일 감지 방지)
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // 데스크탑 뷰포트 설정 (모바일 형식 방지)
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false, // 모바일 모드 비활성화
      hasTouch: false, // 터치 모드 비활성화
    });

    // HTML 파일을 로드 (file:// 프로토콜 사용)
    const fileUrl = `file://${htmlFile.replace(/\\/g, "/")}`;
    await page.goto(fileUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // 데스크탑 스타일 강제 적용을 위한 CSS 주입
    await page.evaluate(() => {
      // 모든 미디어 쿼리 스타일시트 비활성화
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach((sheet) => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach((rule) => {
            if (rule.type === CSSRule.MEDIA_RULE) {
              if (rule.media.mediaText.includes("max-width")) {
                // 모바일 미디어 쿼리 비활성화
                rule.media.mediaText = "all";
              }
            }
          });
        } catch (e) {
          // CORS 오류 등은 무시
        }
      });
    });

    await page.addStyleTag({
      content: `
        /* 데스크탑 스타일 강제 적용 */
        * {
          box-sizing: border-box !important;
        }
        
        body {
          min-width: 1800px !important;
          font-size: 16px !important;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
        
        html {
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
        
        .container {
          max-width: 1800px !important;
          width: 100% !important;
          margin: 0 auto !important;
          padding: 0 30px !important;
        }
        
        /* 네비게이션 데스크탑 스타일 */
        .navbar {
          padding: 1rem 0 !important;
        }
        
        .nav-menu {
          display: flex !important;
          flex-direction: row !important;
          position: static !important;
          background: transparent !important;
          width: auto !important;
          height: auto !important;
        }
        
        .hamburger {
          display: none !important;
        }
        
        /* 히어로 섹션 데스크탑 스타일 */
        .hero-container {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 3rem !important;
        }
        
        .hero-content {
          flex: 1 !important;
          text-align: left !important;
        }
        
        .hero-image {
          flex: 0 0 auto !important;
        }
        
        /* hero 섹션을 relative로 설정하여 about 섹션 배치 기준점으로 사용 */
        #home.hero {
          position: relative !important;
          min-height: 100vh !important;
          height: 100vh !important;
          max-height: 100vh !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: stretch !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          overflow: hidden !important;
        }
        
        /* hero-container는 기존 넓이 유지 */
        .hero-container {
          max-width: 1200px !important;
          position: relative !important;
          z-index: 2 !important;
          margin: 0 auto !important;
          padding: 0 30px !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          flex-shrink: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        
        /* About 섹션을 hero 섹션 안으로 이동 */
        #about {
          position: relative !important;
          background: transparent !important;
          background-color: transparent !important;
          padding-top: 2rem !important;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
          margin-top: 0 !important;
          border-bottom: none !important;
          page-break-before: auto !important;
          break-before: auto !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          z-index: 3 !important;
          width: 100% !important;
          min-height: auto !important;
          max-height: none !important;
          flex-shrink: 0 !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        
        /* About 섹션 배경 완전히 투명 */
        .about {
          background: transparent !important;
          background-color: transparent !important;
        }
        
        /* About 섹션의 모든 배경 요소 투명 */
        #about {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
        }
        
        /* About 콘텐츠 배경도 투명 */
        .about-content {
          background: transparent !important;
          background-color: transparent !important;
        }
        
        /* About 텍스트 영역 배경 투명 */
        .about-text {
          background: transparent !important;
          background-color: transparent !important;
        }
        
        /* About 통계 카드 배경은 유지하되 약간 투명하게 */
        .about-stats .stat-item {
          background: rgba(28, 33, 40, 0.5) !important;
        }
        
        /* About 섹션 container는 다른 섹션처럼 적용 (hero-container 넓이와 독립) */
        #about .container {
          max-width: 1800px !important;
          width: 100% !important;
          margin: 0 auto !important;
          padding: 0 30px !important;
          position: relative !important;
        }
        
        /* About Me 제목 위에 구분선 추가 - container에 추가 */
        #about .container::before {
          content: "" !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 30px !important;
          right: 30px !important;
          width: calc(100% - 60px) !important;
          height: 2px !important;
          background: var(--border-color) !important;
          z-index: 1 !important;
        }
        
        /* About Me 제목 스타일 조정 */
        #about .section-title {
          position: relative !important;
          margin-top: 2.5rem !important;
          padding-top: 0.5rem !important;
        }
        
        /* About Me 제목의 기존 ::before 주석 표시는 유지 */
        #about .section-title::before {
          content: "// " !important;
          color: var(--text-muted) !important;
          font-size: 1.5rem !important;
        }
        
        /* About Me 제목의 ::after 그라데이션 바는 유지 */
        #about .section-title::after {
          display: block !important;
        }
        
        /* 프로젝트 그리드 데스크탑 스타일 - 가로 페이지에서 3열 활용 */
        .projects-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1.5rem !important;
        }
        
        .personal-projects .projects-grid {
          grid-template-columns: 1fr !important;
        }
        
        /* 개인 프로젝트 콘텐츠 래퍼 - 세로 방향 (설명 위, 상세 정보 아래) */
        .personal-card .project-content-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 1.5rem !important;
          margin-bottom: 1.5rem !important;
        }
        
        /* 개인 프로젝트 상세 정보 래퍼 - 가로 방향 (담당 업무 왼쪽, 이미지 오른쪽) */
        .personal-card .project-details-wrapper {
          display: flex !important;
          flex-direction: row !important;
          gap: 2rem !important;
          align-items: flex-start !important;
          padding-top: 1.5rem !important;
          border-top: 1px solid var(--border-color) !important;
          margin-top: 0.5rem !important;
        }
        
        /* 개인 프로젝트 상세 정보 영역 */
        .personal-card .project-details-wrapper .project-details {
          flex: 1 !important;
        }
        
        /* 개인 프로젝트 이미지 컨테이너 */
        .personal-card .project-image {
          position: relative !important;
          flex-shrink: 0 !important;
          width: 300px !important;
          min-height: auto !important;
          max-height: none !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        /* 개인 프로젝트 이미지 내부 이미지 - 세로로 쌓기 */
        .personal-card .project-image img {
          width: 100% !important;
          height: auto !important;
          display: block !important;
          position: relative !important;
          transform: none !important;
          margin-bottom: 0.5rem !important;
        }
        
        /* 겹치는 이미지 스타일 제거 (PDF에서는 세로로 쌓기) */
        .personal-card .project-image-overlay,
        .personal-card .project-image-overlay-2 {
          position: relative !important;
          transform: none !important;
          top: auto !important;
          right: auto !important;
          margin-bottom: 0.5rem !important;
        }
        
        /* 스킬 그리드 데스크탑 스타일 - 가로 페이지에서 더 많은 열 활용 */
        .skills-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
          gap: 1rem !important;
        }
        
        /* 스킬 카테고리 그리드 - 가로로 더 많이 배치 */
        .skills-content {
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 2rem !important;
        }
        
        /* 타임라인 데스크탑 스타일 */
        .timeline {
          padding-left: 2rem !important;
        }
        
        .timeline-item {
          padding-left: 3rem !important;
        }
        
        /* hero와 about 섹션은 한 페이지에 함께 표시 */
        #home.hero {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          min-height: 100vh !important;
          height: 100vh !important;
          max-height: 100vh !important;
          page-break-before: auto !important;
          break-before: auto !important;
          page-break-after: auto !important;
          break-after: auto !important;
        }
        
        /* about 섹션은 hero와 함께 유지 */
        #about {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          page-break-before: auto !important;
          break-before: auto !important;
          page-break-after: auto !important;
          break-after: auto !important;
        }
        
        /* hero-container와 about-container는 함께 유지 */
        .hero-container,
        #about .container {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* hero 섹션 다음 섹션이 새 페이지에서 시작하도록 */
        #experience {
          page-break-before: always !important;
          break-before: page !important;
        }
        
        /* 섹션별 페이지 구분 - hero와 about 제외 */
        section:not(#home):not(#about) {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          min-height: 100vh !important; /* 페이지 높이에 맞추기 (A4 가로의 높이) - 배경색이 페이지 전체를 채우도록 */
        }
        
        /* 각 섹션이 새로운 페이지에서 시작하도록 설정 - hero와 about 제외 */
        #projects,
        #personal-projects,
        #skills,
        #contact {
          page-break-before: always !important;
          break-before: page !important;
        }
        
        /* 섹션 제목이 있는 페이지의 상단 여백 줄이기 */
        .section-title {
          margin-top: 0 !important;
          padding-top: 1rem !important;
          margin-bottom: 2rem !important;
        }
        
        /* 섹션 자체의 상단 패딩 줄이기 - hero와 about는 제외 */
        section:not(#home):not(#about) {
          padding-top: 1rem !important;
        }
        
        /* hero 섹션 패딩 조정 - PDF에서는 상하 여백 동일하게 */
        #home.hero {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
          margin-top: 0 !important;
        }
        
        /* hero 섹션 다음 섹션들이 hero 섹션 아래에 보이지 않도록 */
        #experience {
          position: relative !important;
          z-index: 0 !important;
        }
        
        /* hero 섹션의 배경이 최소 100vh를 채우도록 */
        #home.hero::before,
        #home.hero::after {
          min-height: 100vh !important;
          height: 100% !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
        }
        
        /* body와 html의 배경색을 hero 섹션과 동일하게 */
        body {
          background-color: var(--bg-primary) !important;
        }
        
        /* about 섹션 하단 여백 제거 */
        #about .container {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        /* about-content 하단 여백 제거 */
        .about-content {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        /* 프로젝트 카드와 개인 프로젝트 카드가 페이지에서 분리되지 않도록 */
        .project-card,
        .personal-card {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* 페이지 브레이크 후 상단 여백 추가 - 모든 프로젝트 카드와 타임라인 아이템에 기본 여백 */
        .project-card,
        .personal-card,
        .timeline-item {
          page-break-before: auto !important;
          margin-top: 2.5rem !important;
        }
        
        /* 섹션 제목 다음 요소는 여백 제거 */
        .section-title ~ .projects-grid .project-card:first-child,
        .section-title ~ .projects-grid .personal-card:first-child,
        .section-title ~ .timeline .timeline-item:first-child,
        .section-title ~ .skills-content .skills-category:first-child {
          margin-top: 0 !important;
        }
        
        /* 섹션 제목 바로 다음 요소는 여백 없음 */
        .section-title + * .project-card:first-child,
        .section-title + * .personal-card:first-child,
        .section-title + * .timeline-item:first-child {
          margin-top: 0 !important;
        }
      `,
    });

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForTimeout(2000);

    // 모든 애니메이션이 완료되도록 페이지를 스크롤
    // 스크롤 애니메이션이 트리거되도록 페이지 끝까지 스크롤
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            // 스크롤 완료 후 애니메이션이 완료될 때까지 대기
            setTimeout(() => {
              window.scrollTo(0, 0); // 다시 맨 위로
              setTimeout(resolve, 2000); // 추가 대기 시간
            }, 2000);
          }
        }, 100);
      });
    });

    // 모든 fade-in 애니메이션이 완료되도록 추가 대기
    await page.waitForTimeout(3000);

    // about 섹션을 hero 섹션 내부로 이동 (CSS 적용 후)
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      const heroSection = document.querySelector("#home.hero");
      const aboutSection = document.querySelector("#about");

      if (heroSection && aboutSection) {
        // about 섹션의 부모가 hero 섹션이 아닌 경우에만 이동
        if (aboutSection.parentElement !== heroSection) {
          // about 섹션을 hero 섹션 내부로 이동 (hero-container 다음에 배치)
          const heroContainer = heroSection.querySelector(".hero-container");
          if (heroContainer) {
            // hero-container 다음에 about 섹션 삽입
            heroContainer.parentNode.insertBefore(
              aboutSection,
              heroContainer.nextSibling
            );
          } else {
            heroSection.appendChild(aboutSection);
          }
        }

        // about 섹션 스타일 강제 적용
        aboutSection.style.background = "transparent";
        aboutSection.style.backgroundColor = "transparent";
        aboutSection.style.position = "relative";
        aboutSection.style.width = "100%";
      }
    });

    // 모든 visible 클래스가 적용되었는지 확인
    await page.evaluate(() => {
      // 모든 fade-in 요소에 visible 클래스 강제 추가
      document.querySelectorAll(".fade-in").forEach((el) => {
        el.classList.add("visible");
      });

      // 모든 프로젝트 카드와 타임라인 아이템에 기본 상단 여백 추가
      document
        .querySelectorAll(".project-card, .personal-card, .timeline-item")
        .forEach((element) => {
          element.style.marginTop = "2.5rem";
        });

      // 섹션 제목이 있는 경우, 섹션 제목 다음 첫 번째 요소의 여백 제거
      document.querySelectorAll(".section-title").forEach((sectionTitle) => {
        const section = sectionTitle.closest("section");
        if (section) {
          // 섹션 제목 다음 첫 번째 프로젝트 카드나 타임라인 아이템 찾기
          const nextCard = section.querySelector(
            ".section-title ~ .projects-grid .project-card:first-child, " +
              ".section-title ~ .projects-grid .personal-card:first-child, " +
              ".section-title ~ .timeline .timeline-item:first-child"
          );

          if (nextCard) {
            nextCard.style.marginTop = "0";
          } else {
            // 직접 형제 요소 확인
            const container = section.querySelector(".container");
            if (container) {
              const projectsGrid = container.querySelector(".projects-grid");
              const timeline = container.querySelector(".timeline");

              if (
                projectsGrid &&
                sectionTitle.nextElementSibling === projectsGrid
              ) {
                const firstCard = projectsGrid.querySelector(
                  ".project-card:first-child, .personal-card:first-child"
                );
                if (firstCard) {
                  firstCard.style.marginTop = "0";
                }
              }

              if (timeline && sectionTitle.nextElementSibling === timeline) {
                const firstItem = timeline.querySelector(
                  ".timeline-item:first-child"
                );
                if (firstItem) {
                  firstItem.style.marginTop = "0";
                }
              }
            }
          }
        }
      });
    });

    // 최종 대기 (모든 애니메이션 완료)
    await page.waitForTimeout(2000);

    // 헤더, 푸터, terminal-toggle 버튼 숨기기
    await page.addStyleTag({
      content: `
        /* 헤더와 푸터 숨기기 */
        .navbar,
        .footer,
        header,
        footer {
          display: none !important;
        }
        
        /* terminal-toggle 버튼 숨기기 */
        .terminal-toggle,
        button.terminal-toggle {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* 본문 내용만 표시 */
        body {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
        
        /* hero와 about 섹션 하단 여백 완전 제거 */
        #home.hero {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        #about {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        /* about 섹션의 마지막 요소들 하단 여백 제거 */
        #about .about-content {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        #about .about-stats {
          margin-bottom: 0 !important;
        }
        
        #about .stat-item:last-child {
          margin-bottom: 0 !important;
        }
      `,
    });

    // PDF 생성 (가로 방향, 여백 없음, 헤더/푸터 없음)
    await page.pdf({
      path: outputFile,
      format: "A4",
      landscape: true, // 가로 방향 설정
      printBackground: true,
      displayHeaderFooter: false, // 헤더와 푸터 표시 안 함
      preferCSSPageSize: false, // CSS 페이지 크기 무시
      scale: 0.56, // 전체 비율 50%로 조정
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
      width: "297mm", // A4 가로 크기
      height: "210mm", // A4 세로 크기 (가로 방향)
    });

    console.log("✅ PDF 변환이 완료되었습니다!");
    console.log("출력 파일:", outputFile);
  } catch (error) {
    console.error("❌ PDF 변환 중 오류가 발생했습니다:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

convertHtmlToPdf();
