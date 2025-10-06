const fs = require('fs');
const path = require('path');

// اسکریپت برای کپی کردن فایل‌های PDF به static directory

const sourceDir = './pdf-output';
const targetDir = './static/pdf';

// ایجاد پوشه هدف اگر وجود ندارد
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// لیست فایل‌های PDF مورد نیاز
const pdfFiles = [
  'راهنمای-مستندات-سازمان-بنادر.pdf',
  'مقدمه.pdf',
  'معماری-مقدمه.pdf',
  'معماری-نمای-منطقی.pdf',
  'معماری-نمای-فرآیند.pdf',
  'معماری-نمای-توسعه.pdf',
  'معماری-نمای-فیزیکی.pdf',
  'معماری-نمای-سناریو.pdf',
  'معماری-قالب-مستند.pdf',
  'معماری-راهنمای-چک-لیست.pdf',
  'معماری-نکات-مهم.pdf',
  'معماری-منابع.pdf',
  'کیفیت-کد-مقدمه.pdf',
  'کیفیت-کد-استانداردها.pdf',
  'کیفیت-کد-ابزارهای-تحلیل.pdf',
  'کیفیت-کد-استراتژی-تست.pdf',
  'کیفیت-کد-بررسی-کد.pdf',
  'کیفیت-کد-اتوماسیون.pdf',
];

console.log('🚀 شروع کپی فایل‌های PDF...');

pdfFiles.forEach(filename => {
  const sourcePath = path.join(sourceDir, filename);
  const targetPath = path.join(targetDir, filename);
  
  if (fs.existsSync(sourcePath)) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ کپی شد: ${filename}`);
    } catch (error) {
      console.error(`❌ خطا در کپی ${filename}:`, error.message);
    }
  } else {
    console.log(`⚠️  فایل وجود ندارد: ${filename}`);
  }
});

console.log('🎉 کپی فایل‌های PDF تمام شد!');
console.log(`📁 فایل‌ها در پوشه: ${path.resolve(targetDir)}`);