# 🚀 راهنمای استقرار روی Windows Server + IIS

این راهنما مراحل کامل استقرار (Deployment) سیستم مستندسازی PMO را روی Windows Server با IIS توضیح می‌دهد.

## 📋 پیش‌نیازها

### سرور

- Windows Server 2016 یا جدیدتر (توصیه: 2019/2022)
- IIS 10.0 یا بالاتر
- حداقل 4GB RAM
- حداقل 20GB فضای دیسک
- دسترسی Administrator

### نرم‌افزارها

- Python 3.8+ (توصیه: 3.11)
- URL Rewrite Module for IIS
- Microsoft Visual C++ Redistributable
- (اختیاری) Git for Windows

---

## 🔧 مرحله 1: نصب و تنظیم IIS

### 1.1 نصب IIS

```powershell
# باز کردن PowerShell به عنوان Administrator
Install-WindowsFeature -Name Web-Server -IncludeManagementTools
Install-WindowsFeature -Name Web-Static-Content
Install-WindowsFeature -Name Web-Default-Doc
Install-WindowsFeature -Name Web-Dir-Browsing
Install-WindowsFeature -Name Web-Http-Errors
Install-WindowsFeature -Name Web-Http-Redirect
Install-WindowsFeature -Name Web-Filtering
Install-WindowsFeature -Name Web-Cgid
```

### 1.2 نصب URL Rewrite Module

1. دانلود از: https://www.iis.net/downloads/microsoft/url-rewrite
2. اجرای `rewrite_amd64_en-US.msi`
3. Restart کردن IIS:
```powershell
iisreset
```

---

## 🐍 مرحله 2: نصب Python

### 2.1 دانلود و نصب

1. دانلود Python 3.11 از python.org
2. در حین نصب:
   - ✅ Add Python to PATH
   - ✅ Install for all users
   - نصب در مسیر: `C:\Python311\`

### 2.2 بررسی نصب

```powershell
python --version
pip --version
```

### 2.3 نصب وابستگی‌های پروژه

```powershell
cd C:\inetpub\wwwroot\pmo-docs
pip install mkdocs==1.6.1
pip install mkdocs-material==9.6.22
pip install flask==3.1.0
pip install python-docx==1.1.2
pip install beautifulsoup4==4.12.3
```

یا با requirements.txt:
```powershell
pip install -r requirements.txt
```

---

## 📁 مرحله 3: آماده‌سازی فایل‌ها

### 3.1 انتقال پروژه

```powershell
# ایجاد پوشه
New-Item -Path "C:\inetpub\wwwroot\pmo-docs" -ItemType Directory

# کپی فایل‌ها (از development)
Copy-Item -Path "D:\PMO\Doc\pmo-docs\*" -Destination "C:\inetpub\wwwroot\pmo-docs\" -Recurse
```

### 3.2 Build کردن Static Files

```powershell
cd C:\inetpub\wwwroot\pmo-docs
mkdocs build --clean
```

خروجی در پوشه `site/` قرار می‌گیرد:
```
C:\inetpub\wwwroot\pmo-docs\site\
```

---

## 🌐 مرحله 4: تنظیم IIS Site

### 4.1 ایجاد Application Pool

```powershell
# باز کردن IIS Manager
inetmgr

# یا با PowerShell:
Import-Module WebAdministration
New-WebAppPool -Name "PMODocsPool"
Set-ItemProperty IIS:\AppPools\PMODocsPool -Name managedRuntimeVersion -Value ""
Set-ItemProperty IIS:\AppPools\PMODocsPool -Name enable32BitAppOnWin64 -Value $false
```

تنظیمات Application Pool:
- **.NET CLR Version**: No Managed Code
- **Managed Pipeline Mode**: Integrated
- **Identity**: ApplicationPoolIdentity

### 4.2 ایجاد Website

```powershell
New-Website -Name "PMO-Docs" `
    -PhysicalPath "C:\inetpub\wwwroot\pmo-docs\site" `
    -ApplicationPool "PMODocsPool" `
    -Port 80

# یا برای HTTPS:
New-Website -Name "PMO-Docs" `
    -PhysicalPath "C:\inetpub\wwwroot\pmo-docs\site" `
    -ApplicationPool "PMODocsPool" `
    -Port 443 `
    -Ssl
```

### 4.3 تنظیم Bindings

```powershell
# HTTP
New-WebBinding -Name "PMO-Docs" -Protocol "http" -Port 80 -HostHeader "docs.pmo.local"

# HTTPS (نیاز به SSL Certificate)
New-WebBinding -Name "PMO-Docs" -Protocol "https" -Port 443 -HostHeader "docs.pmo.local"
```

---

## 🔒 مرحله 5: تنظیم SSL Certificate (اختیاری)

### 5.1 ایجاد Self-Signed Certificate

```powershell
# برای محیط Development/Internal
New-SelfSignedCertificate -DnsName "docs.pmo.local" `
    -CertStoreLocation "cert:\LocalMachine\My" `
    -FriendlyName "PMO Docs Certificate"
```

### 5.2 اتصال Certificate به IIS

1. باز کردن IIS Manager
2. انتخاب Site → Bindings
3. Add → HTTPS → انتخاب Certificate
4. OK

### 5.3 Certificate از Let's Encrypt (Production)

برای Certificate رایگان:
1. نصب Win-ACME: https://www.win-acme.com/
2. اجرای wizard:
```powershell
wacs.exe
```
3. انتخاب IIS site
4. Automatic renewal setup

---

## 🔄 مرحله 6: تنظیم Export Server (Flask)

### 6.1 ایجاد Windows Service

ایجاد فایل `export-service.py`:

```python
import win32serviceutil
import win32service
import win32event
import servicemanager
import subprocess
import os

class ExportServerService(win32serviceutil.ServiceFramework):
    _svc_name_ = "PMOExportServer"
    _svc_display_name_ = "PMO Export Server"
    _svc_description_ = "Flask server for PDF/Word export"

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.stop_event = win32event.CreateEvent(None, 0, 0, None)
        self.process = None

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.stop_event)
        if self.process:
            self.process.terminate()

    def SvcDoRun(self):
        servicemanager.LogMsg(
            servicemanager.EVENTLOG_INFORMATION_TYPE,
            servicemanager.PYS_SERVICE_STARTED,
            (self._svc_name_, '')
        )
        self.main()

    def main(self):
        os.chdir('C:\\inetpub\\wwwroot\\pmo-docs')
        self.process = subprocess.Popen(
            ['python', 'export_server.py'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        win32event.WaitForSingleObject(self.stop_event, win32event.INFINITE)

if __name__ == '__main__':
    win32serviceutil.HandleCommandLine(ExportServerService)
```

### 6.2 نصب Service

```powershell
# نصب pywin32
pip install pywin32

# نصب service
python export-service.py install

# شروع service
python export-service.py start

# یا با PowerShell:
Start-Service PMOExportServer
```

### 6.3 تنظیم Automatic Startup

```powershell
Set-Service -Name PMOExportServer -StartupType Automatic
```

---

## 🛡️ مرحله 7: تنظیمات امنیتی

### 7.1 File System Permissions

```powershell
# IIS_IUSRS باید دسترسی Read داشته باشد
$path = "C:\inetpub\wwwroot\pmo-docs\site"
$acl = Get-Acl $path
$permission = "BUILTIN\IIS_IUSRS","Read","Allow"
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($rule)
Set-Acl $path $acl

# Application Pool Identity نیاز به Write access برای exports
$exportsPath = "C:\inetpub\wwwroot\pmo-docs\exports"
icacls $exportsPath /grant "IIS APPPOOL\PMODocsPool:(OI)(CI)M"
```

### 7.2 تنظیم Firewall

```powershell
# باز کردن پورت 80 (HTTP)
New-NetFirewallRule -DisplayName "PMO Docs HTTP" `
    -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

# باز کردن پورت 443 (HTTPS)
New-NetFirewallRule -DisplayName "PMO Docs HTTPS" `
    -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow

# باز کردن پورت 5000 (Export Server - فقط local)
New-NetFirewallRule -DisplayName "PMO Export Server" `
    -Direction Inbound -Protocol TCP -LocalPort 5000 `
    -RemoteAddress 127.0.0.1 -Action Allow
```

### 7.3 تنظیم CORS (اگر نیاز است)

در `export_server.py`:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://docs.pmo.local', 'https://docs.pmo.local'])
```

نصب flask-cors:
```powershell
pip install flask-cors
```

---

## 📊 مرحله 8: Monitoring & Logging

### 8.1 تنظیم IIS Logging

```powershell
Set-WebConfigurationProperty -Filter /system.applicationHost/sites/site[@name='PMO-Docs']/logFile `
    -Name directory -Value "C:\inetpub\logs\PMO-Docs"

Set-WebConfigurationProperty -Filter /system.applicationHost/sites/site[@name='PMO-Docs']/logFile `
    -Name logFormat -Value "W3C"
```

### 8.2 تنظیم Flask Logging

در `export_server.py`:

```python
import logging
from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler(
    'C:\\inetpub\\logs\\export-server.log',
    maxBytes=10000000,
    backupCount=5
)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)
```

### 8.3 Windows Event Log

مشاهده لاگ‌های Service:

```powershell
Get-EventLog -LogName Application -Source "PMO Export Server" -Newest 50
```

---

## 🔄 مرحله 9: Auto Update & CI/CD

### 9.1 اسکریپت Build و Deploy

فایل `deploy.ps1`:

```powershell
# Build
cd C:\inetpub\wwwroot\pmo-docs
git pull origin main
pip install -r requirements.txt
mkdocs build --clean

# Backup قبلی
$backup = "C:\inetpub\backups\pmo-docs-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item -Path "C:\inetpub\wwwroot\pmo-docs\site" -Destination $backup -Recurse

# Restart services
iisreset /noforce
Restart-Service PMOExportServer

Write-Host "Deployment completed successfully!"
```

### 9.2 Scheduled Task برای Auto Build

```powershell
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
    -Argument "-File C:\inetpub\wwwroot\pmo-docs\deploy.ps1"

$trigger = New-ScheduledTaskTrigger -Daily -At 2am

Register-ScheduledTask -Action $action -Trigger $trigger `
    -TaskName "PMO Docs Auto Build" -Description "Daily documentation build" `
    -User "SYSTEM" -RunLevel Highest
```

---

## 📈 مرحله 10: Health Check & Monitoring

### 10.1 اسکریپت Health Check

فایل `healthcheck.ps1`:

```powershell
# Check IIS site
$site = Get-Website -Name "PMO-Docs"
if ($site.State -ne "Started") {
    Start-Website -Name "PMO-Docs"
    Write-Host "WARNING: IIS site was stopped, restarted."
}

# Check Export Service
$service = Get-Service -Name PMOExportServer
if ($service.Status -ne "Running") {
    Start-Service PMOExportServer
    Write-Host "WARNING: Export service was stopped, restarted."
}

# Check HTTP response
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "OK: Site is responding"
    }
} catch {
    Write-Host "ERROR: Site is not responding"
}

# Check Export API
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing -TimeoutSec 5
    Write-Host "OK: Export server is healthy"
} catch {
    Write-Host "ERROR: Export server is not responding"
}
```

### 10.2 Scheduled Task برای Monitoring

```powershell
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
    -Argument "-File C:\inetpub\wwwroot\pmo-docs\healthcheck.ps1"

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5)

Register-ScheduledTask -Action $action -Trigger $trigger `
    -TaskName "PMO Docs Health Check" -User "SYSTEM" -RunLevel Highest
```

---

## 🧪 مرحله 11: تست نهایی

### 11.1 چک‌لیست تست

- [ ] سایت از طریق HTTP قابل دسترسی است
- [ ] سایت از طریق HTTPS قابل دسترسی است (اگر تنظیم شد)
- [ ] Navigation درست کار می‌کند
- [ ] فونت فارسی نمایش داده می‌شود
- [ ] Auto-redirect به آخرین نسخه کار می‌کند
- [ ] Version selector کار می‌کند
- [ ] دکمه‌های Export نمایش داده می‌شوند
- [ ] Export به PDF کار می‌کند
- [ ] Export به Word کار می‌کند
- [ ] جستجو کار می‌کند

### 11.2 تست از Workstation

از کامپیوتر دیگری:

1. اضافه کردن DNS entry:
```
C:\Windows\System32\drivers\etc\hosts
192.168.1.100  docs.pmo.local
```

2. باز کردن مرورگر:
```
http://docs.pmo.local
```

---

## 🛠️ عیب‌یابی

### مشکل: Site نمایش داده نمی‌شود

```powershell
# بررسی IIS
Get-Website -Name "PMO-Docs"

# بررسی logs
Get-Content "C:\inetpub\logs\LogFiles\W3SVC1\*.log" -Tail 50

# Restart IIS
iisreset
```

### مشکل: Export کار نمی‌کند

```powershell
# بررسی service
Get-Service PMOExportServer

# بررسی logs
Get-Content "C:\inetpub\logs\export-server.log" -Tail 50

# Restart service
Restart-Service PMOExportServer
```

### مشکل: فونت نمایش داده نمی‌شود

بررسی MIME types در IIS:

```powershell
Add-WebConfigurationProperty -Filter "//staticContent" `
    -Name "." -Value @{fileExtension='.woff2'; mimeType='font/woff2'}
```

---

## 📝 چک‌لیست نهایی

- [ ] Python نصب شده
- [ ] IIS نصب و تنظیم شده
- [ ] Application Pool ایجاد شده
- [ ] Website ایجاد شده
- [ ] SSL Certificate نصب شده (اختیاری)
- [ ] Export Server به عنوان Windows Service اجرا می‌شود
- [ ] Firewall تنظیم شده
- [ ] File permissions صحیح است
- [ ] Logging فعال است
- [ ] Health check تنظیم شده
- [ ] Backup strategy تعریف شده
- [ ] تست کامل انجام شده

---

## 📚 منابع مفید

- [IIS Documentation](https://docs.microsoft.com/en-us/iis/)
- [Python on Windows](https://docs.python.org/3/using/windows.html)
- [Flask Deployment](https://flask.palletsprojects.com/en/latest/deploying/)
- [Windows Services](https://docs.microsoft.com/en-us/windows/win32/services/)

---

**تاریخ آخرین بروزرسانی:** ۱۱ آبان ۱۴۰۴
