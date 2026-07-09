/**
 * Mobile Filter Bottom Sheet Drawer
 * Slide up from bottom for mobile filter
 */

(function ($) {
    'use strict';

    $(document).ready(function () {
        const $filterToggle = $('#mobileFilterToggle');
        const $filterDrawer = $('#filterSideDrawer');
        const $filterDrawerOverlay = $('#filterDrawerOverlay');
        const $filterDrawerClose = $('#filterDrawerClose');
        const $filterDrawerBody = $('#filterDrawerBody');
        const $applyFilter = $('#btnApplyFilter');
        const $resetFilter = $('#btnResetFilter');
        const $body = $('body');
        const $desktopFilter = $('.desktop-filter');

        // Clone filter content to drawer on mobile
        function initDrawer() {
            if ($(window).width() <= 767) {
                if ($filterDrawerBody.children().length === 0) {
                    // Clone search filter
                    const $searchClone = $('.search-filter').first().clone();
                    $filterDrawerBody.append($searchClone);

                    // Clone blog-text (accordion) - deep clone with events
                    const $blogTextClone = $desktopFilter.clone(true, true);
                    $blogTextClone.removeClass('desktop-filter');
                    
                    // Change IDs to prevent conflicts with desktop
                    $blogTextClone.find('[id]').each(function () {
                        const oldId = $(this).attr('id');
                        const newId = 'drawer-' + oldId;
                        $(this).attr('id', newId);
                        
                        // Update data-bs-target references
                        $blogTextClone.find(`[data-bs-target="#${oldId}"]`).attr('data-bs-target', '#' + newId);
                    });
                    
                    // Update accordion parent ID
                    $blogTextClone.find('.accordion').attr('id', 'drawer-faqOne');
                    
                    $filterDrawerBody.append($blogTextClone);
                }
            }
        }

        // Open drawer
        function openDrawer() {
            initDrawer();
            $filterDrawer.addClass('active');
            $body.addClass('filter-drawer-open');
            
            // Prevent body scroll on touch devices
            preventBodyScroll();
        }

        // Close drawer
        function closeDrawer() {
            $filterDrawer.removeClass('active');
            $body.removeClass('filter-drawer-open');
            
            // Re-enable body scroll
            enableBodyScroll();
        }

        // Prevent body scroll when drawer is open
        function preventBodyScroll() {
            const scrollY = window.scrollY;
            $body.css({
                position: 'fixed',
                top: `-${scrollY}px`,
                width: '100%',
                overflow: 'hidden'
            });
        }

        // Enable body scroll when drawer is closed
        function enableBodyScroll() {
            const scrollY = $body.css('top');
            $body.css({
                position: '',
                top: '',
                width: '',
                overflow: ''
            });
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        // Toggle button click
        $filterToggle.on('click', function (e) {
            e.preventDefault();
            openDrawer();
        });

        // Close button click
        $filterDrawerClose.on('click', function () {
            closeDrawer();
        });

        // Overlay click
        $filterDrawerOverlay.on('click', function () {
            closeDrawer();
        });

        // Apply filter button click
        $applyFilter.on('click', function () {
            // Sync checkboxes from drawer to desktop
            syncFilters('drawer-to-desktop');
            closeDrawer();
            console.log('Filter applied');
        });

        // Reset filter button
        $resetFilter.on('click', function () {
            // Uncheck all checkboxes in drawer
            $filterDrawerBody.find('input[type="checkbox"]').prop('checked', false);
            // Sync to desktop
            syncFilters('drawer-to-desktop');
            console.log('Filter reset');
        });

        // Sync filters between drawer and desktop
        function syncFilters(direction) {
            if (direction === 'drawer-to-desktop') {
                $filterDrawerBody.find('input[type="checkbox"]').each(function (index) {
                    const isChecked = $(this).prop('checked');
                    $desktopFilter.find('input[type="checkbox"]').eq(index).prop('checked', isChecked);
                });
            } else if (direction === 'desktop-to-drawer') {
                $desktopFilter.find('input[type="checkbox"]').each(function (index) {
                    const isChecked = $(this).prop('checked');
                    $filterDrawerBody.find('input[type="checkbox"]').eq(index).prop('checked', isChecked);
                });
            }
        }

        // Prevent drawer panel click from closing
        $('.filter-drawer-panel').on('click', function (e) {
            e.stopPropagation();
        });

        // Prevent scroll on overlay only
        $filterDrawerOverlay.on('touchmove', function (e) {
            e.preventDefault();
        });

        // Close on ESC key
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && $filterDrawer.hasClass('active')) {
                closeDrawer();
            }
        });

        // Reinitialize on window resize
        let resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if ($(window).width() > 767) {
                    closeDrawer();
                }
            }, 250);
        });
    });

})(jQuery);
