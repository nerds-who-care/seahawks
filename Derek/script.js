function getURLParameters() {
    if (location.search) {
        var parts = location.search.substring(1).split('&');
        var params = {};
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
        return params;
    }
}

function getURLParametersByKey(key) {
    var params = getURLParameters();
    if (params != undefined)
        return decodeURI(params[key]);
}

function ajaxGet(url, callback) {
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    dataType: 'jsonp',
    jsonp: callback
    });
}

function flickrSearch(searchTerm) {
  var url = "http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&tags=" + searchTerm;
  ajaxGet(url, "jsonFlickrFeed");
}

function jsonFlickrFeed(data) {
  var htmlBlob = "";

  console.log(data);

  $.each( data.items, function(key, value) {
    var image = value.media.m;
    var tag = value.tags;
    htmlBlob += '<img title="' + tag + '" src="' + image + '"/>';
  });

  $("#fans").html(htmlBlob);
}

function getCategoriesAndProducts(){
    $.each(inventory, function(key, value){
        var category = value.category;
        var products = value.products;
        console.log('category: ' + category);
        $.each(products, function(key, product){
        	var name = product.name;
        	var price = product.price;
        	var image = product.image;
        	console.log('-- name: ' + name);
        	console.log('-- price: ' + price);
        	console.log('-- image: ' + image);
    });
  });
}

function getCategories(){
	var categories = [];
    $.each(inventory, function(key, value){
        var category = value.category;
        var products = value.products;
        categories.push(category);
  });
    return categories;
}

function displayShoppingLinks(){
    var template = '<li><a href="javascript:displayProducts({key});"><img src="{image_path}" /></a><h3><a href="index.html?category={category}">Shop {category}</a></h3></li>';
    var myHtml = '<ul>';
    $.each(inventory, function(key, value){
        var category = value.category;
        var image_path = value.top_level_image;
        var product_list = value.products;
        var temp = template.replace(/{category}/g, category);
        temp = temp.replace(/{image_path}/g, image_path);
        temp = temp.replace(/{key}/g, key);
        myHtml += temp;
    });
    myHtml += "</ul>";
    $('#shopping-links').html(myHtml);
}

function displayMenu(categories){
	var template = '<li><a id="menu_{category}" href="index.html?category={category}">{category}</a></li>';
	var myHtml = '';
	$.each(categories, function(key, value){
		var temp = template.replace(/{category}/g, value);
        temp = temp.replace(/{key}/g, key);
        myHtml += temp;
	});
	$('#menu').html(myHtml);
}

// function displayProducts(key){
//     var category = inventory[key];
// 	var template = '<div><img class="productimg" src="{imagePath}">{name} ${price}</div>';
//     var myHtml = '';
//     $.each(category.products, function(key, value) {
//         var temp = template.replace(/{imagePath}/g, value.image);
//         temp = temp.replace(/{name}/g, value.name);
//         temp = temp.replace(/{price}/g, value.price.toFixed(2));
//         myHtml += temp;
//     });
//     var closex = '<div id="close-products" class="closex">X</div>';
//     $('#category-products').html(myHtml + closex);
//     $('#category-products').css("display","block");
//     $('#close-products').on("click", function() { $('#category-products').css("display","none");});
//     // if you take away the comments here you will get the full size image
//     // when you mouse over the image in the products list
//     // $('.productimg').on("mouseover", function() { this.style.width = 'auto'; });
//     // $('.productimg').on("mouseout", function() { this.style.width = '80px'; });
// }

function displayProductsByCategory(category){
    $.each(inventory, function(key, value){
        if (value.category == category){
            displayProducts(key);
        }
    })
}

function displayProducts(key){
    console.log('displayProducts: ' + key);

    var template = '<li><img src="{imagePath}"/><h3>{name}<br/>{price}</h3><a href="javascript:addToShoppingCart(\'{name}\',\'{category}\',\'{category_key}\',1);" class="button">Add To Cart</a></li>';
    //grab product node that matches key
    var category = inventory[key];
    var myHtml = "<ul>";
    $.each(category.products, function(id, value) {
        var temp = template.replace(/{imagePath}/g, value.image);
        temp = temp.replace(/{category}/g, category.category);
        temp = temp.replace(/{category_key}/g, key);
        temp = temp.replace(/{name}/g, value.name);
        temp = temp.replace(/{price}/g, value.price.toFixed(2));
        myHtml += temp;
    });
    myHtml += "</ul>";

    $('#shopping-links').html(myHtml);
    return false;
}

function getProduct(targetCategory, targetName){
    var category = inventory[targetCategory];
    var returnValue = null;
    $.each(category.products, function(key, product){
        if (returnValue == null && product.name == targetName){
            returnValue = product;
        }
    })
    return returnValue;
}

function getShoppingCart(){
    var cart = localStorage.getItem('shoppingCart');
    if (cart != undefined){
        return JSON.parse(cart);
    }
    else {
        var shoppingCart = [];
        setShoppingCart(shoppingCart);
        return [];
    }
}

function setShoppingCart(cart){
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function displayShoppingCart(){
    var template = '<li><img alt="{category} {name}" src="{image_path}"/><div class="shopping-cart-details"><h3>{name} in {category}</h3><a href="#" class="button" onclick="shoppingCartRemove("{category}", "{name}">Remove</a></div><p class="price">${price}</p><select><option>1</option><option>2</option></select></li>';
    var shoppingCart = getShoppingCart();
    var myHtml = '';
    $.each(shoppingCart, function(data, value){
        var temp = template.replace(/{image_path}/g, value.image);
        temp = temp.replace(/{category}/g, value.category);
        temp = temp.replace(/{name}/g, value.name);
        temp = temp.replace(/{price}/g, value.price.toFixed(2));
        myHtml += temp;
    })

    $('#shopping-cart-list').html(myHtml);
}

function addToShoppingCart(item, category, categoryKey, quantity){
    //get shopping cart from localstorage
    var shoppingCart = getShoppingCart();

    var product = getProduct(categoryKey, item);

    //TODO: Remove any item.name's from the cart that exist
    //Then add them:
    var shoppingCartItem = {
        "category": category,
        "categoryKey": categoryKey,
        "name": item,
        "price": product.price,
        "quantity": quantity,
        "image": product.image
    }
    //add to shopping cart
    shoppingCart.push(shoppingCartItem);

    //save shopping cart to localStorage
    setShoppingCart(shoppingCart);

    //remove item quantity from inventory

}

function shoppingCartRemove(category, name){
    console.log('removing category:' + category + ' and item: ' + name);
}

$(document).ready(function(){
    var categories = getCategories();
    displayMenu(categories);
    flickrSearch('seahawks fans');
    var requestedCategory = getURLParametersByKey('category');
    if (requestedCategory == null || requestedCategory == '') {
       displayShoppingLinks();
    } else {
        displayProductsByCategory(requestedCategory);
    }
});








