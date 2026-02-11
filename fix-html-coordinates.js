const fs = require('fs');
const path = require('path');

// HTML 파일의 좌표와 폰트 크기를 수정
function fixHTMLFile(htmlPath) {
    let content = fs.readFileSync(htmlPath, 'utf8');
    
    // 폰트 크기와 좌표를 수정하는 정규식
    // font-size: 1.4pt -> 10pt (약 7배 증가)
    // top 좌표를 조정 (페이지 패딩 고려)
    
    // 모든 font-size를 찾아서 수정
    content = content.replace(/font-size:\s*([\d.]+)pt/g, (match, size) => {
        const originalSize = parseFloat(size);
        // 최소 8pt로 설정하고, 원래 크기의 7배로 증가
        const newSize = Math.max(originalSize * 7, 8);
        return `font-size: ${newSize.toFixed(1)}pt`;
    });
    
    // top 좌표를 조정 (페이지 패딩 20mm 고려, 좌표를 위로 이동)
    content = content.replace(/top:\s*([\d.]+)mm/g, (match, top) => {
        const originalTop = parseFloat(top);
        // top이 250mm 이상이면 페이지 밖이므로 조정
        // 실제로는 PDF의 Y 좌표가 아래에서 위로 계산되므로 역변환 필요
        // 페이지 높이 297mm - 패딩 20mm * 2 = 257mm가 실제 콘텐츠 영역
        // Y 좌표를 역으로 변환 (297 - originalTop)
        const adjustedTop = 297 - originalTop;
        // 패딩을 고려하여 조정
        const newTop = Math.max(20, Math.min(adjustedTop - 50, 250));
        return `top: ${newTop.toFixed(2)}mm`;
    });
    
    fs.writeFileSync(htmlPath, content, 'utf8');
    console.log(`✅ HTML 파일이 수정되었습니다: ${htmlPath}`);
}

// 실행
const htmlPath = path.join(__dirname, '이력서_20251223.html');
if (fs.existsSync(htmlPath)) {
    fixHTMLFile(htmlPath);
} else {
    console.log('HTML 파일을 찾을 수 없습니다:', htmlPath);
}







