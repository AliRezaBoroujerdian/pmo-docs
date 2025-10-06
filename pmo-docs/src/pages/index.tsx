import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Service Cards Data
const services = [
  {
    title: 'فناوری اطلاعات',
    icon: '⚙️',
    description: 'سیستم‌های IT و زیرساخت‌های فناوری',
    category: 'فناوری'
  },
  {
    title: 'امور مالی', 
    icon: '💰',
    description: 'مدیریت مالی و بودجه سازمان',
    category: 'مالی'
  },
  {
    title: 'مکاتبات و تماس‌ها',
    icon: '📞', 
    description: 'ارتباطات اداری و مکاتبات رسمی',
    category: 'اداری'
  },
  {
    title: 'مدیریت اهداف',
    icon: '🎯',
    description: 'برنامه‌ریزی و پیگیری اهداف سازمانی', 
    category: 'مدیریت'
  },
  {
    title: 'مستندات فنی',
    icon: '📋',
    description: 'اسناد و مدارک فنی بنادر',
    category: 'فنی'
  },
  {
    title: 'منابع انسانی',
    icon: '👥',
    description: 'مدیریت پرسنل و منابع انسانی',
    category: 'اداری'
  }
];

function PortalHeader() {
  return (
    <header className={styles.portalHeader}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <Heading as="h1" className={styles.portalTitle}>
              پورتال سازمانی
            </Heading>
            <p className={styles.portalSubtitle}>
              دسترسی به سامانه‌ها و مورد نیاز
            </p>
          </div>
          
          {/* Search Section */}
          <div className={styles.searchSection}>
            <div className={styles.searchBox}>
              <input 
                type="text" 
                placeholder="جستجو در سامانه‌ها و خدمات"
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>🔍</button>
            </div>
            
            {/* Category Filters */}
            <div className={styles.categoryFilters}>
              <button className={clsx(styles.filterBtn, styles.active)}>همه</button>
              <button className={styles.filterBtn}>سامانه‌ها</button>
              <button className={styles.filterBtn}>خدمات</button>
              <button className={styles.filterBtn}>اسناد</button>
              <button className={styles.filterBtn}>پشتیبانی</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ServiceCard({title, icon, description, category}) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <span className={styles.cardCategory}>{category}</span>
      </div>
      <div className={styles.cardAction}>
        <Link to="/docs/intro" className={styles.cardButton}>
          ورود
        </Link>
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <section className={styles.servicesSection}>
      <div className="container">
        <div className={styles.servicesGrid}>
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`سامانه مستندات ${siteConfig.title}`}
      description="پورتال سازمانی بنادر و دریانوردی - دسترسی به تمام سامانه‌ها و خدمات">
      <PortalHeader />
      <main className={styles.portalMain}>
        <ServicesGrid />
      </main>
    </Layout>
  );
}
