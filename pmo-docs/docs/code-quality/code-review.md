# Code Review و بازبینی کد

راهنمای جامع فرآیند بازبینی کد و بهترین شیوه‌های آن

## اهمیت Code Review

بازبینی کد یکی از مؤثرترین روش‌های بهبود کیفیت نرم‌افزار است که منجر به:

### مزایای فنی
- **شناسایی باگ‌ها**: کشف خطاها قبل از production
- **بهبود کیفیت کد**: رعایت استانداردها و best practices
- **بهینه‌سازی عملکرد**: شناسایی نقاط بهبود
- **امنیت**: کشف آسیب‌پذیری‌های امنیتی
- **معماری**: بررسی انطباق با طراحی کلی

### مزایای تیمی
- **انتقال دانش**: اشتراک تجربه و یادگیری
- **یکپارچگی**: حفظ استانداردهای مشترک
- **مسئولیت جمعی**: ownership مشترک کد
- **mentoring**: رشد مهارت‌های جوان‌تر
- **communication**: بهبود ارتباطات تیمی

## انواع Code Review

### Pull Request Review
مرسوم‌ترین روش در Git workflow:

```markdown
## Pull Request Template
### تغییرات
- [ ] Feature جدید
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Performance improvement

### توضیحات
وضعیت فعلی و تغییرات اعمال شده

### Test Plan
- [ ] Unit tests added/updated
- [ ] Integration tests passed
- [ ] Manual testing completed

### Checklist
- [ ] کد مطابق با style guide است
- [ ] Documentation به‌روزرسانی شده
- [ ] Breaking changes documented
- [ ] Security considerations reviewed
```

### Pair Programming
بازبینی همزمان حین کدنویسی:

```javascript
// مثال session pair programming
// Navigator: راهنمایی کلی
// Driver: کدنویسی فعلی

// Navigator: "بیا ابتدا تست بنویسیم"
describe('UserValidator', () => {
  it('should validate email format', () => {
    // Driver: پیاده‌سازی تست
    const validator = new UserValidator();
    expect(validator.isValidEmail('test@example.com')).toBe(true);
    expect(validator.isValidEmail('invalid-email')).toBe(false);
  });
});

// Navigator: "حالا implementation رو بنویسیم"
class UserValidator {
  isValidEmail(email) {
    // Driver: پیاده‌سازی
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

### Mob Programming
بازبینی گروهی:

```python
# Session with 4-5 developers
# یک نفر driver، بقیه navigators

def calculate_shipping_cost(order):
    """
    Team discussion points:
    - Navigator 1: "آیا باید validation ورودی داشته باشیم؟"
    - Navigator 2: "بهتر است business rules را جدا کنیم"
    - Navigator 3: "exception handling چطور؟"
    """
    if not order or not order.items:
        raise ValueError("Order cannot be empty")
    
    base_cost = _calculate_base_shipping(order)
    weight_cost = _calculate_weight_cost(order)
    
    return base_cost + weight_cost
```

### Tool-Assisted Review
استفاده از ابزارهای خودکار:

```yaml
# GitHub Actions for automated review
name: Code Review Assistant
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  automated-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Code Quality Check
        run: |
          npm run lint
          npm run test:coverage
          npm run security-scan
          
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            const coverage = process.env.COVERAGE_PERCENTAGE;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🤖 Automated Review:
              - Coverage: ${coverage}%
              - Linting: ✅ Passed
              - Security: ✅ No issues found`
            });
```

## فرآیند Code Review

### مراحل بازبینی

#### 1. آماده‌سازی (Preparation)
```bash
# توسعه‌دهنده قبل از ارسال PR
git checkout feature/user-authentication
git rebase main
git push origin feature/user-authentication

# خودبازبینی اولیه
git diff main..feature/user-authentication
```

#### 2. Initial Review
```markdown
### چک‌لیست اولیه بازبین:
- [ ] عنوان و توضیحات PR واضح است
- [ ] تعداد فایل‌های تغییر یافته منطقی است (< 400 خط)
- [ ] CI/CD checks موفق بوده
- [ ] Conflicts وجود ندارد
- [ ] Tests اضافه/به‌روزرسانی شده
```

#### 3. Detailed Review
```java
// مثال comment در code review
public class UserService {
    // 💬 Reviewer: Consider using dependency injection instead of static reference
    private static final EmailService emailService = new EmailService();
    
    public void createUser(UserDto userDto) {
        // 💬 Reviewer: Add input validation here
        // Suggestion: 
        // if (userDto == null || userDto.getEmail() == null) {
        //     throw new IllegalArgumentException("User data is required");
        // }
        
        User user = mapToEntity(userDto);
        
        // 💬 Reviewer: What happens if save fails? Consider transaction management
        userRepository.save(user);
        
        // 💬 Reviewer: This should be async to not block user creation
        emailService.sendWelcomeEmail(user.getEmail());
    }
    
    // 💬 Reviewer: Great! This method is well-structured and follows SRP
    private User mapToEntity(UserDto userDto) {
        return User.builder()
            .email(userDto.getEmail())
            .name(userDto.getName())
            .build();
    }
}
```

#### 4. Feedback Integration
```python
# نمونه پاسخ به feedback
class UserService:
    def __init__(self, user_repository, email_service):
        # ✅ Fixed: Dependency injection implemented
        self.user_repository = user_repository
        self.email_service = email_service
    
    def create_user(self, user_data):
        # ✅ Fixed: Input validation added
        self._validate_user_data(user_data)
        
        try:
            with transaction.atomic():  # ✅ Fixed: Transaction management
                user = self._map_to_entity(user_data)
                saved_user = self.user_repository.save(user)
                
                # ✅ Fixed: Async email sending
                self._send_welcome_email_async(saved_user.email)
                
                return saved_user
        except Exception as e:
            logger.error(f"Failed to create user: {e}")
            raise
    
    def _validate_user_data(self, user_data):
        if not user_data or not user_data.get('email'):
            raise ValueError("User email is required")
```

### استانداردهای بازبینی

#### Size Guidelines
```markdown
### اندازه مناسب PR:
- **Small**: < 100 lines (ایده‌آل)
- **Medium**: 100-400 lines (قابل قبول)
- **Large**: 400-1000 lines (نیاز به تقسیم)
- **XL**: > 1000 lines (باید تقسیم شود)

### زمان بازبینی:
- Small: 15-30 دقیقه
- Medium: 30-60 دقیقه  
- Large: 1-2 ساعت
```

#### Focus Areas
```javascript
// اولویت‌بندی نکات بازبینی

// 1. Correctness (بالاترین اولویت)
function calculateTax(amount, rate) {
  // 🔴 Critical: Division by zero check missing
  return amount * rate / 100; // Should handle rate validation
}

// 2. Security
function getUserData(userId) {
  // 🔴 Critical: SQL injection vulnerability  
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  // Should use parameterized query
}

// 3. Performance
function findUserByEmail(email) {
  // 🟡 Medium: Consider adding database index on email
  return users.find(user => user.email === email);
}

// 4. Maintainability
function processOrder(order) {
  // 🟢 Low: Consider breaking into smaller functions
  // ... 50 lines of code
}

// 5. Style
const userName = user.name; // 🔵 Nitpick: Consider more descriptive name
```

## چک‌لیست جامع

### Functionality
- [ ] کد انجام کار مورد نظر را می‌دهد
- [ ] Edge cases در نظر گرفته شده
- [ ] Error handling مناسب است
- [ ] Performance قابل قبول است

### Design & Architecture
- [ ] انطباق با معماری کلی سیستم
- [ ] رعایت اصول SOLID
- [ ] Separation of concerns
- [ ] استفاده مناسب از design patterns

### Code Quality
- [ ] رعایت coding standards
- [ ] نام‌گذاری واضح و معنادار
- [ ] Comments مفید و ضروری
- [ ] عدم تکرار کد (DRY)

### Testing
- [ ] Unit tests موجود و کافی
- [ ] Test coverage قابل قبول
- [ ] Integration tests در صورت نیاز
- [ ] Mock/stub usage مناسب

### Security
- [ ] Input validation
- [ ] Output encoding
- [ ] Authentication/Authorization
- [ ] عدم hardcode کردن secrets

### Documentation
- [ ] API documentation به‌روز
- [ ] README updates
- [ ] Code comments مناسب
- [ ] Changelog entry

## ابزارهای Code Review

### GitHub
```yaml
# .github/pull_request_template.md
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Review Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

### GitLab
```yaml
# .gitlab/merge_request_templates/default.md
## What does this MR do?
Describe what this merge request changes

## Related issues
Closes #issue_number

## Author's checklist
- [ ] Follow the style guide
- [ ] Tests added for new functionality
- [ ] Documentation updated
- [ ] Changelog entry added

## Review checklist
- [ ] Code is readable and maintainable
- [ ] Tests cover the changes
- [ ] No security vulnerabilities
- [ ] Performance implications considered
```

### Azure DevOps
```yaml
# Pull Request Policies
policies:
  - type: build
    settings:
      required: true
      buildDefinitionId: 123
  
  - type: reviewers
    settings:
      minimumApproverCount: 2
      creatorVoteCounts: false
      requiredReviewers:
        - senior-dev@company.com
  
  - type: workItemLinking
    settings:
      required: true
```

## نکات عملی

### برای نویسنده کد

#### قبل از ارسال
```bash
# خودبازبینی
git add .
git commit -m "Initial implementation"

# Review your own changes
git diff HEAD~1

# Run all checks locally
npm run lint
npm run test
npm run build
```

#### آماده‌سازی PR
```markdown
### توضیحات کامل:
**Problem**: وضعیت قبل و مشکل موجود
**Solution**: راه‌حل پیاده‌سازی شده  
**Testing**: روش‌های تست انجام شده
**Notes**: نکات خاص یا trade-offs
```

### برای بازبین

#### زمان‌بندی
```markdown
### SLA های Review:
- **Critical/Hotfix**: 2-4 ساعت
- **Normal**: 24 ساعت در روزهای کاری
- **Feature**: 48 ساعت
- **Refactoring**: 72 ساعت
```

#### سبک بازخورد
```python
# ❌ غیرسازنده
# "This code is bad"

# ✅ سازنده
# "Consider using dependency injection here for better testability. 
# This would make it easier to mock dependencies in unit tests."

# ✅ سؤال برای درک
# "Could you explain why you chose this approach? 
# I'm curious about the trade-offs compared to using a factory pattern."

# ✅ پیشنهاد با دلیل
# "What about extracting this into a separate method? 
# It would improve readability and make it easier to test independently."
```

## metrics و اندازه‌گیری

### Review Velocity
```python
# ابزار محاسبه metrics
def calculate_review_metrics(pull_requests):
    metrics = {
        'avg_review_time': sum(pr.review_time for pr in pull_requests) / len(pull_requests),
        'avg_pr_size': sum(pr.lines_changed for pr in pull_requests) / len(pull_requests),
        'review_coverage': len([pr for pr in pull_requests if pr.reviewed]) / len(pull_requests),
        'avg_comments_per_pr': sum(pr.comment_count for pr in pull_requests) / len(pull_requests)
    }
    return metrics
```

### Quality Indicators
```javascript
// Dashboard metrics
const reviewQualityMetrics = {
  defectsFoundInReview: 45,
  defectsFoundInProduction: 5, 
  reviewEffectiveness: (45 / (45 + 5)) * 100, // 90%
  
  avgTimeToReview: '18 hours',
  avgTimeToMerge: '2.3 days',
  
  participationRate: {
    seniorDevs: '95%',
    midLevelDevs: '87%',
    juniorDevs: '92%'
  }
};
```

## بهترین شیوه‌ها

### Golden Rules

1. **Be Kind**: احترام و مؤدب بودن
2. **Be Specific**: نکات مشخص و عملی
3. **Be Constructive**: پیشنهاد راه‌حل
4. **Be Timely**: پاسخ سریع
5. **Be Learning-Oriented**: فرصت یادگیری

### Common Pitfalls

#### برای نویسنده
- PR های خیلی بزرگ
- توضیحات ناکافی
- عدم خودبازبینی
- defensive attitude

#### برای بازبین
- تأخیر در بازبینی
- نکات غیرسازنده
- تمرکز صرف روی style
- عدم درک context

### فرهنگ‌سازی

```markdown
### Team Guidelines:
1. **Review-First Culture**: کیفیت مهم‌تر از سرعت
2. **Learning Mindset**: استفاده از review برای یادگیری
3. **Collective Ownership**: مسئولیت مشترک در قبال کد
4. **Continuous Improvement**: بهبود مستمر فرآیند
5. **Respectful Communication**: ارتباط محترمانه و سازنده
```