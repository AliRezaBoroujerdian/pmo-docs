# Version Control Guidelines

<div class="export-buttons">
    <button onclick="window.exportToPDF()" class="export-btn pdf-btn">
        <span class="icon">📄</span> خروجی PDF
    </button>
    <button onclick="window.exportToWord()" class="export-btn word-btn">
        <span class="icon">📝</span> خروجی Word
    </button>
</div>

## مقدمه

این سند راهنمای استفاده از سیستم کنترل نسخه (Version Control) در سازمان بنادر و دریانوردی را شرح می‌دهد.

---

## ابزارهای Version Control

در سازمان بنادر و دریانوردی از ابزارهای زیر برای کنترل نسخه استفاده می‌کنیم:

### Git
**Git** به عنوان سیستم کنترل نسخه توزیع‌شده (Distributed Version Control System) انتخاب شده است که امکانات زیر را فراهم می‌کند:

- ✅ کنترل نسخه محلی و آنلاین
- ✅ مدیریت شاخه‌ها (Branching)
- ✅ ادغام تغییرات (Merging)
- ✅ بازگشت به نسخه‌های قبلی
- ✅ همکاری تیمی موثر

### Azure DevOps
**Azure DevOps** به عنوان پلتفرم میزبانی مخازن Git و مدیریت پروژه استفاده می‌شود که شامل:

- ✅ Azure Repos - میزبانی مخازن Git
- ✅ Azure Pipelines - CI/CD
- ✅ Azure Boards - مدیریت کارها
- ✅ کنترل دسترسی و امنیت
- ✅ گزارش‌دهی و تحلیل

---

## معماری Version Control

```
Azure DevOps
    └── Organization: سازمان بنادر و دریانوردی
        └── Projects
            ├── Project A
            │   ├── Repository 1
            │   ├── Repository 2
            │   └── ...
            ├── Project B
            └── ...
```

### ساختار مخازن

هر پروژه می‌تواند شامل چندین Repository باشد:

- **Frontend Repository**: کد رابط کاربری
- **Backend Repository**: کد سرور و API
- **Infrastructure Repository**: فایل‌های Infrastructure as Code
- **Documentation Repository**: مستندات پروژه

---

## استراتژی Branching

ما از استراتژی **Git Flow** استفاده می‌کنیم:

### شاخه‌های اصلی

#### `main` (یا `master`)
- شاخه اصلی و پایدار
- همیشه آماده برای Production
- فقط از طریق Pull Request قابل به‌روزرسانی

#### `develop`
- شاخه توسعه
- آخرین تغییرات توسعه یافته
- پایه برای شاخه‌های feature

### شاخه‌های پشتیبان

#### `feature/*`
- برای توسعه ویژگی‌های جدید
- از `develop` منشعب می‌شود
- به `develop` ادغام می‌شود
- نام‌گذاری: `feature/feature-name`

مثال:
```bash
feature/user-authentication
feature/payment-gateway
feature/dashboard-redesign
```

#### `bugfix/*`
- برای رفع باگ‌های در حال توسعه
- از `develop` منشعب می‌شود
- به `develop` ادغام می‌شود
- نام‌گذاری: `bugfix/bug-description`

#### `hotfix/*`
- برای رفع فوری باگ‌های Production
- از `main` منشعب می‌شود
- به `main` و `develop` ادغام می‌شود
- نام‌گذاری: `hotfix/critical-bug`

#### `release/*`
- برای آماده‌سازی نسخه جدید
- از `develop` منشعب می‌شود
- به `main` و `develop` ادغام می‌شود
- نام‌گذاری: `release/v1.2.3`

---

## قوانین Commit

### ساختار Commit Message

```
<type>(<scope>): <subject>

<body>

<footer>
```

### انواع Commit

- **feat**: ویژگی جدید
- **fix**: رفع باگ
- **docs**: تغییرات مستندات
- **style**: تغییرات فرمت‌بندی (بدون تغییر کد)
- **refactor**: بازنویسی کد (بدون تغییر عملکرد)
- **test**: اضافه کردن یا اصلاح تست‌ها
- **chore**: کارهای نگهداری (dependencies، config)
- **perf**: بهبود عملکرد

### مثال‌های Commit Message

```bash
feat(auth): add JWT authentication

Implemented JWT-based authentication system with 
refresh token support

Closes #123

---

fix(api): resolve null pointer exception in user service

Fixed bug where getUserById returned null for valid IDs

---

docs(readme): update installation instructions
```

---

## قوانین کلی

### ✅ باید انجام شود

1. **همیشه از branch جدید استفاده کنید**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **قبل از شروع کار، آخرین تغییرات را دریافت کنید**
   ```bash
   git pull origin develop
   ```

3. **Commit‌های کوچک و معنادار**
   - هر commit باید یک تغییر منطقی را شامل شود
   - Commit message واضح و توصیفی

4. **قبل از Push، تست کنید**
   - اطمینان از اجرای صحیح کد
   - اجرای تست‌های واحد

5. **Pull Request برای ادغام**
   - همیشه از طریق PR تغییرات را ادغام کنید
   - حداقل یک نفر باید PR را Review کند

### ❌ نباید انجام شود

1. **مستقیم به `main` یا `develop` Push نکنید**
   ```bash
   # اشتباه ❌
   git push origin main
   ```

2. **Commit‌های بزرگ و مبهم**
   ```bash
   # اشتباه ❌
   git commit -m "fix bugs"
   ```

3. **فایل‌های حساس را Commit نکنید**
   - کلیدهای API
   - رمزهای عبور
   - توکن‌های دسترسی
   - فایل‌های `.env`

4. **History را Rewrite نکنید**
   - از `git push --force` استفاده نکنید (مگر در موارد خاص)
   - History مشترک را تغییر ندهید

---

## امنیت

### .gitignore

همیشه از فایل `.gitignore` مناسب استفاده کنید:

```gitignore
# Secrets
.env
.env.local
*.key
*.pem
secrets.json

# Dependencies
node_modules/
vendor/
*.pyc

# Build outputs
dist/
build/
*.dll
*.exe

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

### Azure DevOps Security

- از **Branch Policies** استفاده کنید
- دسترسی‌ها را محدود کنید
- از **Required Reviewers** استفاده کنید
- **Build Validation** را فعال کنید

---

## منابع

- [Git Documentation](https://git-scm.com/doc)
- [Azure DevOps Documentation](https://learn.microsoft.com/en-us/azure/devops/)
- [Git Flow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**نسخه:** 1.0.0  
**تاریخ:** ۱۴۰۴/۰۸/۱۹  
**نویسنده:** تیم PMO - سازمان بنادر و دریانوردی
