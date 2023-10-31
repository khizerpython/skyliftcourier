$("#login_user").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation()
    console.log("clicked");
    if ($("#login_user").valid()) {
        console.log("gg");
        var $form = $(this);
        var formData = $(this).serializeArray();
        const json_obj = convertSerializerArrToJson(formData, list_fiels_names = []);
        const submit_url = $(this).data("url");
        const submit_method = $(this).data("method");
        console.log(formData, json_obj, submit_url, submit_method);
        
        var { status, data } =sendRequest(submit_method, submit_url, json_obj);
        
        if (status) {
            remove_custom_error_classes();
           console.log("the data is :", data);
           console.log("the redirect is :", data.Redirect);
           location.replace(data.Redirect);
        //    window.location.reload(data.redirect)


            
            $("#login_user")[0].reset();
            console.log("2e#@#@R#$");
           
        }
        // return false;

    }

})