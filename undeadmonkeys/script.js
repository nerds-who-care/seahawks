function ajaxGet(url, callback){
    $.ajax({
        type:'GET',
        url: url,
        contentType: 'application/json',
        dataType:'jsonp',
        jsonp: callback
    });
}
function flickrSearch(searchTerm){
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&tags=" + searchTerm;
    ajaxGet(url, 'jsonFlickrFeed');
}

function jsonFlickrFeed(data){
    var htmlBlob = '';

    $.each(data.items, function(key,value){
        var image = value.media.m;
        var tag = value.tags;
        console.log(image);
        htmlBlob += '<img title="'+tag+'" src="'+image+'"/>';
    })
    $('#fans').html(htmlBlob);
    // console.log(image);
    // console.log(data);
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
        console.log('category: ' + category);
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

$(document).ready(function(){
    var categories = getCategories();
    displayMenu(categories);
    displayShoppingLinks();
    flickrSearch('seahawks fans');
    //getCategoriesAndProducts();
})








