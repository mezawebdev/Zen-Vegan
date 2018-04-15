(function(GLOBAL, DOM) {

	'use strict';

	class item {
		constructor(id, type, name, price, description, source) {
			this.id = id;
			this.type = type;
			this.name = name;
			this.price = price;
			this.description = description;
			this.source = source;
		}
	}

	const menu = {
		activeMenu: "rolls",
		init: function() {
			this.cacheDOM();
			this.setEvents();
			this.fetchItems();
			// this.render();
		},
		cacheDOM: function() {
			// this.menuSelect = $(".menu-select select");
			this.rollsWrapper = $(".menus-wrapper .rolls-wrapper");
			this.bowlsWrapper = $(".menus-wrapper .bowls-wrapper");
			this.dessertsWrapper = $(".menus-wrapper .desserts-wrapper");
			this.drinksWrapper = $(".menus-wrapper .drinks-wrapper");

			this.menuOption0 = $(".menu-select .menu-0");
			this.menuOption1 = $(".menu-select .menu-1");
			this.menuOption2 = $(".menu-select .menu-2");
			this.menuOption3 = $(".menu-select .menu-3");
		},
		setEvents: function() {
			/*
			this.menuSelect.on("change", () => {
				this.switchMenu(this.menuSelect.val());
			});
			*/
			this.menuOption0.on("click", () => {
				this.switchMenu("rolls");
			});

			this.menuOption1.on("click", () => {
				this.switchMenu("bowls");
			});

			this.menuOption2.on("click", () => {
				this.switchMenu("desserts");
			});

			this.menuOption3.on("click", () => {
				this.switchMenu("drinks");
			});
		},
		unactifyMenus: function() {
			this.rollsWrapper.removeClass("active");
			this.bowlsWrapper.removeClass("active");
			this.dessertsWrapper.removeClass("active");
			this.drinksWrapper.removeClass("active");
			this.menuOption0.removeClass("active");
			this.menuOption1.removeClass("active");
			this.menuOption2.removeClass("active");
			this.menuOption3.removeClass("active");
		},
		addToCart: function(itemId) {
			
		},
		switchMenu: function(menuSelected) {
			switch (menuSelected) {
				case "rolls":
					this.unactifyMenus();
					this.activeMenu = "rolls";
					this.rollsWrapper.addClass("active");
					this.menuOption0.addClass("active");
					break;
				case "bowls":
					this.unactifyMenus();
					this.activeMenu = "bowls";
					this.bowlsWrapper.addClass("active");
					this.menuOption1.addClass("active");
					break;
				case "desserts":
					this.unactifyMenus();
					this.activeMenu = "desserts";
					this.dessertsWrapper.addClass("active");
					this.menuOption2.addClass("active");
					break;
				case "drinks":
					this.unactifyMenus();
					this.activeMenu = "drinks";
					this.drinksWrapper.addClass("active");
					this.menuOption3.addClass("active");
					break;
			}
		},
		fetchItems: function() {
			$.ajax({
				type: "POST",
				url: "assets/json/items.json",
				dataType: "json",
				success: (items) => {
					this.render(items);
				}
			})
		},
		render: function(items) {
			// Render Rolls
			var count = 0;
			for (var i = 0; i < items.length; i++) {
				if (items[i].type === "rolls") {
					$(".rolls-" + count + " .name").html(items[i].name);
					$(".rolls-" + count + " .price").html(items[i].price);
					$(".rolls-" + count + " .description").html(items[i].description);
					count++;
				}
			}

			// Render Bowls
			count = 0;
			for (var i = 0; i < items.length; i++) {
				if (items[i].type === "bowls") {
					$(".bowls-" + count + " .name").html(items[i].name);
					$(".bowls-" + count + " .price").html(items[i].price);
					$(".bowls-" + count + " .description").html(items[i].description);
					count++;
				}
			}

			// Render Desserts
			count = 0;
			for (var i = 0; i < items.length; i++) {
				if (items[i].type === "desserts") {
					$(".desserts-" + count + " .name").html(items[i].name);
					$(".desserts-" + count + " .price").html(items[i].price);
					$(".desserts-" + count + " .description").html(items[i].description);
					count++;
				}
			}

			// Render Drinks
			count = 0;
			for (var i = 0; i < items.length; i++) {
				if (items[i].type === "drinks") {
					$(".drinks-" + count + " .name").html(items[i].name);
					$(".drinks-" + count + " .price").html(items[i].price);
					$(".drinks-" + count + " .description").html(items[i].description);
					count++;
				}
			}

			// Render Offers
			count = 0;
			for (var i = 0; i < items.length; i++) {
				if (items[i].id === 0 || 
					items[i].id === 4 || 
					items[i].id === 6 ||
					items[i].id === 8 ||
					items[i].id === 10 ||
					items[i].id === 12 ||
					items[i].id === 18 ||
					items[i].id === 25) {
						$(".offer-" + count + " img").attr("src", items[i].source + "/0.png");
						$(".offer-" + count + " .offer-item-name").html(items[i].name);
						$(".offer-" + count + " .offer-price").html(items[i].price);
						$(".offer-" + count + " button").attr("onclick", "addToCart(" + items[i].id + ");");
						count++;
				}
			}
		}
	}

	const cart = {
		items: [],
		active: false,
		init: function() {
			this.cacheDOM();
			this.fireEvents();
			this.render();
		},
		cacheDOM: function() {
			this.cartButton = $(".shopping-cart-btn");
			this.cartIcon = $(".shopping-cart-btn span");
			this.itemCounter = $(".shopping-cart-btn div");
			this.closeBtn = $(".checkout button.close-btn");
			this.cartWrapper = $(".checkout");
			this.cartContent = $(".checkout .content");
		},
		fireEvents: function() {
			this.cartButton.on("click", () => {
				if (! this.active) {
					this.cartWrapper.addClass("active");
					this.cartButton.addClass("animated bounce");
					setTimeout(() => {
						this.cartButton.removeClass("animated bounce");
					}, 1000)
					this.active = true;
				}
			});

			this.cartWrapper.on("click", () => {
				if (this.active) {
					this.cartWrapper.removeClass("active");
					this.active = false;
				}
			});

			this.cartContent.on("click", (e) => {
				e.stopPropagation();
			});

			this.closeBtn.on("click", (e) => {
				if (this.active) {
					this.cartWrapper.removeClass("active");
					this.active = false;
				}
			});
		},
		render: function() {

		}
	}

	const app = {
		mobile: false,
		init: function() {
			menu.init();
			cart.init();
			this.cacheDOM();
			this.checkIfMobile();
		},
		cacheDOM: function() {
			this.section0 = $("#section-0");
			this.section1 = $("#section-1");
			this.section2 = $("#section-2");
			this.section3 = $("#section-3");
			this.section4 = $("#section-4");

			this.navigationMenu = $(".menu");
			this.navigationOffers = $(".offers");
			this.navigationFindUs = $(".find-us");
			this.navigationAbout = $(".order-now");

			// Backgrounds
			this.slideshow = $(".slideshow");
			this.background0 = $(".background-0");
			this.background1 = $(".background-1");
		},
		animateTitles: function() {
			$(".section-0-header div h1").addClass("animated fadeInRight");
		},
		onScroll: function() {
			this.actifyMenus();
			this.toggleUpScroller();
			this.toggleBackground();
		},
		unactifyMenus: function() {
			this.navigationMenu.removeClass("active");
			this.navigationOffers.removeClass("active");
			this.navigationFindUs.removeClass("active");
			this.navigationAbout.removeClass("active");
		},
		unactifyBackgrounds: function() {
			this.slideshow.removeClass("active");
			this.background0.removeClass("active");
			this.background1.removeClass("active");
		},
		actifyMenus: function () {
			// Active: Menu
			if (GLOBAL.pageYOffset >= this.section0.height() && 
				GLOBAL.pageYOffset <= (this.section1.height() + this.section0.height())) {
				this.navigationMenu.addClass("active");
			} else {
				this.navigationMenu.removeClass("active");
			}

			// Active: Offers
			if (GLOBAL.pageYOffset >= (90 + this.section0.height() + this.section1.height()) && GLOBAL.pageYOffset <= (90 + (this.section0.height() + this.section1.height() + this.section2.height()))) {
				this.navigationOffers.addClass("active");
			} else {
				this.navigationOffers.removeClass("active");
			}

			// Active: Find Us
			if (GLOBAL.pageYOffset >= (90 + this.section0.height() + this.section1.height() + this.section2.height()) && GLOBAL.pageYOffset <= (90 + (this.section0.height() + this.section1.height() + this.section2.height() + this.section3.height()))) {
				this.navigationFindUs.addClass("active");
			} else {
				this.navigationFindUs.removeClass("active");
			}

			// Active: About 
			if (GLOBAL.pageYOffset >= (90 + this.section0.height() + this.section1.height() + this.section2.height() + this.section3.height()) && GLOBAL.pageYOffset <= (90 + (this.section0.height() + this.section1.height() + this.section2.height() + this.section3.height() + this.section4.height()))) {
				this.navigationAbout.addClass("active");
			} else {
				this.navigationAbout.removeClass("active");
			}
		},
		toggleUpScroller: function() {

		},
		toggleBackground: function() {
			if (GLOBAL.pageYOffset < 1900) {
				if (! this.slideshow.hasClass("active")) {
					this.unactifyBackgrounds();
					this.slideshow.addClass("active");
				}
			}

			if (GLOBAL.pageYOffset >= 1900) {
				if (! this.background0.hasClass("active")) {
					this.unactifyBackgrounds();
					this.background0.addClass("active");
				}
			}

			if (GLOBAL.pageYOffset === ($(DOM).height() - GLOBAL.innerHeight)) {
				if (! this.background1.hasClass("active")) {
					this.unactifyBackgrounds();
					this.background1.addClass("active");
				}
			}
		},
		checkIfMobile: function() {
			if (/Mobi/.test(navigator.userAgent)) {
			    this.mobile = true;
			}
		}
	}

	GLOBAL.addToCart = menu.addToCart;

	GLOBAL.onload = function() {
		app.animateTitles();
	}

	GLOBAL.onscroll = function() {
		app.onScroll();
	}

	app.init();

}(window, document));