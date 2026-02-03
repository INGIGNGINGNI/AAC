/**
 * Mega Menu Content Loader
 * Loads mega menu content and handles submenu switching
 * Supports both Thai and English languages
 */
(function ($) {
	"use strict";

	// ตรวจสอบภาษาจากชื่อไฟล์
	var currentPath = window.location.pathname;
	var isEnglish = currentPath.includes('-en.html');
	var lang = isEnglish ? 'en' : 'th';

	// รอให้ header components โหลดเสร็จก่อน
	function initMegaMenuLoader() {
		console.log("Mega Menu Loader: Initializing (" + lang + ")");
		// Add a small delay to ensure all elements are rendered
		setTimeout(function() {
			loadMegaMenuContent();
		}, 100);
	}

	// รอ event 'headersLoaded' จาก header-loader.js
	document.addEventListener('headersLoaded', initMegaMenuLoader);

	function loadMegaMenuContent() {
		// Find all mega menu wrapper containers
		var $megaMenuWrappers = $(".mega-menu-wrapper");
		
		console.log("Mega Menu Loader: Found wrappers:", $megaMenuWrappers.length);
		
		if ($megaMenuWrappers.length > 0) {
			// เลือกไฟล์ตามภาษา
			var megaMenuFile = isEnglish ? 
				"components/mega-menu-content-en.html" : 
				"components/mega-menu-content.html";
			
			// Load content from external file
			$.ajax({
				url: megaMenuFile,
				dataType: "html",
				cache: false, // Disable cache to always get fresh content
				success: function(data) {
					console.log("Mega Menu Loader: Content loaded from file (" + lang + ")");
					
					// Clear existing content first
					$megaMenuWrappers.empty();
					
					// Inject the content into each mega menu wrapper
					$megaMenuWrappers.html(data);
					
					console.log("Mega Menu Loader: Content injected");
					console.log("Mega Menu Loader: Main links found:", $(".mega-menu-main-link").length);
					console.log("Mega Menu Loader: Submenus found:", $(".mega-menu-pages-single.submenu").length);
					
					// Check if there are any submenus
					var hasSubmenus = $(".mega-menu-pages-single.submenu").length > 0;
					
					// If no submenus at all, prevent mega menu from opening
					if (!hasSubmenus) {
						console.log("Mega Menu Loader: No submenus found, mega menu will not open");
						$(".mainmenu .btn-menu").removeClass("has-dropdown");
					}
					
					// Initialize the submenu switching after content is loaded
					initMegaMenuSubmenuSwitching();
					
					// Trigger custom event to notify other scripts
					$(document).trigger('megaMenuContentLoaded');
				},
				error: function(xhr, status, error) {
					console.error("Mega Menu Loader: Failed to load content from file:", error);
					console.error("Mega Menu Loader: Status:", status);
					console.error("Mega Menu Loader: XHR:", xhr);
				}
			});
		}
	}

	function initMegaMenuSubmenuSwitching() {
		console.log("Mega Menu Loader: Initializing submenu switching");
		
		// Remove any existing handlers first to prevent duplicates
		$(document).off("click.megamenu", ".mega-menu-main-link");
		$(".mega-menu-main-link").off("click.megamenu");
		
		// Use DIRECT binding instead of delegation to avoid event propagation issues
		$(".mega-menu-main-link").on("click.megamenu", function(e) {
			console.log("=== CLICK HANDLER FIRED (DIRECT) ===");
			
			var $link = $(this);
			var href = $link.attr("href");
			
			console.log("Link clicked:", $link.text().trim());
			console.log("Href:", href);
			
			// Check if this link should navigate to a page (has real href, not #)
			if (href && href !== "#" && href !== "javascript:void(0)") {
				// Let the link navigate normally - don't prevent default
				console.log("Mega Menu Loader: Navigating to:", href);
				
				// Close the mega menu dropdown
				$link.closest("li.has-dropdown").removeClass("dropdown-active");
				
				return true;
			}
			
			// Otherwise, handle submenu switching
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			
			console.log("Mega Menu Loader: Handling submenu switch");
			
			var menuId = $link.data("menu-id");
			var $wrapper = $link.closest(".mega-menu-wrapper");
			
			console.log("Mega Menu Loader: Menu ID:", menuId);
			console.log("Mega Menu Loader: Wrapper found:", $wrapper.length);
			
			// Remove active class from all main menu links in this wrapper
			$wrapper.find(".mega-menu-main-link").removeClass("active");
			
			// Add active class to clicked link
			$link.addClass("active");
			
			// Hide all submenus in this wrapper
			$wrapper.find(".mega-menu-pages-single.submenu").removeClass("active");
			
			// Show the corresponding submenu
			var $targetSubmenu = $wrapper.find('.mega-menu-pages-single.submenu[data-submenu-id="' + menuId + '"]');
			console.log("Mega Menu Loader: Target submenu found:", $targetSubmenu.length);
			
			// Only show submenu if it exists
			if ($targetSubmenu.length > 0) {
				$targetSubmenu.addClass("active");
				console.log("Mega Menu Loader: Submenu activated");
			} else {
				// If no submenu found, close the mega menu
				console.log("Mega Menu Loader: No submenu found, closing mega menu");
				$link.closest("li.has-dropdown").removeClass("dropdown-active");
			}
			
			return false;
		});
		
		console.log("Mega Menu Loader: Direct click handler bound to", $(".mega-menu-main-link").length, "links");
		
		// Test if handler is working
		setTimeout(function() {
			var $testLink = $(".mega-menu-main-link").first();
			if ($testLink.length > 0) {
				console.log("Mega Menu Loader: Test link found:", $testLink.text().trim());
				console.log("Mega Menu Loader: Click handler should be ready");
			}
		}, 500);
	}

})(jQuery);
