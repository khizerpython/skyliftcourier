
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

function get_detail_billing_html(data, is_download = false) {

    var final_div = $("<div>").addClass('carousel-item')

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
    
    var ServiceType = $("<div>").addClass('col-6').css('letter-spacing','0.04px').text("<strong><b>Service Type: </b></strong>" + parsed_data.service_id)
    var TrackingIdDiv = $("<div>").addClass('col-6').html("<strong><b>Tracking Number: </b></strong>" + parsed_data.tracking_number)

    // Shipper Details Heading
    var ShipperDetailsHeading = $("<div>").addClass('row-12').css({
        'text-align': 'center',
        'background-color': '#fd7e14',
        'margin': '23px',
        'letter-spacing':'0.04px'
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
    return final_div.css({'letter-spacing':'0.01px'})

}

function termsAndConditions(){
    var rowDiv = $("<div>").addClass('row')
    var Definitionheading = $("<h3>").text('1. Definition : ')
    var Consignmentheading = $("<h3>").text('2. Consignment Note : ')
    var PartiesAndSubContractingheading = $("<h3>").text('3. Parties and Sub-contracting : ')
    var CommonCarrierheading = $("<h3>").text('4. Common Carrier : ')
    var Variationsheading = $("<h3>").text('5. Variations : ')
    var LiabilitiesNotAssumedheading = $("<h3>").text('6. Liabilities Not Assumed:')
    var ConsignmentAcceptableforTransportheading = $("<h3>").text('7. Consignment Acceptable for Transport:')
    var UnacceptableGoodsheading = $("<h3>").text('8. Unacceptable Goods : ')
    var WarrantiesbytheConsignorheading = $("<h3>").text('9. Warranties by the Consignor : ')
    var CustomsClearanceheading = $("<h3>").text('10. Customs Clearance : ')
    var Chargesheading = $("<h3>").text('11. Charges : ')
    var MethodsofTransportheading = $("<h3>").text('12. Methods of Transport : ')
    var Insuranceheading = $("<h3>").text('13. Insurance : ')
    var Deliveryheading = $("<h3>").text('14. Delivery : ')
    var Lienheading = $("<h3>").text('15. Lien : ')
    var Claimheading = $("<h3>").text('16. Claim : ')


    var defContent = $('<p>').css('letter-spacing','0.06px').text('"SkyLiftCourier" refers to SKYLIFTCOURIER (whether acting directly or through agents). "Consignor" or "Shipper" is the sender of goods for transport. "Consignment" includes goods, parcels, or packages tendered by the Consignor to SkyliftCourier.')
    var consignmentContent = $('<p>').css('letter-spacing','0.06px').text('Each Consignment must be properly addressed, accompanied by SkyliftCourier' + 's Consignment Note, completed and signed by the Consignor.The Consignor is responsible for the accuracy of information and is liable for consequences of false declarations.')
    var PartiesAndSubContractingContent = $('<p>').css('letter-spacing','0.06px').text('Consignor, even if not the owner, is deemed the authorized agent. SkyliftCourier may sub-contract and engage agents for fulfilling the contract.')
    var CommonCarrierContent = $('<p>').css('letter-spacing','0.06px').text('SkyliftCourier is not a common carrier; it accepts goods under specific conditions.')
    var VariationsContent = $('<p>').css('letter-spacing','0.06px').text('No waiver or alteration of conditions is allowed.SkyliftCourier'+ 's agents cannot alter or waive conditions; these conditions prevail over conflicting instructions.')
    var LiabilitiesNotAssumedContent = $('<p>').css('letter-spacing','0.06px').text('SkyliftCourier is not liable for loss, costs, or expenses, except for willful acts, up to US$100 or the cost of reshipping. Shipper must declare value if limits are deemed insufficient. No liability for special or consequential damages.')
    var ConsignmentAcceptableforTransportContent = $('<p>').css('letter-spacing','0.06px').text('SkyliftCourier reserves the right to inspect, refuse, reject, or deal with any goods at its discretion.Hazardous or prohibited materials won'+'t be accepted without special arrangements.')
    var UnacceptableGoodsContent = $('<p>').css('letter-spacing','0.06px').text('SkyliftCourier may return or deal with goods improperly consigned or undervalued by the Consignor.')
    var WarrantiesbytheConsignorContent = $('<p>').css('letter-spacing','0.06px').text('The Consignor warrants information accuracy, legality, proper packaging, labeling, and that transport is not illegal.')
    var CustomsClearanceContent = $('<p>').css('letter-spacing','0.06px').text('SkyliftCourier will make reasonable efforts for customs clearance but is not liable for penalties due to delays.')
    var ChargesContent = $('<p>').css('letter-spacing','0.06px').text('Consignor is responsible for all transport, customs, and related charges.')
    var MethodsofTransportContent = $('<p>').css('letter-spacing','0.06px').text('SkyliftCourier reserves the right to choose routes and procedures for transport.')
    var InsuranceContent = $('<p>').css('letter-spacing','0.06px').text('Insurance is only effected upon express written instructions from the Consignor.')
    var DeliveryContent = $('<p>').css('letter-spacing','0.06px').text('Delivery is authorized to the address on the Consignment Note.')
    var LienContent = $('<p>').css('letter-spacing','0.06px').text('SkyliftCourier has the right of detention on goods for sums due.')
    var ClaimsContent = $('<p>').css('letter-spacing','0.06px').text('Claims must be made in writing within 7 days, contingent on payment of transport charges.')
   
   
    rowDiv.append(Definitionheading,defContent, Consignmentheading,consignmentContent, PartiesAndSubContractingheading,
        PartiesAndSubContractingContent,CommonCarrierheading,CommonCarrierContent,Variationsheading, VariationsContent,LiabilitiesNotAssumedheading, LiabilitiesNotAssumedContent
        , ConsignmentAcceptableforTransportheading,ConsignmentAcceptableforTransportContent, UnacceptableGoodsheading,UnacceptableGoodsContent,WarrantiesbytheConsignorheading,
        WarrantiesbytheConsignorContent, CustomsClearanceheading,CustomsClearanceContent, Chargesheading, ChargesContent, MethodsofTransportheading,MethodsofTransportContent,
        Insuranceheading, InsuranceContent,Deliveryheading, DeliveryContent, Lienheading, LienContent, Claimheading, ClaimsContent)
    return rowDiv
    
}


// Get AirWay bill details
$(document).on('click', "#download_billing_details_button", function () {
    var billingDetailsId = $(this).attr('data-get-detail-id')
    var billinDetailsUrl = $(this).attr('data-url')
    var trackingId = $(this).attr('data-tracking-id')
    var { status, data } = sendRequest("POST", billinDetailsUrl, { "id": billingDetailsId });

    var data_in_html = get_detail_billing_html(data);
    var html = $(data_in_html);
    
    var carouselItemsArray = html

    window.jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF(
        {
                orientation: 'portrait',
                unit: 'mm',
                format: 'tabloid',
                lineHeight: 2.5,
                putOnlyUsedFonts:false
               }
    );
    var totalstr = "";
    for (var i = 0; i < carouselItemsArray.length; i++) {
        totalstr +=  carouselItemsArray[i].innerHTML ;
    }
    totalstr = totalstr.replace(/(<strong>|<b>)(.*?)<\/(strong|b)>/g, function(match, p1, p2, p3) {
        return p1 + p2.replace(/ /g, '&nbsp;') + '</' + p3 + '>';
        
    });
    var termsContent = termsAndConditions();
    totalstr += termsContent[0].outerHTML;
    console.log(totalstr);
    
    doc.html(totalstr, {
        callback: () => {
            doc.save(trackingId + '.pdf');
        },
        
        margin: [15, 0, 15, 10],
        padding:[20,0,15,20],
        width: 230,
        autoPaging: 'text',
        windowWidth: 960,
        
    });
    
    // $(this).show();
})