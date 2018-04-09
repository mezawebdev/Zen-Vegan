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
			this.menuSelect = $(".menu-select select");
			this.rollsWrapper = $(".menus-wrapper .rolls-wrapper");
			this.bowlsWrapper = $(".menus-wrapper .bowls-wrapper");
			this.dessertsWrapper = $(".menus-wrapper .desserts-wrapper");
			this.drinksWrapper = $(".menus-wrapper .drinks-wrapper");
		},
		setEvents: function() {
			this.menuSelect.on("change", () => {
				this.switchMenu(this.menuSelect.val());
			});
		},
		unactifyMenus: function() {
			this.rollsWrapper.removeClass("active");
			this.bowlsWrapper.removeClass("active");
			this.dessertsWrapper.removeClass("active");
			this.drinksWrapper.removeClass("active");
		},
		addToCart: function(itemId) {
			
		},
		switchMenu: function(menuSelected) {
			switch (menuSelected) {
				case "rolls":
					this.unactifyMenus();
					this.activeMenu = "rolls";
					this.rollsWrapper.addClass("active");
					break;
				case "bowls":
					this.unactifyMenus();
					this.activeMenu = "bowls";
					this.bowlsWrapper.addClass("active");
					break;
				case "desserts":
					this.unactifyMenus();
					this.activeMenu = "desserts";
					this.dessertsWrapper.addClass("active");
					break;
				case "drinks":
					this.unactifyMenus();
					this.activeMenu = "drinks";
					this.drinksWrapper.addClass("active");
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
		expanded: false,
		init: function() {
			this.cacheDOM();
			this.fireEvents();
			this.render();
		},
		cacheDOM: function() {
			this.cartElement = $(".shopping-cart");
			this.cartIcon = $(".shopping-cart span");
			this.itemCounter = $(".shopping-cart div");
			this.closeBtn = $(".shopping-cart .wrapper button.close-btn");
		},
		fireEvents: function() {
			this.cartElement.on("click", () => {
				if (! this.expanded) {
					this.cartElement.addClass("expanded");
					this.expanded = true;
				}
			});

			this.closeBtn.on("click", (e) => {
				if (this.expanded) {
					e.stopPropagation();
					this.cartElement.removeClass("expanded");
					this.expanded = false;
				}
			});
		},
		render: function() {

		}
	}

	const app = {
		init: function() {
			menu.init();
			cart.init();
		},
		animateTitles: function() {
			$(".section-0-header div h1").addClass("animated fadeInRight");
		}
	}

	GLOBAL.addToCart = menu.addToCart;

	GLOBAL.onload = function() {
		app.animateTitles();
	}

	app.init();

}(window, document));