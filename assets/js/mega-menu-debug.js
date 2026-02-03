/**
 * Mega Menu Debug Script
 * Add this temporarily to debug mega menu issues
 */
(function ($) {
	"use strict";

	console.log("=== Mega Menu Debug Script Loaded ===");

	// Wait for mega menu content to be loaded
	$(document).on('megaMenuContentLoaded', function() {
		console.log("=== Mega Menu Content Loaded Event Fired ===");
		
		// Check if main links exist
		var $mainLinks = $(".mega-menu-main-link");
		console.log("Main menu links found:", $mainLinks.length);
		
		$mainLinks.each(function(index) {
			var $link = $(this);
			console.log("Link " + index + ":", {
				text: $link.text().trim(),
				menuId: $link.data("menu-id"),
				href: $link.attr("href"),
				hasClass: $link.attr("class")
			});
		});
		
		// Check if submenus exist
		var $submenus = $(".mega-menu-pages-single.submenu");
		console.log("Submenus found:", $submenus.length);
		
		$submenus.each(function(index) {
			var $submenu = $(this);
			console.log("Submenu " + index + ":", {
				submenuId: $submenu.data("submenu-id"),
				hasActive: $submenu.hasClass("active")
			});
		});
		
		// Add direct click handler for testing
		console.log("=== Adding Direct Click Handler for Testing ===");
		$(".mega-menu-main-link").on("click", function(e) {
			console.log("!!! DIRECT CLICK DETECTED !!!");
			console.log("Target:", $(this).text().trim());
			console.log("Event:", e);
		});
		
		// Test click programmatically
		setTimeout(function() {
			console.log("=== Testing Programmatic Click ===");
			var $firstLink = $(".mega-menu-main-link").first();
			if ($firstLink.length > 0) {
				console.log("Triggering click on:", $firstLink.text().trim());
				$firstLink.trigger("click");
			}
		}, 1000);
	});

	// Check when page loads
	$(document).ready(function() {
		console.log("=== Document Ready ===");
		console.log("jQuery version:", $.fn.jquery);
		
		setTimeout(function() {
			console.log("=== After 2 seconds ===");
			console.log("Main links:", $(".mega-menu-main-link").length);
			console.log("Submenus:", $(".mega-menu-pages-single.submenu").length);
			
			// Check if links are visible and clickable
			var $links = $(".mega-menu-main-link");
			if ($links.length > 0) {
				var $firstLink = $links.first();
				console.log("First link CSS:", {
					display: $firstLink.css("display"),
					visibility: $firstLink.css("visibility"),
					pointerEvents: $firstLink.css("pointer-events"),
					position: $firstLink.position()
				});
			}
		}, 2000);
	});

})(jQuery);
