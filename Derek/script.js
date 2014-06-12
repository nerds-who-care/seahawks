function jsonFlickrFeed(data)
{
    var htmlBlob = "";

    $.each( data.items, function (index, value) {
        var image = value.media.m;
        var tag = value.tags;
        //console.log('image: ' + image);
        //console.log('tag: ' + tag);
        htmlBlob += '<img title="' + tag + '"src="' + image + '"/>';
    });
    
    $('#fans').html(htmlBlob);
}

function ajaxGet(url)
{
    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        dataType: 'jsonp',
        jsonp: 'jsonFlickrFeed',
    });
}

function flickrSearch(searchTerm)
{
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&tags=" + searchTerm;
    ajaxGet(url);
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
        })
    })
}

function getCategories(){
	var categories = [];
    $.each(inventory, function(key, value){
        var category = value.category;
        var products = value.products;
        //console.log('category: ' + category);
        categories.push(category);
    })
    return categories;
}

function displayShoppingLinks(){
    var template = '<li><a href="javascript:displayProducts({key});"><img src="{image_path}" /></a><h3><a href="javascript:displayProducts({key});">Shop {category}</a></h3></li>';
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
	var template = '<li><a id="menu_{category}" href="#">{category}</a></li>';
	var myHtml = '';
	$.each(categories, function(key, value){
		myHtml += template.replace(/{category}/g, value);
	});
	$('#menu').html(myHtml);
}

function displayProducts(key){
    var category = inventory[key];
	var template = '<div><img class="productimg" src="{imagePath}">{name} ${price}</div>';
    var myHtml = '';
    $.each(category.products, function(key, value) {
        var temp = template.replace(/{imagePath}/g, value.image);
        temp = temp.replace(/{name}/g, value.name);
        temp = temp.replace(/{price}/g, value.price.toFixed(2));
        myHtml += temp;
    });
    var closex = '<div id="close-products" class="closex">X</div>';
    $('#category-products').html(myHtml + closex);
    $('#category-products').css("display","block");
    $('#close-products').on("click", function() { $('#category-products').css("display","none");});
    // if you take away the comments here you will get the full size image 
    // when you mouse over the image in the products list
    // $('.productimg').on("mouseover", function() { this.style.width = 'auto'; });
    // $('.productimg').on("mouseout", function() { this.style.width = '80px'; });
}

function displayProductsDrillIn(key){
    //Let's modify or re-write displayProducts to fit with the following features.
    //IMHO: I think it needs to be populated like this:  $('#shopping-links').html(myHtml);

    //grab product node that matches key

    //iterate through each item within the targeted product node
    //generate HTML for the following:
        //product title
        //image
        //controlls for how many are left in inventory
        //button to add number selected to shopping cart

}

function getProduct(targetCategory, targetName){
    //TODO: This loop doesn't exit properly when it finds the product.
    $.each(inventory, function(key, value){
        var category = value.category;
        var products = value.products;
        if (category == targetCategory)
        {
            $.each(value.products, function(key, product){
                if (product.name == targetName){
                    var name = product.name;
                    return product;
                }
            })
        }
    })
    //error, we didn't find product!
}

function getShoppingCart(){
    var jsonCart = JSON.parse(localStorage.getItem('shoppingCart'));
    return jsonCart;
}

function setShoppingCart(cart){
    //commit the shopping cart to HTML 5's localStorage 
    //was done with cookies in the old days
    //localStorage cannot hold anything other than strings.  So we have to stringify
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function initShoppingCart() {
    //create empty shopping cart object
    var shoppingCart = [];

    //shoppingCart.push({'product': 'hat'});

    setShoppingCart(shoppingCart);

    //commit the shopping cart to HTML 5's localStorage 
    //was done with cookies in the old days
    //localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

function addToShoppingCart(item){
    //get shopping cart from localstorage
    var shoppingCart = getShoppingCart();

    //add to shopping cart
    shoppingCart.push(item);

    //save shopping cart to localStorage
    setShoppingCart(shoppingCart);

    //remove item quantity from inventory

}




$(document).ready(function(){
    initShoppingCart();
	var categories = getCategories();
	displayMenu(categories);
    displayShoppingLinks();
	flickrSearch('seahawks fans');

    //var product = {'product': 'hat'};
    var product = getProduct('Mens', 'sports jersey');
    addToShoppingCart(product);

    var shoppingCart = getShoppingCart();
    console.log(shoppingCart[0].product);

    // localStorage.setItem('s', 'blah2');
    // var item = localStorage.getItem('s');
    // console.log(item);
})








