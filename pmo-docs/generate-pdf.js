const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // تنظیمات برای RTL و فارسی
  await page.setViewport({ width: 1200, height: 800 });
  
  const baseUrl = 'http://localhost:3001/pmo-docs';
  
  // صفحات مختلف برای تولید PDF
  const pages = [
    {
      url: `${baseUrl}/docs/intro`,
      filename: 'مقدمه.pdf',
      title: 'مقدمه - سازمان بنادر و دریانوردی'
    },
    // صفحات معماری
    {
      url: `${baseUrl}/docs/architecture/introduction`,
      filename: 'معماری-مقدمه.pdf',
      title: 'مقدمه الگوی سند معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/logical-view`,
      filename: 'معماری-نمای-منطقی.pdf',
      title: 'نمای منطقی معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/process-view`,
      filename: 'معماری-نمای-فرآیند.pdf',
      title: 'نمای فرآیند معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/development-view`,
      filename: 'معماری-نمای-توسعه.pdf',
      title: 'نمای توسعه معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/physical-view`,
      filename: 'معماری-نمای-فیزیکی.pdf',
      title: 'نمای فیزیکی معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/scenario-view`,
      filename: 'معماری-نمای-سناریو.pdf',
      title: 'نمای سناریو معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/document-template`,
      filename: 'معماری-قالب-مستند.pdf',
      title: 'قالب مستند معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/checklist-guide`,
      filename: 'معماری-راهنمای-چک-لیست.pdf',
      title: 'راهنمای چک‌لیست معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/important-notes`,
      filename: 'معماری-نکات-مهم.pdf',
      title: 'نکات مهم معماری'
    },
    {
      url: `${baseUrl}/docs/architecture/references`,
      filename: 'معماری-منابع.pdf',
      title: 'منابع معماری'
    },
    // صفحات کیفیت کد
    {
      url: `${baseUrl}/docs/code-quality/introduction`,
      filename: 'کیفیت-کد-مقدمه.pdf',
      title: 'مقدمه کنترل کیفیت کد'
    },
    {
      url: `${baseUrl}/docs/code-quality/coding-standards`,
      filename: 'کیفیت-کد-استانداردها.pdf',
      title: 'استانداردهای کدنویسی'
    },
    {
      url: `${baseUrl}/docs/code-quality/static-analysis-tools`,
      filename: 'کیفیت-کد-ابزارهای-تحلیل.pdf',
      title: 'ابزارهای تحلیل استاتیک'
    },
    {
      url: `${baseUrl}/docs/code-quality/testing-strategies`,
      filename: 'کیفیت-کد-استراتژی-تست.pdf',
      title: 'استراتژی‌های تست'
    },
    {
      url: `${baseUrl}/docs/code-quality/code-review`,
      filename: 'کیفیت-کد-بررسی-کد.pdf',
      title: 'بررسی کد'
    },
    {
      url: `${baseUrl}/docs/code-quality/ci-cd-automation`,
      filename: 'کیفیت-کد-اتوماسیون.pdf',
      title: 'اتوماسیون CI/CD'
    }
  ];
  
  // ایجاد پوشه خروجی
  const outputDir = './pdf-output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  console.log(`🚀 شروع تولید ${pages.length} فایل PDF...`);

  for (const [index, pageInfo] of pages.entries()) {
    try {
      console.log(`🔄 (${index + 1}/${pages.length}) در حال تولید PDF برای: ${pageInfo.title}`);
      
      await page.goto(pageInfo.url, { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      // انتظار برای بارگذاری کامل محتوا
      await page.waitForTimeout(3000);
      
      // تولید PDF با تنظیمات فارسی
      const pdfPath = path.join(outputDir, pageInfo.filename);
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
            ${pageInfo.title}
          </div>
        `,
        footerTemplate: `
          <div style="font-family: 'Vazirmatn', sans-serif; font-size: 10px; width: 100%; text-align: center; color: #666; direction: rtl;">
            صفحه <span class="pageNumber"></span> از <span class="totalPages"></span>
          </div>
        `
      });
      
      console.log(`✅ PDF تولید شد: ${pdfPath}`);
      
    } catch (error) {
      console.error(`❌ خطا در تولید PDF برای ${pageInfo.title}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('🎉 تولید تمام فایل‌های PDF تمام شد!');
  console.log(`📁 فایل‌ها در پوشه: ${path.resolve(outputDir)}`);
}

// اجرای تولید PDF
generatePDF().catch(console.error);