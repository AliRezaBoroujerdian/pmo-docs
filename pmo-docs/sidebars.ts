import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Sidebar اصلی
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'آموزش‌های پایه',
      items: ['tutorial-basics/create-a-document', 'tutorial-basics/create-a-page'],
    },
  ],

  // Sidebar برای الگوی سند معماری
  architectureSidebar: [
    {
      type: 'category',
      label: 'الگوی سند معماری',
      items: [
        'architecture/introduction',
        'architecture/logical-view',
        'architecture/process-view', 
        'architecture/development-view',
        'architecture/physical-view',
        'architecture/scenario-view',
        'architecture/document-template',
        'architecture/checklist-guide',
        'architecture/important-notes',
        'architecture/references',
      ],
    },
  ],

  // Sidebar برای کنترل کیفیت کد  
  codeQualitySidebar: [
    {
      type: 'category',
      label: 'کنترل کیفیت کد',
      items: [
        'code-quality/introduction',
        'code-quality/coding-standards',
        'code-quality/static-analysis-tools',
        'code-quality/testing-strategies',
        'code-quality/code-review',
        'code-quality/ci-cd-automation',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
