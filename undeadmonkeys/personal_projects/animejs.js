//function that hides things
function hiding(){
	var $toHide1 = $('input[name=searchBar]').val().toLowerCase();

	$(".center-area li:not(:contains('"+ $toHide1 +"'))").hide();
	$(".center-area li:contains('"+ $toHide1 +"')").show();

	$(".center-area div").each(function(){
		var $element1 = "."+$(this).prop("class");
		$($element1+" ul").each(function(){
			var $element1 = "#section-"+$(this).prop("id").charAt(5);
			if ($(this).children().is(":visible")){
				$($element1).show();
			}
			else {
				$($element1).hide();
			};
		});
		
	});
};
function scroll2(button){
	if ($("#section-"+button.prop("id").charAt(9)).is(":visible")) {
		var lPosition = $("#section-"+button.prop("id").charAt(9)).offset();
		$('html, body, .page-content, .center-area').animate({scrollTop: lPosition.top}, "slow");
	};
};
function populatePage(){
	var headings = '<h1 id="section-{section}">{section}</h1>';
	var uList = '<ul id="list-{section}">';
	var listItems = '<li>{name}</li>';
	var myHtml = '';
	$.each(anime, function(key, value){
		if(key==0){
			myHtml+='<div class="center-area-left">'
		}
		else if (key==13){
			myHtml+='</div>'
			myHtml+='<div class="center-area-right">'
		}
		// headings
		myHtml += headings.replace(/{section}/g,value.section);
		//list items
		myHtml += uList.replace(/{section}/g,value.section);
		$.each(anime[key].list, function(key2, value2){
			myHtml += listItems.replace(/{name}/g,value2.anime);
		});
		myHtml += '</ul>';
	});
	myHtml+='</div>'
	$('.center-area').html(myHtml);
};
$(document).ready(function(){
	populatePage();
	// click letter buttons on the top
	$(".links h3").click(function(){
		scroll2($(this));
	});
	//click search button
	$('button').click(function(){
		hiding();
	});
	//hit enter key in search bar
	$("input[name=searchBar]").keyup(function(key){
		if ($("input[name=searchBar]:focus") && (key.keyCode === 13)){
			hiding();
		};
	});
});
