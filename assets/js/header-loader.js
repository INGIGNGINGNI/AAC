/**
 * Header Component Loader
 * โหลด header template และเมนูจาก components
 * รองรับทั้งภาษาไทยและภาษาอังกฤษ
 * 
 * หมายเหตุ: index.html และ index-en.html ใช้ HTML โดยตรง ไม่ต้องโหลดผ่าน JavaScript
 */
(function() {
    'use strict';

    // ตรวจสอบภาษาจากชื่อไฟล์
    const currentPath = window.location.pathname;
    const isEnglish = currentPath.includes('-en.html');
    const lang = isEnglish ? 'en' : 'th';

    // ตรวจสอบว่าเป็นหน้า index หรือไม่
    const isIndexPage = currentPath === '/' || 
                        currentPath.endsWith('/index.html') ||
                        currentPath.endsWith('/index-en.html') ||
                        currentPath.endsWith('/');

    // ถ้าเป็นหน้า index ให้ข้ามการโหลด header template
    // แต่ยังต้องโหลดเมนูเข้าไป
    if (isIndexPage) {
        console.log(`Header Loader: Index page detected (${lang}) - loading menus only`);
        
        // รอให้ DOM พร้อม
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadMenusOnly);
        } else {
            loadMenusOnly();
        }
        return;
    }

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

    // โหลดเฉพาะเมนู (สำหรับ index.html และ index-en.html)
    async function loadMenusOnly() {
        try {
            console.log(`Header Loader: Loading menus for index page (${lang})...`);

            // เลือกไฟล์ตามภาษา
            const menuNavFile = isEnglish ? 
                'components/menu-navigation-en.html' : 
                'components/menu-navigation.html';
            const menuRightFile = isEnglish ? 
                'components/menu-right-buttons-en.html' : 
                'components/menu-right-buttons.html';

            // โหลด menu components
            const [menuNav, menuRight] = await Promise.all([
                loadComponent(menuNavFile),
                loadComponent(menuRightFile)
            ]);

            if (!menuNav || !menuRight) {
                console.error('Failed to load menu components');
                return;
            }

            // โหลดเมนูเข้า header ที่มีอยู่แล้ว
            insertMenus(menuNav, menuRight);

            // Trigger custom event เมื่อโหลดเสร็จ
            document.dispatchEvent(new CustomEvent('headersLoaded', {
                detail: { timestamp: Date.now(), lang: lang }
            }));

            console.log(`✓ Menus loaded successfully for index page (${lang})`);

        } catch (error) {
            console.error('Error loading menus:', error);
        }
    }

    // โหลด header template และเมนู (สำหรับหน้าอื่นๆ)
    async function initializeHeaders() {
        try {
            console.log(`Header Loader: Starting (${lang})...`);
            
            // เลือกไฟล์ header template ตามภาษา
            const headerTemplateFile = isEnglish ? 
                'components/header-template-en.html' : 
                'components/header-template.html';
            
            // โหลด header template ก่อน
            const headerTemplate = await loadComponent(headerTemplateFile);
            
            if (!headerTemplate) {
                console.error('Failed to load header template');
                return;
            }

            // แทรก header template เข้าไปใน placeholder
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = headerTemplate;
                console.log(`✓ Header template loaded (${lang})`);
            } else {
                console.error('Header placeholder not found');
                return;
            }

            // รอให้ DOM update
            await new Promise(resolve => setTimeout(resolve, 50));

            // เลือกไฟล์เมนูตามภาษา
            const menuNavFile = isEnglish ? 
                'components/menu-navigation-en.html' : 
                'components/menu-navigation.html';
            const menuRightFile = isEnglish ? 
                'components/menu-right-buttons-en.html' : 
                'components/menu-right-buttons.html';

            // โหลด menu components
            const [menuNav, menuRight] = await Promise.all([
                loadComponent(menuNavFile),
                loadComponent(menuRightFile)
            ]);

            if (!menuNav || !menuRight) {
                console.error('Failed to load menu components');
                return;
            }

            // โหลดเมนูเข้า header
            insertMenus(menuNav, menuRight);

            // Trigger custom event เมื่อโหลดเสร็จ
            document.dispatchEvent(new CustomEvent('headersLoaded', {
                detail: { timestamp: Date.now(), lang: lang }
            }));

            console.log(`✓ Headers loaded successfully (${lang})`);

        } catch (error) {
            console.error('Error initializing headers:', error);
        }
    }

    // ฟังก์ชันแทรกเมนูเข้า header
    function insertMenus(menuNav, menuRight) {
        // 1. Header Absolute - Navigation
        const headerAbsoluteNav = document.querySelector('.header-absolute #mobile-menu');
        if (headerAbsoluteNav) {
            headerAbsoluteNav.innerHTML = `<ul>${menuNav}</ul>`;
            console.log('✓ Header absolute navigation loaded');
        }

        // 2. Header Absolute - Right Buttons
        const headerAbsoluteRight = document.querySelector('.header-absolute .header-menu-button .mainmenu');
        if (headerAbsoluteRight) {
            headerAbsoluteRight.innerHTML = `<ul>${menuRight}</ul>`;
            console.log('✓ Header absolute right buttons loaded');
        }

        // 3. Header Sticky - Navigation
        const headerStickyNav = document.querySelector('.header-sticky .menu-area .mainmenu');
        if (headerStickyNav) {
            headerStickyNav.innerHTML = `<ul>${menuNav}</ul>`;
            console.log('✓ Header sticky navigation loaded');
        }

        // 4. Header Sticky - Right Buttons
        const headerStickyRight = document.querySelector('.header-sticky .header-menu-button .mainmenu');
        if (headerStickyRight) {
            headerStickyRight.innerHTML = `<ul>${menuRight}</ul>`;
            console.log('✓ Header sticky right buttons loaded');
        }
    }

    // เริ่มโหลดเมื่อ DOM พร้อม (สำหรับหน้าอื่นๆ)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHeaders);
    } else {
        initializeHeaders();
    }

})();
