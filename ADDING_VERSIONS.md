# 🔢 راهنمای اضافه کردن نسخه جدید

این راهنما نحوه اضافه کردن نسخه (version) جدید به یک سند موجود را توضیح می‌دهد.

## 📋 مثال: اضافه کردن v4.0.0 به مدیریت ریسک

فرض کنید می‌خواهیم نسخه 4.0.0 را به مدیریت ریسک اضافه کنیم.

---

## 🎯 Semantic Versioning

قبل از شروع، نوع تغییرات را مشخص کنید:

### قالب: `vMAJOR.MINOR.PATCH[-PRERELEASE]`

- **MAJOR (X.0.0)**: تغییرات breaking یا بازسازی کامل
  - مثال: `v4.0.0`
  - زمانی که ساختار کلی تغییر می‌کند

- **MINOR (1.X.0)**: ویژگی‌های جدید (بدون breaking)
  - مثال: `v3.1.0`
  - اضافه شدن صفحات یا بخش‌های جدید

- **PATCH (1.0.X)**: bug fixes و تصحیحات کوچک
  - مثال: `v3.0.1`
  - رفع typo ها یا بهبود محتوا

- **PRERELEASE**: نسخه‌های آزمایشی
  - مثال: `v4.0.0-alpha`, `v4.0.0-beta`, `v4.0.0-rc.1`

---

## 🔧 مرحله 1: ایجاد پوشه نسخه جدید

### 1.1 ایجاد ساختار

```powershell
New-Item -Path "docs/risk-management/versions/v4.0.0" -ItemType Directory
```

### 1.2 کپی کردن محتوای نسخه قبلی (اختیاری)

```powershell
# کپی از نسخه 3.0.0 به عنوان base
Copy-Item -Path "docs/risk-management/versions/v3.0.0/*" `
          -Destination "docs/risk-management/versions/v4.0.0/" `
          -Recurse
```

یا برای شروع از صفر:

```powershell
# ایجاد فایل‌های خالی
New-Item -Path "docs/risk-management/versions/v4.0.0/overview.md" -ItemType File
New-Item -Path "docs/risk-management/versions/v4.0.0/identification.md" -ItemType File
# ... بقیه صفحات
```

---

## 📝 مرحله 2: ویرایش محتوا

### 2.1 بروزرسانی overview.md

```markdown
# نمای کلی مدیریت ریسک - نسخه 4.0.0

> **✨ نسخه 4.0.0** - آبان ۱۴۰۴  
> این نسخه شامل بازسازی کامل با رویکرد Agile است.

## تغییرات این نسخه

### ✨ ویژگی‌های جدید
- اضافه شدن ریسک‌های Agile
- یکپارچه‌سازی با Sprint Planning
- Real-time Risk Dashboard

### 🔄 تغییرات Breaking
- ساختار جدید ارزیابی ریسک
- تغییر فرمت گزارش‌ها

### 📈 بهبودها
- بهینه‌سازی فرآیند شناسایی
- الگوریتم جدید اولویت‌بندی

...
```

### 2.2 اضافه کردن صفحات جدید (اگر نیاز است)

```powershell
New-Item -Path "docs/risk-management/versions/v4.0.0/agile-risks.md" -ItemType File
```

محتوای `agile-risks.md`:

```markdown
# ریسک‌های Agile

این صفحه ریسک‌های خاص پروژه‌های Agile را پوشش می‌دهد.

## ریسک‌های Sprint

### 1. عدم تکمیل Sprint
**توضیح:** ...
**احتمال:** متوسط
**تأثیر:** بالا

### 2. تغییرات مکرر Requirements
...
```

---

## ⚙️ مرحله 3: بروزرسانی mkdocs.yml

باز کردن `mkdocs.yml` و اضافه کردن نسخه جدید **در بالای لیست**:

```yaml
nav:
  - خانه: index.md
  
  - مدیریت پروژه:
    - v2.0.0-beta:
      - راهنما: project-management/versions/v2.0.0-beta/guide.md
    - v1.0.0:
      - راهنما: project-management/versions/v1.0.0/guide.md
  
  - مدیریت ریسک:
    # ⬇️ نسخه جدید در بالا
    - v4.0.0:
      - نمای کلی: risk-management/versions/v4.0.0/overview.md
      - شناسایی: risk-management/versions/v4.0.0/identification.md
      - ارزیابی: risk-management/versions/v4.0.0/assessment.md
      - کاهش: risk-management/versions/v4.0.0/mitigation.md
      - پاسخ: risk-management/versions/v4.0.0/response.md
      - نظارت: risk-management/versions/v4.0.0/monitoring.md
      - گزارش‌دهی: risk-management/versions/v4.0.0/reporting.md
      - ریسک‌های Agile: risk-management/versions/v4.0.0/agile-risks.md  # جدید
    # نسخه‌های قدیمی‌تر
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
```

**نکته مهم:** نسخه جدید همیشه در **بالای لیست** قرار می‌گیرد.

---

## 🔧 مرحله 4: بروزرسانی version-selector.js

باز کردن `docs/javascripts/version-selector.js`:

### 4.1 بروزرسانی latestVersions

خط 11-14:

```javascript
const latestVersions = {
    'risk-management': 'v4.0.0',  // ⬅️ تغییر از v3.0.0 به v4.0.0
    'project-management': 'v2.0.0-beta',
    'quality-management': 'v1.0.0'
};
```

### 4.2 بروزرسانی redirectPaths

خط 37-45:

```javascript
const redirectPaths = {
    'risk-management': '/risk-management/versions/v4.0.0/overview/',  // ⬅️ تغییر
    'project-management': '/project-management/versions/v2.0.0-beta/guide/',
    'quality-management': '/quality-management/versions/v1.0.0/overview/'
};
```

**نکته:** URL pattern check (خط 21) نیازی به تغییر ندارد.

---

## 📝 مرحله 5: بروزرسانی index.md

باز کردن `docs/risk-management/index.md`:

### 5.1 تغییر redirect URL

```markdown
# مستندات مدیریت ریسک

<script>
// Auto-redirect to latest version
window.location.href = 'versions/v4.0.0/overview/';  // ⬅️ تغییر
</script>

این بخش شامل تمامی مستندات مربوط به مدیریت ریسک در پروژه‌ها است.

**⚠️ توجه:** در حال انتقال خودکار به آخرین نسخه (v4.0.0)...  <!-- ⬅️ تغییر -->

اگر انتقال خودکار انجام نشد، [اینجا کلیک کنید](versions/v4.0.0/overview/).  <!-- ⬅️ تغییر -->
```

### 5.2 اضافه کردن به لیست نسخه‌ها

```markdown
## نسخه‌های موجود

### [📘 نسخه 4.0.0 (آخرین نسخه)](versions/v4.0.0/overview.md)
**تاریخ انتشار:** آبان ۱۴۰۴

**تغییرات:**
- ✨ بازسازی کامل با رویکرد Agile
- ✨ اضافه شدن Real-time Dashboard
- ✨ یکپارچه‌سازی با Sprint Planning
- 🔄 تغییر ساختار ارزیابی
- 📝 بهبود الگوریتم‌های اولویت‌بندی

---

### [📗 نسخه 3.0.0](versions/v3.0.0/overview.md)
**تاریخ انتشار:** مهر ۱۴۰۴

**محتوا:**
- هفت صفحه کامل مدیریت ریسک
- ماتریس احتمال-تأثیر پیشرفته
- تحلیل کمی ریسک

---

<!-- بقیه نسخه‌ها -->
```

---

## 📊 مرحله 6: بروزرسانی export_server.py

باز کردن `export_server.py`:

```python
PAGE_MAPPINGS = {
    'risk-management': {
        'v4.0.0': [  # ⬅️ جدید
            'overview', 'identification', 'assessment',
            'mitigation', 'response', 'monitoring', 
            'reporting', 'agile-risks'  # صفحه جدید
        ],
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
    }
}
```

---

## 🏗️ مرحله 7: Build و Test

### 7.1 Clean Build

```powershell
mkdocs build --clean
```

بررسی خروجی:
```
INFO - Building documentation...
INFO - Cleaning site directory
INFO - Documentation built in 0.XX seconds
```

### 7.2 Test محلی

```powershell
mkdocs serve -a 127.0.0.1:9000
```

### 7.3 چک‌لیست تست

- [ ] کلیک روی "مدیریت ریسک" → redirect به v4.0.0
- [ ] Version selector نسخه v4.0.0 را نمایش می‌دهد
- [ ] Version selector نسخه‌های قدیمی (v3.0.0, v2.0.0-beta, v1.0.0) را نمایش می‌دهد
- [ ] تمام صفحات v4.0.0 قابل دسترسی هستند
- [ ] لینک‌های بین صفحات کار می‌کنند
- [ ] Navigation بین نسخه‌ها کار می‌کند
- [ ] دکمه‌های export برای v4.0.0 کار می‌کنند
- [ ] نسخه‌های قدیمی همچنان قابل دسترسی هستند

### 7.4 تست Version Selector

1. رفتن به `http://127.0.0.1:9000/risk-management/`
2. باید به v4.0.0 redirect شود
3. در sidebar، dropdown version selector را کلیک کنید
4. باید ببینید:
   - v4.0.0 (فعال)
   - v3.0.0
   - v2.0.0-beta
   - v1.0.0

---

## 🔄 مرحله 8: Migration Guide (اختیاری)

برای نسخه‌های MAJOR، یک صفحه Migration Guide ایجاد کنید:

```powershell
New-Item -Path "docs/risk-management/versions/v4.0.0/migration-from-v3.md" -ItemType File
```

محتوا:

```markdown
# راهنمای مهاجرت از v3.0.0 به v4.0.0

این راهنما تغییرات breaking و نحوه مهاجرت از نسخه 3 به 4 را توضیح می‌دهد.

## تغییرات Breaking

### 1. ساختار جدید ارزیابی ریسک

**قبل (v3.0.0):**
```json
{
  "probability": "high",
  "impact": "medium"
}
```

**بعد (v4.0.0):**
```json
{
  "probability": 0.8,
  "impact": 0.6,
  "score": 0.48
}
```

### 2. تغییر فرمت گزارش‌ها

گزارش‌ها حالا JSON به جای Excel هستند.

## مراحل مهاجرت

### مرحله 1: بررسی داده‌های موجود
...

### مرحله 2: تبدیل فرمت
...

### مرحله 3: تست و Validation
...
```

اضافه کردن به `mkdocs.yml`:

```yaml
- v4.0.0:
  - نمای کلی: risk-management/versions/v4.0.0/overview.md
  - شناسایی: risk-management/versions/v4.0.0/identification.md
  # ...
  - مهاجرت از v3: risk-management/versions/v4.0.0/migration-from-v3.md  # جدید
```

---

## ✅ مرحله 9: Commit به Git

```powershell
git add docs/risk-management/versions/v4.0.0/
git add docs/risk-management/index.md
git add docs/javascripts/version-selector.js
git add mkdocs.yml
git add export_server.py

git commit -m "Release Risk Management v4.0.0

Major version with Agile integration

Breaking Changes:
- New risk assessment structure (probability/impact as decimals)
- Report format changed from Excel to JSON

New Features:
- Agile-specific risks page
- Real-time risk dashboard
- Sprint planning integration

Pages:
- overview.md (updated)
- identification.md (updated)
- assessment.md (updated)
- mitigation.md (updated)
- response.md (updated)
- monitoring.md (updated)
- reporting.md (updated)
- agile-risks.md (NEW)
- migration-from-v3.md (NEW)

Updates:
- version-selector.js: latestVersions → v4.0.0
- index.md: redirect to v4.0.0
- mkdocs.yml: added v4.0.0 navigation
- export_server.py: added v4.0.0 pages"

git push origin main
```

---

## 📝 چک‌لیست نهایی

قبل از release:

- [ ] پوشه v4.0.0 ایجاد شده
- [ ] تمام صفحات محتوا تکمیل شده‌اند
- [ ] mkdocs.yml بروزرسانی شده (نسخه جدید در بالا)
- [ ] version-selector.js بروزرسانی شده (2 جا)
- [ ] index.md بروزرسانی شده (redirect + لیست نسخه‌ها)
- [ ] export_server.py بروزرسانی شده
- [ ] Migration guide ایجاد شده (برای MAJOR)
- [ ] Build موفق است
- [ ] تست محلی کامل انجام شده
- [ ] Version selector کار می‌کند
- [ ] Auto-redirect به نسخه جدید کار می‌کند
- [ ] نسخه‌های قدیمی همچنان در دسترس هستند
- [ ] Export کار می‌کند
- [ ] Git commit انجام شده

---

## 🔖 مثال‌های دیگر

### Minor Version (v3.1.0)

اضافه کردن یک صفحه جدید بدون breaking change:

```powershell
New-Item -Path "docs/risk-management/versions/v3.1.0" -ItemType Directory
Copy-Item -Path "docs/risk-management/versions/v3.0.0/*" `
          -Destination "docs/risk-management/versions/v3.1.0/" -Recurse
New-Item -Path "docs/risk-management/versions/v3.1.0/templates.md" -ItemType File
```

### Patch Version (v3.0.1)

فقط رفع typo ها:

```powershell
New-Item -Path "docs/risk-management/versions/v3.0.1" -ItemType Directory
Copy-Item -Path "docs/risk-management/versions/v3.0.0/*" `
          -Destination "docs/risk-management/versions/v3.0.1/" -Recurse
# ویرایش فایل‌ها برای رفع خطاها
```

### Prerelease (v4.0.0-beta)

قبل از release نهایی:

```powershell
New-Item -Path "docs/risk-management/versions/v4.0.0-beta" -ItemType Directory
# محتوا برای تست
```

در `version-selector.js`:
```javascript
const latestVersions = {
    'risk-management': 'v4.0.0-beta',  // موقت برای تست
    // ...
};
```

---

## 🎯 نکات مهم

### Semantic Versioning

- **v4.0.0** (MAJOR): تغییرات breaking
- **v3.1.0** (MINOR): ویژگی جدید
- **v3.0.1** (PATCH): bug fix
- **v4.0.0-beta** (PRERELEASE): آزمایشی

### ترتیب نسخه‌ها

در `mkdocs.yml` و `index.md`، همیشه نسخه جدیدتر در بالا:

```
v4.0.0          ← جدیدترین
v3.1.0
v3.0.1
v3.0.0
v2.0.0-beta
v1.0.0          ← قدیمی‌ترین
```

### نگهداری نسخه‌های قدیمی

نسخه‌های قدیمی را **هیچ‌وقت حذف نکنید**. کاربران ممکن است همچنان از آن‌ها استفاده کنند.

---

## 📚 مراجع بیشتر

- [Semantic Versioning 2.0.0](https://semver.org/)
- [اضافه کردن صفحه جدید](ADDING_PAGES.md)
- [اضافه کردن سند جدید](ADDING_DOCUMENTS.md)

---

**تاریخ آخرین بروزرسانی:** ۱۱ آبان ۱۴۰۴
