#!/usr/bin/env python3
"""
PDF/Word Export Generator for MkDocs
Generates PDF and Word documents for specific versions
"""

import os
import sys
from pathlib import Path
import markdown
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration
import argparse

class DocumentExporter:
    def __init__(self, docs_dir, version, document_type):
        self.docs_dir = Path(docs_dir)
        self.version = version
        self.document_type = document_type
        self.output_dir = Path('exports')
        self.output_dir.mkdir(exist_ok=True)
        
    def get_version_pages(self):
        """Get all markdown files for a specific version"""
        version_path = self.docs_dir / self.document_type / 'versions' / self.version
        if not version_path.exists():
            print(f"Error: Version path {version_path} does not exist")
            return []
        
        pages = []
        for md_file in sorted(version_path.glob('*.md')):
            pages.append(md_file)
        
        print(f"Found {len(pages)} pages for {self.document_type} {self.version}")
        return pages
    
    def markdown_to_html(self, md_content, title=""):
        """Convert markdown to HTML with RTL support"""
        html_template = f"""
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <style>
        @font-face {{
            font-family: 'Vazirmatn';
            src: url('file:///{self.docs_dir.absolute()}/stylesheets/fonts/Vazirmatn-Regular.woff2') format('woff2');
            font-weight: 400;
        }}
        @font-face {{
            font-family: 'Vazirmatn';
            src: url('file:///{self.docs_dir.absolute()}/stylesheets/fonts/Vazirmatn-Medium.woff2') format('woff2');
            font-weight: 500;
        }}
        @font-face {{
            font-family: 'Vazirmatn';
            src: url('file:///{self.docs_dir.absolute()}/stylesheets/fonts/Vazirmatn-Bold.woff2') format('woff2');
            font-weight: 700;
        }}
        
        body {{
            font-family: 'Vazirmatn', sans-serif;
            direction: rtl;
            text-align: right;
            line-height: 1.8;
            color: #333;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }}
        
        h1 {{
            color: #1a237e;
            border-bottom: 3px solid #3f51b5;
            padding-bottom: 10px;
            margin-top: 40px;
            page-break-before: always;
        }}
        
        h1:first-child {{
            page-break-before: avoid;
        }}
        
        h2 {{
            color: #283593;
            margin-top: 30px;
            border-right: 4px solid #3f51b5;
            padding-right: 15px;
        }}
        
        h3 {{
            color: #303f9f;
            margin-top: 20px;
        }}
        
        p {{
            margin: 15px 0;
            text-align: justify;
        }}
        
        ul, ol {{
            margin: 15px 0;
            padding-right: 30px;
        }}
        
        li {{
            margin: 8px 0;
        }}
        
        code {{
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            direction: ltr;
            display: inline-block;
        }}
        
        pre {{
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            direction: ltr;
            text-align: left;
        }}
        
        blockquote {{
            border-right: 4px solid #9fa8da;
            padding: 10px 20px;
            margin: 20px 0;
            background: #f5f7ff;
        }}
        
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }}
        
        th, td {{
            border: 1px solid #ddd;
            padding: 12px;
            text-align: right;
        }}
        
        th {{
            background: #3f51b5;
            color: white;
            font-weight: 600;
        }}
        
        .page-header {{
            text-align: center;
            margin-bottom: 50px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }}
        
        .page-header h1 {{
            color: white;
            border: none;
            margin: 0;
            page-break-before: avoid;
        }}
        
        .page-footer {{
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            font-size: 12px;
            color: #666;
        }}
        
        @page {{
            size: A4;
            margin: 2cm;
            @bottom-center {{
                content: counter(page) " از " counter(pages);
                font-family: 'Vazirmatn';
                direction: rtl;
            }}
        }}
    </style>
</head>
<body>
    {md_content}
</body>
</html>
"""
        return html_template
    
    def export_to_pdf(self):
        """Export all version pages to a single PDF"""
        pages = self.get_version_pages()
        if not pages:
            return None
        
        # Combine all markdown content
        combined_html = f"""
        <div class="page-header">
            <h1>مستندات {self.document_type.replace('-', ' ')}</h1>
            <p>نسخه {self.version}</p>
            <p>تاریخ ایجاد: {Path.cwd().stat().st_mtime}</p>
        </div>
        """
        
        md = markdown.Markdown(extensions=['extra', 'codehilite', 'tables', 'toc'])
        
        for page_file in pages:
            print(f"Processing: {page_file.name}")
            with open(page_file, 'r', encoding='utf-8') as f:
                content = f.read()
                html_content = md.convert(content)
                combined_html += f"\n{html_content}\n"
        
        combined_html += """
        <div class="page-footer">
            <p>این مستند به صورت خودکار از سیستم مستندسازی PMO تولید شده است</p>
        </div>
        """
        
        # Generate HTML
        full_html = self.markdown_to_html(
            combined_html, 
            f"{self.document_type} - {self.version}"
        )
        
        # Generate PDF
        output_file = self.output_dir / f"{self.document_type}-{self.version}.pdf"
        
        print(f"Generating PDF: {output_file}")
        
        font_config = FontConfiguration()
        html_obj = HTML(string=full_html)
        
        html_obj.write_pdf(
            output_file,
            font_config=font_config
        )
        
        print(f"✅ PDF generated successfully: {output_file}")
        return output_file
    
    def export_to_word(self):
        """Export to Word document using pandoc"""
        pages = self.get_version_pages()
        if not pages:
            return None
        
        # Combine all markdown files
        combined_md = f"# مستندات {self.document_type.replace('-', ' ')}\n\n"
        combined_md += f"**نسخه:** {self.version}\n\n"
        combined_md += "---\n\n"
        
        for page_file in pages:
            print(f"Processing: {page_file.name}")
            with open(page_file, 'r', encoding='utf-8') as f:
                content = f.read()
                combined_md += f"\n{content}\n\n"
        
        # Save combined markdown
        temp_md = self.output_dir / f"temp_{self.document_type}_{self.version}.md"
        with open(temp_md, 'w', encoding='utf-8') as f:
            f.write(combined_md)
        
        # Convert to docx using pandoc
        output_file = self.output_dir / f"{self.document_type}-{self.version}.docx"
        
        print(f"Generating Word document: {output_file}")
        
        import subprocess
        try:
            subprocess.run([
                'pandoc',
                str(temp_md),
                '-o', str(output_file),
                '--from=markdown',
                '--to=docx',
                '--resource-path', str(self.docs_dir)
            ], check=True)
            
            print(f"✅ Word document generated successfully: {output_file}")
            
            # Clean up temp file
            temp_md.unlink()
            
            return output_file
        except subprocess.CalledProcessError as e:
            print(f"❌ Error generating Word document: {e}")
            print("Make sure pandoc is installed: choco install pandoc")
            return None
        except FileNotFoundError:
            print("❌ Pandoc not found. Install it with: choco install pandoc")
            return None


def main():
    parser = argparse.ArgumentParser(description='Export MkDocs version to PDF/Word')
    parser.add_argument('--doc', required=True, help='Document type (risk-management or project-management)')
    parser.add_argument('--version', required=True, help='Version (e.g., v3.0.0)')
    parser.add_argument('--format', choices=['pdf', 'word', 'both'], default='both', help='Export format')
    parser.add_argument('--docs-dir', default='docs', help='Path to docs directory')
    
    args = parser.parse_args()
    
    exporter = DocumentExporter(args.docs_dir, args.version, args.doc)
    
    if args.format in ['pdf', 'both']:
        exporter.export_to_pdf()
    
    if args.format in ['word', 'both']:
        exporter.export_to_word()


if __name__ == '__main__':
    main()
