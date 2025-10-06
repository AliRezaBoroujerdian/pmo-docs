# CI/CD و اتوماسیون کیفیت

راهنمای پیاده‌سازی فرآیندهای خودکار کنترل کیفیت در pipeline های CI/CD

## مقدمه و اهمیت

اتوماسیون کنترل کیفیت در CI/CD Pipeline اطمینان از حفظ استانداردهای کیفیت در تمام مراحل توسعه را فراهم می‌کند.

### مزایای اصلی

**سرعت و کارایی**
- تشخیص سریع مشکلات
- کاهش زمان manual testing
- feedback سریع به توسعه‌دهندگان
- automation تکرارپذیری فرآیندها

**کیفیت و قابلیت اطمینان**
- حذف خطاهای انسانی
- یکپارچگی در اعمال استانداردها
- پوشش جامع تست‌ها
- مستندسازی خودکار

## Pipeline Architecture

### مراحل کیفیت در CI/CD

```yaml
# GitHub Actions Pipeline
name: Quality Gate Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
      # 1. Setup
      - name: Checkout Code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0  # برای SonarCloud analysis
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      # 2. Dependencies
      - name: Install Dependencies
        run: npm ci
        
      # 3. Static Analysis
      - name: ESLint
        run: npm run lint:report
        
      - name: TypeScript Check
        run: npm run type-check
        
      - name: Security Audit
        run: npm audit --audit-level=moderate
        
      # 4. Testing
      - name: Unit Tests
        run: npm run test:unit -- --coverage
        
      - name: Integration Tests
        run: npm run test:integration
        
      # 5. Build Verification
      - name: Build Application
        run: npm run build
        
      # 6. Quality Gates
      - name: SonarCloud Analysis
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          
      - name: Quality Gate Status
        run: |
          if [ "${{ job.status }}" != "success" ]; then
            echo "Quality gate failed"
            exit 1
          fi
```

### Multi-Stage Pipeline

```yaml
# GitLab CI/CD Pipeline
stages:
  - validate
  - test
  - security
  - build
  - deploy

variables:
  NODE_VERSION: "18"
  COVERAGE_THRESHOLD: "80"

# Stage 1: Code Validation
lint:
  stage: validate
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run lint
    - npm run format:check
  artifacts:
    reports:
      junit: reports/lint-results.xml
  rules:
    - if: '$CI_MERGE_REQUEST_ID'
    - if: '$CI_COMMIT_BRANCH == "main"'

type-check:
  stage: validate
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run type-check
  rules:
    - if: '$CI_MERGE_REQUEST_ID'
    - if: '$CI_COMMIT_BRANCH == "main"'

# Stage 2: Testing
unit-tests:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run test:unit -- --coverage
  coverage: '/Coverage: \d+\.\d+%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
  rules:
    - if: '$CI_MERGE_REQUEST_ID'
    - if: '$CI_COMMIT_BRANCH == "main"'

integration-tests:
  stage: test
  image: node:${NODE_VERSION}
  services:
    - postgres:13
    - redis:6
  variables:
    DATABASE_URL: "postgresql://test:test@postgres:5432/testdb"
    REDIS_URL: "redis://redis:6379"
  script:
    - npm ci
    - npm run test:integration
  artifacts:
    reports:
      junit: reports/integration-results.xml

# Stage 3: Security
security-scan:
  stage: security
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm audit --audit-level=moderate
    - npx snyk test
  allow_failure: false

dependency-check:
  stage: security
  image: owasp/dependency-check
  script:
    - dependency-check.sh --project "MyProject" --scan . --format JSON
  artifacts:
    reports:
      dependency_scanning: dependency-check-report.json
```

## Quality Gates

### SonarQube Quality Gate

```javascript
// sonar-project.js
const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: process.env.SONAR_HOST_URL,
  token: process.env.SONAR_TOKEN,
  options: {
    'sonar.projectKey': 'my-project',
    'sonar.projectName': 'My Project',
    'sonar.projectVersion': process.env.CI_COMMIT_SHA,
    'sonar.sources': 'src',
    'sonar.tests': 'tests',
    'sonar.test.inclusions': '**/*.test.ts,**/*.spec.ts',
    'sonar.coverage.exclusions': '**/*.test.ts,**/*.spec.ts',
    'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
    
    // Quality Gate Conditions
    'sonar.qualitygate.wait': 'true',
    'sonar.qualitygate.timeout': '300',
    
    // Coverage Requirements
    'sonar.coverage.minimum': '80',
    'sonar.duplicated_lines_density.maximum': '3',
    'sonar.maintainability_rating.minimum': 'A',
    'sonar.reliability_rating.minimum': 'A',
    'sonar.security_rating.minimum': 'A'
  }
});
```

### Custom Quality Checks

```python
# quality_gate.py
import json
import sys
from pathlib import Path

class QualityGate:
    def __init__(self, config_file='quality-config.json'):
        with open(config_file) as f:
            self.config = json.load(f)
        self.failures = []
    
    def check_coverage(self, coverage_file):
        """بررسی coverage threshold"""
        with open(coverage_file) as f:
            coverage_data = json.load(f)
        
        total_coverage = coverage_data['total']['lines']['pct']
        min_coverage = self.config['coverage']['minimum']
        
        if total_coverage < min_coverage:
            self.failures.append(
                f"Coverage {total_coverage}% below minimum {min_coverage}%"
            )
    
    def check_complexity(self, complexity_report):
        """بررسی cyclomatic complexity"""
        with open(complexity_report) as f:
            complexity_data = json.load(f)
        
        max_complexity = self.config['complexity']['maximum']
        
        for file_data in complexity_data:
            if file_data['complexity'] > max_complexity:
                self.failures.append(
                    f"File {file_data['file']} complexity "
                    f"{file_data['complexity']} exceeds {max_complexity}"
                )
    
    def check_duplication(self, duplication_report):
        """بررسی code duplication"""
        with open(duplication_report) as f:
            duplication_data = json.load(f)
        
        max_duplication = self.config['duplication']['maximum']
        
        if duplication_data['percentage'] > max_duplication:
            self.failures.append(
                f"Code duplication {duplication_data['percentage']}% "
                f"exceeds {max_duplication}%"
            )
    
    def run_all_checks(self):
        """اجرای تمام بررسی‌ها"""
        self.check_coverage('coverage/coverage-summary.json')
        self.check_complexity('reports/complexity.json')
        self.check_duplication('reports/duplication.json')
        
        if self.failures:
            print("❌ Quality Gate Failed:")
            for failure in self.failures:
                print(f"  - {failure}")
            sys.exit(1)
        else:
            print("✅ Quality Gate Passed")

if __name__ == "__main__":
    gate = QualityGate()
    gate.run_all_checks()
```

## Performance Testing

### Load Testing Integration

```yaml
# k6 Performance Tests in CI/CD
performance-test:
  stage: test
  image: loadimpact/k6:latest
  script:
    - k6 run --out json=performance-results.json performance/load-test.js
  artifacts:
    reports:
      performance: performance-results.json
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
    - if: '$CI_MERGE_REQUEST_ID'
      when: manual
```

```javascript
// performance/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200
    { duration: '5m', target: 200 }, // Stay at 200
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
};

export default function() {
  let response = http.get('http://test-api.example.com/health');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

## Security Automation

### SAST (Static Application Security Testing)

```yaml
# Security Pipeline
security-analysis:
  stage: security
  parallel:
    matrix:
      - TOOL: [semgrep, bandit, safety]
  script:
    - |
      case $TOOL in
        semgrep)
          pip install semgrep
          semgrep --config=auto --json --output=semgrep-results.json .
          ;;
        bandit)
          pip install bandit
          bandit -r . -f json -o bandit-results.json
          ;;
        safety)
          pip install safety
          safety check --json --output safety-results.json
          ;;
      esac
  artifacts:
    reports:
      sast: ${TOOL}-results.json
```

### DAST (Dynamic Application Security Testing)

```dockerfile
# OWASP ZAP Docker integration
FROM owasp/zap2docker-stable

COPY security/zap-baseline.conf /zap/
COPY security/zap-api-scan.py /zap/

RUN chmod +x /zap/zap-api-scan.py

ENTRYPOINT ["/zap/zap-api-scan.py"]
```

```python
# security/zap-api-scan.py
#!/usr/bin/env python3

import subprocess
import sys
import time

def run_zap_baseline(target_url):
    """اجرای ZAP baseline scan"""
    cmd = [
        'zap-baseline.py',
        '-t', target_url,
        '-J', 'zap-baseline-report.json',
        '-r', 'zap-baseline-report.html',
        '-z', '-config api.addrs.addr.name=.*',
        '-z', '-config api.addrs.addr.regex=true'
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode not in [0, 2]:  # 0=success, 2=warnings
        print(f"ZAP scan failed: {result.stderr}")
        sys.exit(1)
    
    print("ZAP baseline scan completed successfully")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: zap-api-scan.py <target_url>")
        sys.exit(1)
    
    run_zap_baseline(sys.argv[1])
```

## Monitoring و Alerting

### Quality Metrics Dashboard

```python
# metrics_collector.py
import requests
import json
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class QualityMetrics:
    project: str
    coverage: float
    complexity: float
    duplication: float
    security_issues: int
    test_count: int
    build_time: float

class MetricsCollector:
    def __init__(self, config):
        self.config = config
    
    def collect_sonar_metrics(self, project_key) -> QualityMetrics:
        """جمع‌آوری metrics از SonarQube"""
        base_url = self.config['sonar']['url']
        token = self.config['sonar']['token']
        
        metrics = [
            'coverage',
            'complexity',
            'duplicated_lines_density',
            'security_issues',
            'tests',
            'build_time'
        ]
        
        response = requests.get(
            f"{base_url}/api/measures/component",
            params={
                'component': project_key,
                'metricKeys': ','.join(metrics)
            },
            auth=(token, '')
        )
        
        data = response.json()
        measures = {m['metric']: float(m['value']) 
                   for m in data['component']['measures']}
        
        return QualityMetrics(
            project=project_key,
            coverage=measures.get('coverage', 0),
            complexity=measures.get('complexity', 0),
            duplication=measures.get('duplicated_lines_density', 0),
            security_issues=int(measures.get('security_issues', 0)),
            test_count=int(measures.get('tests', 0)),
            build_time=measures.get('build_time', 0)
        )
    
    def send_to_monitoring(self, metrics: QualityMetrics):
        """ارسال metrics به سیستم monitoring"""
        influxdb_url = self.config['influxdb']['url']
        
        payload = {
            'measurement': 'code_quality',
            'tags': {'project': metrics.project},
            'fields': {
                'coverage': metrics.coverage,
                'complexity': metrics.complexity,
                'duplication': metrics.duplication,
                'security_issues': metrics.security_issues,
                'test_count': metrics.test_count,
                'build_time': metrics.build_time
            }
        }
        
        requests.post(f"{influxdb_url}/write", json=payload)
```

### Alerting Rules

```yaml
# alertmanager.yml
groups:
  - name: code_quality
    rules:
      - alert: LowCoverage
        expr: code_quality_coverage < 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Code coverage below threshold"
          description: "Coverage is {{ $value }}% for {{ $labels.project }}"
      
      - alert: HighComplexity
        expr: code_quality_complexity > 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Code complexity too high"
          description: "Complexity is {{ $value }} for {{ $labels.project }}"
      
      - alert: SecurityIssues
        expr: code_quality_security_issues > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: "Security issues detected"
          description: "{{ $value }} security issues in {{ $labels.project }}"
```

## Documentation Automation

### API Documentation

```yaml
# OpenAPI Documentation Generation
api-docs:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run generate:docs
    - npm run validate:docs
  artifacts:
    paths:
      - docs/api/
    expire_in: 30 days
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
```

```javascript
// scripts/generate-docs.js
const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: process.env.CI_COMMIT_SHA || '1.0.0',
      description: 'Auto-generated API documentation',
    },
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const specs = swaggerJsdoc(options);

// تولید فایل JSON
fs.writeFileSync('./docs/api/swagger.json', JSON.stringify(specs, null, 2));

// تولید فایل HTML
const swaggerUi = require('swagger-ui-express');
const html = swaggerUi.generateHTML(specs);
fs.writeFileSync('./docs/api/index.html', html);

console.log('API documentation generated successfully');
```

## Best Practices

### Pipeline Optimization

```yaml
# بهینه‌سازی Pipeline
stages:
  - validate
  - test
  - security
  - build

# استفاده از caching
cache:
  key: "$CI_COMMIT_REF_SLUG"
  paths:
    - node_modules/
    - .npm/
    - coverage/

# اجرای موازی
test:
  parallel:
    matrix:
      - TEST_SUITE: [unit, integration, e2e]
  script:
    - npm run test:$TEST_SUITE
```

### Fail-Fast Strategy

```bash
#!/bin/bash
# fail-fast.sh

set -e  # Exit on first error

echo "Starting quality checks..."

# Static analysis (سریع‌ترین)
echo "Running linting..."
npm run lint || exit 1

echo "Running type checking..."
npm run type-check || exit 1

# Unit tests (سریع)
echo "Running unit tests..."
npm run test:unit || exit 1

# Integration tests (کندتر)
echo "Running integration tests..."
npm run test:integration || exit 1

# Security scan (زمان‌بر)
echo "Running security scan..."
npm audit --audit-level=moderate || exit 1

echo "All quality checks passed!"
```

### Multi-Environment Strategy

```yaml
# تنظیمات مختلف برای محیط‌های مختلف
.quality_template: &quality_template
  image: node:18
  before_script:
    - npm ci
  cache:
    key: "$CI_COMMIT_REF_SLUG"
    paths:
      - node_modules/

development_quality:
  <<: *quality_template
  stage: validate
  script:
    - npm run lint:warn  # فقط warning
    - npm run test:unit:fast
  rules:
    - if: '$CI_COMMIT_BRANCH =~ /^feature\/.*/'

staging_quality:
  <<: *quality_template
  stage: test
  script:
    - npm run lint:error  # error on violations
    - npm run test:all
    - npm run test:coverage -- --threshold=70
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'

production_quality:
  <<: *quality_template
  stage: security
  script:
    - npm run lint:strict
    - npm run test:all
    - npm run test:coverage -- --threshold=80
    - npm run security:scan
    - npm run performance:test
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
```