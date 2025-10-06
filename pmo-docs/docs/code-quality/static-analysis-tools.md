# ابزارهای تحلیل استاتیک

راهنمای جامع ابزارهای تحلیل استاتیک کد برای شناسایی مشکلات کیفیت

## تعریف تحلیل استاتیک

تحلیل استاتیک فرآیند بررسی کد منبع بدون اجرای آن است که به شناسایی:

- مشکلات کیفیت کد
- آسیب‌پذیری‌های امنیتی  
- نقض استانداردهای کدنویسی
- پیچیدگی بیش از حد
- کد تکراری و غیرضروری

## انواع ابزارهای تحلیل استاتیک

### Linters
ابزارهای بررسی قواعد سبک و syntax:

**ESLint (JavaScript/TypeScript)**
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "no-unused-vars": "error",
    "complexity": ["error", 10],
    "max-lines": ["error", 300]
  }
}
```

**Pylint (Python)**
```ini
[MASTER]
load-plugins=pylint.extensions.docparams

[MESSAGES CONTROL]
disable=missing-docstring,too-few-public-methods

[FORMAT]
max-line-length=88
indent-string='    '

[DESIGN]
max-complexity=10
max-args=5
max-locals=15
```

**RuboCop (Ruby)**
```yaml
AllCops:
  TargetRubyVersion: 3.0
  
Style/StringLiterals:
  Enabled: true
  EnforcedStyle: single_quotes

Metrics/MethodLength:
  Max: 30

Metrics/ClassLength:
  Max: 100
```

### Code Quality Analyzers

**SonarQube**
پلتفرم جامع تحلیل کیفیت کد:

```yaml
# sonar-project.properties
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=tests
sonar.exclusions=**/node_modules/**,**/*.spec.ts

# کیفیت گیت
sonar.qualitygate.wait=true
```

**CodeClimate**
```yaml
# .codeclimate.yml
version: "2"
checks:
  argument-count:
    config:
      threshold: 4
  complex-logic:
    config:
      threshold: 4
  file-lines:
    config:
      threshold: 250
  method-complexity:
    config:
      threshold: 5
  method-count:
    config:
      threshold: 20
  method-lines:
    config:
      threshold: 25
```

### Security Analyzers

**Bandit (Python)**
```yaml
# .bandit
[bandit]
exclude_dirs = ['*/tests/*', '*/venv/*']
skips = ['B101', 'B601']

[bandit.assert_used]
skips = ['*_test.py', '*/test_*.py']
```

**Brakeman (Ruby)**
```yaml
# config/brakeman.yml
:rails3: true
:skip_checks:
  - CheckDefaultRoutes
  - CheckRender
:check_arguments: true
:safe_methods:
  - sanitize
  - h
```

## ابزارهای زبان‌محور

### JavaScript/TypeScript

**ESLint + Prettier Integration**
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

**TSLint Migration to ESLint**
```bash
# نصب ابزارهای مورد نیاز
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# تبدیل تنظیمات TSLint
npx tslint-to-eslint-config
```

### Python

**Flake8 Configuration**
```ini
[flake8]
max-line-length = 88
extend-ignore = E203, E266, E501, W503
max-complexity = 10
select = B,C,E,F,W,T4,B9

per-file-ignores =
    __init__.py:F401
    tests/*:S101
```

**mypy Type Checking**
```ini
[mypy]
python_version = 3.9
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True

[mypy-tests.*]
disallow_untyped_defs = False
```

### Java

**SpotBugs**
```xml
<!-- pom.xml -->
<plugin>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-maven-plugin</artifactId>
    <version>4.7.3</version>
    <configuration>
        <effort>Max</effort>
        <threshold>Low</threshold>
        <includeFilterFile>spotbugs-include.xml</includeFilterFile>
    </configuration>
</plugin>
```

**Checkstyle**
```xml
<!-- checkstyle.xml -->
<module name="Checker">
    <module name="TreeWalker">
        <module name="LineLength">
            <property name="max" value="120"/>
        </module>
        <module name="MethodLength">
            <property name="max" value="50"/>
        </module>
        <module name="CyclomaticComplexity">
            <property name="max" value="10"/>
        </module>
    </module>
</module>
```

### C#

**Roslyn Analyzers**
```xml
<!-- .editorconfig -->
[*.cs]
dotnet_analyzer_diagnostic.category-style.severity = warning
dotnet_analyzer_diagnostic.CA1001.severity = error
dotnet_analyzer_diagnostic.CA1002.severity = warning

# StyleCop Rules
dotnet_diagnostic.SA1101.severity = none
dotnet_diagnostic.SA1309.severity = none
```

**SonarAnalyzer for .NET**
```xml
<PackageReference Include="SonarAnalyzer.CSharp" Version="8.50.0.58025">
    <PrivateAssets>all</PrivateAssets>
    <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
</PackageReference>
```

## معیارهای تحلیل

### Complexity Metrics

**Cyclomatic Complexity**
```python
# پیچیدگی بالا (بد)
def complex_function(x, y, z):
    if x > 0:
        if y > 0:
            if z > 0:
                if x > y:
                    if y > z:
                        return "case1"
                    else:
                        return "case2"
                else:
                    return "case3"
            else:
                return "case4"
        else:
            return "case5"
    else:
        return "case6"

# پیچیدگی کم (خوب)
def simple_function(x, y, z):
    if x <= 0:
        return "case6"
    if y <= 0:
        return "case5"
    if z <= 0:
        return "case4"
    
    return _handle_positive_values(x, y, z)

def _handle_positive_values(x, y, z):
    if x > y and y > z:
        return "case1"
    elif x > y:
        return "case2"
    else:
        return "case3"
```

**Cognitive Complexity**
```javascript
// پیچیدگی شناختی بالا
function processOrder(order) {
  if (order.type === 'premium') {
    if (order.amount > 1000) {
      if (order.customer.vip) {
        // +3 (نesting + if)
        for (let item of order.items) { // +4 (نesting + loop)
          if (item.category === 'electronics') { // +5 (نesting + if)
            applyDiscount(item);
          }
        }
      }
    }
  }
}

// پیچیدگی شناختی کم
function processOrder(order) {
  if (!isPremiumOrder(order)) return;
  
  const eligibleItems = getEligibleItems(order);
  eligibleItems.forEach(applyDiscount);
}
```

### Code Duplication

**Detection Example**
```yaml
# SonarQube duplicated blocks
sonar.cpd.minimum_tokens=100
sonar.cpd.exclusions=**/*Test.java
```

**Refactoring Strategy**
```java
// Before - دو متد مشابه
public void saveUser(User user) {
    validateUser(user);
    logOperation("Saving user: " + user.getName());
    userRepository.save(user);
    logOperation("User saved successfully");
}

public void updateUser(User user) {
    validateUser(user);
    logOperation("Updating user: " + user.getName());
    userRepository.update(user);
    logOperation("User updated successfully");
}

// After - استخراج منطق مشترک
public void saveUser(User user) {
    performUserOperation(user, userRepository::save, "Saving", "saved");
}

public void updateUser(User user) {
    performUserOperation(user, userRepository::update, "Updating", "updated");
}

private void performUserOperation(User user, Consumer<User> operation, 
                                 String startMsg, String endMsg) {
    validateUser(user);
    logOperation(startMsg + " user: " + user.getName());
    operation.accept(user);
    logOperation("User " + endMsg + " successfully");
}
```

## پیکربندی پروژه

### Multi-tool Setup

**package.json Scripts**
```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "quality": "npm run lint && npm run format:check && npm run type-check"
  }
}
```

**Makefile Integration**
```makefile
.PHONY: lint format type-check quality

lint:
	eslint src --ext .ts,.tsx

format:
	prettier --write "src/**/*.{ts,tsx,json,md}"

type-check:
	tsc --noEmit

quality: lint format type-check
	@echo "All quality checks passed!"

ci-quality:
	npm run lint
	npm run format:check  
	npm run type-check
```

### IDE Integration

**VS Code Settings**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "typescriptreact"
  ],
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black"
}
```

**IntelliJ IDEA**
```xml
<!-- .idea/inspectionProfiles/Project_Default.xml -->
<component name="InspectionProjectProfileManager">
  <profile version="1.0">
    <option name="myName" value="Project Default" />
    <inspection_tool class="PyPep8Inspection" enabled="true" level="WEAK WARNING" enabled_by_default="true" />
    <inspection_tool class="PyUnusedLocalInspection" enabled="true" level="WEAK WARNING" enabled_by_default="true" />
  </profile>
</component>
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Code Quality
on: [push, pull_request]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: ESLint
        run: npm run lint
        
      - name: Prettier
        run: npm run format:check
        
      - name: TypeScript
        run: npm run type-check
        
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### GitLab CI
```yaml
stages:
  - code-quality
  - test

eslint:
  stage: code-quality
  image: node:18
  script:
    - npm ci
    - npm run lint
  artifacts:
    reports:
      junit: reports/eslint-results.xml

sonarqube:
  stage: code-quality
  image: sonarqube:latest
  script:
    - sonar-scanner
  only:
    - main
    - merge_requests
```

## بهترین شیوه‌ها

### تدریجی پیاده‌سازی
1. **شروع با یک ابزار**: مثلاً ESLint
2. **تنظیم تدریجی قوانین**: از ساده به پیچیده
3. **آموزش تیم**: workshop های آموزشی
4. **فیدبک و بهبود**: جمع‌آوری نظرات و تنظیم

### مدیریت False Positive ها
```javascript
// استثنا برای خط خاص
// eslint-disable-next-line no-console
console.log('Debug info');

// استثنا برای فایل کامل
/* eslint-disable no-console */

// استثنا در تنظیمات
"overrides": [
  {
    "files": ["*.test.js"],
    "rules": {
      "no-console": "off"
    }
  }
]
```

### Performance Optimization
```yaml
# کش کردن نتایج
cache:
  paths:
    - node_modules/
    - .eslintcache
    - .stylelintcache

# اجرای موازی
script:
  - npm run lint & npm run type-check & wait
```