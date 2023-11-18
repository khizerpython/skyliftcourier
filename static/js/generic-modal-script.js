
function cleanGenericModal() {
    changeGenericModalToNormalSize()
    const modalDOM = $("#generic-display-modal");
    modalDOM.find("h5").text("");
    modalDOM.find("#generic-display-modal-body-id").text("");
}

function setGenericModal(heading, bodyHTML, large_modal=false) {
    cleanGenericModal();
    if (large_modal) {
        changeGenericModalToLarge();
    }

    const modalDOM = $("#generic-display-modal");
    modalDOM.find("h5").text(heading);
    modalDOM.find("#generic-display-modal-body-id").html(bodyHTML);
    // $("#generic-display-modal").modal('show');
    var myModal = new bootstrap.Modal(document.getElementById('generic-display-modal'), {
        keyboard: false
      });
      
      myModal.toggle();
}

function changeGenericModalToLarge() {
    $("#generic-display-modal .modal-dialog").addClass("modal-xl modal-fullscreen");

}
function changeGenericModalToNormalSize() {
    $("#generic-display-modal .modal-dialog").removeClass("modal-xl modal-fullscreen");
}
