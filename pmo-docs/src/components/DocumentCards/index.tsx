import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface DocumentCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
  gradient: string;
}

function DocumentCard({ title, description, link, icon, gradient }: DocumentCardProps) {
  return (
    <div className="col col--4">
      <Link 
        to={link} 
        className={styles.cardLink}
      >
        <div className={styles.card}>
          {/* Background Pattern */}
          <div className={styles.cardPattern} />
          
          {/* Header with Gradient */}
          <div className={styles.cardHeader}>
            <div 
              className={styles.cardIcon}
              style={{ 
                background: gradient,
                boxShadow: `0 8px 32px ${gradient}40`
              }}
            >
              {icon}
            </div>
            <h3 className={styles.cardTitle}>
              {title}
            </h3>
          </div>
          
          <div className={styles.cardContent}>
            <p className={styles.cardDescription}>
              {description}
            </p>
            
            {/* Action Arrow */}
            <div className={styles.cardFooter}>
              <div className={styles.cardArrow}>
                <svg 
                  className={styles.arrowIcon}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Shine Effect */}
          <div className={styles.cardShine} />
        </div>
      </Link>
    </div>
  );
}

export default function DocumentCards() {
  const documents = [
    {
      title: 'مستندات فنی',
      description: 'دسترسی به مستندات فنی، راهنماهای توسعه و مستندات API سیستم های سازمانی',
      link: '/docs/intro',
      icon: '📚',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'الگوی سند معماری',
      description: 'الگوها، چارچوب‌ها و استانداردهای معماری برای طراحی سیستم‌های نرم‌افزاری',
      link: '/docs/architecture/introduction',
      icon: '🏗️',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'کنترل کیفیت کد',
      description: 'استانداردها، ابزارها و فرآیندهای کنترل کیفیت و بررسی کد در پروژه‌ها',
      link: '/docs/code-quality/introduction',
      icon: '🔍',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  return (
    <section className={styles.section}>
      {/* Background Elements */}
      <div className={styles.bgElements}>
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>
      
      <div className="container">
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeText}>
              سامانه مدیریت مستندات
            </span>
          </div>
          
          <h2 className={styles.mainTitle}>
            مجموعه مستندات PMO
          </h2>
          
          <p className={styles.subtitle}>
            به پورتال جامع مستندات سازمان بنادر و دریانوردی خوش آمدید. 
            از کارت‌های زیر برای دسترسی سریع به بخش‌های مختلف استفاده کنید.
          </p>
          
          {/* Decorative Line */}
          <div className={styles.decorativeLine}>
            <div className={styles.lineLeft} />
            <div className={styles.lineDot} />
            <div className={styles.lineRight} />
          </div>
        </div>
        
        {/* Cards Grid */}
        <div className="row">
          {documents.map((doc, idx) => (
            <DocumentCard key={idx} {...doc} />
          ))}
        </div>
        
        {/* Footer Note */}
        <div className={styles.footerNote}>
          <p>
            برای دریافت راهنمایی بیشتر با تیم توسعه تماس بگیرید
          </p>
        </div>
      </div>
    </section>
  );
}