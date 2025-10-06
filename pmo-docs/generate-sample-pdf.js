const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateSimplePDF() {
  try {
    console.log('🚀 شروع تولید PDF ساده از فایل‌های محلی...');
    
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

    // تولید یک PDF نمونه از محتوای ساده
    const htmlContent = `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;400;700&display=swap');
        
        * {
            font-family: 'Vazirmatn', sans-serif;
            direction: rtl;
        }
        
        body {
            margin: 40px;
            background: white;
            font-size: 14px;
            line-height: 1.8;
            color: #2d3748;
        }
        
        .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            margin: -40px -40px 40px -40px;
            border-radius: 10px;
        }
        
        .header h1 {
            font-size: 36px;
            font-weight: 700;
            margin: 0;
        }
        
        .header p {
            font-size: 18px;
            margin: 10px 0 0 0;
        }
        
        .section {
            margin: 30px 0;
            padding: 20px;
            border-right: 4px solid #3b82f6;
            background: #f8fafc;
        }
        
        .section h2 {
            color: #1e3a8a;
            font-size: 24px;
            margin-bottom: 15px;
        }
        
        .section h3 {
            color: #374151;
            font-size: 18px;
            margin: 20px 0 10px 0;
        }
        
        ul {
            margin: 15px 0;
            padding-right: 25px;
        }
        
        li {
            margin: 8px 0;
        }
        
        .highlight {
            background: #fef3c7;
            padding: 15px;
            border-radius: 5px;
            border-right: 4px solid #f59e0b;
            margin: 20px 0;
        }
        
        .code {
            background: #f1f5f9;
            padding: 10px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>مستندات سازمان بنادر و دریانوردی</h1>
        <p>راهنمای جامع الگوی سند معماری و کنترل کیفیت کد</p>
        <p>تاریخ: ${new Date().toLocaleDateString('fa-IR')}</p>
    </div>
    
    <div class="section">
        <h2>📋 مقدمه</h2>
        <p>این مستند شامل دو بخش اصلی است:</p>
        <ul>
            <li><strong>الگوی سند معماری:</strong> راهنمای کاملی برای تدوین اسناد معماری نرم‌افزار بر اساس مدل 4+1</li>
            <li><strong>کنترل کیفیت کد:</strong> استانداردها و روش‌های بهبود کیفیت کد در پروژه‌های نرم‌افزاری</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>🏗️ الگوی سند معماری نرم‌افزار</h2>
        
        <h3>نماهای معماری (4+1 View Model)</h3>
        <ul>
            <li><strong>نمای منطقی (Logical View):</strong> ساختار منطقی سیستم و روابط بین اجزاء</li>
            <li><strong>نمای فرآیند (Process View):</strong> رفتار پویای سیستم و فرآیندهای اجرایی</li>
            <li><strong>نمای توسعه (Development View):</strong> سازماندهی کد و ماژول‌ها</li>
            <li><strong>نمای فیزیکی (Physical View):</strong> نگاشت نرم‌افزار روی سخت‌افزار</li>
            <li><strong>نمای سناریو (Scenario View):</strong> موارد استفاده و سناریوهای کاربردی</li>
        </ul>
        
        <div class="highlight">
            <strong>نکته مهم:</strong> هر نما باید به صورت مستقل قابل درک باشد و در عین حال با سایر نماها هماهنگی داشته باشد.
        </div>
    </div>
    
    <div class="section">
        <h2>🔍 کنترل کیفیت کد</h2>
        
        <h3>اصول اساسی</h3>
        <ul>
            <li><strong>استانداردهای کدنویسی:</strong> رعایت قوانین و سبک‌های یکسان</li>
            <li><strong>ابزارهای تحلیل استاتیک:</strong> بررسی خودکار کیفیت کد</li>
            <li><strong>استراتژی‌های تست:</strong> Unit Test، Integration Test، E2E Test</li>
            <li><strong>بررسی کد (Code Review):</strong> بازبینی کد توسط تیم</li>
            <li><strong>اتوماسیون CI/CD:</strong> یکپارچه‌سازی و استقرار مداوم</li>
        </ul>
        
        <h3>ابزارهای پیشنهادی</h3>
        <div class="code">
            # JavaScript/TypeScript
            ESLint + Prettier + Jest
            
            # Python  
            Pylint + Black + pytest
            
            # Java
            SpotBugs + Checkstyle + JUnit
            
            # C#
            Roslyn Analyzers + StyleCop + NUnit
        </div>
    </div>
    
    <div class="section">
        <h2>📚 منابع و مراجع</h2>
        <ul>
            <li>IEEE 1471-2000: Architectural Description</li>
            <li>Clean Code - Robert C. Martin</li>
            <li>Software Architecture in Practice - Bass, Clements, Kazman</li>
            <li>Continuous Integration - Martin Fowler</li>
        </ul>
    </div>
    
    <div style="text-align: center; margin-top: 60px; color: #6b7280; font-size: 12px;">
        <p>سازمان بنادر و دریانوردی ایران</p>
        <p>واحد فناوری اطلاعات</p>
    </div>
</body>
</html>`;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfPath = path.join(outputDir, 'راهنمای-مستندات-سازمان-بنادر.pdf');
    await page.pdf({
      path: pdfPath,
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
          مستندات سازمان بنادر و دریانوردی
        </div>
      `,
      footerTemplate: `
        <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl;">
          صفحه <span class="pageNumber"></span> از <span class="totalPages"></span>
        </div>
      `
    });
    
    await browser.close();
    
    console.log(`✅ PDF نمونه تولید شد: ${pdfPath}`);
    console.log('🎉 برای تولید PDF کامل، ابتدا سرور Docusaurus را روی localhost:3001 اجرا کنید');
    console.log('📝 دستور: npx docusaurus serve --port 3001');
    
  } catch (error) {
    console.error('❌ خطا در تولید PDF:', error.message);
  }
}

generateSimplePDF();