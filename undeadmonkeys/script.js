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
        console.log('category: ' + category);
        categories.push(category);
    })
    return categories;
}

function displayShoppingLinks(){
	var template = '<li><a href="#"><img src="{imagePath}" /></a><h3><a href="#">Shop {category}</a></h3></li>';
	var myHtml = '';
	$.each(inventory, function(key, value){
		var temp = template.replace(/{category}/g, value.category);
		myHtml += temp.replace(/{imagePath}/g, value.top_level_image);
	});
	$('#shopping-links ul').html(myHtml);
}

function displayMenu(categories){
	var template = '<li><a id="menu_{category}" href="#">{category}</a></li>';
	var myHtml = '';
	$.each(categories, function(key, value){
		myHtml += template.replace(/{category}/g, value);
	});
	$('#menu').html(myHtml);
}

function displayProducts(products){
	var template = '<li><img src="{imagePath}"><h3>Shop {category}</h3></li>';
}

$(document).ready(function(){
	var categories = getCategories();
	displayMenu(categories);
	displayShoppingLinks();
	//getCategoriesAndProducts();
})
