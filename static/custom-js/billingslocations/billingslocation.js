
function CreateForm(BILLID,URL){
    var formdiv =$("<form>").attr({"data-url":URL,"data-method":"POST",'id':'create_airway_bill_location_form'})
    var hiddenInput = $("<input>").attr("type","hidden").attr("value",BILLID).text(BILLID)
    var div = $("<div>")
    var outerDiv = div.clone().addClass("col-6")
    var innerDiv = div.clone().addClass("form-group")
    var label = $("<label>").attr("for","name").text("Enter Location")
    var TextArea = $("<textarea>").addClass("form-control").attr({"name":"name","row":1,"id":"create_id_bill_location","placeholder":"Enter Location","required":true})
    var Button = $("<button>").addClass("btn btn-primary mt-2").text("Create Location").css({"background": "#7a3a05", "border-color":"#7f3f0b","font-size":"large"})
    formdiv.append(hiddenInput,outerDiv.append(innerDiv.append(label,TextArea,Button)))
    return formdiv

     
}

$(document).on('click','#add_airway_bill_location_button' ,function(){
    console.log("geo g");
    const BILLID = $(this).attr('data-bill-id')
    const URL = $(this).attr('data-url') 
    const TrackingNumber = $(this).attr('data-tracking-number') 

    form = CreateForm(BILLID,URL)
    setGenericModal(TrackingNumber, form, true);
})
