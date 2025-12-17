const puppeteer = require('puppeteer');
const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function convertHtmlToPptx() {
  const htmlFile = path.join(__dirname, 'index_ycb.html');
  const outputFile = path.join(__dirname, 'portfolio_ycb.pptx');

  // HTML 파일이 존재하는지 확인
  if (!fs.existsSync(htmlFile)) {
    console.error('HTML 파일을 찾을 수 없습니다:', htmlFile);
    process.exit(1);
  }

  console.log('PPTX 변환을 시작합니다...');
  console.log('입력 파일:', htmlFile);
  console.log('출력 파일:', outputFile);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // HTML 파일을 로드
    const fileUrl = `file://${htmlFile.replace(/\\/g, '/')}`;
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // 각 섹션을 스크린샷으로 캡처
    const sections = [
      { id: 'home', name: '홈' },
      { id: 'about', name: '소개' },
      { id: 'experience', name: '경력' },
      { id: 'skills', name: '기술스택' },
      { id: 'projects', name: '프로젝트' },
      { id: 'personal-projects', name: '개인 프로젝트' },
      { id: 'contact', name: '연락처' }
    ];

    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE'; // 16:9 비율

    const tempFiles = [];

    for (const section of sections) {
      try {
        const element = await page.$(`#${section.id}`);
        if (element) {
          const screenshot = await element.screenshot({ type: 'png' });
          
          // 임시 파일로 저장
          const tempFile = path.join(__dirname, `temp_${section.id}.png`);
          fs.writeFileSync(tempFile, screenshot);
          tempFiles.push(tempFile);
          
          const slide = pptx.addSlide();
          slide.background = { path: tempFile };
          slide.addText(section.name, {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: 'FFFFFF',
            align: 'center',
            shadow: { type: 'outer', angle: 45, blur: 3, offset: 2, color: '000000' }
          });
        }
      } catch (err) {
        console.warn(`섹션 ${section.name} 처리 중 오류:`, err.message);
      }
    }

    await pptx.writeFile({ fileName: outputFile });

    // 모든 작업 완료 후 임시 파일 삭제
    tempFiles.forEach(file => {
      try {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      } catch (err) {
        console.warn(`임시 파일 삭제 실패: ${file}`, err.message);
      }
    });
    console.log('✅ PPTX 변환이 완료되었습니다!');
    console.log('출력 파일:', outputFile);
  } catch (error) {
    console.error('❌ PPTX 변환 중 오류가 발생했습니다:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

convertHtmlToPptx();

