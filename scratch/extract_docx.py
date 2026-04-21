
import xml.etree.ElementTree as ET

def extract_text_from_xml(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # Namespaces
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    texts = []
    for p in root.findall('.//w:p', ns):
        p_text = ""
        for t in p.findall('.//w:t', ns):
            if t.text:
                p_text += t.text
        if p_text:
            texts.append(p_text)
            
    return "\n".join(texts)

if __name__ == "__main__":
    xml_path = r'c:\Users\Jayan\Downloads\Claude_nirmaan_website\temp_docx_content\word\document.xml'
    content = extract_text_from_xml(xml_path)
    with open(r'c:\Users\Jayan\Downloads\Claude_nirmaan_website\extracted_content.txt', 'w', encoding='utf-8') as f:
        f.write(content)
