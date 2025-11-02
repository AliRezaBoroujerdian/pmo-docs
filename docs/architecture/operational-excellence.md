# Operational Excellence

## برتری عملیاتی

این بخش بر حوزه‌هایی تمرکز دارد که می‌توانند به بهبود عملیاتی میکروسرویس‌ها کمک کنند.

---

## Ownership

### مالکیت

- [ ] مکانیزمی برای شناسایی مالکیت سرویس (توسعه و زمان اجرا) (مثلاً: استفاده از تگ‌ها (tags)، برچسب‌ها (labels) و غیره)
- [ ] نقاط تماس (Point of contacts) برای به‌روزرسانی‌ها و تغییرات
- [ ] فرایند و ماتریس (matrix) ارجاع (Escalation)
- [ ] اعمال نمی‌شود

---

## Logging & Monitoring

### ثبت لاگ و مانیتورینگ (پایش)

- [ ] برنامه (Application telemetry)
- [ ] کاربران (User activity telemetry)
- [ ] وابستگی‌ها (Dependency telemetry)
- [ ] تراکنش‌ها (Transaction traceability)
- [ ] نقاط دسترسی (end points telemetry)
- [ ] اعمال نمی‌شود

---

## Observability

### قابلیت مشاهده

- [ ] حجم کار (Workload health)
      - [ ] شناسایی KPIها و معیارها (Identify KPIs and metrics)
      - [ ] در دسترس بودن معیارهای پایه (Metrics Baseline available)
      - [ ] الگوهای ترافیک و معیارهای مورد انتظار (Expected traffic and metrics patterns)
      - [ ] بازنگری و تنظیم KPI و معیارها (Iterate KPI and Metrics review and adjustments)
      - [ ] ایجاد داشبورد و راه‌اندازی (Dashboard creation and on-boarding)
      - [ ] وضعیت درخواست/تراکنش HTTP، زمان و غیره در NewRelic یا Application Performance Monitoring وارد می‌شود.
      - [ ] سیاست‌های هشدار و کانال‌های اعلان در NewRelic یا APM تنظیم می‌شوند.
- [ ] مکانیزم ردیابی (Tracing mechanism) پیاده‌سازی شده است.

---

## Deployment/Rollback Automation

### خودکارسازی استقرار و بازگشت به نسخه قبلی

- [ ] نسخه‌ی نرم‌افزار باید با فرمت MAJOR.MINOR.PATCH مشخص شود و هر عدد طبق قانون Semantic Versioning تغییر کند.
- [ ] استفاده از کنترل نسخه (Version control)
- [ ] استراتژی‌های تست تعریف و اجرا شده‌اند
      - [ ] تست‌های بار موفقیت‌آمیز بوده‌اند
- [ ] خودکارسازی استقرار و بازگشت
      - [ ] قابلیت بازگشت (Rollback)
            - [ ] خودکار
            - [ ] فرایند دستی
- [ ] استراتژی‌های استقرار - Canary, Blue/Green و غیره
- [ ] استراتژی به‌روزرسانی‌های امنیتی
      - [ ] از آخرین یا حداکثر ماقبل آخرین نسخه‌ی LTS (Long-Term Support) زبان‌ها یا تکنولوژی‌ها استفاده شده باشد، که زمان پشتیبانی آن‌ها، توسط ارائه‌دهنده به اتمام نرسیده باشد.
- [ ] زیرساخت غیرقابل تغییر (Immutable infra)
- [ ] مستندات مورد نیاز
- [ ] ملاحظات خاص محیطی (IIS، Kubernetes و …)

---

## Operational Readiness

### آمادگی عملیاتی

- [ ] تایید معماری (Architecture Approval)
- [ ] تایید امنیت (Security Approval)
- [ ] انتشار در دایرکتوری سرویس (Published in service directory)
- [ ] مستندات API موجود (API documentation available)
- [ ] Runbook در دسترس
- [ ] Playbook در دسترس
- [ ] ظرفیت تیم عملیات (Operations team capacity)
- [ ] طراحی و اجرای یک شبیه‌سازی کنترل‌شده از شرایط بحرانی واقعی یا بار بالا (Game day plan and readiness)
      - [ ] خاموش کردن یکی از گره‌های دیتابیس برای تست Failover
      - [ ] ایجاد افزایش ترافیک ناگهانی برای مشاهده Auto-scaling
      - [ ] تأخیر مصنوعی در ارتباط بین میکروسرویس‌ها برای بررسی رفتار Retry
      - [ ] غیرفعال کردن یک وابستگی حیاتی برای بررسی میزان تاب‌آوری سیستم

---

## بازگشت به صفحه اصلی

[← بازگشت به فهرست چک‌لیست‌ها](index.md)
