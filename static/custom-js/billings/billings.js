
function createMinusIcon(_class, _delete){
    var col_div = $('<div>')
    var col1 = col_div.clone().addClass(_class)
    var innerDiv = col_div.clone().addClass('mt-4 text-center')
    var ITag = $("<i>").addClass('"bi bi-dash-circle-fill').attr('data-delete-id',_delete).css('font-size','35px')
    finalDiv = col1.append(innerDiv.append(ITag))
    return finalDiv
}

function createInputRow(_id, _name, _type, _placeholder, _class, _title,_delete) {
    var col_div = $('<div>')
    var col1 = col_div.clone().addClass(_class).attr('data-delete-id',_delete)
    var innerDiv = col_div.clone().addClass('form-group')
    var label = $("<label>").attr('for',_id).text(_title)
    var InputField = $("<input>").attr({'name':_name, 'type':_type, 'class':'form-control', 'id':_id, 'placeholder':_placeholder})
    finalDiv = col1.append(innerDiv.append(label,InputField))
    return finalDiv
  }


$(document).on('click', '.bi-plus-circle-fill', function(){
    var dataInvoiceDetails = $(this).attr('data-invoice-details')
    if(dataInvoiceDetails=='true'){
        var invoiceLength =  $(this).closest('form').find("input#create_id_hs_title").length
        if (invoiceLength< 15){
            var row1 = createInputRow(_id='create_id_hs_title', _name='hs_title', _type='number', _placeholder= 'Enter HS title',_class='col-3 ', _title='HS Title',_delete='invoicedetail'+invoiceLength)
            var row2 = createInputRow(_id='create_id_quantity', _name='quantity', _type='number', _placeholder= 'Enter Quantity',_class='col-3', _title='Quantity',_delete='invoicedetail'+invoiceLength)
            var row3 = createInputRow(_id='create_id_price', _name='price', _type='number', _placeholder= 'Enter Price',_class='col-2',_title='Price',_delete='invoicedetail'+invoiceLength)
            var row4 = createInputRow(_id='create_id_total', _name='total', _type='number', _placeholder= 'Enter Total',_class='col-2', _title='Total',_delete='invoicedetail'+invoiceLength)
            var MinusIcon = createMinusIcon(_class= 'col-1',_delete='invoicedetail'+invoiceLength)
            $(this).closest('.row').append(row1,row2,row3,row4, MinusIcon)
        }
         
    } else if(dataInvoiceDetails=='false'){
        var dimentionLength =  $(this).closest('form').find("input#create_id_length").length
        if(dimentionLength<5){
            var row1 = createInputRow(_id='create_id_length', _name='length', _type='number', _placeholder= 'Enter length',_class='col-3', _title='Length', _delete='dimension'+dimentionLength)
            var row2 = createInputRow(_id='create_id_width', _name='width', _type='number', _placeholder= 'Enter width',_class='col-3', _title='Width', _delete='dimension'+dimentionLength)
            var row3 = createInputRow(_id='create_id_height', _name='height', _type='number', _placeholder= 'Enter height',_class='col-3', _title='Height', _delete='dimension'+dimentionLength)
            var MinusIcon = createMinusIcon(_class= 'col-1', _delete='dimension'+dimentionLength)
            $(this).closest('.row').append(row1,row2,row3,row4, MinusIcon)
        }
    } else{
        $.noop
    }
})

$(document).on('click', '.bi-dash-circle-fill', function(){
    var deleteDivID = $(this).attr('data-delete-id')
    var form = $(this).closest('form');
    var divsWithSameDeleteID = form.find('div[data-delete-id="' + deleteDivID + '"]');
    $(this).parent().parent().remove()
    divsWithSameDeleteID.remove()
})


function transformObj(json_obj) {
    var length = json_obj.length
    var width = json_obj.width
    var height = json_obj.height

    if (
        length.length === width.length &&
        length.length === height.length
    ) {
        console.log("ÿes same size");
    }
    
}


$("#create_billings_form_id").on('submit', function(e){
    e.preventDefault();
    e.stopPropagation()
    console.log("geo g");

    // var $form = $(this);
    var formData = $(this).serializeArray();
    // console.log("the form data is :", formData);
    const json_obj = convertSerializerArrToJson(formData, list_fiels_names = []);
    console.log("the json obj is :",json_obj);
    console.log("the json obj is :",json_obj.length);


    var length = json_obj.length
    var width = json_obj.width
    var height = json_obj.height

    if (
        length.length === width.length &&
        length.length === height.length
    ) {
        console.log("ÿes same size");
    }


    console.log(json_obj.length.length);
    
    console.log(json_obj.width);

    // var dimensions = {};

    // // Assuming that the length, width, and height arrays have the same length
    // var arrayLength = json_obj.length.length;

    // for (var i = 0; i < arrayLength; i++) {
    //     dimensions[i + 1] = {
    //         "length": json_obj.length[i],
    //         "width": json_obj.width[i],
    //         "height": json_obj.height[i]
    //     };
    // }

    // // Create the new object with the "dimensions" property
    // var newObj = Object.assign({}, json_obj, { dimensions: dimensions });

    // console.log(newObj);
   
    

})


