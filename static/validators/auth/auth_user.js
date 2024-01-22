$("#login_user").validate({
    rules: {
        
        username: {
            minlength:3,
            maxlength: 25,
            regex:USERNAME_REGEX,
            required:true,
        
        },
        
        password: {
            required:true,
            regex:PASSWORD_REGEX
        }
    },
    messages: {
        
        username: {
            minlength:"Username name should be of atleast 3 characters",
            maxlength: "max_length is 25 , REACHED",
            regex: "Invalid Format, only these special characters @ # . _ - and A-Z a-z 0-9 are allowed",
            checkusername: "Username already exists"
            
        },
        
        password :{
            required: "This field is required",
            regex: "Please write a valid password"
        }      
        



    },
    errorPlacement: function(error, element) { 
        element.parents("form").addClass("form-validated");
        element.siblings("div").addClass($(error).attr("class")).text($(error).text());
        
    },
    success: function(success, element) {
        $(element).siblings("div").attr("class", ""); 
        $(element).siblings("div").addClass("valid-feedback");
    },
    unhighlight: function(element, unhighlight_class) {
        $(element).siblings("div").removeClass(unhighlight_class);
        $(element).removeClass(unhighlight_class);
        $(element).siblings("div").addClass("valid-feedback");
        $(element).addClass("valid-feedback");
    },
    errorClass: "invalid-feedback",
    validClass: "valid-feedback",
})