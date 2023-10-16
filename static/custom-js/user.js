remove_custom_error_classes();


$("#create_authuser_form_id").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation()
    console.log("clicked");
    if ($("#create_authuser_form_id").valid()) {
        console.log("gg");
        var $form = $(this);
        var formData = $(this).serializeArray();
        const json_obj = convertSerializerArrToJson(formData, list_fiels_names = []);
        const submit_url = $(this).data("url");
        const submit_method = $(this).data("method");
        
        var { status, data } =sendRequest(submit_method, submit_url, json_obj);
        
        if (status) {
            remove_custom_error_classes();
           


            
            $("#create_authuser_form_id")[0].reset();
            console.log("2e#@#@R#$");
           
        }
        return false;

    }

})