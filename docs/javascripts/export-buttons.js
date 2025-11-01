// Export Buttons - PDF and Word download
(function() {
    'use strict';
    
    console.log('[Export Buttons] Starting...');
    
    function createExportButtons() {
        // Check if already exists
        if (document.querySelector('.export-buttons-wrapper')) {
            console.log('[Export Buttons] Already exists, skipping');
            return;
        }
        
        var path = window.location.pathname;
        console.log('[Export Buttons] Path:', path);
        
        var currentDoc = null;
        var currentVersion = null;
        
        if (path.indexOf('/risk-management/') > -1) {
            currentDoc = 'risk-management';
        } else if (path.indexOf('/project-management/') > -1) {
            currentDoc = 'project-management';
        }
        
        var versionMatch = path.match(/\/v(\d+\.\d+\.\d+(?:-\w+)?)\//);
        if (versionMatch) {
            currentVersion = 'v' + versionMatch[1];
        }
        
        console.log('[Export Buttons] Doc:', currentDoc, 'Version:', currentVersion);
        
        if (!currentDoc || !currentVersion) {
            console.log('[Export Buttons] Not in versioned page');
            return;
        }
        
        var nav = document.querySelector('.md-sidebar--primary .md-nav--primary');
        if (!nav) {
            console.log('[Export Buttons] Nav not found');
            return;
        }
        
        var navList = nav.querySelector('.md-nav__list');
        if (!navList) return;
        
        // Create export buttons wrapper
        var wrapper = document.createElement('div');
        wrapper.className = 'export-buttons-wrapper';
        wrapper.style.cssText = 'padding: 16px 12px; margin-top: 16px; border-top: 1px solid var(--md-default-fg-color--lightest);';
        
        var title = document.createElement('div');
        title.className = 'md-nav__link';
        title.textContent = 'دانلود مستندات';
        title.style.cssText = 'cursor: default; font-weight: 700; margin-bottom: 8px; font-size: 0.8rem;';
        
        var buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
        
        // PDF Button
        var pdfBtn = document.createElement('button');
        pdfBtn.className = 'export-btn export-btn-pdf';
        pdfBtn.innerHTML = '📄 دانلود PDF';
        pdfBtn.style.cssText = 'width: 100%; padding: 8px 12px; border: 1px solid var(--md-default-fg-color--lightest); border-radius: 4px; background: var(--md-default-bg-color); color: var(--md-default-fg-color); font-size: 0.8rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s; text-align: right;';
        
        // Word Button
        var wordBtn = document.createElement('button');
        wordBtn.className = 'export-btn export-btn-word';
        wordBtn.innerHTML = '📝 دانلود Word';
        wordBtn.style.cssText = 'width: 100%; padding: 8px 12px; border: 1px solid var(--md-default-fg-color--lightest); border-radius: 4px; background: var(--md-default-bg-color); color: var(--md-default-fg-color); font-size: 0.8rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s; text-align: right;';
        
        // Hover effects
        function addHoverEffect(btn) {
            btn.addEventListener('mouseover', function() {
                this.style.borderColor = 'var(--md-primary-fg-color)';
                this.style.backgroundColor = 'var(--md-primary-fg-color--light, rgba(63, 81, 181, 0.05))';
            });
            
            btn.addEventListener('mouseout', function() {
                this.style.borderColor = 'var(--md-default-fg-color--lightest)';
                this.style.backgroundColor = 'var(--md-default-bg-color)';
            });
        }
        
        addHoverEffect(pdfBtn);
        addHoverEffect(wordBtn);
        
        // Click handlers
        pdfBtn.addEventListener('click', function() {
            console.log('[Export] Generating PDF for', currentDoc, currentVersion);
            exportToPDF(currentDoc, currentVersion);
        });
        
        wordBtn.addEventListener('click', function() {
            console.log('[Export] Generating Word for', currentDoc, currentVersion);
            exportToWord(currentDoc, currentVersion);
        });
        
        buttonsContainer.appendChild(pdfBtn);
        buttonsContainer.appendChild(wordBtn);
        
        wrapper.appendChild(title);
        wrapper.appendChild(buttonsContainer);
        
        // Append to end of nav list
        navList.appendChild(wrapper);
        
        console.log('[Export Buttons] Created successfully!');
    }
    
    function exportToPDF(doc, version) {
        var pdfBtn = document.querySelector('.export-btn-pdf');
        if (pdfBtn) {
            pdfBtn.style.opacity = '0.6';
            pdfBtn.style.pointerEvents = 'none';
            pdfBtn.innerHTML = '⏳ در حال تولید PDF...';
        }
        
        var exportUrl = 'http://127.0.0.1:5000/export/' + doc + '/' + version + '/pdf';
        
        // Create hidden iframe for download to avoid CORS issues
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = exportUrl;
        document.body.appendChild(iframe);
        
        // Remove iframe after download starts
        setTimeout(function() {
            document.body.removeChild(iframe);
            console.log('PDF export request sent');
            
            if (pdfBtn) {
                pdfBtn.style.opacity = '1';
                pdfBtn.style.pointerEvents = 'auto';
                pdfBtn.innerHTML = '📄 دانلود PDF';
            }
        }, 2000);
    }
    
    function exportToWord(doc, version) {
        var wordBtn = document.querySelector('.export-btn-word');
        if (wordBtn) {
            wordBtn.style.opacity = '0.6';
            wordBtn.style.pointerEvents = 'none';
            wordBtn.innerHTML = '⏳ در حال تولید Word...';
        }
        
        var exportUrl = 'http://127.0.0.1:5000/export/' + doc + '/' + version + '/word';
        
        // Create hidden iframe for download to avoid CORS issues
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = exportUrl;
        document.body.appendChild(iframe);
        
        // Remove iframe after download starts
        setTimeout(function() {
            document.body.removeChild(iframe);
            console.log('Word export request sent');
            
            if (wordBtn) {
                wordBtn.style.opacity = '1';
                wordBtn.style.pointerEvents = 'auto';
                wordBtn.innerHTML = '📝 دانلود Word';
            }
        }, 2000);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createExportButtons);
    } else {
        createExportButtons();
    }
    
    // Re-initialize on navigation
    if (typeof document$ !== 'undefined') {
        document$.subscribe(function() {
            setTimeout(createExportButtons, 200);
        });
    }
    
})();
