
function doclick(e) {
    alert(e.srcElement.id);
}

// function doload() {
//    var obj = document.getElementById('menu_mens');
//    if (obj) {
//         obj.addEventListener('click', doclick);
        
//         while (obj) {
//             obj = obj.parentNode.nextSibling;
//             if (obj) {
//                 if (!obj.id) obj = obj.nextSibling;
//                 if (obj) {
//                     obj = obj.firstChild;
//                     if (!obj.id) obj = obj.nextSibling;
//                     obj.addEventListener('click', doclick);
//                 }                
//             }
//         }
        
//    }
// }


// window.addEventListener('load', doload);

$(document).ready(function(){
    $('#shopping-cart').hide();

    var siblings = $('#menu_mens').siblings();
})
