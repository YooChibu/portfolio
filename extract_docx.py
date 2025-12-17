import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_docx_text(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as z:
            # word/document.xml 파일 읽기
            doc = z.read('word/document.xml')
            root = ET.fromstring(doc)
            
            # 네임스페이스 정의
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            # 모든 텍스트 요소 찾기
            texts = []
            for t in root.findall('.//w:t', ns):
                if t.text and t.text.strip():
                    texts.append(t.text.strip())
            
            return '\n'.join(texts)
    except Exception as e:
        return f"오류 발생: {str(e)}"

if __name__ == "__main__":
    result = extract_docx_text('File/유치부_이력서.docx')
    print(result)


