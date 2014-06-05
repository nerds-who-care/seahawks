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
$(document).ready(function(){
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
