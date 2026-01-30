/**
 * Simple Mega Menu Submenu Switcher
 * Pure JavaScript version without jQuery dependency issues
 */
(function() {
    'use strict';
    
    console.log("Simple Mega Menu: Script loaded");
    
    // Wait for mega menu content to be loaded
    if (typeof jQuery !== 'undefined') {
        jQuery(document).on('megaMenuContentLoaded', function() {
            console.log("Simple Mega Menu: Content loaded event received");
            attachEventListeners();
        });
    }
    
    // Also try on DOM ready as backup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(attachEventListeners, 3000);
        });
    } else {
        setTimeout(attachEventListeners, 3000);
    }
    
    function attachEventListeners() {
        console.log("Simple Mega Menu: Attaching event listeners");
        
        // Find all mega menu main links
        var allLinks = document.querySelectorAll('.mega-menu-main-link');
        console.log("Simple Mega Menu: Found main links:", allLinks.length);
        
        if (allLinks.length === 0) {
            console.error("Simple Mega Menu: No main links found!");
            return;
        }
        
        // Attach click event to each link
        allLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = link.getAttribute('href');
                
                // Check if this link should navigate to a page (has real href, not #)
                if (href && href !== '#' && href !== 'javascript:void(0)') {
                    console.log("Simple Mega Menu: Link has real href, allowing navigation:", href);
                    // Don't prevent default, let it navigate
                    
                    // Close the mega menu dropdown
                    var parentDropdown = link.closest('li.has-dropdown');
                    if (parentDropdown) {
                        parentDropdown.classList.remove('dropdown-active');
                    }
                    
                    return true;
                }
                
                // Otherwise, handle submenu switching
                e.preventDefault();
                e.stopPropagation();
                
                console.log("Simple Mega Menu: Main link clicked");
                handleMenuClick(link);
            });
        });
        
        console.log("Simple Mega Menu: Event listeners attached to", allLinks.length, "links");
    }
    
    function handleMenuClick(link) {
        var menuId = link.getAttribute('data-menu-id');
        console.log("Simple Mega Menu: Menu ID:", menuId);
        
        // Find the wrapper
        var wrapper = link.closest('.mega-menu-wrapper');
        if (!wrapper) {
            console.error("Simple Mega Menu: Wrapper not found");
            return;
        }
        
        console.log("Simple Mega Menu: Wrapper found");
        
        // Remove active class from all main menu links in this wrapper
        var allLinks = wrapper.querySelectorAll('.mega-menu-main-link');
        allLinks.forEach(function(l) {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all submenus in this wrapper
        var allSubmenus = wrapper.querySelectorAll('.mega-menu-pages-single.submenu');
        console.log("Simple Mega Menu: Found submenus:", allSubmenus.length);
        
        allSubmenus.forEach(function(submenu) {
            submenu.classList.remove('active');
        });
        
        // Show the corresponding submenu
        var targetSubmenu = wrapper.querySelector('.mega-menu-pages-single.submenu[data-submenu-id="' + menuId + '"]');
        if (targetSubmenu) {
            console.log("Simple Mega Menu: Target submenu found, activating");
            targetSubmenu.classList.add('active');
        } else {
            console.error("Simple Mega Menu: Target submenu not found for ID:", menuId);
        }
    }
    
})();
