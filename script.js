
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
  var template = '<li><a id="menu_{category}" href="#">{category}</a></li>';
  var myHtml = '';
  $.each(categories, function(key, value){
    myHtml += template.replace(/{category}/g, value);
  });
  $('#menu').html(myHtml);
}

// function displayProducts(key){
//   var category = inventory[key];
//   var template = '<div>'+
//         '<img class="productimg" src="{imagePath}"> '+
//         '{name} '+
//         '${price} '+
//         '<input type="text" class="productqty" id="qty_{productid}" /> '+
//         '<button class="productbtn" id="{productid}">Add</button>'+
//     '</div>';
//   var myHtml = '';
//   $.each(category.products, function(key, value) {
//     var temp = template.replace(/{imagePath}/g, value.image);
//     temp = temp.replace(/{name}/g, value.name);
//     temp = temp.replace(/{price}/g, value.price.toFixed(2));
//     temp = temp.replace(/{productid}/g, key);
//     myHtml += temp;
//   });
//   var closex = '<div id="close-products" class="closex">X</div>';
//   $('#category-products').html(myHtml + closex);
//   $('#category-products').css("display","block");
//   $('#close-products').on("click", function() { $('#category-products').css("display","none");});
//   $('.productbtn').on("click", function() {
//     var qty = document.getElementById("qty_" + this.id);
//     var cart = getShoppingCart();
//     var qtyval = qty.value;
//     if (isNaN(qtyval)) {
//       alert('Please enter number');
//       qty.value = "";
//       qty.focus();
//     } else {
//       cart[this.id] = qtyval;
//       setShoppingCart(cart);
//     }
//     });
//   // if you take away the comments here you will get the full size image
//   // when you mouse over the image in the products list
//   // $('.productimg').on("mouseover", function() { this.style.width = 'auto'; });
//   // $('.productimg').on("mouseout", function() { this.style.width = '80px'; });
// }

function getShoppingCart() {
    var cart = window.localStorage.getItem('shoppingCart');
    if (cart != undefined) {
        return JSON.parse(cart);
    } else {
        var shoppingCart = [];
        return shoppingCart;
    }
}
function setShoppingCart(cart) {
    window.localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function displayShoppingCart() {
    var cart = getShoppingCart();
    var template = "<div>{key} {qty}</div>";
  var myHtml = '';
  $.each(cart, function(key, value) {
    var temp = template.replace(/{key}/g, key);
    temp = temp.replace(/{qty}/g, value);
    myHtml += temp;
    });

   $('#shoppingCart').html(myHtml);
}

function displayProduct(key){
  var template = '<li><img src="{imagePath}"/><h3>{name}<br/>${price}</h3><a href="#" onclick="addToShoppingCart()" class="button">Add to Cart</a></li>';

  var category = inventory[key];
  var myHtml = "<ul>";
  $.each(category.products, function(index, value){

  });
}

function displayProductsByCategory(category){
  //find product within inventory
  $.each(inventory, function(key, value){
    if (value.category == category)
    {
      displayProducts(key);
    }
  })
}

$(document).ready(function(){
  var requestedCategory = getURLParametersByKey('category');
  if (requestedCategory == null || requestedCategory == ''){
    //displayShoppingLinks();
  }
  else {
    displayProductsByCategory(requestedCategory);
  }
})









