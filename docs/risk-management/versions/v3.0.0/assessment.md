# ارزیابی ریسک - نسخه 3.0.0

> **نسخه:** 3.0 | **بخش:** ارزیابی ریسک

!!! success "نسخه جاری"
    شما در حال مشاهده **نسخه 3.0.0 (آخرین نسخه)** هستید. 
    
    **نسخه‌های دیگر:** [📗 نسخه 1.0.0](../v1.0.0/assessment.md) | [📘 نسخه 2.0.0-beta](../v2.0.0-beta/assessment.md)

این سند به ارزیابی و تحلیل ریسک‌ها می‌پردازد.

## تحلیل کیفی

### ماتریس احتمال-تأثیر

| احتمال | تأثیر | اولویت |
|--------|-------|--------|
| بالا | بالا | 🔴 بحرانی |
| بالا | متوسط | 🟠 مهم |
| متوسط | متوسط | 🟡 متوسط |

## تحلیل کمی

### محاسبات مالی

$$
EMV = P \times I \times C
$$

### 🆕 شبیه‌سازی Monte Carlo

```python
def monte_carlo_simulation(risks, iterations=10000):
    results = []
    for _ in range(iterations):
        total_cost = sum(
            risk.probability * risk.impact 
            if random.random() < risk.probability 
            else 0
            for risk in risks
        )
        results.append(total_cost)
    return results
```

## ابزارهای ارزیابی

- Microsoft Project
- @RISK
- 🆕 Python Risk Analysis
- 🆕 Machine Learning Models

---

[⬅️ شناسایی](identification.md) | [📄 مرور کلی](overview.md) | [➡️ پاسخ به ریسک](response.md)
