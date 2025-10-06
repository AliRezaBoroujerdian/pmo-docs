# راهنمای دکمه‌های دانلود PDF

## نصب و راه‌اندازی

دکمه‌های دانلود PDF در پروژه نصب و آماده استفاده هستند.

## استفاده در صفحات

### 1. Import کردن Component

در ابتدای فایل `.md` یا `.mdx`:

```jsx
import DownloadPDF from '@site/src/components/DownloadPDF';
```

### 2. استفاده از Component

```jsx
<DownloadPDF 
  filename="نام-فایل.pdf" 
  title="عنوان فایل" 
  type="نوع-دکمه"
/>
```

## انواع دکمه‌ها

### دکمه عمومی (General)
```jsx
<DownloadPDF 
  filename="مقدمه.pdf" 
  title="مقدمه" 
  type="general"
/>
```
- رنگ: آبی
- آیکون: 📄

### دکمه معماری (Architecture)
```jsx
<DownloadPDF 
  filename="معماری-مقدمه.pdf" 
  title="مقدمه معماری" 
  type="architecture"
/>
```
- رنگ: سبز
- آیکون: 🏗️

### دکمه کیفیت کد (Code Quality)
```jsx
<DownloadPDF 
  filename="کیفیت-کد-مقدمه.pdf" 
  title="مقدمه کیفیت کد" 
  type="code-quality"
/>
```
- رنگ: بنفش
- آیکون: 🔍

## مثال کامل

```jsx
import DownloadPDF from '@site/src/components/DownloadPDF';

# عنوان صفحه

<DownloadPDF 
  filename="راهنمای-مستندات-سازمان-بنادر.pdf" 
  title="راهنمای کامل مستندات" 
  type="architecture"
/>

محتوای صفحه...
```

## ویژگی‌ها

✅ **طراحی واکنش‌گرا**: سازگار با تمام دستگاه‌ها
✅ **پشتیبانی RTL**: کاملاً فارسی
✅ **انیمیشن**: انیمیشن زیبا hover و click
✅ **دسترسی**: سازگار با screen reader ها
✅ **رنگ‌بندی هوشمند**: رنگ متفاوت برای هر نوع
✅ **باز شدن امن**: PDF در تب جدید باز می‌شود

## فایل‌های مورد نیاز

فایل‌های PDF باید در پوشه `static/pdf/` قرار گیرند:

```
static/
  pdf/
    راهنمای-مستندات-سازمان-بنادر.pdf
    معماری-مقدمه.pdf
    کیفیت-کد-مقدمه.pdf
    ...
```

## دستورات مفید

```bash
# کپی فایل‌های PDF به static
npm run pdf:copy

# تولید PDF نمونه
npm run pdf:sample

# مشاهده صفحه تست
http://localhost:3000/pmo-docs/test-pdf
```