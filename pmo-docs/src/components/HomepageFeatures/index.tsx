import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'مدیریت اسناد سازمانی',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        سیستم جامع مدیریت اسناد و مدارک سازمان بنادر و دریانوردی با قابلیت 
        دسترسی آسان و جستجوی پیشرفته در تمام بخش‌ها و واحدهای سازمانی.
      </>
    ),
  },
  {
    title: 'فرآیندهای استاندارد',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        مستندسازی کامل فرآیندهای عملیاتی، اداری و فنی سازمان شامل 
        رویه‌های بنادر، کشتیرانی، ایمنی دریایی و نظارت بر فعالیت‌های دریانوردی.
      </>
    ),
  },
  {
    title: 'پلتفرم دیجیتال مدرن',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        بستر دیجیتال پیشرفته و ریسپانسیو با پشتیبانی کامل از زبان فارسی، 
        جستجوی هوشمند و امکان دسترسی از تمام دستگاه‌ها و مرورگرها.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
