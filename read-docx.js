const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

const docxPath = path.join(__dirname, 'File', '유치부_이력서.docx');

try {
  console.log('📄 .docx 파일 읽기 시작...\n');
  
  // ZIP 파일 열기
  const zip = new AdmZip(docxPath);
  
  // word/document.xml 파일 읽기
  const documentXml = zip.readAsText('word/document.xml');
  
  // XML 파싱
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseAttributeValue: true
  });
  
  const doc = parser.parse(documentXml);
  
  // 텍스트 추출 함수
  function extractText(node, texts = []) {
    if (typeof node === 'string') {
      if (node.trim()) {
        texts.push(node.trim());
      }
    } else if (Array.isArray(node)) {
      node.forEach(item => extractText(item, texts));
    } else if (typeof node === 'object' && node !== null) {
      // w:t 태그의 텍스트 추출
      if (node['w:t']) {
        const text = node['w:t']['#text'] || node['w:t'];
        if (typeof text === 'string' && text.trim()) {
          texts.push(text.trim());
        }
      }
      // 재귀적으로 모든 속성 탐색
      Object.values(node).forEach(value => {
        if (value && typeof value === 'object') {
          extractText(value, texts);
        }
      });
    }
    return texts;
  }
  
  // 텍스트 추출
  const allTexts = extractText(doc);
  
  // 중복 제거 및 정리
  const uniqueTexts = [...new Set(allTexts.filter(t => t && t.length > 0))];
  
  console.log('='.repeat(60));
  console.log('📋 이력서 내용:');
  console.log('='.repeat(60));
  console.log(uniqueTexts.join('\n'));
  console.log('='.repeat(60));
  console.log(`\n총 ${uniqueTexts.length}개의 텍스트 요소를 추출했습니다.`);
  
} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  console.error(error.stack);
}
