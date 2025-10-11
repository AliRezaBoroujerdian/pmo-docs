import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DocumentCards from '@site/src/components/DocumentCards';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="سازمان بنادر و دریانوردی جمهوری اسلامی ایران">
      <main>
        <div style={{ 
          backgroundColor: 'var(--ifm-background-color)',
          minHeight: 'calc(100vh - 60px)',
          paddingTop: '3rem'
        }}>
          <div className="container">
            <div className="text--center" style={{ marginBottom: '3rem' }}>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                color: 'var(--ifm-heading-color)',
                marginBottom: '1rem'
              }}>
                {siteConfig.title}
              </h1>
              <p style={{ 
                fontSize: '1.5rem',
                color: 'var(--ifm-color-emphasis-700)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {siteConfig.tagline}
              </p>
            </div>
            <DocumentCards />
          </div>
        </div>
      </main>
    </Layout>
  );
}
