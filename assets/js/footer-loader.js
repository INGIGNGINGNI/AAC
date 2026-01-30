/**
 * Footer Component Loader
 * โหลด footer template จาก components
 * รองรับทั้งภาษาไทยและภาษาอังกฤษ
 */
(function() {
    'use strict';

    // ตรวจสอบภาษาจากชื่อไฟล์
    const currentPath = window.location.pathname;
    const isEnglish = currentPath.includes('-en.html');
    const lang = isEnglish ? 'en' : 'th';

    // โหลด component แบบ async
    async function loadComponent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading component:', error);
            return '';
        }
    }

    // โหลด footer template
    async function initializeFooter() {
        try {
            console.log(`Footer Loader: Starting (${lang})...`);
            
            // เลือกไฟล์ footer template ตามภาษา
            const footerTemplateFile = isEnglish ? 
                'components/footer-template-en.html' : 
                'components/footer-template.html';
            
            // โหลด footer template
            const footerTemplate = await loadComponent(footerTemplateFile);
            
            if (!footerTemplate) {
                console.error('Failed to load footer template');
                return;
            }

            // แทรก footer template เข้าไปใน placeholder
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = footerTemplate;
                console.log(`✓ Footer template loaded (${lang})`);
            } else {
                console.error('Footer placeholder not found');
                return;
            }

            // Trigger custom event เมื่อโหลดเสร็จ
            document.dispatchEvent(new CustomEvent('footerLoaded', {
                detail: { timestamp: Date.now(), lang: lang }
            }));

            console.log(`✓ Footer loaded successfully (${lang})`);

        } catch (error) {
            console.error('Error initializing footer:', error);
        }
    }

    // เริ่มโหลดเมื่อ DOM พร้อม
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFooter);
    } else {
        initializeFooter();
    }

})();
