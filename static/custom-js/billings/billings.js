$(document).ready(function () {
    // Your code here
    let table = new DataTable('#airway_bill_datatable_id');
})

function createMinusIcon(_class, _delete) {
    var col_div = $('<div>')
    var col1 = col_div.clone().addClass(_class)
    var innerDiv = col_div.clone().addClass('mt-4 text-center')
    var ITag = $("<i>").addClass('"bi bi-dash-circle-fill').attr('data-delete-id', _delete).css('font-size', '35px')
    finalDiv = col1.append(innerDiv.append(ITag))
    return finalDiv
}

function createInputRow(_id, _name, _type, _placeholder, _class, _title, _delete) {
    var col_div = $('<div>')
    var col1 = col_div.clone().addClass(_class).attr('data-delete-id', _delete)
    var innerDiv = col_div.clone().addClass('form-group')
    var label = $("<label>").attr('for', _id).text(_title)
    var InputField = $("<input>").attr({ 'name': _name, 'type': _type, 'class': 'form-control', 'id': _id, 'placeholder': _placeholder })
    finalDiv = col1.append(innerDiv.append(label, InputField))
    return finalDiv
}

$(document).on('click', '.bi-plus-circle-fill', function () {
    var dataInvoiceDetails = $(this).attr('data-invoice-details')
    if (dataInvoiceDetails == 'true') {
        var invoiceLength = $(this).closest('form').find("input#create_id_hs_title").length
        if (invoiceLength < 15) {
            var row1 = createInputRow(_id = 'create_id_hs_title', _name = 'hs_title', _type = 'text', _placeholder = 'Enter HS title', _class = 'col-3 ', _title = 'HS Title', _delete = 'invoicedetail' + invoiceLength)
            var row2 = createInputRow(_id = 'create_id_quantity', _name = 'quantity', _type = 'number', _placeholder = 'Enter Quantity', _class = 'col-3', _title = 'Quantity', _delete = 'invoicedetail' + invoiceLength)
            var row3 = createInputRow(_id = 'create_id_price', _name = 'price', _type = 'number', _placeholder = 'Enter Price', _class = 'col-2', _title = 'Price', _delete = 'invoicedetail' + invoiceLength)
            var row4 = createInputRow(_id = 'create_id_total', _name = 'total', _type = 'number', _placeholder = 'Enter Total', _class = 'col-2', _title = 'Total', _delete = 'invoicedetail' + invoiceLength)
            var MinusIcon = createMinusIcon(_class = 'col-1', _delete = 'invoicedetail' + invoiceLength)
            $(this).closest('.row').append(row1, row2, row3, row4, MinusIcon)
        }

    } else if (dataInvoiceDetails == 'false') {
        var dimentionLength = $(this).closest('form').find("input#create_id_length").length
        if (dimentionLength < 5) {
            var row1 = createInputRow(_id = 'create_id_length', _name = 'length', _type = 'number', _placeholder = 'Enter length', _class = 'col-3', _title = 'Length', _delete = 'dimension' + dimentionLength)
            var row2 = createInputRow(_id = 'create_id_width', _name = 'width', _type = 'number', _placeholder = 'Enter width', _class = 'col-3', _title = 'Width', _delete = 'dimension' + dimentionLength)
            var row3 = createInputRow(_id = 'create_id_height', _name = 'height', _type = 'number', _placeholder = 'Enter height', _class = 'col-3', _title = 'Height', _delete = 'dimension' + dimentionLength)
            var MinusIcon = createMinusIcon(_class = 'col-1', _delete = 'dimension' + dimentionLength)
            $(this).closest('.row').append(row1, row2, row3, row4, MinusIcon)
        }
    } else {
        $.noop
    }
})

$(document).on('click', '.bi-dash-circle-fill', function () {
    var deleteDivID = $(this).attr('data-delete-id')
    var form = $(this).closest('form');
    var divsWithSameDeleteID = form.find('div[data-delete-id="' + deleteDivID + '"]');
    $(this).parent().parent().remove()
    divsWithSameDeleteID.remove()
})

function transformObj(json_obj) {
    // dimensions
    var length = json_obj.length
    var width = json_obj.width
    var height = json_obj.height


    if (length.length != 0 && length.length === width.length && length.length === height.length) {
        // Creating Dimensions dict
        dimensions = {}
        var arrayLength = json_obj.length.length
        for (var i = 0; i < arrayLength; i++) {
            dimensions[i + 1] = {
                "length": json_obj.length[i],
                "width": json_obj.width[i],
                "height": json_obj.height[i]
            };
        }



    }
    // Invoice details
    var hs_title = json_obj.hs_title
    var quantity = json_obj.quantity
    var price = json_obj.price
    var total = json_obj.total
    if (hs_title.length != 0 && hs_title.length == quantity.length && hs_title.length == price.length && hs_title.length == total.length) {
        // Creating Invoice Details dict
        invoice_details = {}
        var arrayLength = json_obj.hs_title.length
        for (var i = 0; i < arrayLength; i++) {
            invoice_details[i + 1] = {
                "hs_title": json_obj.hs_title[i],
                "quantity": json_obj.quantity[i],
                "price": json_obj.price[i],
                "total": json_obj.total[i]
            };
        }
        // // Create the new object with the "dimensions" property
        var newObj = Object.assign({}, json_obj, { dimensions: dimensions, invoice_details: invoice_details });

        return newObj;

    }
}
$(document).on('click', '#display-form-id', function () {
    // $("#display-form-id").click(function(){
    var displayFormId = $(this).attr('data-display-form-id')
    var hiddenTalbeId = $(this).attr('data-hidden-table-id')
    $("#" + displayFormId).removeClass('d-none')
    $("#" + hiddenTalbeId).addClass('d-none')
})
$(document).on('click', '#display-table-id', function () {
    // $("#display-form-id").click(function(){
    var displayTableId = $(this).attr('data-display-table-id')
    var hiddenFormId = $(this).attr('data-hidden-form-id')
    $("#" + displayTableId).removeClass('d-none')
    $("#" + hiddenFormId).addClass('d-none')
})

$("#create_billings_form_id").on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation()

    // var $form = $(this);
    var formData = $(this).serializeArray();
    const json_obj = convertSerializerArrToJson(formData, list_fiels_names = []);
    var _data = transformObj(json_obj)

    const submit_url = $(this).data("url");
    const submit_method = $(this).data("method");

    var { status, data } = sendRequest(submit_method, submit_url, _data);
    if (status) {
        remove_custom_error_classes();
        $("#reset_create_billing_form_id").trigger("click");


    }









})



// build dynamically billings details modal
function get_detail_billing_html(data, is_download = false) {

    var final_div = $("<div>")

    var temp_div = $("<div>")
    var colDiv = $("<div>").addClass('col-3')
    var rowDiv1 = temp_div.clone().addClass('row')
    var rowDiv2 = temp_div.clone().addClass('row')
    var rowDiv3 = temp_div.clone().addClass('row')
    var rowDiv4 = temp_div.clone().addClass('row')
    var rowDiv5 = temp_div.clone().addClass('row')
    var rowDiv6 = temp_div.clone().addClass('row')
    var parsed_data = JSON.parse(data)

    // Top two values
    var ServiceType = $("<div>").addClass('col-6').html("<strong><b>Service Type: </b></strong>" + parsed_data.service_id)
    var TrackingIdDiv = $("<div>").addClass('col-6').html("<strong><b>Tracking Number: </b></strong>" + parsed_data.tracking_number)

    // Shipper Details Heading
    var ShipperDetailsHeading = $("<div>").addClass('row-12').css({
        'text-align': 'center',
        'background-color': '#fd7e14',
        'margin': '23px',
    }).html("<h3><b>Shipper Details </b></h3>")

    var ShipperCompanyNameDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Company Name: </b></strong>" + parsed_data.shipper_company_name)
    var ShipperContactPersonDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Contact Person: </b></strong>" + parsed_data.shipper_contact_person)
    var ShipperRefrenceDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Refrence: </b></strong>" + parsed_data.shipper_reference)
    var ShipperAddressDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Address: </b></strong>" + parsed_data.shipper_address)
    var ShipperStateDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper State: </b></strong>" + parsed_data.reciever_state)
    var ShipperCityDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper City: </b></strong>" + parsed_data.shipper_city)
    var ShipperPostalCodeDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Postal Code: </b></strong>" + parsed_data.shipper_post_code)
    var ShipperMobileNumberDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Mobile Number: </b></strong>" + parsed_data.shipper_mobile_number)
    var ShipperPhoneNumberDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Phone Number: </b></strong>" + parsed_data.shipper_phone_number)
    var ShipperNTNOrCNICNumberDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper NTN/CNIC: </b></strong>" + parsed_data.shipper_ntn_cnic)
    var ShipperEmailAddressDiv = $("<div>").addClass('col-6').html("<strong><b>Shipper Email Address: </b></strong>" + parsed_data.shipper_email_address)

    // Reciever Details
    var RecieverDetailsHeading = $("<div>").addClass('row-12').css({
        'text-align': 'center',
        'background-color': '#fd7e14',
        'margin': '23px',
    }).html("<h3><b>Reciever Details </b></h3>")

    var RecieverCompanyNameDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Company Name: </b></strong>" + parsed_data.reciever_company_name)
    var RecieverContactPersonDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Contact Person: </b></strong>" + parsed_data.reciever_contact_person)
    var RecieverAddressDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Address: </b></strong>" + parsed_data.reciever_address)
    var RecieverCountryDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Country: </b></strong>" + parsed_data.reciever_country)
    var RecieverStateDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever State: </b></strong>" + parsed_data.reciever_state)
    var RecieverCityDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever City: </b></strong>" + parsed_data.reciever_city)
    var RecieverPostalCodeDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Postal Code: </b></strong>" + parsed_data.reciever_post_code)
    var RecieverMobileNumberDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Mobile Number: </b></strong>" + parsed_data.reciever_mobile_number)
    var RecieverPhoneNumberDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Phone Number: </b></strong>" + parsed_data.reciever_phone_number)
    var RecieverEmailDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Email Address: </b></strong>" + parsed_data.reciever_email)
    var RecieverFaxDiv = $("<div>").addClass('col-6').html("<strong><b>Reciever Fax: </b></strong>" + parsed_data.reciever_fax)

    // Reciever Details
    var ShipmentDetailsHeading = $("<div>").addClass('row-12').css({
        'text-align': 'center',
        'background-color': '#fd7e14',
        'margin': '23px',
    }).html("<h3><b>Shipment Details </b></h3>")

    var PaymentDiv = $("<div>").addClass('col-6').html("<strong><b>Payment Type: </b></strong>" + parsed_data.payment_id)
    var shipmentDiv = $("<div>").addClass('col-6').html("<strong><b>Shipment Type: </b></strong>" + parsed_data.shipment_id)
    var FedExDiv = $("<div>").addClass('col-6').html("<strong><b>FedEx Number: </b></strong>" + parsed_data.fedex_number)
    var WeightDiv = $("<div>").addClass('col-6').html("<strong><b>Weight: </b></strong>" + parsed_data.weight)
    var PiecesDiv = $("<div>").addClass('col-6').html("<strong><b>Pieces: </b></strong>" + parsed_data.pieces)

    // Dimensions and InvoiceDetails
    var DimensionsHeading = $("<div>").addClass('row-12').css({
        'text-align': 'center',
        'background-color': '#fd7e14',
        'margin': '23px',
    }).html("<h3><b>Dimensions </b></h3>")
    
    
    var InvoiceDetailsHeading = $("<div>").addClass('row-12').css({
        'text-align': 'center',
        'background-color': '#fd7e14',
        'margin': '23px',
    }).html("<h3><b>Invoice Details </b></h3>")
    
    for (const [key, value] of Object.entries(parsed_data.data)) {
        if (key == 'dimensions') {
            for (const [innerkey, innervalue] of Object.entries(value)) {
                var Dimensions = $("<div>").addClass('col-3').html("<h3><b>Dimensions "+ innerkey +" </b></h3>")
                rowDiv5.append(Dimensions)
                rowDiv5.append(colDiv.clone().html("<strong><b>Length: </b></strong>" + innervalue.length))
                rowDiv5.append(colDiv.clone().html("<strong><b>Width: </b></strong>" + innervalue.width))
                rowDiv5.append(colDiv.clone().html("<strong><b>Height: </b></strong>" + innervalue.height))
                rowDiv5.append($("<hr>").addClass('col-12'))
            }
        }

        if (key == 'invoice_details') {
            for (const [innerkey, innervalue] of Object.entries(value)) {
                var InvoiceDetails = $("<div>").addClass('col-3').html("<h3><b>Invoice Detail "+ innerkey +" </b></h3>")
                rowDiv6.append(InvoiceDetails)
                rowDiv6.append(colDiv.clone().html("<strong><b>HS Title: </b></strong>" + innervalue.hs_title))
                rowDiv6.append(colDiv.clone().html("<strong><b>Price: </b></strong>" + innervalue.price))
                rowDiv6.append(colDiv.clone().html("<strong><b>Quantity: </b></strong>" + innervalue.quantity))
                rowDiv6.append(colDiv.clone().html("<strong><b>Total: </b></strong>" + innervalue.total))
                rowDiv6.append($("<hr>").addClass('col-12'))
            }
        }
    }

    rowDiv1.append(ServiceType, TrackingIdDiv)
    rowDiv2.append(ShipperCompanyNameDiv, ShipperContactPersonDiv, ShipperRefrenceDiv, ShipperAddressDiv,
        ShipperStateDiv, ShipperCityDiv, ShipperPostalCodeDiv, ShipperMobileNumberDiv, ShipperPhoneNumberDiv, ShipperNTNOrCNICNumberDiv, ShipperEmailAddressDiv)
    rowDiv3.append(RecieverCompanyNameDiv, RecieverContactPersonDiv, RecieverAddressDiv, RecieverCountryDiv, RecieverStateDiv, RecieverCityDiv, RecieverPostalCodeDiv,
        RecieverMobileNumberDiv, RecieverPhoneNumberDiv, RecieverEmailDiv, RecieverFaxDiv)
    rowDiv4.append(PaymentDiv, shipmentDiv, FedExDiv, WeightDiv, PiecesDiv)
    
    final_div.append(rowDiv1, ShipperDetailsHeading, rowDiv2, RecieverDetailsHeading, rowDiv3, ShipmentDetailsHeading, rowDiv4, DimensionsHeading, rowDiv5, InvoiceDetailsHeading, rowDiv6)
    return final_div

}

// Get AirWay bill details
$(document).on('click', "#get_billing_details_button", function () {
    var billingDetailsId = $(this).attr('data-get-detail-id')
    var billinDetailsUrl = $(this).attr('data-url')
    var { status, data } = sendRequest("POST", billinDetailsUrl, { "id": billingDetailsId });

    var data_in_html = get_detail_billing_html(data);
    setGenericModal("Abc", data_in_html, true);
})


function placeDataintoForm(form_id, data, quillbot_fields = [], hidden_fields = [], multiple_asset_ids = false) {
    console.log(data);
    const filtered_data = data[0].fields
    for (const [key, value] of Object.entries(filtered_data)) {
        console.log(key);
        const obj_inst = $("#" + form_id).children().find("[name='" + key + "']");
        if (obj_inst.length > 1) {
            $("#" + form_id).children().find("[name='" + key + "'][value='" + value + "']").prop("checked", true);
        }
        if (key=="data"){
            for(const[innerKey,innerValue] of Object.entries(value)){
                console.log(key,value);
            }
        }
        // else if (quillbot_fields.includes(key)) {
        //     var hidden_input = $("#" + form_id + " input[name=" + key + "]");
        //     hidden_input.val(value); // Setting hidden field with value
        //     const quill_data_attr_value = hidden_input.data("quill-field");
        //     $("#" + form_id).children().find("[data-input-field-id=" + quill_data_attr_value + "]").children(".ql-editor").html(value)
        // }
        // else if (hidden_fields.includes(key)) {
        //     if (value != "") {
        //         var hidden_input = $("#" + form_id + " input[name=" + key + "]");
        //         hidden_input.val(value); // Setting hidden field with value
        //         hidden_input.parent().parent().removeClass("d-none");
        //     }
        // }
        else {
            obj_inst.val(value);
        }
    }
    if (multiple_asset_ids == true) {
        addmultipleassetids(form_id, data)
    }
}

// Update Airway bill
$(document).on('click', "#update_airway_bill_button", function(e){
    e.preventDefault();
    var UpdateAirWayBillId = $(this).attr("data-get-update-bill-id")
    var billingUpdateUrl = $(this).attr('data-url')
    console.log(billingUpdateUrl);
    var DISPLAY_FORM_ID = $(this).attr('data-update-form-id')
    var { status, data } = sendRequest("POST", billingUpdateUrl, { "id": UpdateAirWayBillId });
    // console.log("the data is :",typeof(data));
    // console.log("the data is :",data.data);
    
    $(this).closest('table').parents('.tab-pane').addClass('d-none')
    $("#" + DISPLAY_FORM_ID).removeClass('d-none')

    placeDataintoForm(DISPLAY_FORM_ID, data.data, quillbot_fields=["reason"], hidden_fields=["other_to_location"], multiple_asset_ids=false)


})

