const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateCompletePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // تنظیمات برای RTL و فارسی
  await page.setViewport({ width: 1200, height: 800 });
  
  const baseUrl = 'http://localhost:3000/pmo-docs';
  
  // تمام صفحات معماری
  const architecturePages = [
    'introduction',
    'logical-view',
    'process-view',
    'development-view',
    'physical-view',
    'scenario-view',
    'document-template',
    'checklist-guide',
    'important-notes',
    'references'
  ];
  
  // تمام صفحات کیفیت کد
  const codeQualityPages = [
    'introduction',
    'coding-standards',
    'static-analysis-tools',
    'testing-strategies',
    'code-review',
    'ci-cd-automation'
  ];
  
  // ایجاد پوشه خروجی
  const outputDir = './pdf-output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  // تولید PDF کامل معماری
  console.log('🔄 در حال تولید PDF کامل الگوی سند معماری...');
  let architectureHTML = `
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>الگوی سند معماری - سازمان بنادر و دریانوردی</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Vazirmatn', sans-serif !important;
          direction: rtl;
        }
        
        body {
          margin: 40px;
          line-height: 1.8;
          color: #333;
          font-size: 14px;
        }
        
        h1 {
          color: #1a365d;
          font-size: 24px;
          border-bottom: 3px solid #4299e1;
          padding-bottom: 10px;
          margin-bottom: 30px;
        }
        
        h2 {
          color: #2d3748;
          font-size: 20px;
          margin-top: 40px;
          margin-bottom: 20px;
        }
        
        h3 {
          color: #4a5568;
          font-size: 16px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        
        .page-break {
          page-break-before: always;
        }
        
        .header {
          text-align: center;
          margin-bottom: 50px;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px;
        }
        
        .toc {
          background: #f7fafc;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 40px;
        }
        
        .toc h2 {
          color: #1a365d;
          margin-top: 0;
        }
        
        .toc ul {
          list-style: none;
          padding-right: 0;
        }
        
        .toc li {
          padding: 8px 0;
          border-bottom: 1px dotted #cbd5e0;
        }
        
        code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Cascadia Code', 'Fira Code', monospace !important;
        }
        
        pre {
          background: #1a202c;
          color: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          direction: ltr;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        th, td {
          border: 1px solid #e2e8f0;
          padding: 12px;
          text-align: right;
        }
        
        th {
          background: #edf2f7;
          font-weight: 600;
        }
        
        .note {
          background: #ebf8ff;
          border-right: 4px solid #4299e1;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        
        .warning {
          background: #fffbeb;
          border-right: 4px solid #f6ad55;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>الگوی سند معماری نرم‌افزار</h1>
        <p>سازمان بنادر و دریانوردی ایران</p>
        <p>نسخه 1.0.0 - ${new Date().toLocaleDateString('fa-IR')}</p>
      </div>
      
      <div class="toc">
        <h2>فهرست مطالب</h2>
        <ul>
          <li>1. مقدمه</li>
          <li>2. نمای منطقی</li>
          <li>3. نمای فرآیند</li>
          <li>4. نمای توسعه</li>
          <li>5. نمای فیزیکی</li>
          <li>6. نمای سناریو</li>
          <li>7. قالب مستندات</li>
          <li>8. راهنمای چک‌لیست</li>
          <li>9. نکات مهم</li>
          <li>10. منابع</li>
        </ul>
      </div>
  `;
  
  // دریافت محتوای هر صفحه معماری
  for (let i = 0; i < architecturePages.length; i++) {
    const pageName = architecturePages[i];
    try {
      await page.goto(`${baseUrl}/docs/architecture/${pageName}`, { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      await page.waitForTimeout(2000);
      
      const content = await page.evaluate(() => {
        const main = document.querySelector('main .container article');
        return main ? main.innerHTML : '';
      });
      
      if (i > 0) {
        architectureHTML += '<div class="page-break"></div>';
      }
      architectureHTML += content;
      
      console.log(`✅ محتوای ${pageName} اضافه شد`);
      
    } catch (error) {
      console.error(`❌ خطا در دریافت ${pageName}:`, error.message);
    }
  }
  
  architectureHTML += `
    </body>
    </html>
  `;
  
  // تولید PDF معماری
  await page.setContent(architectureHTML, { waitUntil: 'networkidle0' });
  await page.waitForTimeout(3000);
  
  await page.pdf({
    path: path.join(outputDir, 'الگوی-سند-معماری-کامل.pdf'),
    format: 'A4',
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl;">
        الگوی سند معماری - سازمان بنادر و دریانوردی
      </div>
    `,
    footerTemplate: `
      <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl;">
        صفحه <span class="pageNumber"></span> از <span class="totalPages"></span>
      </div>
    `
  });
  
  console.log('✅ PDF کامل الگوی سند معماری تولید شد');
  
  // تولید PDF کامل کیفیت کد
  console.log('🔄 در حال تولید PDF کامل کنترل کیفیت کد...');
  let codeQualityHTML = `
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>کنترل کیفیت کد - سازمان بنادر و دریانوردی</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Vazirmatn', sans-serif !important;
          direction: rtl;
        }
        
        body {
          margin: 40px;
          line-height: 1.8;
          color: #333;
          font-size: 14px;
        }
        
        h1 {
          color: #1a365d;
          font-size: 24px;
          border-bottom: 3px solid #48bb78;
          padding-bottom: 10px;
          margin-bottom: 30px;
        }
        
        h2 {
          color: #2d3748;
          font-size: 20px;
          margin-top: 40px;
          margin-bottom: 20px;
        }
        
        h3 {
          color: #4a5568;
          font-size: 16px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        
        .page-break {
          page-break-before: always;
        }
        
        .header {
          text-align: center;
          margin-bottom: 50px;
          padding: 30px;
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          border-radius: 10px;
        }
        
        .toc {
          background: #f0fff4;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 40px;
        }
        
        .toc h2 {
          color: #1a365d;
          margin-top: 0;
        }
        
        .toc ul {
          list-style: none;
          padding-right: 0;
        }
        
        .toc li {
          padding: 8px 0;
          border-bottom: 1px dotted #cbd5e0;
        }
        
        code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Cascadia Code', 'Fira Code', monospace !important;
        }
        
        pre {
          background: #1a202c;
          color: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          direction: ltr;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        th, td {
          border: 1px solid #e2e8f0;
          padding: 12px;
          text-align: right;
        }
        
        th {
          background: #edf2f7;
          font-weight: 600;
        }
        
        .note {
          background: #f0fff4;
          border-right: 4px solid #48bb78;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        
        .warning {
          background: #fffbeb;
          border-right: 4px solid #f6ad55;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>کنترل کیفیت کد</h1>
        <p>سازمان بنادر و دریانوردی ایران</p>
        <p>نسخه 1.0.0 - ${new Date().toLocaleDateString('fa-IR')}</p>
      </div>
      
      <div class="toc">
        <h2>فهرست مطالب</h2>
        <ul>
          <li>1. مقدمه</li>
          <li>2. استانداردهای کدنویسی</li>
          <li>3. ابزارهای تحلیل استاتیک</li>
          <li>4. استراتژی‌های تست</li>
          <li>5. بررسی کد</li>
          <li>6. اتوماسیون CI/CD</li>
        </ul>
      </div>
  `;
  
  // دریافت محتوای هر صفحه کیفیت کد
  for (let i = 0; i < codeQualityPages.length; i++) {
    const pageName = codeQualityPages[i];
    try {
      await page.goto(`${baseUrl}/docs/code-quality/${pageName}`, { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      await page.waitForTimeout(2000);
      
      const content = await page.evaluate(() => {
        const main = document.querySelector('main .container article');
        return main ? main.innerHTML : '';
      });
      
      if (i > 0) {
        codeQualityHTML += '<div class="page-break"></div>';
      }
      codeQualityHTML += content;
      
      console.log(`✅ محتوای ${pageName} اضافه شد`);
      
    } catch (error) {
      console.error(`❌ خطا در دریافت ${pageName}:`, error.message);
    }
  }
  
  codeQualityHTML += `
    </body>
    </html>
  `;
  
  // تولید PDF کیفیت کد
  await page.setContent(codeQualityHTML, { waitUntil: 'networkidle0' });
  await page.waitForTimeout(3000);
  
  await page.pdf({
    path: path.join(outputDir, 'کنترل-کیفیت-کد-کامل.pdf'),
    format: 'A4',
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl;">
        کنترل کیفیت کد - سازمان بنادر و دریانوردی
      </div>
    `,
    footerTemplate: `
      <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl;">
        صفحه <span class="pageNumber"></span> از <span class="totalPages"></span>
      </div>
    `
  });
  
  console.log('✅ PDF کامل کنترل کیفیت کد تولید شد');
  
  await browser.close();
  console.log('🎉 تولید تمام فایل‌های PDF تمام شد!');
  console.log(`📁 فایل‌ها در پوشه: ${path.resolve(outputDir)}`);
}

// اجرای تولید PDF
generateCompletePDF().catch(console.error);