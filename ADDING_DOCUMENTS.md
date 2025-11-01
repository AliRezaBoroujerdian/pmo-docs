# ➕ راهنمای اضافه کردن سند جدید

این راهنما نحوه اضافه کردن یک سند (document) کاملاً جدید به سیستم را توضیح می‌دهد.

## 📋 مثال: اضافه کردن "مدیریت کیفیت"

فرض کنید می‌خواهیم یک سند جدید با نام "مدیریت کیفیت" (Quality Management) اضافه کنیم.

---

## 🔧 مرحله 1: ایجاد ساختار پوشه

### 1.1 ایجاد پوشه اصلی

```powershell
New-Item -Path "docs/quality-management" -ItemType Directory
```

### 1.2 ایجاد پوشه نسخه‌ها

```powershell
New-Item -Path "docs/quality-management/versions" -ItemType Directory
New-Item -Path "docs/quality-management/versions/v1.0.0" -ItemType Directory
```

ساختار نهایی:
```
docs/
└── quality-management/
    ├── index.md                    # صفحه ورودی
    └── versions/
        └── v1.0.0/                 # نسخه اول
            ├── overview.md         # نمای کلی
            ├── standards.md        # استانداردها
            └── processes.md        # فرآیندها
```

---

## 📝 مرحله 2: ایجاد صفحه index.md

ایجاد فایل `docs/quality-management/index.md`:

```markdown
# مستندات مدیریت کیفیت

<script>
// Auto-redirect to latest version
window.location.href = 'versions/v1.0.0/overview/';
</script>

این بخش شامل تمامی مستندات مربوط به مدیریت کیفیت در پروژه‌ها است.

**⚠️ توجه:** در حال انتقال خودکار به آخرین نسخه (v1.0.0)...

اگر انتقال خودکار انجام نشد، [اینجا کلیک کنید](versions/v1.0.0/overview/).

## نسخه‌های موجود

### [📘 نسخه 1.0.0 (آخرین نسخه)](versions/v1.0.0/overview.md)
**تاریخ انتشار:** آبان ۱۴۰۴

**محتوا:**
- نمای کلی مدیریت کیفیت
- استانداردهای کیفیت (ISO 9001)
- فرآیندهای کنترل کیفیت
- مدیریت عیوب و نواقص
- گزارش‌دهی کیفیت

---

## راهنمای استفاده

برای مشاهده هر نسخه، روی لینک مربوطه کلیک کنید. توصیه می‌شود همیشه از آخرین نسخه استفاده کنید.
```

---

## 📄 مرحله 3: ایجاد صفحات محتوا

### 3.1 ایجاد overview.md

```powershell
New-Item -Path "docs/quality-management/versions/v1.0.0/overview.md" -ItemType File
```

محتوای `overview.md`:

```markdown
# نمای کلی مدیریت کیفیت

مدیریت کیفیت یکی از حوزه‌های کلیدی در مدیریت پروژه است که...

## اهداف

- تضمین کیفیت محصولات و خدمات
- کاهش عیوب و نواقص
- بهبود مستمر فرآیندها
- افزایش رضایت مشتری

## استانداردها

### ISO 9001:2015

استاندارد بین‌المللی برای سیستم‌های مدیریت کیفیت...

...
```

### 3.2 ایجاد standards.md

```markdown
# استانداردهای کیفیت

این صفحه شامل استانداردهای کیفیت مورد استفاده در پروژه‌ها است...

## ISO 9001

### مقدمه
...

### الزامات
...
```

### 3.3 ایجاد processes.md

```markdown
# فرآیندهای کنترل کیفیت

این صفحه فرآیندهای کنترل و تضمین کیفیت را توضیح می‌دهد...

## برنامه‌ریزی کیفیت
...

## کنترل کیفیت
...

## تضمین کیفیت
...
```

---

## ⚙️ مرحله 4: بروزرسانی mkdocs.yml

باز کردن فایل `mkdocs.yml` و اضافه کردن navigation:

```yaml
nav:
  - خانه: index.md
  
  - مدیریت پروژه:
    - v2.0.0-beta:
      - راهنما: project-management/versions/v2.0.0-beta/guide.md
    - v1.0.0:
      - راهنما: project-management/versions/v1.0.0/guide.md
  
  - مدیریت ریسک:
    - v3.0.0:
      - نمای کلی: risk-management/versions/v3.0.0/overview.md
      - شناسایی: risk-management/versions/v3.0.0/identification.md
      - ارزیابی: risk-management/versions/v3.0.0/assessment.md
      - کاهش: risk-management/versions/v3.0.0/mitigation.md
      - پاسخ: risk-management/versions/v3.0.0/response.md
      - نظارت: risk-management/versions/v3.0.0/monitoring.md
      - گزارش‌دهی: risk-management/versions/v3.0.0/reporting.md
    - v2.0.0-beta:
      - نمای کلی: risk-management/versions/v2.0.0-beta/overview.md
    - v1.0.0:
      - نمای کلی: risk-management/versions/v1.0.0/overview.md
  
  # ⬇️ سند جدید اضافه شده
  - مدیریت کیفیت:
    - v1.0.0:
      - نمای کلی: quality-management/versions/v1.0.0/overview.md
      - استانداردها: quality-management/versions/v1.0.0/standards.md
      - فرآیندها: quality-management/versions/v1.0.0/processes.md
```

---

## 🔧 مرحله 5: بروزرسانی version-selector.js

باز کردن فایل `docs/javascripts/version-selector.js`:

### 5.1 اضافه کردن به latestVersions

در خط 11-14، اضافه کنید:

```javascript
const latestVersions = {
    'risk-management': 'v3.0.0',
    'project-management': 'v2.0.0-beta',
    'quality-management': 'v1.0.0'  // ⬅️ جدید
};
```

### 5.2 اضافه کردن به URL patterns

در خط 21-24، اضافه کنید:

```javascript
// Check URL patterns for document index pages
if (currentPath.match(/\/quality-management\/?$/) || 
    currentPath.match(/\/quality-management\/index\.html$/)) {
    redirectToLatestVersion();
    return;
}
```

### 5.3 اضافه کردن به redirect paths

در خط 37-45، اضافه کنید:

```javascript
const redirectPaths = {
    'risk-management': '/risk-management/versions/v3.0.0/overview/',
    'project-management': '/project-management/versions/v2.0.0-beta/guide/',
    'quality-management': '/quality-management/versions/v1.0.0/overview/'  // ⬅️ جدید
};
```

---

## 🎨 مرحله 6: بروزرسانی export-buttons.js (اختیاری)

اگر می‌خواهید export برای این سند فعال باشد:

در فایل `docs/javascripts/export-buttons.js`:

```javascript
// تشخیص خودکار document type
const pathParts = window.location.pathname.split('/');
let docType = 'unknown';

if (pathParts.includes('risk-management')) {
    docType = 'risk-management';
} else if (pathParts.includes('project-management')) {
    docType = 'project-management';
} else if (pathParts.includes('quality-management')) {  // ⬅️ جدید
    docType = 'quality-management';
}
```

---

## 🏗️ مرحله 7: Build و Test

### 7.1 Build کردن

```powershell
mkdocs build --clean
```

خروجی:
```
INFO - Building documentation...
INFO - Cleaning site directory
INFO - Documentation built in 0.XX seconds
```

### 7.2 تست محلی

```powershell
mkdocs serve -a 127.0.0.1:9000
```

باز کردن مرورگر:
```
http://127.0.0.1:9000
```

### 7.3 چک‌لیست تست

- [ ] سند جدید در navigation نمایش داده می‌شود
- [ ] کلیک روی سند → redirect به v1.0.0/overview
- [ ] version selector در sidebar نمایش داده می‌شود
- [ ] تمام صفحات سند قابل دسترسی هستند
- [ ] navigation بین صفحات کار می‌کند
- [ ] دکمه‌های export نمایش داده می‌شوند (اگر فعال کردید)

---

## 📊 مرحله 8: اضافه کردن به Export Server

باز کردن `export_server.py` و اضافه کردن:

```python
# Page mappings برای export
PAGE_MAPPINGS = {
    'risk-management': {
        'v3.0.0': [
            'overview', 'identification', 'assessment',
            'mitigation', 'response', 'monitoring', 'reporting'
        ],
        'v2.0.0-beta': ['overview'],
        'v1.0.0': ['overview']
    },
    'project-management': {
        'v2.0.0-beta': ['guide'],
        'v1.0.0': ['guide']
    },
    'quality-management': {  # ⬅️ جدید
        'v1.0.0': ['overview', 'standards', 'processes']
    }
}
```

---

## ✅ مرحله 9: Commit به Git

```powershell
git add docs/quality-management/
git add docs/javascripts/version-selector.js
git add docs/javascripts/export-buttons.js
git add mkdocs.yml
git add export_server.py

git commit -m "Add Quality Management documentation (v1.0.0)

- Created quality-management folder structure
- Added v1.0.0 with overview, standards, and processes pages
- Updated version-selector.js with auto-redirect
- Updated navigation in mkdocs.yml
- Added export support in export_server.py"

git push origin main
```

---

## 📝 چک‌لیست نهایی

قبل از commit، مطمئن شوید:

- [ ] ساختار پوشه‌ها صحیح است
- [ ] index.md با redirect JavaScript ایجاد شده
- [ ] تمام صفحات محتوا ایجاد شده‌اند
- [ ] mkdocs.yml بروزرسانی شده
- [ ] version-selector.js بروزرسانی شده (3 جا)
- [ ] export-buttons.js بروزرسانی شده (اختیاری)
- [ ] export_server.py بروزرسانی شده
- [ ] Build موفق است (بدون error)
- [ ] تست محلی انجام شده
- [ ] Navigation کار می‌کند
- [ ] Auto-redirect کار می‌کند
- [ ] Version selector نمایش داده می‌شود
- [ ] Export کار می‌کند (اگر فعال کردید)

---

## 🎯 نکات مهم

### نام‌گذاری

- **پوشه**: همیشه lowercase با dash: `quality-management`
- **فایل**: همیشه lowercase با dash: `quality-control.md`
- **URL**: خودکار از نام پوشه/فایل ساخته می‌شود

### ساختار

```
docs/
└── [document-name]/
    ├── index.md                        # با redirect
    └── versions/
        └── v1.0.0/
            ├── [page1].md
            ├── [page2].md
            └── [page3].md
```

### JavaScript Redirect

همیشه در `index.md` این کد را اضافه کنید:

```html
<script>
window.location.href = 'versions/v1.0.0/overview/';
</script>
```

### Version Selector

سه جا باید بروزرسانی شود:
1. `latestVersions` object (خط 11)
2. URL pattern check (خط 21)
3. `redirectPaths` object (خط 37)

---

## 🚀 مراحل بعدی

بعد از اضافه کردن سند جدید:

1. [اضافه کردن نسخه جدید](ADDING_VERSIONS.md)
2. [اضافه کردن صفحه جدید](ADDING_PAGES.md)

---

## ❓ سوالات متداول

### چند سند می‌توان اضافه کرد؟

نامحدود! هر سند یک پوشه مستقل است.

### آیا باید حتماً v1.0.0 باشد؟

بله، برای نسخه اول همیشه از v1.0.0 استفاده کنید (Semantic Versioning).

### آیا می‌توان بدون نسخه‌گذاری سند اضافه کرد؟

خیر، تمام اسناد باید داخل پوشه `versions/` باشند.

### چگونه نام فارسی در navigation اضافه کنم؟

در `mkdocs.yml`:
```yaml
- مدیریت کیفیت:     # ⬅️ نام فارسی
    - v1.0.0:
      - ...
```

---

**تاریخ آخرین بروزرسانی:** ۱۱ آبان ۱۴۰۴
