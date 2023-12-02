
function CreateForm(BILLID,URL){
    var formdiv =$("<form>").attr({"data-url":URL,"data-method":"POST",'id':'create_airway_bill_location_form'})
    var hiddenInput = $("<input>").attr("type","hidden").attr("value",BILLID).attr('name','airway_bill_id').text(BILLID)
    var div = $("<div>")
    var outerDiv = div.clone().addClass("col-6")
    var innerDiv = div.clone().addClass("form-group")
    var label = $("<label>").attr("for","name").text("Enter Location")
    var TextArea = $("<textarea>").addClass("form-control").attr({"name":"name","row":1,"id":"create_id_bill_location","placeholder":"Enter Location","required":true})
    var Button = $("<button>").addClass("btn btn-primary mt-2").text("Create Location").css({"background": "#7a3a05", "border-color":"#7f3f0b","font-size":"large"})
    formdiv.append(hiddenInput,outerDiv.append(innerDiv.append(label,TextArea,div,Button)))
    return formdiv

     
}

$(document).on('click','#add_airway_bill_location_button' ,function(){
    const BILLID = $(this).attr('data-bill-id')
    const URL = $(this).attr('data-url') 
    const TrackingNumber = $(this).attr('data-tracking-number') 

    form = CreateForm(BILLID,URL)
    setGenericModal('Tracking Number : ' +   TrackingNumber, form, true);
    $('#create_airway_bill_location_form').validate()
})

$(document).on('submit', "#create_airway_bill_location_form", function () {
    var billingDetailsId = $(this).attr('data-get-detail-id')
    var billinDetailsUrl = $(this).attr('data-url')
    var formData = $(this).serializeArray();
    const json_obj = convertSerializerArrToJson(formData, list_fiels_names = []);
    var { status, data } = sendRequest("POST", billinDetailsUrl, json_obj);

    var data_in_html = get_detail_billing_html(data);
    setGenericModal("Success", data_in_html, true);
})

function locationDetailsModal(data){
    var rowDiv = $("<div>").addClass('row-12')
    var colDiv = $("<div>")
    var button = $("<button>").attr('id','delete_location_button').addClass("btn btn-primary").css({'background':'#C92127','border-color':'#C92127'}).text("Delete Location")
    
    for(const[key,value] of Object.entries(data)){

        var locationDiv = colDiv.clone().addClass('col-8').append($("<p>").text(value.name))
        var ButtonDiv = colDiv.clone().addClass('col-2').append(button.clone().attr("data-id",key).attr('data-url',value.data_url))
        var _hr= $("<hr>")
        var _br= $("<br>")
        rowDiv.append(locationDiv,ButtonDiv,_hr,_br)
    }
    return rowDiv
}

$(document).on('click', "#airway_bill_location_details_button", function () {
    var billingDetailsId = $(this).attr('data-bill-id')
    var billinDetailsUrl = $(this).attr('data-url')
    json_obj = {
        'airway_bill_id':billingDetailsId
    }
    var { status, data } = sendRequest("POST", billinDetailsUrl, json_obj);

    var data_in_html = locationDetailsModal(data);
    setGenericModal("Locations", data_in_html, true);
})


$(document).on('click', "#delete_location_button", function () {
    var obj_id = $(this).attr('data-id')
    var billinDeleteUrl = $(this).attr('data-url')
    const json_obj = {
        'airway_bill_id':obj_id
    }
    var { status, data } = sendRequest("POST", billinDeleteUrl, json_obj);

    // var data_in_html = locationDetailsModal(data);
    // setGenericModal("Locations", data_in_html, true);
})