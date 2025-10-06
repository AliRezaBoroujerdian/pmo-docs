import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="سازمان بنادر و دریانوردی جمهوری اسلامی ایران">
      <main>
        {/* محتوای صفحه اصلی پاک شده است */}
      </main>
    </Layout>
  );
}
