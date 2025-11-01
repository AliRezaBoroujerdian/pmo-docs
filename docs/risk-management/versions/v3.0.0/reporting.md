# گزارش‌دهی ریسک - نسخه 3.0.0

> **نسخه:** 3.0 | **بخش:** گزارش‌دهی

!!! success "نسخه جاری"
    شما در حال مشاهده **نسخه 3.0.0 (آخرین نسخه)** هستید.
    
    **نسخه‌های دیگر:** [📗 نسخه 1.0.0](../v1.0.0/overview.md) | [📘 نسخه 2.0.0-beta](../v2.0.0-beta/overview.md)

این سند به سیستم‌های گزارش‌دهی و ارتباطات ریسک می‌پردازد.

## انواع گزارش‌ها

### 1. گزارش روزانه
**مخاطب:** تیم پروژه  
**محتوا:** ریسک‌های فوری و اقدامات امروز

### 2. گزارش هفتگی
**مخاطب:** مدیر پروژه  
**محتوا:** خلاصه وضعیت ریسک‌ها و روندها

### 3. گزارش ماهانه
**مخاطب:** مدیریت ارشد  
**محتوا:** تحلیل استراتژیک و تصمیم‌گیری

## قالب گزارش استاندارد

```markdown
# گزارش ریسک ماهانه
**دوره:** مهر 1404  
**تهیه‌کننده:** مدیر ریسک

## خلاصه اجرایی
- تعداد ریسک‌های شناسایی شده: 25
- ریسک‌های بحرانی: 3
- ریسک‌های حل شده: 8
- بودجه مصرفی: $150,000

## ریسک‌های برتر این ماه
1. **تأخیر در تأمین تجهیزات**
   - احتمال: بالا (80%)
   - تأثیر: $200,000
   - وضعیت: در حال پیگیری
   
## اقدامات انجام شده
...

## توصیه‌ها
...
```

## داشبورد گزارش‌دهی

### نمودارها و متریک‌ها

```python
import matplotlib.pyplot as plt
import pandas as pd

class RiskReportGenerator:
    def __init__(self, risks_df):
        self.risks = risks_df
        
    def generate_summary_report(self):
        """تولید گزارش خلاصه"""
        summary = {
            'total': len(self.risks),
            'critical': len(self.risks[self.risks['severity'] == 'critical']),
            'high': len(self.risks[self.risks['severity'] == 'high']),
            'medium': len(self.risks[self.risks['severity'] == 'medium']),
            'low': len(self.risks[self.risks['severity'] == 'low']),
        }
        return summary
    
    def plot_risk_trend(self):
        """رسم روند ریسک‌ها در طول زمان"""
        plt.figure(figsize=(12, 6))
        
        # Group by date and severity
        trend = self.risks.groupby(['date', 'severity']).size().unstack()
        
        trend.plot(kind='area', stacked=True, alpha=0.7)
        plt.title('روند ریسک‌ها در طول زمان', fontsize=14)
        plt.xlabel('تاریخ')
        plt.ylabel('تعداد ریسک')
        plt.legend(title='شدت', loc='upper left')
        plt.grid(True, alpha=0.3)
        
        return plt
    
    def create_risk_matrix(self):
        """ایجاد ماتریس ریسک"""
        matrix = pd.crosstab(
            self.risks['impact'],
            self.risks['probability'],
            margins=True
        )
        return matrix
    
    def export_to_excel(self, filename):
        """خروجی Excel"""
        with pd.ExcelWriter(filename, engine='openpyxl') as writer:
            # Summary sheet
            summary_df = pd.DataFrame([self.generate_summary_report()])
            summary_df.to_excel(writer, sheet_name='خلاصه', index=False)
            
            # Detailed risks
            self.risks.to_excel(writer, sheet_name='ریسک‌ها', index=False)
            
            # Risk matrix
            matrix = self.create_risk_matrix()
            matrix.to_excel(writer, sheet_name='ماتریس')

# استفاده
# risks_df = pd.read_csv('risks.csv')
# reporter = RiskReportGenerator(risks_df)
# reporter.export_to_excel('monthly_report.xlsx')
```

## گزارش‌دهی بصری

### قالب PowerPoint خودکار

```python
from pptx import Presentation
from pptx.util import Inches, Pt

class RiskPresentationGenerator:
    def __init__(self):
        self.prs = Presentation()
        self.prs.slide_width = Inches(10)
        self.prs.slide_height = Inches(7.5)
    
    def add_title_slide(self, title, subtitle):
        """اضافه کردن اسلاید عنوان"""
        slide_layout = self.prs.slide_layouts[0]
        slide = self.prs.slides.add_slide(slide_layout)
        
        title_shape = slide.shapes.title
        subtitle_shape = slide.placeholders[1]
        
        title_shape.text = title
        subtitle_shape.text = subtitle
        
    def add_risk_summary(self, summary_data):
        """اضافه کردن خلاصه ریسک‌ها"""
        slide_layout = self.prs.slide_layouts[5]  # Blank layout
        slide = self.prs.slides.add_slide(slide_layout)
        
        # Add title
        title = slide.shapes.add_textbox(
            Inches(0.5), Inches(0.5),
            Inches(9), Inches(0.8)
        )
        title.text = "خلاصه وضعیت ریسک‌ها"
        title.text_frame.paragraphs[0].font.size = Pt(32)
        title.text_frame.paragraphs[0].font.bold = True
        
        # Add summary boxes
        y_pos = 1.5
        for category, count in summary_data.items():
            self._add_summary_box(slide, category, count, y_pos)
            y_pos += 1
    
    def save(self, filename):
        """ذخیره فایل PowerPoint"""
        self.prs.save(filename)

# استفاده
# gen = RiskPresentationGenerator()
# gen.add_title_slide('گزارش ریسک ماهانه', 'مهر 1404')
# gen.add_risk_summary({'بحرانی': 3, 'بالا': 8, 'متوسط': 12, 'پایین': 15})
# gen.save('risk_report.pptx')
```

## سیستم هشدار خودکار

### ارسال ایمیل هشدار

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class RiskAlertSystem:
    def __init__(self, smtp_server, sender_email, password):
        self.smtp_server = smtp_server
        self.sender_email = sender_email
        self.password = password
    
    def send_critical_alert(self, risk_data, recipient_list):
        """ارسال هشدار برای ریسک بحرانی"""
        subject = f"🚨 هشدار: ریسک بحرانی - {risk_data['name']}"
        
        body = f"""
        یک ریسک بحرانی شناسایی شده است:
        
        نام: {risk_data['name']}
        احتمال: {risk_data['probability']}%
        تأثیر: ${risk_data['impact']:,}
        وضعیت: {risk_data['status']}
        
        اقدام فوری مورد نیاز است!
        
        لطفاً سیستم مدیریت ریسک را بررسی کنید.
        """
        
        msg = MIMEMultipart()
        msg['From'] = self.sender_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP(self.smtp_server, 587) as server:
            server.starttls()
            server.login(self.sender_email, self.password)
            
            for recipient in recipient_list:
                msg['To'] = recipient
                server.send_message(msg)
                del msg['To']
    
    def send_weekly_digest(self, summary_data, recipient_list):
        """ارسال خلاصه هفتگی"""
        subject = "📊 خلاصه هفتگی ریسک‌ها"
        
        body = f"""
        خلاصه وضعیت ریسک‌ها در هفته گذشته:
        
        - کل ریسک‌ها: {summary_data['total']}
        - ریسک‌های بحرانی: {summary_data['critical']}
        - ریسک‌های جدید: {summary_data['new']}
        - ریسک‌های حل شده: {summary_data['resolved']}
        
        گزارش کامل را در سیستم مشاهده کنید.
        """
        
        # Implementation similar to above
        # ...

# استفاده
# alert_system = RiskAlertSystem('smtp.gmail.com', 'risk@company.com', 'password')
# alert_system.send_critical_alert(risk_data, ['manager@company.com'])
```

## KPI های گزارش‌دهی

### معیارهای کلیدی

| معیار | فرمول | هدف | وضعیت فعلی |
|-------|-------|-----|-----------|
| نرخ شناسایی به موقع | (ریسک‌های شناسایی قبل از وقوع / کل ریسک‌ها) × 100 | > 85% | 92% ✅ |
| زمان پاسخ میانگین | میانگین زمان از شناسایی تا اقدام | < 48 ساعت | 36 ساعت ✅ |
| دقت پیش‌بینی | (پیش‌بینی‌های صحیح / کل پیش‌بینی‌ها) × 100 | > 80% | 78% ⚠️ |
| نرخ حل ریسک | (ریسک‌های حل شده / کل ریسک‌ها) × 100 | > 70% | 65% ⚠️ |

## نمونه Dashboard HTML

```html
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>داشبورد ریسک</title>
    <style>
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .card h3 {
            margin: 0 0 10px 0;
            font-size: 1.2em;
        }
        .card .number {
            font-size: 2.5em;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="card">
            <h3>کل ریسک‌ها</h3>
            <div class="number">38</div>
        </div>
        <div class="card">
            <h3>ریسک بحرانی</h3>
            <div class="number">3</div>
        </div>
        <div class="card">
            <h3>در حال پیگیری</h3>
            <div class="number">15</div>
        </div>
        <div class="card">
            <h3>حل شده</h3>
            <div class="number">20</div>
        </div>
    </div>
</body>
</html>
```

## بهترین شیوه‌ها

### اصول گزارش‌دهی موثر

1. **شفافیت کامل** 💎
   - همه اطلاعات مهم را شامل شود
   - بدون پنهان‌کاری

2. **به موقع بودن** ⏰
   - گزارش‌ها در زمان مقرر ارسال شود
   - هشدارها فوری باشد

3. **قابل فهم بودن** 📖
   - زبان ساده و روان
   - نمودارها و تصاویر گویا

4. **قابل اقدام بودن** ✅
   - توصیه‌های مشخص
   - مسئولیت‌های تعیین شده

## چک‌لیست گزارش‌دهی

- [ ] تعیین مخاطبان گزارش
- [ ] انتخاب قالب مناسب
- [ ] جمع‌آوری داده‌های دقیق
- [ ] تحلیل و تفسیر
- [ ] ایجاد نمودارها
- [ ] نوشتن خلاصه اجرایی
- [ ] بررسی و تأیید
- [ ] ارسال به موقع
- [ ] دریافت بازخورد
- [ ] آرشیو و مستندسازی
