function getCategoriesAndProducts(){
	$.each(inventory, function(key, value){
		var category = value.category;
		var product = value.product;
		console.log('category:' +category);
		$.each(product, function(key, product){
			var name = product.name;
			var price = product.price;
			var image = product.image;
			console.log('--name:' + name);
			console.log('--price:' + price);
			console.log('--image:' + image);
		});
		//console.log('products:' +product);
	});
}

function getCategories(){
	var categories = [];
	$.each(inventory, function(key, value){
		var category = value.category;
		console.log('category:' +category);
		categories.push(category);
	});
	return categories;
}

function displayMenu(categories){
	var template = '<li><a id="menu_{category}" href="#">{category}</a></li>';
	var myHtml = '';
	$.each(categories, function(key, value){
		myHtml += template.replace('{category}', value);
	});
	$("#menu").html(myHtml);

}

function displayProducts(products){
	var template = '<li><img src="{imagePath}/><h3>shop {category}</h3></li>"'
}

$(document).ready(function(){
	var categories = getCategories();
	displayMenu(categories);
	//getCategoriesAndProducts();
});




// function doclick (e) {
// 	alert(e.srcElement.id);
// }

// function test(){
// 	$("#firstName").val("spongebob");
// }

// $(document).ready(function(){

// 	//test();

// 	$("#submit").click(function(){
// 		var firstName = $("#firstName").val();
// 		var lastName = $("#lastName").val();
// 		var address = $("#address").val();
// 		var city = $("#city").val();
// 		var bop_it_choice = $("#bop_it_select option:selected").val();
// 		var save_my_data = $("#saveData").prop("checked");
// 		console.log(bop_it_choice);
// 		console.log(save_my_data);

// 		var sendData = {
// 			"fName": firstName,
// 			"lName": lastName,
// 			"addr":address,
// 			"city":city,
// 			"bChoice":bop_it_choice,
// 			"sData":save_my_data
// 		}

// 		//TODO: Validate this stuff!

// 		$.ajax({
// 			url:"someUrl.aspx",
// 			data: sendData,
// 			type:'POST',
// 			success:function(data){
// 				alert("sweet success!");
// 			},
// 			error:function(){
// 				alert('epic fail!');
// 			}
// 		});
// 	});
// 	// $("#shopping-cart").hide();
// 	// $("#menu_mens").siblings().click(function(){
// 	// 	var siblings = $("#menu_mens").siblings();
// 	// });
	
// });
