# راهنمای Pull Request

<div class="export-buttons">
    <button onclick="window.exportToPDF()" class="export-btn pdf-btn">
        <span class="icon">📄</span> خروجی PDF
    </button>
    <button onclick="window.exportToWord()" class="export-btn word-btn">
        <span class="icon">📝</span> خروجی Word
    </button>
</div>

## مقدمه

Pull Request (PR) مکانیزمی است که به توسعه‌دهندگان اجازه می‌دهد تغییرات خود را برای بررسی و ادغام در شاخه اصلی ارائه دهند. این سند فرآیند کامل ایجاد، بررسی و ادغام Pull Request را شرح می‌دهد.

---

## چرا Pull Request؟

### مزایای استفاده از PR

✅ **بررسی کد (Code Review)**
- کیفیت کد بهبود می‌یابد
- اشتباهات قبل از ادغام شناسایی می‌شوند
- دانش تیمی افزایش می‌یابد

✅ **مستندسازی**
- تاریخچه تصمیمات ثبت می‌شود
- دلیل تغییرات مشخص است
- ارتباط با Issues/Tasks

✅ **کنترل کیفیت**
- اجرای خودکار تست‌ها
- بررسی استانداردها
- اطمینان از عملکرد صحیح

✅ **همکاری تیمی**
- بحث و تبادل نظر
- یادگیری متقابل
- هم‌افزایی

---

## فرآیند Pull Request

### مرحله 1️⃣: آماده‌سازی

#### 1. ایجاد Branch جدید

```bash
# دریافت آخرین تغییرات
git checkout develop
git pull origin develop

# ایجاد branch جدید
git checkout -b feature/new-feature-name
```

#### 2. انجام تغییرات

```bash
# تغییرات را اعمال کنید
# فایل‌ها را ویرایش کنید

# بررسی تغییرات
git status
git diff
```

#### 3. Commit کردن تغییرات

```bash
# اضافه کردن فایل‌ها به staging
git add .

# یا فایل‌های خاص
git add path/to/file1.js path/to/file2.js

# ایجاد commit با پیام مناسب
git commit -m "feat(module): add new feature description"
```

**نکته:** از [قوانین Commit Message](overview.md#قوانین-commit) پیروی کنید.

#### 4. Push کردن Branch

```bash
# push به remote repository
git push origin feature/new-feature-name

# اگر اولین بار است
git push -u origin feature/new-feature-name
```

---

### مرحله 2️⃣: ایجاد Pull Request

#### در Azure DevOps

1. **وارد Azure DevOps شوید**
   - به Repos > Pull Requests بروید
   - روی "New Pull Request" کلیک کنید

2. **انتخاب Branches**
   ```
   Source Branch: feature/new-feature-name
   Target Branch: develop
   ```

3. **عنوان و توضیحات**

   **عنوان:** واضح و مختصر
   ```
   feat: Add user authentication system
   ```

   **توضیحات (Description):**
   ```markdown
   ## تغییرات
   - پیاده‌سازی سیستم احراز هویت با JWT
   - اضافه کردن middleware برای بررسی توکن
   - ایجاد صفحات لاگین و رجیستر

   ## تست‌ها
   - ✅ تست واحد برای AuthService
   - ✅ تست یکپارچه برای فلوی کامل لاگین
   - ✅ تست امنیتی برای حملات XSS

   ## Screenshots
   ![Login Page](./screenshots/login.png)

   ## پیش‌نیازها
   - نیاز به update کردن dependencies
   - اجرای migration برای جداول جدید

   ## مرتبط با
   - Closes #123
   - Related to #456
   ```

4. **انتخاب Reviewers**
   - حداقل یک نفر از تیم سنیور
   - افراد مرتبط با ماژول

5. **تنظیمات اضافی**
   - **Work Items**: لینک کردن به Task یا User Story
   - **Labels**: مثل `enhancement`, `bug`, `documentation`
   - **Draft**: اگر هنوز آماده نیست

---

### مرحله 3️⃣: Code Review

#### برای نویسنده (Author)

**پاسخ به نظرات:**
```markdown
# مثال پاسخ مناسب
✅ تغییر اعمال شد. در commit abc123 می‌توانید ببینید.

✅ نکته خوبی بود. refactor کردم و واضح‌تر شد.

❓ می‌توانید توضیح بیشتری بدهید؟ منظورتان این است که...؟

⚠️ این تغییر باعث break شدن فلان قسمت می‌شود. پیشنهاد می‌کنم...
```

**اعمال تغییرات:**
```bash
# تغییرات را اعمال کنید
git add .
git commit -m "fix: address review comments"
git push origin feature/new-feature-name
```

**نکته:** PR به صورت خودکار با آخرین commit‌ها به‌روز می‌شود.

#### برای بررسی‌کننده (Reviewer)

**چک‌لیست بررسی:**

##### ✅ عملکرد (Functionality)
- [ ] کد طبق خواسته کار می‌کند
- [ ] تمام سناریوها پوشش داده شده
- [ ] Edge cases بررسی شده
- [ ] خطاها به درستی مدیریت می‌شوند

##### ✅ کیفیت کد (Code Quality)
- [ ] کد واضح و قابل فهم است
- [ ] نام‌گذاری متغیرها مناسب است
- [ ] از best practices پیروی شده
- [ ] کد تکراری وجود ندارد (DRY)
- [ ] توابع کوچک و تک‌منظوره هستند

##### ✅ معماری (Architecture)
- [ ] با معماری کلی سازگار است
- [ ] اصول SOLID رعایت شده
- [ ] وابستگی‌ها مدیریت شده
- [ ] مقیاس‌پذیری در نظر گرفته شده

##### ✅ تست (Testing)
- [ ] تست‌های واحد نوشته شده
- [ ] Code coverage قابل قبول است (>80%)
- [ ] تست‌های یکپارچه اضافه شده
- [ ] تمام تست‌ها Pass می‌شوند

##### ✅ امنیت (Security)
- [ ] اطلاعات حساس expose نشده
- [ ] Input validation انجام شده
- [ ] SQL Injection/XSS بررسی شده
- [ ] Authentication/Authorization صحیح است

##### ✅ عملکرد (Performance)
- [ ] بهینه‌سازی‌های لازم انجام شده
- [ ] Query‌های پایگاه داده بهینه هستند
- [ ] Memory leak وجود ندارد
- [ ] مقیاس‌پذیری بررسی شده

##### ✅ مستندات (Documentation)
- [ ] کامنت‌های لازم نوشته شده
- [ ] README به‌روز شده
- [ ] API documentation وجود دارد
- [ ] CHANGELOG به‌روز شده

**نحوه نظردهی:**

```markdown
# نظرات سازنده ✅

💡 پیشنهاد: می‌توانید از async/await به جای promise استفاده کنید.

⚠️ مشکل: این تابع complexity بالایی دارد. بهتر است به چند تابع کوچک‌تر تقسیم شود.

❓ سوال: چرا از library X استفاده نشده؟ مزیت این روش چیست؟

✅ عالی: پیاده‌سازی error handling خیلی تمیز و کامل است!

📚 منبع: می‌توانید این pattern را در نظر بگیرید: [لینک]
```

**نظرات انتقادی ❌ اجتناب کنید:**

```markdown
# نامناسب ❌
"این کد افتضاح است!"
"چرا این کار را کردی؟"
"اینطوری نمی‌شود!"

# مناسب ✅
"این قسمت می‌تواند بهینه‌تر شود. پیشنهاد می‌کنم..."
"آیا روش دیگری را در نظر گرفته‌اید؟ مثلاً..."
"برای بهبود خوانایی، می‌توانیم..."
```

---

### مرحله 4️⃣: تست‌های خودکار

Azure Pipeline به صورت خودکار تست‌ها را اجرا می‌کند:

```yaml
# مثال Azure Pipeline
trigger:
  branches:
    include:
      - develop
      - feature/*

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'

- script: npm install
  displayName: 'Install dependencies'

- script: npm run lint
  displayName: 'Run linter'

- script: npm run test
  displayName: 'Run unit tests'

- script: npm run test:integration
  displayName: 'Run integration tests'

- task: PublishTestResults@2
  inputs:
    testResultsFiles: '**/test-results.xml'
    testRunTitle: 'Test Results'
```

**وضعیت‌های Build:**

- ✅ **Succeeded**: تمام تست‌ها Pass شده
- ❌ **Failed**: برخی تست‌ها Fail شده
- ⚠️ **Partially Succeeded**: بعضی مشکلات وجود دارد
- 🔄 **Running**: در حال اجرا

---

### مرحله 5️⃣: ادغام (Merge)

#### پیش‌نیازهای Merge

قبل از merge اطمینان حاصل کنید:

- ✅ همه Reviewers تایید کرده‌اند (Approve)
- ✅ تمام Conversations حل شده (Resolved)
- ✅ Build موفق بوده (Succeeded)
- ✅ تست‌ها Pass شده
- ✅ Conflicts حل شده
- ✅ Branch به‌روز است (با target branch)

#### روش‌های Merge

**1. Merge Commit (پیشنهادی)**
```bash
git merge --no-ff feature/new-feature
```
- تاریخچه کامل حفظ می‌شود
- تمام commits قابل مشاهده است
- یک merge commit ایجاد می‌شود

**2. Squash and Merge**
```bash
git merge --squash feature/new-feature
```
- تمام commits به یک commit تبدیل می‌شود
- تاریخچه تمیز‌تر
- جزئیات commits از بین می‌رود

**3. Rebase and Merge**
```bash
git rebase develop
git merge feature/new-feature
```
- تاریخچه خطی
- بدون merge commit
- سخت‌تر در صورت conflict

#### در Azure DevOps

1. **بررسی نهایی**
   - همه چک‌لیست‌ها را مرور کنید
   - Approvals را بررسی کنید

2. **انتخاب Merge Strategy**
   - Merge (create a merge commit)
   - Squash commit
   - Rebase and fast-forward

3. **تکمیل Merge**
   - روی "Complete" کلیک کنید
   - گزینه‌های پس از Merge:
     - ✅ Delete source branch
     - ✅ Complete associated work items

4. **Merge شد! 🎉**

---

## Policies و تنظیمات

### Branch Policies

در Azure DevOps برای branch `develop` و `main`:

#### Required Reviewers
```yaml
Minimum number of reviewers: 1
Allow requestors to approve: No
Reset reviewer votes: Yes (when new changes pushed)
```

#### Build Validation
```yaml
Build pipeline: CI-Pipeline
Trigger: Automatic
Policy requirement: Required
Build expiration: 12 hours
```

#### Status Checks
```yaml
Required status checks:
  - Code Coverage (>80%)
  - Security Scan
  - Linter
```

#### Merge Requirements
```yaml
Enforce linked work items: Required
Check comment resolution: All active comments must be resolved
Limit merge types: 
  - ✅ Merge (no fast-forward)
  - ✅ Squash merge
  - ❌ Rebase and fast-forward
```

---

## بهترین شیوه‌ها (Best Practices)

### برای نویسنده

1. **PR کوچک نگه دارید**
   - حداکثر 400 خط تغییر
   - یک هدف مشخص
   - راحت‌تر برای Review

2. **توضیحات کامل بدهید**
   - Context کامل
   - Screenshots/GIFs
   - مستندات مرتبط

3. **خودتان اول Review کنید**
   - قبل از ارسال، کدتان را بررسی کنید
   - اشتباهات واضح را برطرف کنید

4. **پاسخگو باشید**
   - نظرات را سریع بررسی کنید
   - توضیحات شفاف بدهید

5. **تست کنید**
   - همه سناریوها
   - Edge cases
   - مرورگرها/دستگاه‌های مختلف

### برای بررسی‌کننده

1. **سریع Review کنید**
   - حداکثر 24 ساعت
   - توسعه متوقف نماند

2. **سازنده باشید**
   - راه‌حل پیشنهاد دهید
   - نه فقط انتقاد

3. **اولویت‌بندی کنید**
   - Must fix: مسائل امنیتی/باگ‌ها
   - Should fix: بهبودهای مهم
   - Nice to have: پیشنهادات

4. **کد را بفهمید**
   - Context کامل
   - چرایی تصمیمات

5. **یادبگیرید**
   - الگوهای جدید
   - تکنیک‌ها

---

## مثال عملی

### سناریو: اضافه کردن فیچر "نمایش پروفایل کاربر"

#### مرحله 1: ایجاد Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/user-profile-display
```

#### مرحله 2: توسعه

```bash
# فایل‌های تغییر یافته:
# - src/components/UserProfile.jsx
# - src/services/userService.js
# - src/tests/UserProfile.test.js

git add src/components/UserProfile.jsx
git add src/services/userService.js
git add src/tests/UserProfile.test.js

git commit -m "feat(profile): add user profile display component

- Create UserProfile component with avatar and details
- Add userService method to fetch user data
- Write unit tests for UserProfile component
- Add loading and error states

Closes #789"

git push -u origin feature/user-profile-display
```

#### مرحله 3: ایجاد PR

**عنوان:**
```
feat: Add user profile display component
```

**توضیحات:**
```markdown
## 📋 خلاصه تغییرات
پیاده‌سازی کامپوننت نمایش پروفایل کاربر با قابلیت نمایش آواتار، نام، ایمیل و اطلاعات تماس.

## ✨ فیچرهای جدید
- نمایش آواتار کاربر با fallback برای تصاویر ناموجود
- نمایش اطلاعات پروفایل در قالب Card
- دکمه ویرایش پروفایل
- حالت‌های loading و error

## 🧪 تست‌ها
- ✅ Unit tests برای UserProfile component (coverage: 95%)
- ✅ Integration test برای userService
- ✅ Visual regression test
- ✅ تست دستی در Chrome, Firefox, Safari

## 📸 Screenshots
![Profile View](./screenshots/profile-view.png)
![Loading State](./screenshots/profile-loading.png)
![Error State](./screenshots/profile-error.png)

## 🔗 مرتبط با
- Closes #789
- Related to #750 (User Settings)

## 📝 نکات برای Reviewer
- استفاده از React.memo برای بهینه‌سازی
- Error boundary برای مدیریت خطاها
- Accessible (ARIA labels)
```

#### مرحله 4: Review

**نظر Reviewer:**
```markdown
در مجموع خوب کار کردی! چند نکته:

💡 **src/components/UserProfile.jsx:45**
پیشنهاد می‌کنم fallback avatar را به عنوان prop قابل تنظیم کنی.

```js
const UserProfile = ({ userId, fallbackAvatar = '/default-avatar.png' }) => {
  // ...
}
```

⚠️ **src/services/userService.js:23**
بهتر است timeout برای API call تعیین کنی:

```js
const response = await axios.get(`/api/users/${id}`, {
  timeout: 5000
});
```

✅ **src/tests/UserProfile.test.js**
تست‌ها کامل و جامع هستند. عالی! 👍
```

**پاسخ نویسنده:**
```markdown
✅ **fallback avatar**: تغییر دادم. در commit abc123

✅ **timeout**: اضافه کردم. در commit def456

ممنون از review دقیقت! 🙏
```

#### مرحله 5: Merge

```
✅ All reviewers approved
✅ Build succeeded
✅ All tests passed
✅ No conflicts

Merged by: John Doe
Merge strategy: Merge commit
Branch deleted: ✅
```

---

## رفع مشکلات رایج

### Conflict در Merge

```bash
# دریافت آخرین تغییرات target branch
git fetch origin
git checkout feature/your-branch
git merge origin/develop

# حل conflict‌ها
# ویرایش فایل‌های conflict دار
git add .
git commit -m "resolve merge conflicts"
git push
```

### PR بزرگ

اگر PR خیلی بزرگ شد:
1. به چند PR کوچک‌تر تقسیم کنید
2. هر PR یک بخش منطقی
3. ترتیب merge را مشخص کنید

### Review طولانی می‌شود

1. با Reviewer صحبت کنید
2. در Meeting بررسی کنید
3. بخش‌های مهم را Highlight کنید

### تست‌ها Fail می‌شوند

```bash
# اجرای تست‌ها به صورت محلی
npm test

# بررسی لاگ‌ها
# رفع مشکل
# commit و push مجدد

git add .
git commit -m "fix: resolve failing tests"
git push
```

---

## متریک‌ها و KPI

### برای تیم

- **PR Cycle Time**: زمان از ایجاد تا merge (هدف: <24 ساعت)
- **Review Response Time**: زمان اولین پاسخ reviewer (هدف: <4 ساعت)
- **PR Size**: تعداد خطوط تغییر (هدف: <400 خط)
- **First-time Merge Rate**: درصد PR‌هایی که در اولین بار merge می‌شوند (هدف: >70%)

### برای فرد

- **PRs Created**: تعداد PR ایجاد شده
- **Reviews Done**: تعداد Review انجام شده
- **Comments Given**: تعداد نظرات سازنده
- **PRs Merged**: تعداد PR‌های merge شده

---

## منابع و مراجع

### مستندات
- [Azure DevOps Pull Requests](https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-requests)
- [Git Branching Strategy](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
- [Code Review Best Practices](https://google.github.io/eng-practices/review/)

### ابزارها
- [Azure DevOps Extensions](https://marketplace.visualstudio.com/azuredevops)
- [Git Lens for VS Code](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [GitHub CLI](https://cli.github.com/)

### مقالات مفید
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [The Art of Code Review](https://medium.com/@vcarl/the-art-of-code-review-89c8c8f7b58f)
- [Pull Request Etiquette](https://gist.github.com/mikepea/863f63d6e37281e329f8)

---

**نسخه:** 1.0.0  
**تاریخ:** ۱۴۰۴/۰۸/۱۹  
**نویسنده:** تیم PMO - سازمان بنادر و دریانوردی  
**آخرین به‌روزرسانی:** ۱۴۰۴/۰۸/۱۹
