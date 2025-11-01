// Version Selector Dropdown - با تست و debug
console.log('🔧 Version Selector Script Loaded!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded');
    
    // Test 1: پیدا کردن تمام div های version-selector
    const versionDivs = document.querySelectorAll('.version-selector');
    console.log('📦 Found version-selector divs:', versionDivs.length);
    
    // Test 2: اگر version-selector وجود داره، پردازش کن
    if (versionDivs.length > 0) {
        console.log('✨ Processing existing dropdowns...');
        // فقط log کن، تغییری نده
        versionDivs.forEach((div, index) => {
            console.log(`Dropdown ${index}:`, div.innerHTML.substring(0, 100));
        });
    }
    
    // Test 3: پیدا کردن admonition box ها
    const versionBoxes = document.querySelectorAll('.admonition');
    console.log('📦 Found admonition boxes:', versionBoxes.length);
    
    versionBoxes.forEach((box, index) => {
        const title = box.querySelector('.admonition-title');
        if (!title) {
            console.log(`Box ${index}: No title found`);
            return;
        }
        
        const titleText = title.textContent;
        console.log(`Box ${index} title:`, titleText);
        
        if (titleText.includes('نسخه') || titleText.includes('انتخاب نسخه')) {
            console.log(`🎯 Found version box: "${titleText}"`);
            
            // Create dropdown
            const container = document.createElement('div');
            container.style.cssText = `
                margin: 2rem 0;
                padding: 1.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: 3px solid #ff6b6b;
                border-radius: 12px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.3);
            `;
            
            const label = document.createElement('div');
            label.style.cssText = `
                color: white;
                font-weight: 700;
                font-size: 1.2rem;
                margin-bottom: 1rem;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            `;
            label.textContent = '🎯 ' + titleText;
            
            const dropdown = document.createElement('select');
            dropdown.style.cssText = `
                width: 100%;
                max-width: 400px;
                padding: 1rem;
                font-size: 1.1rem;
                font-family: 'Vazirmatn', 'Tahoma', 'Arial', sans-serif;
                border: 3px solid #ffd93d;
                border-radius: 8px;
                background: white;
                color: #333;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            `;
            
            // Find all version links
            const links = box.querySelectorAll('a');
            console.log(`  Found ${links.length} links`);
            
            links.forEach(link => {
                const option = document.createElement('option');
                option.value = link.href;
                option.textContent = link.textContent;
                dropdown.appendChild(option);
                console.log(`  Added option: ${link.textContent}`);
            });
            
            dropdown.addEventListener('change', function() {
                console.log('🔄 Navigating to:', this.value);
                window.location.href = this.value;
            });
            
            container.appendChild(label);
            container.appendChild(dropdown);
            
            box.parentNode.replaceChild(container, box);
            console.log('✅ Replaced box with dropdown');
        }
    });
    
    console.log('🏁 Script execution completed');
});
