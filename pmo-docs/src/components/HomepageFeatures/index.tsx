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
    title: 'آسان در استفاده',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        سیستم مدیریت پروژه PMO برای استفاده آسان و راه‌اندازی سریع طراحی شده است.
      </>
    ),
  },
  {
    title: 'تمرکز بر مهم‌ترین موارد',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        PMO به شما امکان تمرکز بر مستندات و فرآیندهای اصلی را می‌دهد. 
        مستندات خود را در دایرکتوری <code>docs</code> قرار دهید.
      </>
    ),
  },
  {
    title: 'قدرت گرفته از React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        با استفاده مجدد از React، چیدمان وب‌سایت خود را گسترش دهید یا سفارشی کنید. 
        PMO را می‌توان با حفظ همان هدر و فوتر گسترش داد.
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
