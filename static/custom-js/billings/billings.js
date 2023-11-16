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
    $("#" + displayFormId).removeClass('d-none')
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



// get carousal html
function get_detail_billing_html(data, is_download = false) {

    var final_div = $("<div>")

    var temp_div = $("<div>")
    var rowDiv1 = temp_div.clone().addClass('row')
    var rowDiv2 = temp_div.clone().addClass('row')
    var parsed_data = JSON.parse(data)
    console.log(parsed_data);

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



    rowDiv1.append(ServiceType, TrackingIdDiv)
    rowDiv2.append(ShipperCompanyNameDiv, ShipperContactPersonDiv, ShipperRefrenceDiv, ShipperAddressDiv,
         ShipperStateDiv, ShipperCityDiv, ShipperPostalCodeDiv, ShipperMobileNumberDiv, ShipperPhoneNumberDiv, ShipperNTNOrCNICNumberDiv, ShipperEmailAddressDiv)
    final_div.append(rowDiv1, ShipperDetailsHeading, rowDiv2)
    return final_div

}

$(document).on('click', "#get_billing_details_button", function () {
    var billingDetailsId = $(this).attr('data-get-detail-id')
    var billinDetailsUrl = $(this).attr('data-url')
    var { status, data } = sendRequest("POST", billinDetailsUrl, { "id": billingDetailsId });

    var data_in_html = get_detail_billing_html(data);
    setGenericModal("Abc", data_in_html, true);
})

