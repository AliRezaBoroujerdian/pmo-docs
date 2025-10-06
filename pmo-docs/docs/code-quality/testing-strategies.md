# استراتژی‌های تست

راهنمای جامع طراحی و پیاده‌سازی استراتژی‌های تست نرم‌افزار

## مقدمه و اهمیت تست

تست نرم‌افزار فرآیند ارزیابی و تأیید عملکرد صحیح سیستم است که شامل:

- شناسایی نقص‌ها و باگ‌ها
- تضمین کیفیت محصول
- کاهش ریسک‌های عملیاتی
- اطمینان از رضایت کاربر

## هرم تست (Test Pyramid)

### Unit Tests (پایه هرم)
تست‌های سطح پایین و سریع:

```javascript
// مثال Unit Test
describe('UserService', () => {
  it('should create user with valid data', () => {
    const userService = new UserService();
    const userData = {
      email: 'test@example.com',
      name: 'John Doe'
    };
    
    const result = userService.createUser(userData);
    
    expect(result.id).toBeDefined();
    expect(result.email).toBe(userData.email);
  });
  
  it('should throw error for invalid email', () => {
    const userService = new UserService();
    const userData = {
      email: 'invalid-email',
      name: 'John Doe'
    };
    
    expect(() => userService.createUser(userData))
      .toThrow('Invalid email format');
  });
});
```

### Integration Tests (وسط هرم)
تست تعامل بین کامپوننت‌ها:

```python
# مثال Integration Test
class TestUserAPI:
    def test_create_user_endpoint(self):
        # Setup
        client = TestClient(app)
        user_data = {
            "email": "test@example.com",
            "name": "John Doe",
            "password": "secure123"
        }
        
        # Act
        response = client.post("/users", json=user_data)
        
        # Assert
        assert response.status_code == 201
        assert response.json()["email"] == user_data["email"]
        
        # Verify database
        user = User.get_by_email(user_data["email"])
        assert user is not None
        assert user.name == user_data["name"]
```

### End-to-End Tests (بالای هرم)
تست کامل workflow از منظر کاربر:

```javascript
// Cypress E2E Test
describe('User Registration Flow', () => {
  it('should complete full registration process', () => {
    cy.visit('/register');
    
    cy.get('[data-testid="email-input"]')
      .type('newuser@example.com');
    cy.get('[data-testid="password-input"]')
      .type('SecurePass123!');
    cy.get('[data-testid="confirm-password"]')
      .type('SecurePass123!');
    
    cy.get('[data-testid="submit-button"]').click();
    
    cy.url().should('include', '/welcome');
    cy.get('[data-testid="welcome-message"]')
      .should('contain', 'Welcome to our platform');
  });
});
```

## انواع تست‌ها

### Functional Testing

**Positive Testing**
```java
@Test
public void testCalculateTotalWithValidInputs() {
    // Given
    Order order = new Order();
    order.addItem(new OrderItem("Product1", 100.0, 2));
    order.addItem(new OrderItem("Product2", 50.0, 1));
    
    // When
    double total = order.calculateTotal();
    
    // Then
    assertEquals(250.0, total, 0.01);
}
```

**Negative Testing**
```java
@Test(expected = IllegalArgumentException.class)
public void testCalculateTotalWithNegativeQuantity() {
    // Given
    Order order = new Order();
    order.addItem(new OrderItem("Product1", 100.0, -1));
    
    // When
    order.calculateTotal(); // Should throw exception
}
```

**Boundary Testing**
```csharp
[TestMethod]
public void TestAgeValidation_BoundaryValues()
{
    var validator = new AgeValidator();
    
    // Lower boundary
    Assert.IsFalse(validator.IsValid(17)); // Below minimum
    Assert.IsTrue(validator.IsValid(18));  // Minimum valid
    
    // Upper boundary  
    Assert.IsTrue(validator.IsValid(65));  // Maximum valid
    Assert.IsFalse(validator.IsValid(66)); // Above maximum
}
```

### Non-Functional Testing

**Performance Testing**
```javascript
// Load Testing با Artillery
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120  
      arrivalRate: 50
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "User Registration"
    flow:
      - post:
          url: "/api/users"
          json:
            email: "user{{ $randomNumber() }}@test.com"
            password: "TestPass123"
```

**Security Testing**
```python
# مثال Security Test
def test_sql_injection_prevention():
    malicious_input = "'; DROP TABLE users; --"
    
    with pytest.raises(SecurityError):
        user_service.search_users(malicious_input)

def test_xss_prevention():
    malicious_script = "<script>alert('xss')</script>"
    
    result = user_service.create_user({
        "name": malicious_script,
        "email": "test@example.com"
    })
    
    # Script should be escaped
    assert "<script>" not in result.name
    assert "&lt;script&gt;" in result.name
```

## Test-Driven Development (TDD)

### چرخه Red-Green-Refactor

**مرحله Red: نوشتن تست شکست‌خورده**
```python
def test_calculate_discount():
    # Test that fails initially
    calculator = DiscountCalculator()
    result = calculator.calculate(amount=100, discount_rate=0.1)
    assert result == 90
```

**مرحله Green: پیاده‌سازی حداقلی**
```python
class DiscountCalculator:
    def calculate(self, amount, discount_rate):
        return amount * (1 - discount_rate)
```

**مرحله Refactor: بهبود کد**
```python
class DiscountCalculator:
    def calculate(self, amount: float, discount_rate: float) -> float:
        if amount < 0:
            raise ValueError("Amount cannot be negative")
        if not 0 <= discount_rate <= 1:
            raise ValueError("Discount rate must be between 0 and 1")
            
        return round(amount * (1 - discount_rate), 2)
```

## Behavior-Driven Development (BDD)

### Gherkin Scenarios
```gherkin
Feature: User Authentication
  
  Scenario: Successful login with valid credentials
    Given a user exists with email "user@example.com" and password "correct123"
    When the user attempts to login with email "user@example.com" and password "correct123"
    Then the user should be successfully authenticated
    And the user should be redirected to the dashboard

  Scenario: Failed login with invalid password
    Given a user exists with email "user@example.com" and password "correct123"
    When the user attempts to login with email "user@example.com" and password "wrong123"
    Then the login should fail
    And an error message "Invalid credentials" should be displayed
```

### Step Definitions
```python
# Behave step definitions
@given('a user exists with email "{email}" and password "{password}"')
def step_user_exists(context, email, password):
    context.user = User.create(email=email, password=password)

@when('the user attempts to login with email "{email}" and password "{password}"')
def step_attempt_login(context, email, password):
    context.result = auth_service.login(email, password)

@then('the user should be successfully authenticated')
def step_successful_auth(context):
    assert context.result.success is True
    assert context.result.user is not None
```

## Test Automation

### Framework Selection

**JavaScript - Jest/Vitest**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{js,ts}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
```

**Python - Pytest**
```ini
# pytest.ini
[tool:pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = 
    --strict-markers
    --strict-config
    --cov=src
    --cov-branch
    --cov-report=term-missing
    --cov-report=html
    --cov-fail-under=80
```

**Java - JUnit 5**
```xml
<!-- pom.xml -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.0.0-M7</version>
    <configuration>
        <includes>
            <include>**/*Test.java</include>
            <include>**/*Tests.java</include>
        </includes>
        <excludes>
            <exclude>**/*IntegrationTest.java</exclude>
        </excludes>
    </configuration>
</plugin>
```

### CI/CD Integration

**GitHub Actions**
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run unit tests
        run: npm run test:unit
        
      - name: Run integration tests
        run: npm run test:integration
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

## Test Data Management

### Test Fixtures
```python
# conftest.py
import pytest
from database import create_test_db, clear_test_db

@pytest.fixture(scope="session")
def test_db():
    db = create_test_db()
    yield db
    clear_test_db(db)

@pytest.fixture
def sample_user():
    return {
        "email": "test@example.com",
        "name": "Test User",
        "role": "user"
    }

@pytest.fixture
def authenticated_client(test_db, sample_user):
    user = User.create(**sample_user)
    token = generate_auth_token(user)
    client = TestClient(app)
    client.headers.update({"Authorization": f"Bearer {token}"})
    return client
```

### Factory Pattern
```python
# factories.py
import factory
from models import User, Order

class UserFactory(factory.Factory):
    class Meta:
        model = User
    
    email = factory.Sequence(lambda n: f"user{n}@example.com")
    name = factory.Faker('name')
    is_active = True
    created_at = factory.Faker('date_time')

class OrderFactory(factory.Factory):
    class Meta:
        model = Order
    
    user = factory.SubFactory(UserFactory)
    total = factory.Faker('pydecimal', left_digits=3, right_digits=2, positive=True)
    status = 'pending'

# استفاده
def test_user_orders():
    user = UserFactory()
    orders = OrderFactory.create_batch(3, user=user)
    
    assert len(user.orders) == 3
    assert all(order.user == user for order in orders)
```

## Mock و Stub

### Python - unittest.mock
```python
from unittest.mock import Mock, patch, MagicMock

def test_email_service_with_mock():
    # Mock external email service
    mock_email_service = Mock()
    mock_email_service.send.return_value = True
    
    notification_service = NotificationService(mock_email_service)
    result = notification_service.send_welcome_email("user@example.com")
    
    assert result is True
    mock_email_service.send.assert_called_once_with(
        to="user@example.com",
        subject="Welcome!",
        body=unittest.mock.ANY
    )

@patch('requests.post')
def test_api_call(mock_post):
    # Mock HTTP request
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {"success": True}
    
    api_client = APIClient()
    result = api_client.create_user({"name": "John"})
    
    assert result["success"] is True
    mock_post.assert_called_once()
```

### JavaScript - Jest
```javascript
// Mock external dependencies
jest.mock('./emailService');
import { EmailService } from './emailService';

const mockEmailService = EmailService as jest.Mocked<typeof EmailService>;

describe('NotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send welcome email', async () => {
    // Arrange
    mockEmailService.send.mockResolvedValue(true);
    const notificationService = new NotificationService(mockEmailService);

    // Act
    const result = await notificationService.sendWelcomeEmail('user@example.com');

    // Assert
    expect(result).toBe(true);
    expect(mockEmailService.send).toHaveBeenCalledWith({
      to: 'user@example.com',
      subject: 'Welcome!',
      template: 'welcome'
    });
  });
});
```

## Coverage Analysis

### Coverage Types

**Line Coverage**
```bash
# Istanbul/nyc برای JavaScript
npx nyc --reporter=html --reporter=text npm test

# Coverage.py برای Python  
coverage run -m pytest
coverage report -m
coverage html
```

**Branch Coverage**
```javascript
function calculateDiscount(amount, userType) {
  if (amount > 100) {        // Branch 1
    if (userType === 'vip') { // Branch 2
      return amount * 0.2;    // Path A
    }
    return amount * 0.1;      // Path B
  }
  return 0;                   // Path C
}

// تست برای تمام branches
describe('calculateDiscount', () => {
  it('should give 20% discount for VIP users over 100', () => {
    expect(calculateDiscount(150, 'vip')).toBe(30); // Path A
  });
  
  it('should give 10% discount for regular users over 100', () => {
    expect(calculateDiscount(150, 'regular')).toBe(15); // Path B
  });
  
  it('should give no discount for amounts under 100', () => {
    expect(calculateDiscount(50, 'vip')).toBe(0); // Path C
  });
});
```

## Quality Gates

### Coverage Thresholds
```yaml
# SonarQube Quality Gate
conditions:
  - metric: coverage
    operator: LT
    error: 80
  - metric: duplicated_lines_density
    operator: GT
    error: 3
  - metric: maintainability_rating
    operator: GT
    error: 1
```

### Test Quality Metrics
```javascript
// Jest configuration for quality gates
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/critical/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
};
```

## بهترین شیوه‌ها

### FIRST Principles
- **Fast**: تست‌ها باید سریع باشند
- **Independent**: مستقل از یکدیگر
- **Repeatable**: قابل تکرار در هر محیط
- **Self-Validating**: نتیجه واضح (pass/fail)
- **Timely**: نوشته شوند قبل از production code

### Given-When-Then Pattern
```python
def test_user_login():
    # Given - آماده‌سازی
    user = User.create(email="test@example.com", password="secret")
    login_service = LoginService()
    
    # When - اجرای عمل
    result = login_service.authenticate("test@example.com", "secret")
    
    # Then - بررسی نتیجه
    assert result.success is True
    assert result.user.email == "test@example.com"
```

### Test Naming Convention
```javascript
// الگوی نام‌گذاری: should_expectedBehavior_when_stateUnderTest
describe('UserService', () => {
  it('should_returnUser_when_validIdProvided', () => {});
  it('should_throwNotFoundError_when_invalidIdProvided', () => {});
  it('should_createUser_when_validDataProvided', () => {});
});
```