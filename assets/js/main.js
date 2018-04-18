(function(GLOBAL, DOM) {

	'use strict';

	class Item {
		constructor(id, type, name, price, description, source, quantity) {
			this.id = id;
			this.type = type;
			this.name = name;
			this.price = price;
			this.description = description;
			this.source = source;
			this.quantity = quantity;
			this.quantitySelector = false;
		}
		init() {
			// this.cacheDOM();
			// this.fireEvents();
		}
	}

	const menu = {
		activeMenu: "rolls",
		items: null,
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
					this.items = items;
					console.log(this.items);
					this.render(this.items);
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
		subtotal: 0,
		init: function() {
			this.cacheDOM();
			this.fireEvents();
			this.render();
		},
		cacheDOM: function() {
			this.cartButton = $(".shopping-cart-btn");
			this.cartIcon = $(".shopping-cart-btn span");
			this.itemCounterIcon = $(".shopping-cart-btn div.item-counter");
			this.cartNumItems = $(".checkout .num-items");
			this.closeBtn = $(".checkout button.close-btn");
			this.cartWrapper = $(".checkout");
			this.cartContent = $(".checkout .content");
			this.cartItemTemplate = $("#template").html();
			this.cartItemTemplateActiveQuantity = $("#template-active-quantity").html();

			this.cartSubtotal = $(".subtotal-amount");

			this.cartItemsReel = $(".checkout .cart-item-reel");
		},
		fireEvents: function() {
			this.cartButton.on("click", () => {
				if (! this.active) {
					this.cartWrapper.addClass("active");
					$("body, html").css("overflow-y", "hidden");
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
					$("body, html").css("overflow-y", "auto");
					this.disableQuantitySelect();
					this.active = false;
				}
			});

			this.cartContent.on("click", (e) => {
				e.stopPropagation();
			});

			this.closeBtn.on("click", (e) => {
				if (this.active) {
					this.cartWrapper.removeClass("active");
					$("body, html").css("overflow-y", "auto");
					this.disableQuantitySelect();
					this.active = false;
				}
			});
		},
		render: function() {
			this.renderItemCounter();
			this.renderCart();
			this.renderSubtotal();
		},
		renderItemCounter: function() {
			if (this.items.length > 0) {
				this.bounceCartButton();
			}

			var counter = 0;
			this.items.forEach((item) => {
				counter = counter + item.quantity;
			});

			this.itemCounterIcon.html(counter);
			this.cartNumItems.html(counter);
		},
		renderCart: function() {
			this.cartItemsReel.html("");
			if (this.items.length > 0) {
				for (var i = 0; i < this.items.length; i++) {
					if (this.items[i].quantitySelector) {
						this.cartItemsReel.append(this.cartItemTemplateActiveQuantity);
					} else {
						this.cartItemsReel.append(this.cartItemTemplate);
					}
					this.renderCartItem(this.items[i]);
				}
			}
		},
		renderCartItem: function(item) {
			// Render DOM Properties
			// Set ID
			$(".cart-item-reel .cart-item:last-child").attr("id", item.id);

			// Item Quantity
			$(".cart-item-reel .cart-item:last-child .cart-item-quantity span").html(item.quantity + "x");

			// Item Name
			$(".cart-item-reel .cart-item:last-child .cart-item-name span").html(item.name);

			// Item Price
			$(".cart-item-reel .cart-item:last-child .cart-item-price span").html("$" + (item.price * item.quantity).toFixed(2));

			// Delete function ID
			$(".cart-item-reel .cart-item:last-child .cart-item-delete-btn").attr("onclick", "deleteFromCart(" + item.id + ")");

			// Quantity Selector ID
			$(".cart-item-reel .cart-item:last-child .cart-item-quantity").attr("onclick", "openQuantitySelect(" + item.id + ");");

			// Decrease Quantity Button
			$(".cart-item-reel .cart-item:last-child .circle-0").attr("onclick", "decreaseItemQuantity(" + item.id + ", true);");

			// Increase Quantity Button
			$(".cart-item-reel .cart-item:last-child .circle-1").attr("onclick", "increaseItemQuantity(" + item.id + ", true);");

			// Initialize Item Object
			this.items[cart.items.length - 1].init();
		},
		renderSubtotal: function() {
			this.cartSubtotal.html("");

			var sum = 0;
			for (var i = 0; i < this.items.length; i++) {
				sum += (this.items[i].price * this.items[i].quantity);
			}

			this.subtotal = sum;

			// Render Subtotal DOM
			this.cartSubtotal.html("$" + this.subtotal.toFixed(2));
		},
		bounceCartButton: function() {
			this.cartButton.addClass("animated bounce");
			setTimeout(() => {
				this.cartButton.removeClass("animated bounce");
			}, 750)
		},
		isAlreadyInCart(itemId) {
			var isInCart = false;

			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i].id === itemId) {
					isInCart = true;
				}
			}

			return isInCart;
		},
		increaseQuantity: function(itemId) {
			cart.items.forEach((item) => {
				if (item.id === itemId) {
					item.quantity++;
				}
			});

			cart.render();
		},
		decreaseQuantity: function(itemId) {
			cart.items.forEach((item) => {
				if (item.id === itemId) {
					item.quantity--;
				}

				if (item.quantity === 0) {
					cart.deleteItem(item.id);
				}
			});

			cart.render();
		},
		addItem: function(itemId) {
			for (var i = 0; i < menu.items.length; i++) {
				if (itemId === menu.items[i].id) {
					if (cart.isAlreadyInCart(itemId)) {
						cart.increaseQuantity(itemId);
					} else {
						cart.items.push(new Item(menu.items[i].id, menu.items[i].type, menu.items[i].name, parseFloat(menu.items[i].price), menu.items[i].description, menu.items[i].source, 1));
					}
				}
			}

			cart.render();
		},
		deleteItem: function(itemId) {
			for (var i = 0; i < cart.items.length; i++) {
				if (itemId === cart.items[i].id) {
					cart.items.splice(i, 1);
				}
			}

			cart.render();
		},
		toggleQuantitySelect(itemId) {
			$(".cart-item-reel #" + itemId + " .cart-item-quantity-select").addClass("active");
			cart.items.forEach((item) => {
				if (item.id === itemId) {
					item.quantitySelector = true;
				}
			});
		},
		disableQuantitySelect() {
			$(".cart-item-reel .cart-item-quantity-select").removeClass("active");
			this.items.forEach((item) => {
				item.quantitySelector = false;
			});
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

	GLOBAL.addToCart = cart.addItem;
	GLOBAL.deleteFromCart = cart.deleteItem;
	GLOBAL.openQuantitySelect = cart.toggleQuantitySelect;
	GLOBAL.decreaseItemQuantity = cart.decreaseQuantity;
	GLOBAL.increaseItemQuantity = cart.increaseQuantity;

	GLOBAL.onload = function() {
		app.animateTitles();
	}

	GLOBAL.onscroll = function() {
		app.onScroll();
	}

	app.init();

}(window, document));