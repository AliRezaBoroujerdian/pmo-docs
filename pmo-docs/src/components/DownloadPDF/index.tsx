import React from 'react';
import styles from './DownloadPDF.module.css';

interface DownloadPDFProps {
  filename: string;
  title: string;
  type?: 'architecture' | 'code-quality' | 'general';
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ 
  filename, 
  title, 
  type = 'general' 
}) => {
  const handleDownload = () => {
    // مسیر فایل PDF در پوشه static
    const pdfPath = `/pmo-docs/pdf/${filename}`;
    
    // باز کردن PDF در تب جدید
    window.open(pdfPath, '_blank');
  };

  const getIcon = () => {
    switch (type) {
      case 'architecture':
        return '🏗️';
      case 'code-quality':
        return '🔍';
      default:
        return '📄';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'architecture':
        return styles.architecture;
      case 'code-quality':
        return styles.codeQuality;
      default:
        return styles.general;
    }
  };

  return (
    <div className={styles.downloadContainer}>
      <button 
        className={`${styles.downloadButton} ${getTypeClass()}`}
        onClick={handleDownload}
        title={`دانلود PDF: ${title}`}
        type="button"
      >
        <span className={styles.icon}>{getIcon()}</span>
        <span className={styles.text}>دانلود PDF</span>
        <span className={styles.downloadIcon}>⬇️</span>
      </button>
    </div>
  );
};

export default DownloadPDF;