$("#create_authuser_form_id").on("submit",async function (e) {
    e.preventDefault();
    e.stopPropagation()
    console.log("clicked");
    // if ($("#create_authuser_form_id").valid()) {
    //     const button = hideSubmitButton($(this).attr("id"));
    //     var formData = $(this).serializeArray();
    //     const json_obj = convertSerializerArrToJson(formData, list_fiels_names = ["deparment_id"]);
    //     const submit_url = $(this).data("url");
    //     const submit_method = $(this).data("method");
    //     var { status, data } =await sendRequestPromise(submit_method, submit_url, json_obj);
        
    //     if (status) {
    //         remove_custom_error_classes();
    //         $(this).find("select[name=deparment_id]").attr("multiple",false)
    //         $(this).find("select[name=department_id] option:first").prop("selected", true);
    //         $(this).find("#department_label").removeAttr("style");
    //         $("#create_authuser_form_id").trigger("reset");
    //         refresh_datatable("authuser_datatable_id", {});
    //     }
    //     showSubmitButton(button);
    //     return false;

    // }

})