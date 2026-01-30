/**
 * Language Switcher Script
 * Handles switching between Thai (TH) and English (EN) versions
 * TH files: filename.html
 * EN files: filename-en.html
 */

(function() {
    'use strict';

    // Get current page filename
    function getCurrentFilename() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        return filename || 'index.html';
    }

    // Determine current language and generate alternate URL
    function getLanguageInfo() {
        const currentFile = getCurrentFilename();
        let currentLang, alternateLang, alternateUrl;

        if (currentFile.endsWith('-en.html')) {
            // Current page is English
            currentLang = 'EN';
            alternateLang = 'TH';
            alternateUrl = currentFile.replace('-en.html', '.html');
        } else {
            // Current page is Thai
            currentLang = 'TH';
            alternateLang = 'EN';
            alternateUrl = currentFile.replace('.html', '-en.html');
        }

        return {
            currentLang: currentLang,
            alternateLang: alternateLang,
            alternateUrl: alternateUrl
        };
    }

    // Update language links
    function updateLanguageLinks() {
        const langInfo = getLanguageInfo();
        console.log('Language Switcher: Updating links...', langInfo);

        let updated = false;

        // Update all desktop menus (both absolute and sticky headers)
        // Only select dropdowns that have the language-switcher class
        const desktopDropdowns = document.querySelectorAll('.header-menu-button .has-dropdown.language-switcher');
        console.log('Language Switcher: Found', desktopDropdowns.length, 'desktop dropdown(s)');
        
        desktopDropdowns.forEach(function(dropdown) {
            const dropdownToggle = dropdown.querySelector('a');
            const subMenu = dropdown.querySelector('.sub-menu');
            
            if (!subMenu) {
                console.log('Language Switcher: No sub-menu found in dropdown');
                return;
            }
            
            const thLink = subMenu.querySelector('li:nth-child(1) a');
            const enLink = subMenu.querySelector('li:nth-child(2) a');

            if (dropdownToggle) {
                dropdownToggle.textContent = langInfo.currentLang;
                updated = true;
            }

            if (thLink) {
                thLink.href = langInfo.currentLang === 'TH' ? 'javascript:void(0)' : langInfo.alternateUrl;
                if (langInfo.currentLang === 'TH') {
                    thLink.classList.add('active');
                } else {
                    thLink.classList.remove('active');
                }
                updated = true;
            }

            if (enLink) {
                enLink.href = langInfo.currentLang === 'EN' ? 'javascript:void(0)' : langInfo.alternateUrl;
                if (langInfo.currentLang === 'EN') {
                    enLink.classList.add('active');
                } else {
                    enLink.classList.remove('active');
                }
                updated = true;
            }
        });

        // Update mobile menu (hamburger menu)
        const mobileLanguageLinks = document.querySelectorAll('.hamburger-language .language-links li');
        console.log('Language Switcher: Found', mobileLanguageLinks.length, 'mobile link(s)');
        
        if (mobileLanguageLinks.length >= 2) {
            const thLinkMobile = mobileLanguageLinks[0].querySelector('a');
            const enLinkMobile = mobileLanguageLinks[1].querySelector('a');

            if (thLinkMobile) {
                thLinkMobile.href = langInfo.currentLang === 'TH' ? 'javascript:void(0)' : langInfo.alternateUrl;
                if (langInfo.currentLang === 'TH') {
                    mobileLanguageLinks[0].classList.add('active');
                } else {
                    mobileLanguageLinks[0].classList.remove('active');
                }
                updated = true;
            }

            if (enLinkMobile) {
                enLinkMobile.href = langInfo.currentLang === 'EN' ? 'javascript:void(0)' : langInfo.alternateUrl;
                if (langInfo.currentLang === 'EN') {
                    mobileLanguageLinks[1].classList.add('active');
                } else {
                    mobileLanguageLinks[1].classList.remove('active');
                }
                updated = true;
            }
        }

        if (updated) {
            console.log('Language Switcher: ✓ Links updated successfully');
        } else {
            console.warn('Language Switcher: ⚠ No language links found to update');
        }
    }

    // Try to update links multiple times to catch dynamically loaded content
    function tryUpdate(attempt) {
        attempt = attempt || 1;
        console.log('Language Switcher: Attempt', attempt);
        
        updateLanguageLinks();
        
        // Try again if we haven't found any links yet (max 5 attempts)
        if (attempt < 5) {
            setTimeout(function() {
                const hasDesktop = document.querySelectorAll('.header-menu-button .has-dropdown.language-switcher').length > 0;
                const hasMobile = document.querySelectorAll('.hamburger-language .language-links li').length > 0;
                
                if (!hasDesktop || !hasMobile) {
                    tryUpdate(attempt + 1);
                }
            }, 200 * attempt);
        }
    }

    // Initialize
    function initialize() {
        console.log('Language Switcher: Initializing...');
        
        // Listen for custom event from header-loader.js
        document.addEventListener('headersLoaded', function() {
            console.log('Language Switcher: headersLoaded event received');
            setTimeout(updateLanguageLinks, 100);
        });

        // Start trying to update
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                tryUpdate();
            });
        } else {
            tryUpdate();
        }
    }

    // Start initialization
    initialize();

})();
