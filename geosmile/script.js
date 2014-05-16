function doclick(e){
	alert(e.srcElement.id);
}

function doload(){
	alert("doload");
	var obj = document.getElementById('mens');
	if (obj) {
		obj.addEventListener('click',doclick);

		while (obj) {
			obj = obj.parentNode.nextSibling;
			if (obj) {
				if (!obj.id) obj = obj.nextSibling;
				if (obj) {
					obj = obj.firstChild;
					if (!obj.id) obj = obj.nextSibling;
					obj.addEventListener('click', doclick);

				}
			}
		}
	}
}

window.addEventListener('load', doload);

$(document). ready(function(){
		$('#Shopping-cart').hide();

		var siblings= $('#menu_mens').on('click', doclick);
	})
