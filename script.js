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

function displayMenu(categories){
	var template = '<li><a id="menu_{category}" href="#">{category}</a></li>';
	var myHtml = '';
	$.each(categories, function(key, value){
		myHtml += template.replace('{category}', value);
	});
	$('#menu').html(myHtml);
}

function displayProducts(products){
	var template = '<li><img src="{imagePath}"><h3>Shop {category}</h3></li>';
}

$(document).ready(function(){
	var categories = getCategories();
	displayMenu(categories);
	//getCategoriesAndProducts();
})
