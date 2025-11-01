# 📥 راهنمای نصب کامل

این راهنما مراحل کامل نصب و راه‌اندازی سیستم مستندسازی PMO را توضیح می‌دهد.

## پیش‌نیازها

### نرم‌افزارهای مورد نیاز

#### 1. Python (نسخه 3.8 یا بالاتر)

**بررسی نصب Python:**
```powershell
python --version
```

اگر Python نصب نیست:
1. دانلود از [python.org](https://www.python.org/downloads/)
2. در حین نصب حتماً گزینه **"Add Python to PATH"** را فعال کنید
3. نصب را با دکمه "Install Now" تکمیل کنید

#### 2. pip (Python Package Manager)

معمولاً همراه Python نصب می‌شود. بررسی:
```powershell
pip --version
```

#### 3. مرورگر Chrome یا Microsoft Edge

برای خروجی PDF نیاز است. مرورگر Edge معمولاً در Windows 10/11 نصب است.

#### 4. Git (اختیاری)

برای clone کردن repository:
```powershell
git --version
```

دانلود از: [git-scm.com](https://git-scm.com/)

---

## نصب پروژه

### مرحله 1: دانلود پروژه

#### روش 1: با Git
```powershell
git clone <repository-url>
cd pmo-docs
```

#### روش 2: دانلود ZIP
1. دانلود فایل ZIP از repository
2. استخراج به پوشه دلخواه
3. باز کردن PowerShell در آن پوشه

### مرحله 2: نصب وابستگی‌های Python

```powershell
pip install mkdocs==1.6.1
pip install mkdocs-material==9.6.22
pip install flask==3.1.0
pip install python-docx==1.1.2
pip install beautifulsoup4==4.12.3
```

یا استفاده از فایل requirements (اگر موجود باشد):
```powershell
pip install -r requirements.txt
```

### مرحله 3: بررسی نصب

بررسی نصب صحیح MkDocs:
```powershell
mkdocs --version
```

خروجی مورد انتظار:
```
mkdocs, version 1.6.1 from ... (Python 3.x)
```

---

## راه‌اندازی سرورها

سیستم نیاز به دو سرور دارد که باید همزمان اجرا شوند:

### روش 1: استفاده از Batch Files (توصیه می‌شود)

#### اجرای سرورها:
```powershell
.\start-servers.bat
```

این فایل:
- MkDocs server را روی پورت 9000 اجرا می‌کند
- Export server را روی پورت 5000 اجرا می‌کند
- خودکار مرورگر را باز می‌کند

#### توقف سرورها:
```powershell
.\stop-servers.bat
```

این فایل تمام سرورها را با استفاده از PID می‌بندد.

### روش 2: اجرای دستی

#### Terminal 1: MkDocs Server
```powershell
mkdocs serve -a 127.0.0.1:9000
```

خروجی:
```
INFO     -  Building documentation...
INFO     -  Cleaning site directory
INFO     -  Documentation built in 0.XX seconds
INFO     -  [00:00:00] Watching paths for changes: 'docs', 'mkdocs.yml'
INFO     -  [00:00:00] Serving on http://127.0.0.1:9000/
```

#### Terminal 2: Export Server
```powershell
python export_server.py
```

خروجی:
```
 * Serving Flask app 'export_server'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

---

## بررسی نصب

### 1. تست MkDocs Server

باز کردن مرورگر:
```
http://127.0.0.1:9000
```

باید صفحه اصلی مستندات را ببینید با:
- منوی فارسی در سمت راست
- فونت Vazirmatn
- راست‌چین بودن متن

### 2. تست Version Selector

1. کلیک روی "مدیریت ریسک" در navigation
2. باید خودکار به نسخه v3.0.0 منتقل شوید
3. در sidebar باید dropdown نسخه‌ها را ببینید

### 3. تست Export Server

1. در هر صفحه، به پایین sidebar بروید
2. دکمه‌های "📄 دانلود PDF" و "📝 دانلود Word" را ببینید
3. کلیک روی دکمه PDF
4. فایل باید خودکار دانلود شود در پوشه `exports/`

---

## تنظیمات اختیاری

### تغییر پورت MkDocs

اگر پورت 9000 اشغال است:
```powershell
mkdocs serve -a 127.0.0.1:8080
```

**نکته:** باید `export-buttons.js` را هم ویرایش کنید:
```javascript
const BASE_URL = 'http://127.0.0.1:8080';
```

### تغییر پورت Export Server

در فایل `export_server.py`:
```python
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
```

سپس در `export-buttons.js`:
```javascript
const EXPORT_API = 'http://127.0.0.1:5001/export';
```

### تنظیم Virtual Environment (اختیاری)

برای جدا نگه داشتن وابستگی‌ها:

```powershell
# ایجاد virtual environment
python -m venv venv

# فعال‌سازی
.\venv\Scripts\Activate.ps1

# نصب وابستگی‌ها
pip install -r requirements.txt

# اجرا
mkdocs serve
```

---

## مشکلات رایج و راه‌حل

### مشکل 1: Python not found
```
'python' is not recognized as an internal or external command
```

**راه‌حل:**
1. Python را دوباره نصب کنید با گزینه "Add to PATH"
2. یا مسیر Python را دستی به PATH اضافه کنید:
   - System Properties → Environment Variables
   - Path → Edit → New → `C:\Python3x\`

### مشکل 2: pip not found
```
'pip' is not recognized as an internal or external command
```

**راه‌حل:**
```powershell
python -m ensurepip --upgrade
python -m pip --version
```

### مشکل 3: پورت اشغال است
```
OSError: [Errno 48] Address already in use
```

**راه‌حل:**
```powershell
# پیدا کردن process
netstat -ano | findstr ":9000"

# بستن process (PID را جایگزین کنید)
taskkill /PID <process-id> /F
```

### مشکل 4: خطای Permission Denied
```
PermissionError: [Errno 13] Permission denied
```

**راه‌حل:**
- PowerShell را با حقوق Administrator اجرا کنید
- یا Execution Policy را تغییر دهید:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### مشکل 5: فونت فارسی نمایش داده نمی‌شود

**راه‌حل:**
1. بررسی کنید فایل‌های فونت در مسیر زیر وجود دارند:
   ```
   docs/stylesheets/fonts/Vazirmatn-*.woff2
   ```
2. Cache مرورگر را پاک کنید (Ctrl+Shift+Delete)
3. Hard refresh کنید (Ctrl+Shift+R)

### مشکل 6: دکمه‌های Export کار نمی‌کنند

**راه‌حل:**
1. مطمئن شوید Export Server در حال اجرا است:
   ```powershell
   netstat -ano | findstr ":5000"
   ```
2. Console مرورگر را چک کنید (F12 → Console)
3. CORS error ها را بررسی کنید
4. مطمئن شوید Chrome/Edge نصب است

### مشکل 7: Auto-redirect کار نمی‌کند

**راه‌حل:**
1. Cache مرورگر را پاک کنید
2. Hard refresh کنید (Ctrl+Shift+R)
3. JavaScript Console را چک کنید (F12)
4. بررسی کنید `version-selector.js` load شده است

---

## Build Production

برای ساخت نسخه Production:

```powershell
mkdocs build --clean
```

فایل‌های خروجی در پوشه `site/` قرار می‌گیرند:
```
site/
├── index.html
├── assets/
├── javascripts/
├── stylesheets/
├── project-management/
└── risk-management/
```

این پوشه را می‌توانید روی هر web server قرار دهید.

---

## نصب در محیط Production

برای استقرار در سرور، راهنمای [DEPLOYMENT.md](DEPLOYMENT.md) را مطالعه کنید.

---

## به‌روزرسانی

برای به‌روزرسانی وابستگی‌ها:

```powershell
pip install --upgrade mkdocs mkdocs-material flask python-docx beautifulsoup4
```

برای به‌روزرسانی از Git:

```powershell
git pull origin main
pip install -r requirements.txt
```

---

## حذف (Uninstall)

برای حذف کامل:

1. حذف virtual environment (اگر استفاده کردید):
   ```powershell
   Remove-Item -Recurse -Force venv
   ```

2. حذف پوشه پروژه:
   ```powershell
   cd ..
   Remove-Item -Recurse -Force pmo-docs
   ```

3. حذف وابستگی‌های Python (اختیاری):
   ```powershell
   pip uninstall mkdocs mkdocs-material flask python-docx beautifulsoup4
   ```

---

## پشتیبانی

اگر همچنان مشکل دارید:
1. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) را مطالعه کنید
2. لاگ‌های خطا را در Console بررسی کنید
3. Issue جدید در repository ایجاد کنید

---

**تاریخ آخرین بروزرسانی:** ۱۱ آبان ۱۴۰۴
