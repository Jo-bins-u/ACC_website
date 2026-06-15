$(document).ready(function() {

  // Form validation with jQuery Validate plugin
  $("#submit-form").validate({ 
    rules: {
      Name: {
        required: true
      },
      MailId: {
        required: true,
        email: true,
        domain: true // custom domain validation
      },
      Message: {
        required: true
      }
    },
    messages: {
      Name: {
        required: "Please enter your fullname"
      },
      MailId: {
        required: "Please enter your Christ University email",
        email: "Please enter a valid email address",
        domain: "Please enter a valid Christ University email"
      },
      Message: {
        required: "Please enter your message"
      }
    },
    highlight: function(element, errorClass, validClass) {
      $(element).css({
        "color": "#ff5252",
        "border-color": "#ff5252"
      });
      // Highlight the corresponding text in the label icon block
      $(element).prev('.cui').find('.cus').css('color', '#ff5252');
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).css({
        "color": "var(--text-primary)",
        "border-color": "var(--glass-border)"
      });
      // Reset color of the label icon block
      $(element).prev('.cui').find('.cus').css('color', 'var(--text-primary)');
    }
  });

  // Custom domain validation:
  $.validator.addMethod("domain", function(value, element) {
    return this.optional(element) || /^[\w-]+(\.[\w-]+)*@(.*\.)?(christuniversity\.in)$/.test(value);
  }, "*");

  // Handle contact link click with appropriate mailto URL based on platform
  $('#contact-link').click(function(event) {
    event.preventDefault(); // Prevent default link behavior

    if (/android/i.test(navigator.userAgent)) {
      window.location.href = "mailto:acc.kengeri@christuniversity.in"; // Use mailto for Android
    } else {
      window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=acc.kengeri@christuniversity.in"; // Open Gmail web app for others
    }
  });
});

// For sending the data from the website
$("#submit-form").submit(function(e){
  e.preventDefault();
  
  // Check if the form is valid
  if($(this).valid()){ 
    alert("Submitting, please wait!");
    $.ajax({
      url:"https://script.google.com/macros/s/AKfycbzQLkUQd4OR0DZaLzuEe0B-wYF7skYpzfELuaSbbuab2zkZSaJIV60RpuNDrcSJVSpCrg/exec",
      data:$(this).serialize(),
      method:"post",
      success:function (response){
        window.location.href = "success.html"; // Redirect to local success.html
      },
      error:function (err){
        alert("Something Error")
      }
    });
  }
});