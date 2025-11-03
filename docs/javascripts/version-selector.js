// Smart Version Selector - Shows only current version pages
console.log('===== FILE LOADED - TOP LEVEL =====');

(function() {
    'use strict';
    
    console.log('===== VERSION SELECTOR LOADED =====');
    console.log('[Version Selector] Starting...');
    
    // Redirect to latest version if on document index page
    function redirectToLatestVersion() {
        var path = window.location.pathname;
        console.log('[Redirect] Checking path:', path);
        
        // Check if we're on a document index page (not in a version)
        var isDocIndex = false;
        var docType = null;
        
        // Match patterns like /risk-management/ or /project-management/ (without version)
        if (path.match(/\/risk-management\/?$/) || path.match(/\/risk-management\/index\.html$/)) {
            isDocIndex = true;
            docType = 'risk-management';
        } else if (path.match(/\/project-management\/?$/) || path.match(/\/project-management\/index\.html$/)) {
            isDocIndex = true;
            docType = 'project-management';
        } else if (path.match(/\/architecture\/?$/) || path.match(/\/architecture\/index\.html$/)) {
            isDocIndex = true;
            docType = 'architecture';
        } else if (path.match(/\/code-quality-control\/?$/) || path.match(/\/code-quality-control\/index\.html$/)) {
            isDocIndex = true;
            docType = 'code-quality-control';
        }
        
        if (!isDocIndex) {
            console.log('[Redirect] Not on document index page');
            return;
        }
        
        console.log('[Redirect] On document index:', docType);
        
        // Define latest versions for each document
        var latestVersions = {
            'risk-management': 'v3.0.0',
            'project-management': 'v2.0.0-beta',
            'architecture': 'v6.0.0',
            'code-quality-control': 'v1.0.0'
        };
        
        var latestVersion = latestVersions[docType];
        if (!latestVersion) {
            console.log('[Redirect] No latest version defined for:', docType);
            return;
        }
        
        // Build redirect URL to the overview/guide page of latest version
        var redirectPath;
        if (docType === 'risk-management') {
            redirectPath = '/' + docType + '/versions/' + latestVersion + '/overview/';
        } else if (docType === 'project-management') {
            redirectPath = '/' + docType + '/versions/' + latestVersion + '/guide/';
        } else if (docType === 'architecture') {
            redirectPath = '/' + docType + '/versions/' + latestVersion + '/';
        } else if (docType === 'code-quality-control') {
            redirectPath = '/' + docType + '/versions/' + latestVersion + '/overview/';
        }
        
        console.log('[Redirect] Redirecting to:', redirectPath);
        window.location.href = redirectPath;
    }
    
    // Run redirect check first
    redirectToLatestVersion();
    
    function cleanupOldSelectors() {
        var old = document.querySelectorAll('.version-selector-custom');
        console.log('[Version Selector] Cleanup found:', old.length, 'old selectors');
        for (var i = 0; i < old.length; i++) {
            old[i].remove();
        }
    }
    
    function init() {
        console.log('[Version Selector] Init called');
        
        // Check if already exists
        if (document.querySelector('.version-selector-custom')) {
            console.log('[Version Selector] Already exists, skipping');
            return;
        }
        
        cleanupOldSelectors();
        
        var path = window.location.pathname;
        console.log('[Version Selector] Path:', path);
        
        var currentDoc = null;
        var currentVersion = null;
        
        if (path.indexOf('/risk-management/') > -1) {
            currentDoc = 'risk-management';
        } else if (path.indexOf('/project-management/') > -1) {
            currentDoc = 'project-management';
        } else if (path.indexOf('/architecture/') > -1) {
            currentDoc = 'architecture';
        } else if (path.indexOf('/code-quality-control/') > -1) {
            currentDoc = 'code-quality-control';
        }
        
        var versionMatch = path.match(/\/v(\d+\.\d+\.\d+(?:-\w+)?)\//);
        if (versionMatch) {
            currentVersion = 'v' + versionMatch[1];
        }
        
        console.log('[Version Selector] Doc:', currentDoc, 'Version:', currentVersion);
        
        if (!currentDoc || !currentVersion) {
            console.log('[Version Selector] Not in versioned page');
            return;
        }
        
        var nav = document.querySelector('.md-sidebar--primary .md-nav--primary');
        if (!nav) {
            console.log('[Version Selector] Nav not found');
            return;
        }
        
        var navList = nav.querySelector('.md-nav__list');
        if (!navList) return;
        
        var mainItems = navList.querySelectorAll(':scope > .md-nav__item');
        var docSection = null;
        
        for (var i = 0; i < mainItems.length; i++) {
            var link = mainItems[i].querySelector(':scope > .md-nav__link');
            if (link) {
                var text = link.textContent;
                if ((currentDoc === 'risk-management' && text.indexOf('ریسک') > -1) ||
                    (currentDoc === 'project-management' && text.indexOf('پروژه') > -1) ||
                    (currentDoc === 'architecture' && text.indexOf('معماری') > -1) ||
                    (currentDoc === 'code-quality-control' && text.indexOf('کیفیت کد') > -1)) {
                    docSection = mainItems[i];
                    break;
                }
            }
        }
        
        if (!docSection) {
            console.log('[Version Selector] Doc section not found');
            return;
        }
        
        var subNav = docSection.querySelector(':scope > .md-nav');
        if (!subNav) return;
        
        var subList = subNav.querySelector(':scope > .md-nav__list');
        if (!subList) return;
        
        var versionItems = subList.querySelectorAll(':scope > .md-nav__item');
        var versions = [];
        
        for (var i = 0; i < versionItems.length; i++) {
            var item = versionItems[i];
            var vLink = item.querySelector(':scope > .md-nav__link');
            if (vLink) {
                var vText = vLink.textContent.trim();
                var vm = vText.match(/(\d+\.\d+\.\d+(?:-\w+)?)/);
                if (vm) {
                    versions.push({
                        element: item,
                        version: 'v' + vm[1],
                        text: vText,
                        link: vLink.getAttribute('href')
                    });
                }
            }
        }
        
        console.log('[Version Selector] Found versions:', versions.length);
        
        if (versions.length === 0) return;
        
        // Sort versions - newest first (descending)
        versions.sort(function(a, b) {
            // Extract version numbers
            var aMatch = a.version.match(/v(\d+)\.(\d+)\.(\d+)(?:-(\w+))?/);
            var bMatch = b.version.match(/v(\d+)\.(\d+)\.(\d+)(?:-(\w+))?/);
            
            if (!aMatch || !bMatch) return 0;
            
            var aMajor = parseInt(aMatch[1]);
            var aMinor = parseInt(aMatch[2]);
            var aPatch = parseInt(aMatch[3]);
            var aPrerelease = aMatch[4] || '';
            
            var bMajor = parseInt(bMatch[1]);
            var bMinor = parseInt(bMatch[2]);
            var bPatch = parseInt(bMatch[3]);
            var bPrerelease = bMatch[4] || '';
            
            // Compare major.minor.patch
            if (aMajor !== bMajor) return bMajor - aMajor; // Descending
            if (aMinor !== bMinor) return bMinor - aMinor;
            if (aPatch !== bPatch) return bPatch - aPatch;
            
            // Stable versions come before pre-release
            if (!aPrerelease && bPrerelease) return -1;
            if (aPrerelease && !bPrerelease) return 1;
            
            // Both pre-release or both stable
            return 0;
        });
        
        console.log('[Version Selector] Sorted versions:', versions.map(function(v) { return v.version; }));
        
        for (var i = 0; i < versions.length; i++) {
            if (versions[i].version !== currentVersion) {
                versions[i].element.style.display = 'none';
            } else {
                versions[i].element.style.display = '';
            }
        }
        
        var wrapper = document.createElement('div');
        wrapper.className = 'md-nav__item md-nav__item--section version-selector-custom';
        
        var label = document.createElement('label');
        label.className = 'md-nav__link';
        label.textContent = 'نسخه';
        label.style.cssText = 'cursor: default; font-weight: 700;';
        
        var selectWrapper = document.createElement('div');
        selectWrapper.style.cssText = 'padding: 0 12px 8px 12px;';
        
        var select = document.createElement('select');
        select.className = 'md-select';
        select.style.cssText = 'width: 100%; padding: 6px 8px; font-size: 0.8rem; border: 1px solid var(--md-default-fg-color--lightest); border-radius: 2px; background: var(--md-default-bg-color); color: var(--md-default-fg-color); font-family: inherit;';
        
        // Add options - versions array is already sorted (newest first)
        for (var i = 0; i < versions.length; i++) {
            var opt = document.createElement('option');
            opt.value = versions[i].version;
            opt.textContent = versions[i].text;
            
            // Select the current version that matches the URL
            if (versions[i].version === currentVersion) {
                opt.selected = true;
            }
            
            select.appendChild(opt);
        }
        
        select.addEventListener('change', function() {
            var selectedVersion = this.value;
            console.log('[Version Selector] Changing to:', selectedVersion);
            
            for (var i = 0; i < versions.length; i++) {
                if (versions[i].version === selectedVersion) {
                    var targetLink = versions[i].element.querySelector('.md-nav__link[href]');
                    if (targetLink) {
                        window.location.href = targetLink.getAttribute('href');
                    }
                    break;
                }
            }
        });
        
        select.addEventListener('mouseover', function() {
            this.style.borderColor = 'var(--md-default-fg-color--light)';
        });
        
        select.addEventListener('mouseout', function() {
            this.style.borderColor = 'var(--md-default-fg-color--lightest)';
        });
        
        select.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--md-primary-fg-color)';
            this.style.outlineOffset = '2px';
        });
        
        select.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        wrapper.appendChild(label);
        selectWrapper.appendChild(select);
        wrapper.appendChild(selectWrapper);
        
        // Insert at the beginning of the version list (before first version)
        var firstVersion = versions[0].element;
        var parentList = firstVersion.parentNode;
        
        // Find the first child element (should be first version item)
        var firstChild = parentList.firstElementChild;
        if (firstChild) {
            parentList.insertBefore(wrapper, firstChild);
        } else {
            parentList.appendChild(wrapper);
        }
        
        console.log('[Version Selector] Created successfully at top of list!');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    if (typeof document$ !== 'undefined') {
        document$.subscribe(function() {
            setTimeout(init, 150);
        });
    }
    
    // Fallback check only if needed
    var checkCount = 0;
    var checkInterval = setInterval(function() {
        checkCount++;
        if (checkCount > 10) {
            clearInterval(checkInterval);
            return;
        }
        
        if (!document.querySelector('.version-selector-custom')) {
            var path = window.location.pathname;
            if (path.indexOf('/v') > -1 && (
                path.indexOf('/risk-management/') > -1 || 
                path.indexOf('/project-management/') > -1 ||
                path.indexOf('/architecture/') > -1 ||
                path.indexOf('/code-quality-control/') > -1
            )) {
                init();
            }
        } else {
            clearInterval(checkInterval);
        }
    }, 1000);
    
})();
