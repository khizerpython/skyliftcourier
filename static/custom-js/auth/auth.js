$("#login_user").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation()
    if ($("#login_user").valid()) {
        var $form = $(this);
        var formData = $(this).serializeArray();
        const json_obj = convertSerializerArrToJson(formData, list_fiels_names = []);
        const submit_url = $(this).data("url");
        const submit_method = $(this).data("method");
        
        var { status, data } =sendRequest(submit_method, submit_url, json_obj);
        
        if (status) {
            remove_custom_error_classes();
           location.replace(data.Redirect);    
            $("#login_user")[0].reset();
           
        }
        // return false;

    }

})