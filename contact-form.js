(function ( $ ) {
  $.fn.initializeContactForm = function() {
    return this.each(function(){
      var $form = $(this),
          $nameField = $form.find('input[name=name]'),
          $emailField = $form.find('input[name=email]'),
          $messageField = $form.find('textarea[name=message]');

      $form.on('submit', function(){
        var valid = validateFields();
        $form.find('.form-errors').remove();
        if (!valid) {
          $form.prepend('<div class="form-errors">Form fields are not valid!</div>');
        } else {
          alert("Submitted!");
          return false;
        }
        return valid;
      });

      function validateFields(){
        var emailVal = $emailField.val();
        return $nameField.val().length > 0 &&
                  $messageField.val().length > 0 &&
                    emailVal.length > 0 && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailVal)
      }
    });
  };
}( jQuery ));

$(function(){
  $('#contact-form').initializeContactForm();
});




