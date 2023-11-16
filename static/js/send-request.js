function convertSerializerArrToJson(serialized_array, list_fiels_names = []) {
    var valid_json_format = {};
    list_fiels_names.forEach(element => {
        valid_json_format[element] = [];

    });

    serialized_array.forEach(function (obj, i) {
        if (valid_json_format[obj.name]) {
            if (!valid_json_format[obj.name].push) {
                valid_json_format[obj.name] = [valid_json_format[obj.name]];
            }
            valid_json_format[obj.name].push(obj.value || '');
        } else {
            valid_json_format[obj.name] = obj.value || '';
        }
    });
    return valid_json_format;
}

function handleSuccess(data) {
    const dec_data = data;
    if (dec_data.detail) {
        // toastr.success(dec_data.detail);
        const heading = "Success"
        setGenericModal(heading, dec_data.detail)
    }
    return dec_data;
}

function handleError(jqXhr) {
    const dec_data = jqXhr.responseJSON.data;
    if (jqXhr.status == 401 || jqXhr.status == 501) {
        window.location.replace(dec_data.redirect_url);
    }
    if (dec_data.detail) {
        const heading = "Error"
        toastr.error(dec_data.detail);
        setGenericModal(heading, dec_data.detail)
    }
    if (dec_data.errors) {
        place_errors(dec_data.errors, dec_data.errors_div)
    }
    return dec_data;
}

function remove_custom_error_classes() {
    // Quill editor reset 
    

    $("div.valid-feedback").text("");
    $("div.invalid-feedback").text("");
    $(".form-validated").removeClass("form-validated");
    $(".valid-feedback").removeClass("valid-feedback");
    $(".invalid-feedback").removeClass("invalid-feedback");
    $(".valid-radio").removeClass("valid-radio");
    $(".invalid-radio").removeClass("invalid-radio");
}

return_data=''
function sendRequest(method, url, data) {
    if (typeof method === "undefined" || typeof url === "undefined" || typeof data === "undefined") {
        return { status: false, data: "Invalid request parameters" };
    }
    let formData = JSON.stringify(data);
    $.ajax({
        type: method,
        url,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        async: false,
        headers: { "X-CSRFToken": global_csrf_token },
        success: function (data, status, xhr) {
            
            let dec_data = handleSuccess(data);
            return_data = { status: true, data: dec_data }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            let dec_data = handleError(jqXhr);
            return_data = { status: false, data: dec_data };
        },
    });
    return return_data
}