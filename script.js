
function doclick(e) {
    alert(e.srcElement.id);
}

function test()
{
	$('#firstName').val('spongebob');
}

$(document).ready(function(){

	
	

	$('#submit').click(function(){
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var address = $('#address').val();
		var bop_it_choice = $('#bop_it_select option:selected').val();
		var save_my_data = $('#saveData').prop('checked');
		console.log(bop_it_choice);
		console.log(save_my_data);

		var sendData = {
			"fName" : firstName,
			"lName" : lastName,
			"addr" : address,
			"bChoice" : bop_it_choice,
			"sData" : save_my_data
		}

		//TODO: Validate this stuff!

		$.ajax({
			url: "someUrl.aspx",
			data: sendData,
			type: 'POST',
			success: function(data) {
				alert('sweet success!');
			},
			error: function() {
				alert('epic fail!');
			}
		})

		//some other code
	})
})
























