const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function convertHtmlToPdf() {
  const htmlFile = path.join(__dirname, 'index_ycb.html');
  const outputFile = path.join(__dirname, 'portfolio_ycb.pdf');

  // HTML 파일이 존재하는지 확인
  if (!fs.existsSync(htmlFile)) {
    console.error('HTML 파일을 찾을 수 없습니다:', htmlFile);
    process.exit(1);
  }

  console.log('PDF 변환을 시작합니다...');
  console.log('입력 파일:', htmlFile);
  console.log('출력 파일:', outputFile);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // 데스크탑 User-Agent 설정 (모바일 감지 방지)
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );
    
    // 데스크탑 뷰포트 설정 (모바일 형식 방지)
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false, // 모바일 모드 비활성화
      hasTouch: false // 터치 모드 비활성화
    });
    
    // HTML 파일을 로드 (file:// 프로토콜 사용)
    const fileUrl = `file://${htmlFile.replace(/\\/g, '/')}`;
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // 데스크탑 스타일 강제 적용을 위한 CSS 주입
    await page.evaluate(() => {
      // 모든 미디어 쿼리 스타일시트 비활성화
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.type === CSSRule.MEDIA_RULE) {
              if (rule.media.mediaText.includes('max-width')) {
                // 모바일 미디어 쿼리 비활성화
                rule.media.mediaText = 'all';
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
          min-width: 1200px !important;
          font-size: 16px !important;
        }
        
        .container {
          max-width: 1200px !important;
          width: 100% !important;
          margin: 0 auto !important;
          padding: 0 20px !important;
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
        
        /* 프로젝트 그리드 데스크탑 스타일 */
        .projects-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 2rem !important;
        }
        
        .personal-projects .projects-grid {
          grid-template-columns: 1fr !important;
        }
        
        /* 개인 프로젝트 콘텐츠 래퍼 데스크탑 스타일 */
        .personal-card .project-content-wrapper {
          display: grid !important;
          grid-template-columns: 1fr 300px !important;
          gap: 2rem !important;
        }
        
        .personal-card .project-image {
          width: 300px !important;
          height: 200px !important;
        }
        
        /* 스킬 그리드 데스크탑 스타일 */
        .skills-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
        }
        
        /* 타임라인 데스크탑 스타일 */
        .timeline {
          padding-left: 2rem !important;
        }
        
        .timeline-item {
          padding-left: 3rem !important;
        }
      `
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

    // 모든 visible 클래스가 적용되었는지 확인
    await page.evaluate(() => {
      // 모든 fade-in 요소에 visible 클래스 강제 추가
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
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
        }
      `
    });

    // PDF 생성 (가로 방향, 여백 없음, 헤더/푸터 없음)
    await page.pdf({
      path: outputFile,
      format: 'A4',
      landscape: true, // 가로 방향 설정
      printBackground: true,
      displayHeaderFooter: false, // 헤더와 푸터 표시 안 함
      preferCSSPageSize: false, // CSS 페이지 크기 무시
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      width: '297mm', // A4 가로 크기
      height: '210mm' // A4 세로 크기 (가로 방향)
    });

    console.log('✅ PDF 변환이 완료되었습니다!');
    console.log('출력 파일:', outputFile);
  } catch (error) {
    console.error('❌ PDF 변환 중 오류가 발생했습니다:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

convertHtmlToPdf();

