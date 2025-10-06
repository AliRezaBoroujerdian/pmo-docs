# استانداردهای کدنویسی

راهنمای جامع استانداردها و قراردادهای کدنویسی برای زبان‌های مختلف برنامه‌نویسی

## اهمیت استانداردهای کدنویسی

### مزایای اصلی

**یکپارچگی تیمی**
- کد مشابه توسط تمام اعضای تیم
- کاهش زمان درک کد دیگران
- سهولت در code review
- انتقال دانش بین اعضای تیم

**بهبود نگهداری‌پذیری**
- خوانایی بالاتر کد
- پیدا کردن آسان‌تر باگ‌ها
- refactoring ساده‌تر
- debugging سریع‌تر

**کاهش خطاهای انسانی**
- قراردادهای ثابت
- الگوهای تکراری
- automation بهتر
- کنترل کیفیت خودکار

## استانداردهای عمومی

### نام‌گذاری (Naming Conventions)

#### قراردادهای پایه

**camelCase**
- استفاده برای متغیرها و function ها
- مثال: `userName`, `calculateTotal()`, `isValid`

**PascalCase** 
- استفاده برای کلاس‌ها و interface ها
- مثال: `UserService`, `PaymentProcessor`, `IOrderRepository`

**snake_case**
- استفاده در Python و برخی زبان‌ها
- مثال: `user_name`, `calculate_total()`, `is_valid`

**kebab-case**
- استفاده در CSS و URL ها
- مثال: `user-profile`, `main-container`, `api-endpoint`

**SCREAMING_SNAKE_CASE**
- استفاده برای ثابت‌ها
- مثال: `MAX_RETRY_COUNT`, `API_BASE_URL`, `DEFAULT_TIMEOUT`

#### اصول نام‌گذاری

**وضوح و معنادار بودن**
```javascript
// بد
let d = new Date();
let u = users.filter(x => x.a);

// خوب  
let currentDate = new Date();
let activeUsers = users.filter(user => user.isActive);
```

**اجتناب از مخففات**
```python
# بد
def calc_usr_pmt(usr_id, amt):
    pass

# خوب
def calculate_user_payment(user_id, amount):
    pass
```

**استفاده از فعل برای function ها**
```java
// بد
public void userValidation() { }
public String userName() { }

// خوب
public void validateUser() { }
public String getUserName() { }
```

### فرمت‌بندی کد

#### تورفتگی (Indentation)

**استاندارد 2 یا 4 فاصله**
```javascript
// 2 فاصله
if (condition) {
  doSomething();
  if (anotherCondition) {
    doSomethingElse();
  }
}

// 4 فاصله  
if (condition) {
    doSomething();
    if (anotherCondition) {
        doSomethingElse();
    }
}
```

**عدم استفاده از Tab**
- استفاده از Space به جای Tab
- تنظیم editor برای نمایش فاصله‌ها
- consistency در تمام فایل‌ها

#### طول خط

**حداکثر 80-120 کاراکتر**
```python
# بد - خط طولانی
user_data = process_user_information(user_id, user_name, user_email, user_phone, user_address, user_preferences)

# خوب - تقسیم خط
user_data = process_user_information(
    user_id=user_id,
    user_name=user_name, 
    user_email=user_email,
    user_phone=user_phone,
    user_address=user_address,
    user_preferences=user_preferences
)
```

#### فاصله‌گذاری

**فاصله دور operator ها**
```java
// بد
int result=a+b*c;
if(x>y&&z<w){

// خوب
int result = a + b * c;
if (x > y && z < w) {
```

**فاصله بعد از کاما**
```javascript
// بد
function calculate(a,b,c) {
    return doSomething(a,b,c);
}

// خوب
function calculate(a, b, c) {
    return doSomething(a, b, c);
}
```

### ساختار کد

#### سازمان‌دهی function ها

**ترتیب منطقی**
```python
class UserService:
    # Public methods اول
    def create_user(self, user_data):
        pass
    
    def update_user(self, user_id, user_data):
        pass
    
    # Private methods بعد
    def _validate_user_data(self, user_data):
        pass
    
    def _send_notification(self, user_id):
        pass
```

**طول مناسب function ها**
```javascript
// بد - function طولانی
function processOrder(order) {
    // 50+ خط کد
}

// خوب - تقسیم به function های کوچک
function processOrder(order) {
    validateOrder(order);
    calculateTotal(order);
    applyDiscounts(order);
    processPayment(order);
    sendConfirmation(order);
}
```

#### مدیریت import ها

**گروه‌بندی import ها**
```python
# Standard library
import os
import sys
from datetime import datetime

# Third party
import requests
from flask import Flask

# Local imports  
from .models import User
from .services import UserService
```

## استانداردهای زبان‌محور

### JavaScript/TypeScript

#### ESLint Configuration
```json
{
  "extends": ["eslint:recommended", "@typescript-eslint/recommended"],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-console": "warn",
    "prefer-const": "error"
  }
}
```

#### TypeScript Best Practices
```typescript
// Interface naming
interface IUserService {
    createUser(userData: UserData): Promise<User>;
}

// Type definitions
type UserRole = 'admin' | 'user' | 'guest';
type ApiResponse<T> = {
    data: T;
    success: boolean;
    message?: string;
};

// Generic constraints
function processItems<T extends { id: string }>(items: T[]): T[] {
    return items.filter(item => item.id);
}
```

### Python (PEP 8)

#### استانداردهای اصلی
```python
# Class naming
class UserProfileManager:
    pass

# Function naming  
def calculate_user_score(user_id: int) -> float:
    pass

# Constants
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

# Line length
if (condition_one and condition_two and 
    condition_three and condition_four):
    do_something()
```

#### Type Hints
```python
from typing import List, Dict, Optional, Union

def process_users(
    users: List[Dict[str, Union[str, int]]],
    active_only: bool = True
) -> Optional[List[str]]:
    """Process user data and return user names."""
    pass
```

### Java

#### Oracle Code Conventions
```java
// Class structure
public class UserService {
    // Constants
    private static final int MAX_RETRY_COUNT = 3;
    
    // Instance variables
    private final UserRepository userRepository;
    private final Logger logger;
    
    // Constructor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.logger = LoggerFactory.getLogger(UserService.class);
    }
    
    // Public methods
    public User createUser(UserDto userDto) {
        validateUserData(userDto);
        return userRepository.save(mapToEntity(userDto));
    }
    
    // Private methods
    private void validateUserData(UserDto userDto) {
        // validation logic
    }
}
```

### C#

#### Microsoft Coding Conventions
```csharp
// Namespace and class
namespace MyProject.Services
{
    public class UserService : IUserService
    {
        // Fields
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;
        
        // Properties
        public int MaxRetryCount { get; set; } = 3;
        
        // Constructor
        public UserService(
            IUserRepository userRepository,
            ILogger<UserService> logger)
        {
            _userRepository = userRepository ?? 
                throw new ArgumentNullException(nameof(userRepository));
            _logger = logger;
        }
        
        // Methods
        public async Task<User> CreateUserAsync(UserDto userDto)
        {
            ValidateUserData(userDto);
            var user = MapToEntity(userDto);
            return await _userRepository.SaveAsync(user);
        }
        
        private void ValidateUserData(UserDto userDto)
        {
            if (string.IsNullOrWhiteSpace(userDto.Email))
            {
                throw new ArgumentException("Email is required", 
                    nameof(userDto));
            }
        }
    }
}
```

## Comment و Documentation

### انواع Comment ها

#### Inline Comments
```python
# بد - توضیح واضحات
x = x + 1  # Increment x

# خوب - توضیح منطق پیچیده
x = x + 1  # Compensate for border width
```

#### Block Comments
```java
/*
 * Calculate the total price including tax and discounts.
 * 
 * This method applies the following logic:
 * 1. Calculate base total from line items
 * 2. Apply eligible discounts
 * 3. Calculate tax on discounted amount
 * 4. Return final total
 */
public BigDecimal calculateTotal(Order order) {
    // implementation
}
```

#### Documentation Comments
```javascript
/**
 * Validates user input data
 * @param {Object} userData - User data object
 * @param {string} userData.email - User email address
 * @param {string} userData.name - User full name
 * @returns {boolean} True if valid, false otherwise
 * @throws {ValidationError} When required fields are missing
 */
function validateUserData(userData) {
    // implementation
}
```

### Documentation Standards

#### API Documentation
```typescript
/**
 * User service for managing user accounts
 * 
 * @example
 * ```typescript
 * const userService = new UserService();
 * const user = await userService.createUser({
 *   email: 'john@example.com',
 *   name: 'John Doe'
 * });
 * ```
 */
export class UserService {
    /**
     * Creates a new user account
     * 
     * @param userData - User registration data
     * @returns Promise resolving to created user
     * @throws UserAlreadyExistsError when email is taken
     */
    async createUser(userData: CreateUserDto): Promise<User> {
        // implementation
    }
}
```

## ابزارهای Formatting

### Prettier Configuration
```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### EditorConfig
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,ts,json}]
indent_style = space
indent_size = 2

[*.{py,java,cs}]
indent_style = space
indent_size = 4
```

## اعمال استانداردها

### Pre-commit Hooks
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      
  - repo: https://github.com/psf/black
    rev: 22.10.0
    hooks:
      - id: black
```

### CI/CD Integration
```yaml
# GitHub Actions
name: Code Quality
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run ESLint
        run: npm run lint
      - name: Run Prettier
        run: npm run format:check
```

## بهترین شیوه‌ها

### قوانین طلایی

1. **Consistency is Key**: یکپارچگی مهم‌تر از کمال است
2. **Team Agreement**: توافق تیمی بر استانداردها
3. **Tool Automation**: خودکارسازی تا حد امکان
4. **Regular Review**: بازبینی دوره‌ای استانداردها
5. **Documentation**: مستندسازی قراردادهای تیم

### نکات عملی

**شروع تدریجی**
- اعمال تدریجی استانداردها
- آموزش مستمر تیم
- feedback و بهبود

**انعطاف‌پذیری**
- استثنائات موجه
- تطبیق با نیازهای پروژه
- به‌روزرسانی بر اساس تجربه

**مانیتورینگ**
- metrics کیفیت کد
- گزارش‌های دوره‌ای
- trend analysis