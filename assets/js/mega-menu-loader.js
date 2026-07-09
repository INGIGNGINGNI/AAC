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
	
	// ตรวจสอบว่าเป็นหน้า IR หรือไม่
	var isIRPage = currentPath.includes('investor');

	// รอให้ header components โหลดเสร็จก่อน
	function initMegaMenuLoader() {
		console.log("Mega Menu Loader: Initializing (" + lang + ", " + (isIRPage ? "IR" : "Main") + ")");
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
			// เลือกไฟล์ตามภาษาและประเภทหน้า
			var megaMenuFile;
			
			if (isIRPage) {
				// ใช้ mega menu IR
				megaMenuFile = isEnglish ? 
					"components/mega-menu-content-ir-en.html" : 
					"components/mega-menu-content-ir.html";
			} else {
				// ใช้ mega menu ปกติ
				megaMenuFile = isEnglish ? 
					"components/mega-menu-content-en.html" : 
					"components/mega-menu-content.html";
			}
			
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
				
				// Close the mega menu dropdown and reset button text
				var $parentDropdown = $link.closest("li.has-dropdown");
				$parentDropdown.removeClass("dropdown-active");
				resetMegaMenuButton($parentDropdown);
				
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
				// If no submenu found, close the mega menu and reset button text
				console.log("Mega Menu Loader: No submenu found, closing mega menu");
				var $parentDropdown = $link.closest("li.has-dropdown");
				$parentDropdown.removeClass("dropdown-active");
				resetMegaMenuButton($parentDropdown);
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

	// ฟังก์ชันรีเซ็ตข้อความปุ่ม "เมนูอื่นๆ" และรีเซ็ตเมนูกลับไปที่เมนูแรก
	function resetMegaMenuButton($parentDropdown) {
		var $button = $parentDropdown.find("> a");
		var $icon = $button.find(".material-symbols-rounded");
		
		// ตรวจสอบภาษา
		var openText = isEnglish ? "More " : "เมนูอื่นๆ ";
		
		// เปลี่ยนข้อความกลับเป็น "เมนูอื่นๆ" หรือ "More"
		$button.contents().filter(function() {
			return this.nodeType === 3; // Text node
		}).first().replaceWith(openText);
		
		// เปลี่ยน icon กลับเป็น "notes"
		if ($icon.length > 0) {
			$icon.text("notes");
		}
		
		// รีเซ็ตเมนูกลับไปที่เมนูแรก
		var $wrapper = $parentDropdown.find(".mega-menu-wrapper");
		if ($wrapper.length > 0) {
			// ลบ active จากเมนูทั้งหมด
			$wrapper.find(".mega-menu-main-link").removeClass("active");
			$wrapper.find(".mega-menu-pages-single.submenu").removeClass("active");
			
			// เพิ่ม active ให้กับเมนูแรกและ submenu แรก
			var $firstLink = $wrapper.find(".mega-menu-main-link").first();
			var firstMenuId = $firstLink.data("menu-id");
			
			// ถ้าเมนูแรกมี menu-id (มี submenu)
			if (firstMenuId) {
				$firstLink.addClass("active");
				var $firstSubmenu = $wrapper.find('.mega-menu-pages-single.submenu[data-submenu-id="' + firstMenuId + '"]');
				if ($firstSubmenu.length > 0) {
					$firstSubmenu.addClass("active");
					console.log("Mega Menu Loader: Reset to first menu with submenu:", firstMenuId);
				}
			} else {
				// ถ้าเมนูแรกไม่มี submenu ให้หาเมนูถัดไปที่มี submenu
				var $linksWithSubmenu = $wrapper.find(".mega-menu-main-link[data-menu-id]");
				if ($linksWithSubmenu.length > 0) {
					var $firstLinkWithSubmenu = $linksWithSubmenu.first();
					var menuId = $firstLinkWithSubmenu.data("menu-id");
					$firstLinkWithSubmenu.addClass("active");
					var $submenu = $wrapper.find('.mega-menu-pages-single.submenu[data-submenu-id="' + menuId + '"]');
					if ($submenu.length > 0) {
						$submenu.addClass("active");
						console.log("Mega Menu Loader: Reset to first menu with submenu:", menuId);
					}
				}
			}
		}
		
		console.log("Mega Menu Loader: Button text reset to:", openText);
	}

})(jQuery);
