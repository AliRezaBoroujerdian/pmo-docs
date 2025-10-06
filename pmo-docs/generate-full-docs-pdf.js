const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// خواندن فایل‌های معماری از پوشه docs
const architectureFiles = [
  'docs/architecture/introduction.md',
  'docs/architecture/logical-view.md',
  'docs/architecture/process-view.md',
  'docs/architecture/development-view.md',
  'docs/architecture/physical-view.md',
  'docs/architecture/scenario-view.md',
  'docs/architecture/document-template.md',
  'docs/architecture/checklist-guide.md',
  'docs/architecture/important-notes.md',
  'docs/architecture/references.md'
];

const codeQualityFiles = [
  'docs/code-quality/introduction.md',
  'docs/code-quality/coding-standards.md',
  'docs/code-quality/static-analysis-tools.md',
  'docs/code-quality/testing-strategies.md',
  'docs/code-quality/code-review.md',
  'docs/code-quality/ci-cd-automation.md'
];

async function generateFullDocumentPDF() {
  try {
    console.log('🚀 شروع تولید PDF کامل از فایل‌های محلی...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    // ایجاد پوشه خروجی
    const outputDir = './pdf-output';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // خواندن لوگو
    const logoPath = path.join('static', 'img', 'maritime-logo.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // تولید PDF کامل سند معماری
    await generateArchitecturePDF(page, outputDir, logoBase64);
    
    // تولید PDF کامل کنترل کیفیت کد
    await generateCodeQualityPDF(page, outputDir, logoBase64);
    
    // تولید PDF کامل تمام مستندات
    await generateCompletePDF(page, outputDir, logoBase64);
    
    await browser.close();
    console.log('🎉 تولید تمام PDF ها تمام شد!');
    
  } catch (error) {
    console.error('❌ خطا در تولید PDF:', error);
  }
}

async function generateArchitecturePDF(page, outputDir, logoBase64) {
  console.log('📖 تولید PDF کامل سند معماری...');
  
  let combinedContent = generatePDFHeader('الگوی سند معماری نرم‌افزار', logoBase64);
  
  // اضافه کردن فهرست مطالب
  combinedContent += `
    <div class="toc page-break">
      <h2>فهرست مطالب</h2>
      <div class="toc-item">1. مقدمه و چشم‌انداز کلی</div>
      <div class="toc-item">2. نمای منطقی (Logical View)</div>
      <div class="toc-item">3. نمای فرآیند (Process View)</div>
      <div class="toc-item">4. نمای توسعه (Development View)</div>
      <div class="toc-item">5. نمای فیزیکی (Physical View)</div>
      <div class="toc-item">6. نمای سناریو (Scenario View)</div>
      <div class="toc-item">7. قالب مستند معماری</div>
      <div class="toc-item">8. راهنمای چک‌لیست</div>
      <div class="toc-item">9. نکات مهم</div>
      <div class="toc-item">10. منابع و مراجع</div>
    </div>
  `;
  
  // خواندن و اضافه کردن محتوای هر فایل
  for (const [index, filePath] of architectureFiles.entries()) {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // حذف front matter و import ها
      content = cleanMarkdownContent(content);
      
      // تبدیل markdown به HTML ساده
      content = convertSimpleMarkdownToHTML(content);
      
      if (index > 0) {
        combinedContent += `<div class="page-break"></div>`;
      }
      
      combinedContent += `<div class="section">${content}</div>`;
    }
  }
  
  combinedContent += '</body></html>';
  
  await page.setContent(combinedContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(outputDir, 'الگوی-سند-معماری-کامل.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: generatePDFHeaderTemplate('الگوی سند معماری نرم‌افزار'),
    footerTemplate: generatePDFFooterTemplate()
  });
  
  console.log(`✅ PDF معماری تولید شد: ${pdfPath}`);
}

async function generateCodeQualityPDF(page, outputDir, logoBase64) {
  console.log('🔍 تولید PDF کامل کنترل کیفیت کد...');
  
  let combinedContent = generatePDFHeader('راهنمای کنترل کیفیت کد', logoBase64);
  
  // اضافه کردن فهرست مطالب
  combinedContent += `
    <div class="toc page-break">
      <h2>فهرست مطالب</h2>
      <div class="toc-item">1. مقدمه و اهمیت کیفیت کد</div>
      <div class="toc-item">2. استانداردهای کدنویسی</div>
      <div class="toc-item">3. ابزارهای تحلیل استاتیک</div>
      <div class="toc-item">4. استراتژی‌های تست</div>
      <div class="toc-item">5. فرآیند بررسی کد</div>
      <div class="toc-item">6. اتوماسیون CI/CD</div>
    </div>
  `;
  
  // خواندن و اضافه کردن محتوای هر فایل
  for (const [index, filePath] of codeQualityFiles.entries()) {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // حذف front matter و import ها
      content = cleanMarkdownContent(content);
      
      // تبدیل markdown به HTML ساده
      content = convertSimpleMarkdownToHTML(content);
      
      if (index > 0) {
        combinedContent += `<div class="page-break"></div>`;
      }
      
      combinedContent += `<div class="section">${content}</div>`;
    }
  }
  
  combinedContent += '</body></html>';
  
  await page.setContent(combinedContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(outputDir, 'راهنمای-کنترل-کیفیت-کد-کامل.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: generatePDFHeaderTemplate('راهنمای کنترل کیفیت کد'),
    footerTemplate: generatePDFFooterTemplate()
  });
  
  console.log(`✅ PDF کیفیت کد تولید شد: ${pdfPath}`);
}

async function generateCompletePDF(page, outputDir, logoBase64) {
  console.log('📚 تولید PDF کامل تمام مستندات...');
  
  let combinedContent = generatePDFHeader('مستندات کامل سازمان بنادر و دریانوردی', logoBase64);
  
  // فهرست مطالب کلی
  combinedContent += `
    <div class="toc page-break">
      <h2>فهرست کلی مطالب</h2>
      <div style="margin: 20px 0;">
        <h3 style="color: #059669;">بخش اول: الگوی سند معماری</h3>
        <div class="toc-item">1. مقدمه و چشم‌انداز کلی</div>
        <div class="toc-item">2. نمای منطقی (Logical View)</div>
        <div class="toc-item">3. نمای فرآیند (Process View)</div>
        <div class="toc-item">4. نمای توسعه (Development View)</div>
        <div class="toc-item">5. نمای فیزیکی (Physical View)</div>
        <div class="toc-item">6. نمای سناریو (Scenario View)</div>
        <div class="toc-item">7. قالب مستند معماری</div>
        <div class="toc-item">8. راهنمای چک‌لیست</div>
        <div class="toc-item">9. نکات مهم</div>
        <div class="toc-item">10. منابع و مراجع</div>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #7c3aed;">بخش دوم: کنترل کیفیت کد</h3>
        <div class="toc-item">1. مقدمه و اهمیت کیفیت کد</div>
        <div class="toc-item">2. استانداردهای کدنویسی</div>
        <div class="toc-item">3. ابزارهای تحلیل استاتیک</div>
        <div class="toc-item">4. استراتژی‌های تست</div>
        <div class="toc-item">5. فرآیند بررسی کد</div>
        <div class="toc-item">6. اتوماسیون CI/CD</div>
      </div>
    </div>
  `;
  
  // بخش معماری
  combinedContent += `<div class="page-break section-divider">
    <h1 style="color: #059669; text-align: center; font-size: 36px; margin: 100px 0;">
      بخش اول: الگوی سند معماری نرم‌افزار
    </h1>
  </div>`;
  
  for (const [index, filePath] of architectureFiles.entries()) {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = cleanMarkdownContent(content);
      content = convertSimpleMarkdownToHTML(content);
      
      if (index > 0) {
        combinedContent += `<div class="page-break"></div>`;
      }
      
      combinedContent += `<div class="section">${content}</div>`;
    }
  }
  
  // بخش کیفیت کد
  combinedContent += `<div class="page-break section-divider">
    <h1 style="color: #7c3aed; text-align: center; font-size: 36px; margin: 100px 0;">
      بخش دوم: راهنمای کنترل کیفیت کد
    </h1>
  </div>`;
  
  for (const [index, filePath] of codeQualityFiles.entries()) {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = cleanMarkdownContent(content);
      content = convertSimpleMarkdownToHTML(content);
      
      combinedContent += `<div class="page-break"></div>`;
      combinedContent += `<div class="section">${content}</div>`;
    }
  }
  
  combinedContent += '</body></html>';
  
  await page.setContent(combinedContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(outputDir, 'مستندات-کامل-سازمان-بنادر-و-دریانوردی.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: generatePDFHeaderTemplate('مستندات کامل - سازمان بنادر و دریانوردی'),
    footerTemplate: generatePDFFooterTemplate()
  });
  
  console.log(`✅ PDF کامل تولید شد: ${pdfPath}`);
}

function generatePDFHeader(title, logoBase64) {
  return `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
            font-family: 'Vazirmatn', sans-serif;
            direction: rtl;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 20px;
            background: white;
            font-size: 14px;
            line-height: 1.8;
            color: #333;
        }
        
        .cover-page {
            text-align: center;
            padding: 80px 20px;
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            margin: -20px -20px 40px -20px;
            position: relative;
        }
        
        .logo {
            width: 120px;
            height: 120px;
            margin: 0 auto 30px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        
        .logo img {
            width: 80px;
            height: 80px;
            object-fit: contain;
        }
        
        .cover-title {
            font-size: 42px;
            font-weight: 800;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .cover-subtitle {
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 40px;
            opacity: 0.9;
        }
        
        .cover-org {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        .cover-date {
            font-size: 16px;
            opacity: 0.8;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .section-divider {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            margin: -20px;
            padding: 40px;
            border-radius: 10px;
        }
        
        .toc {
            margin: 40px 0;
            background: #f8fafc;
            padding: 30px;
            border-radius: 10px;
        }
        
        .toc h2 {
            color: #1e3a8a;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 15px;
            margin-bottom: 25px;
            font-size: 24px;
        }
        
        .toc h3 {
            margin: 20px 0 10px 0;
            font-size: 18px;
        }
        
        .toc-item {
            margin: 12px 0;
            padding: 12px 20px;
            border-right: 4px solid #3b82f6;
            background: white;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-weight: 500;
        }
        
        .section {
            margin: 40px 0;
            padding: 20px 0;
        }
        
        h1 {
            color: #1e3a8a;
            font-size: 28px;
            font-weight: 700;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        
        h2 {
            color: #059669;
            font-size: 22px;
            font-weight: 600;
            margin: 30px 0 20px 0;
            border-right: 4px solid #10b981;
            padding-right: 15px;
        }
        
        h3 {
            color: #7c3aed;
            font-size: 18px;
            font-weight: 600;
            margin: 25px 0 15px 0;
        }
        
        p {
            margin: 15px 0;
            text-align: justify;
        }
        
        ul, ol {
            margin: 15px 0;
            padding-right: 25px;
        }
        
        li {
            margin: 8px 0;
            line-height: 1.6;
        }
        
        strong {
            color: #1e3a8a;
            font-weight: 600;
        }
        
        code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #7c3aed;
        }
        
        pre {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-right: 4px solid #3b82f6;
            overflow-x: auto;
            margin: 20px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        th, td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: right;
        }
        
        th {
            background: #3b82f6;
            color: white;
            font-weight: 600;
        }
        
        tr:nth-child(even) {
            background: #f8fafc;
        }
        
        blockquote {
            border-right: 4px solid #f59e0b;
            background: #fffbeb;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 6px;
        }
        
        .note {
            background: #dbeafe;
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        
        .warning {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="cover-page">
        ${logoBase64 ? `
        <div class="logo">
            <img src="${logoBase64}" alt="لوگو سازمان بنادر و دریانوردی" />
        </div>
        ` : ''}
        <div class="cover-title">${title}</div>
        <div class="cover-subtitle">سیستم مدیریت اسناد و فرآیندهای سازمانی</div>
        <div class="cover-org">سازمان بنادر و دریانوردی ایران</div>
        <div class="cover-date">تاریخ تولید: ${new Date().toLocaleDateString('fa-IR')}</div>
    </div>
`;
}

function generatePDFHeaderTemplate(title) {
  return `
    <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl; padding: 5px;">
      ${title} - سازمان بنادر و دریانوردی
    </div>
  `;
}

function generatePDFFooterTemplate() {
  return `
    <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl; padding: 5px;">
      صفحه <span class="pageNumber"></span> از <span class="totalPages"></span>
    </div>
  `;
}

function cleanMarkdownContent(content) {
  // حذف front matter
  content = content.replace(/^---[\s\S]*?---\n/m, '');
  
  // حذف import statements
  content = content.replace(/^import .+$/gm, '');
  
  // حذف JSX components
  content = content.replace(/<DownloadPDF[\s\S]*?\/>/g, '');
  
  // حذف خطوط خالی اضافی
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return content.trim();
}

function convertSimpleMarkdownToHTML(content) {
  // تبدیل headings
  content = content.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  content = content.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  content = content.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // تبدیل bold
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // تبدیل inline code
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // تبدیل links
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // تبدیل code blocks
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```\w*\n?/, '').replace(/```$/, '');
    return `<pre><code>${code}</code></pre>`;
  });
  
  // تبدیل paragraphs
  const lines = content.split('\n');
  let inList = false;
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(`<li>${line.substring(2)}</li>`);
    } else if (line.match(/^\d+\. /)) {
      if (!inList) {
        result.push('<ol>');
        inList = true;
      }
      result.push(`<li>${line.replace(/^\d+\. /, '')}</li>`);
    } else {
      if (inList) {
        result.push(inList === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      
      if (line && !line.startsWith('<')) {
        result.push(`<p>${line}</p>`);
      } else if (line.startsWith('<')) {
        result.push(line);
      }
    }
  }
  
  if (inList) {
    result.push('</ul>');
  }
  
  return result.join('\n');
}

// اجرای تولید PDF
generateFullDocumentPDF().catch(console.error);