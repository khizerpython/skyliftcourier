$(document).ready(function(){
    console.log("this page is loaded");
})


// Create invoice details dynamically
// function invoiceDetails() {
//     var div = $("<div>")
    
// }

// function createInputRow() {
//     var row = $('<div class="row"></div>');
  
//     var col1 = $('<div class="col-3"></div>');
//     col1.append('<div class="form-group"><label for="create_id_hs_title">HS Title</label><input type="number" name="hs_title" class="form-control" id="create_id_hs_title" placeholder="Enter HS title"><div></div></div>');
  
//     var col2 = $('<div class="col-3"></div>');
//     col2.append('<div class="form-group"><label for="create_id_quantity">Quantity</label><input type="number" name="quantity" class="form-control" id="create_id_quantity" placeholder="Enter Quantity"><div></div></div>');
  
//     var col3 = $('<div class="col-2"></div>');
//     col3.append('<div class="form-group"><label for="create_id_price">Price</label><input type="number" name="price" class="form-control" id="create_id_price" placeholder="Enter Price"><div></div></div>');
  
//     var col4 = $('<div class="col-2"></div>');
//     col4.append('<div class="form-group"><label for="create_id_total">Total</label><input type="number" name="total" class="form-control" id="create_id_total" placeholder="Enter Price"><div></div></div>');
  
//     var col5 = $('<div class="col-1"></div>');
//     col5.append('<div class="mt-4 text-center"><i class="bi bi-plus-circle-fill" data-include-id="false" style="font-size: 35px;"></i></div>');
  
//     row.append(col1, col2, col3, col4, col5);
//     return row;
//   }

function createPlusIcon(_class){
    var col_div = $('<div>')
    var col1 = col_div.clone().addClass(_class)
    var innerDiv = col_div.clone().addClass('mt-4 text-center')
    var ITag = $("<i>").addClass('"bi bi-dash-circle-fill').css('font-size','35px')
    finalDiv = col1.append(innerDiv.append(ITag))
    return finalDiv
}

function createInputRow(_id, _name, _type, _placeholder, _class) {
    // var row = $('<div class="row"></div>');

    var col_div = $('<div>')
    var col1 = col_div.clone().addClass(_class)
    var innerDiv = col_div.clone().addClass('form-group')
    var label = $("<label>").attr('for','create_id_hs_title').text('HS Title')
    var InputField = $("<input>").attr({'name':_name, 'class':'form-control', 'id':_id, 'placeholder':_placeholder})

    finalDiv = col1.append(innerDiv.append(label,InputField))
    return finalDiv

  }


$(document).on('click', '.bi-plus-circle-fill', function(){
    
    var invoiceLength = $(this).closest('#invoice_details');
    var HSTitleLength = $('#create_id_hs_title').length
    console.log(HSTitleLength);
    
    if(invoiceLength.length === 1){
        console.log('here');
        var row1 = createInputRow(_id='create_id_hs_title', _name='hs_title', _type='number', _placeholder= 'Enter HS title',_class='col-3')
        var row2 = createInputRow(_id='create_id_quantity', _name='quantity', _type='number', _placeholder= 'Enter Quantity',_class='col-3')
        var row3 = createInputRow(_id='create_id_price', _name='price', _type='number', _placeholder= 'Enter Price',_class='col-2')
        var row4 = createInputRow(_id='create_id_total', _name='total', _type='number', _placeholder= 'Enter Total',_class='col-2')
        var PlusIcon = createPlusIcon(_class= 'col-1')
    
        // row = createInputRow()
        // console.log(row);
        $(this).closest('.row').append(row1,row2,row3,row4, PlusIcon)

    } else{
        var parentDiv = $(this).closest('.row')
        var divID  = parentDiv.attr('data-next-div-id');
        $("#"+divID).removeClass('d-none')
    }
    

})

$(document).on('click', '.bi-dash-circle-fill', function(){
    
    var parentDiv = $(this).closest('.row')
    parentDiv.addClass('d-none')

})


