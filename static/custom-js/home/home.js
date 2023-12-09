// show_home_billing_location

function locationDetailsModal(data){
    var rowDiv = $("<div>").addClass('row-12')
    var colDiv = $("<div>")
    var button = $("<button>").attr('id','delete_location_button').addClass("btn btn-primary").css({'background':'#C92127','border-color':'#C92127'}).text("Delete Location")
    
    for(const[key,value] of Object.entries(data)){

        var locationDiv = colDiv.clone().addClass('col-8').append($("<p>").text(value.fields.name))
        var _hr= $("<hr>")
        var _br= $("<br>")
        rowDiv.append(locationDiv,_hr,_br)
    }
    return rowDiv
}

$("#show_home_billing_location").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation()
    var formData = $(this).serializeArray();
    const json_obj = convertSerializerArrToJson(formData, list_fiels_names = []);
    const submit_url = $(this).data("url");
    const submit_method = $(this).data("method");
    var { status, data } =sendRequest(submit_method, submit_url, json_obj);
    var data_in_html = locationDetailsModal(data);
    setGenericModal("Locations", data_in_html, true);

})