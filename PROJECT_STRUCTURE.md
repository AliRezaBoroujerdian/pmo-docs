# 📁 ساختار پروژه

این سند توضیحات کامل ساختار پروژه مستندسازی PMO را ارائه می‌دهد.

## 🗂️ نمای کلی

```
pmo-docs/
├── docs/                       # محتوای مستندات (Source Files)
├── site/                       # خروجی build شده (Generated)
├── exports/                    # فایل‌های PDF/Word صادر شده
├── __pycache__/               # Python cache files
├── mkdocs.yml                 # تنظیمات اصلی MkDocs
├── export_server.py           # Flask server برای export
├── export_docs.py             # Script دستی export
├── start-servers.bat          # Batch file برای start
├── stop-servers.bat           # Batch file برای stop
├── README.md                  # مستندات اصلی
├── INSTALLATION.md            # راهنمای نصب
├── QUICK_START.md             # شروع سریع
├── TROUBLESHOOTING.md         # عیب‌یابی
└── HOW_TO_USE.md              # نحوه استفاده
```

---

## 📂 پوشه `docs/` (محتوای اصلی)

این پوشه شامل تمام محتوای مستندات به صورت Markdown است.

### ساختار کلی

```
docs/
├── index.md                           # صفحه اصلی (Home)
├── javascripts/                       # اسکریپت‌های JavaScript
│   ├── version-selector.js            # مدیریت version selector
│   └── export-buttons.js              # دکمه‌های export
├── stylesheets/                       # استایل‌های CSS
│   ├── extra.css                      # استایل‌های عمومی
│   ├── version-selector.css           # استایل version selector
│   └── fonts/                         # فونت‌های Vazirmatn
│       ├── Vazirmatn-Regular.woff2
│       ├── Vazirmatn-Medium.woff2
│       └── Vazirmatn-Bold.woff2
├── project-management/                # مستندات مدیریت پروژه
│   ├── index.md                       # صفحه ورودی (با redirect)
│   ├── guide.md                       # راهنمای اصلی (deprecated)
│   └── versions/                      # نسخه‌های مختلف
│       ├── v1.0.0/
│       │   └── guide.md
│       └── v2.0.0-beta/
│           └── guide.md
└── risk-management/                   # مستندات مدیریت ریسک
    ├── index.md                       # صفحه ورودی (با redirect)
    ├── index-new.md                   # پیش‌نویس (deprecated)
    ├── overview.md                    # نمای کلی (deprecated)
    └── versions/                      # نسخه‌های مختلف
        ├── v1.0.0/
        │   └── overview.md
        ├── v2.0.0-beta/
        │   └── overview.md
        └── v3.0.0/                    # آخرین نسخه
            ├── overview.md            # نمای کلی
            ├── identification.md      # شناسایی ریسک
            ├── assessment.md          # ارزیابی ریسک
            ├── mitigation.md          # کاهش ریسک
            ├── response.md            # پاسخ به ریسک
            ├── monitoring.md          # نظارت
            └── reporting.md           # گزارش‌دهی
```

### توضیحات پوشه‌ها

#### `docs/javascripts/`

- **version-selector.js** (271 خط):
  - مدیریت dropdown انتخاب نسخه در sidebar
  - تشخیص نسخه فعلی از URL
  - Auto-redirect به آخرین نسخه
  - Sort کردن نسخه‌ها به ترتیب نزولی
  - Object `latestVersions`: نگهداری آخرین نسخه هر سند
  
- **export-buttons.js**:
  - ایجاد دکمه‌های PDF/Word در sidebar
  - ارتباط با Export Server (port 5000)
  - دانلود خودکار با iframe
  - تشخیص document type و version از URL

#### `docs/stylesheets/`

- **extra.css**:
  - تنظیمات RTL
  - فونت Vazirmatn
  - استایل‌های عمومی فارسی
  
- **version-selector.css**:
  - استایل version selector dropdown
  - Material Design consistency
  - RTL support
  
- **fonts/**:
  - فونت‌های Vazirmatn locally hosted
  - سه وزن: Regular (400), Medium (500), Bold (700)
  - فرمت WOFF2 برای سرعت بالا

#### `docs/project-management/`

ساختار مدیریت پروژه:
- **index.md**: صفحه ورودی با JavaScript redirect به `versions/v2.0.0-beta/guide/`
- **versions/**: پوشه نسخه‌ها
  - **v1.0.0/**: نسخه اولیه پایدار
  - **v2.0.0-beta/**: نسخه آزمایشی جدید

#### `docs/risk-management/`

ساختار مدیریت ریسک:
- **index.md**: صفحه ورودی با JavaScript redirect به `versions/v3.0.0/overview/`
- **versions/**: پوشه نسخه‌ها
  - **v1.0.0/**: نسخه اولیه (1 صفحه)
  - **v2.0.0-beta/**: نسخه beta (1 صفحه)
  - **v3.0.0/**: نسخه کامل (7 صفحه)

---

## 📂 پوشه `site/` (خروجی Build)

این پوشه توسط `mkdocs build` ساخته می‌شود و شامل static HTML است.

### ساختار

```
site/
├── index.html                         # صفحه اصلی
├── 404.html                           # صفحه خطا
├── sitemap.xml                        # نقشه سایت
├── search/
│   └── search_index.json              # ایندکس جستجو
├── assets/                            # فایل‌های Material theme
│   ├── javascripts/
│   │   └── bundle.[hash].min.js
│   └── stylesheets/
│       ├── main.[hash].min.css
│       └── palette.[hash].min.css
├── javascripts/                       # JavaScript های custom
│   ├── version-selector.js
│   └── export-buttons.js
├── stylesheets/                       # CSS های custom
│   ├── extra.css
│   └── version-selector.css
├── project-management/                # مستندات build شده
│   ├── index.html
│   └── versions/
│       ├── v1.0.0/
│       │   └── guide/
│       │       └── index.html
│       └── v2.0.0-beta/
│           └── guide/
│               └── index.html
└── risk-management/                   # مستندات build شده
    ├── index.html
    ├── overview/
    │   └── index.html
    └── versions/
        ├── v1.0.0/
        │   └── overview/
        │       └── index.html
        ├── v2.0.0-beta/
        │   └── overview/
        │       └── index.html
        └── v3.0.0/
            ├── overview/
            │   └── index.html
            ├── identification/
            │   └── index.html
            ├── assessment/
            │   └── index.html
            ├── mitigation/
            │   └── index.html
            ├── response/
            │   └── index.html
            ├── monitoring/
            │   └── index.html
            └── reporting/
                └── index.html
```

### نکات مهم

- این پوشه **هیچ‌وقت دستی ویرایش نمی‌شود**
- با دستور `mkdocs build` از نو ساخته می‌شود
- برای deploy در production از این پوشه استفاده می‌شود
- فایل‌های static (CSS, JS, images) در `assets/` قرار دارند

---

## 📂 پوشه `exports/`

فایل‌های PDF و Word صادر شده در اینجا ذخیره می‌شوند.

### ساختار نام‌گذاری

```
exports/
├── risk-management_v3.0.0_2024-11-01_14-30-45.pdf
├── risk-management_v3.0.0_2024-11-01_14-30-45.docx
├── project-management_v2.0.0-beta_2024-11-01_15-20-30.pdf
└── project-management_v2.0.0-beta_2024-11-01_15-20-30.docx
```

### فرمت نام فایل

```
{document-type}_{version}_{date}_{time}.{format}
```

مثال:
```
risk-management_v3.0.0_2024-11-01_14-30-45.pdf
```

- **document-type**: `risk-management` یا `project-management`
- **version**: `v1.0.0`, `v2.0.0-beta`, `v3.0.0`
- **date**: `YYYY-MM-DD`
- **time**: `HH-MM-SS`
- **format**: `pdf` یا `docx`

---

## 📄 فایل‌های اصلی پروژه

### `mkdocs.yml`

فایل تنظیمات اصلی MkDocs:

```yaml
site_name: مستندات PMO
site_description: سیستم مستندسازی جامع برای مدیریت پروژه و ریسک
theme:
  name: material
  language: fa
  direction: rtl
  features:
    - navigation.tabs
    - navigation.sections
    - toc.integrate
    - search.suggest
    - search.highlight
plugins:
  - search:
      lang: fa
extra_css:
  - stylesheets/extra.css
  - stylesheets/version-selector.css
extra_javascript:
  - javascripts/version-selector.js
  - javascripts/export-buttons.js
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
      # ... بقیه صفحات
```

### `export_server.py`

Flask server برای export:

```python
from flask import Flask, send_file, jsonify
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/export/<doc_type>/<version>/<format>')
def export_document(doc_type, version, format):
    # تولید PDF یا Word
    # استفاده از Chrome headless یا python-docx
    pass

@app.route('/health')
def health_check():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
```

### `export_docs.py`

Script دستی برای export (deprecated):

```python
import os
import subprocess
from pathlib import Path

def export_to_pdf(doc_path, output_path):
    # تبدیل به PDF با Chrome
    pass

def export_to_word(doc_path, output_path):
    # تبدیل به Word با Pandoc
    pass
```

### `start-servers.bat`

Batch file برای start کردن سرورها:

```batch
@echo off
start "MkDocs Server" cmd /k "mkdocs serve -a 127.0.0.1:9000"
timeout /t 2
start "Export Server" cmd /k "python export_server.py"
timeout /t 3
start http://127.0.0.1:9000
```

### `stop-servers.bat`

Batch file برای stop کردن سرورها:

```batch
@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :9000 ^| findstr LISTENING') do (
    taskkill /PID %%a /F
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    taskkill /PID %%a /F
)
echo Servers stopped.
```

---

## 🔄 نحوه کار نسخه‌گذاری

### Semantic Versioning

قالب: `vMAJOR.MINOR.PATCH[-prerelease]`

- **MAJOR**: تغییرات breaking
- **MINOR**: ویژگی‌های جدید
- **PATCH**: bug fixes
- **prerelease**: `-alpha`, `-beta`, `-rc.1`

مثال‌ها:
- `v1.0.0`: نسخه اولیه پایدار
- `v2.0.0-beta`: نسخه آزمایشی
- `v3.0.0`: نسخه جدید پایدار

### ساختار نسخه در پروژه

هر سند می‌تواند نسخه‌های مستقل داشته باشد:

```
docs/
├── document-A/
│   └── versions/
│       ├── v1.0.0/
│       └── v2.0.0/
└── document-B/
    └── versions/
        ├── v1.0.0/
        ├── v2.0.0-beta/
        └── v3.0.0/
```

### Version Selector Logic

در `version-selector.js`:

```javascript
const latestVersions = {
    'risk-management': 'v3.0.0',
    'project-management': 'v2.0.0-beta'
};
```

این object مشخص می‌کند که هر سند به کدام نسخه redirect شود.

---

## 🔍 جریان کار (Workflow)

### 1. Development

```
docs/*.md  →  MkDocs  →  Live Server (port 9000)
                          ↓
                    Browser Preview
```

### 2. Build

```
mkdocs build --clean
     ↓
docs/  →  MkDocs  →  site/
                      (Static HTML/CSS/JS)
```

### 3. Export

```
Browser  →  Click Export Button
              ↓
          export-buttons.js
              ↓
          Export Server (port 5000)
              ↓
          Chrome Headless / python-docx
              ↓
          exports/*.pdf / exports/*.docx
              ↓
          Download via iframe
```

### 4. Production Deploy

```
site/  →  Copy to Web Server
           ↓
       IIS / Apache / Nginx
           ↓
       Public Access
```

---

## 📊 حجم پروژه

تقریبی (بدون `node_modules` یا `venv`):

- **docs/**: ~500 KB (Markdown + JS + CSS + Fonts)
- **site/**: ~15 MB (Built HTML + Material assets)
- **exports/**: متغیر (هر PDF ~500KB, هر Word ~100KB)
- **Scripts**: ~50 KB (Python + Batch)
- **Config**: ~10 KB (mkdocs.yml)

---

## 🔒 فایل‌هایی که باید Ignore شوند (.gitignore)

```gitignore
# Build output
site/

# Python
__pycache__/
*.py[cod]
venv/
env/

# Exports
exports/*.pdf
exports/*.docx

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

---

## 🎯 نکات مهم

1. **هیچ‌وقت `site/` را دستی ویرایش نکنید** - همیشه از `mkdocs build` استفاده کنید
2. **فونت‌ها باید locally hosted باشند** - نه از CDN
3. **نسخه‌گذاری مستقل است** - هر سند نسخه‌های خودش را دارد
4. **index.md با redirect** - برای انتقال خودکار به آخرین نسخه
5. **Export cache** - فایل‌های export شده موقت هستند

---

برای اطلاعات بیشتر:
- [ADDING_DOCUMENTS.md](ADDING_DOCUMENTS.md)
- [ADDING_VERSIONS.md](ADDING_VERSIONS.md)
- [ADDING_PAGES.md](ADDING_PAGES.md)

---

**تاریخ آخرین بروزرسانی:** ۱۱ آبان ۱۴۰۴
