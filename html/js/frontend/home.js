
$(document).ready(function () {
    $("#btn_consulta").click(function () {
        $(".md-modal").addClass("md-show");
        $("#container_form input, #container_form textarea").val("")
    });
    $("#btn-close").click(function () {
        $(".md-modal").removeClass("md-show");
        $("#sent").hide();
        $("#container_form").show();
    });



    //contact form
    var sendingInfo = false;
    var hideMessageTimer;
    $('#sendMessage').click(function (e) {
        e.preventDefault();

        if (validateForm() && !sendingInfo) {
            sendingInfo = true;
            $.ajax({
                type: "POST",
                url: WEB_PATH + "controller/frontend/ajax/home/sendMessage.php",
                data: $("#contact_form").serialize(),
                dataType: "json"
            }).done(function (data) {

                if (data.result === true) {
                    $("#container_form").fadeOut(200, function () {
                        sendingInfo = false;
                        $("#sent").fadeIn(200);
                    });
                } else {
                    sendingInfo = false;
                    showErrorMessage("No se ha podido enviar tu consulta, intentalo nuevamente.");
                }
            });
        }
    });

    $("#showContact").click(function (e) {
        e.preventDefault();
        $("#container_form input, #container_form textarea").val("");
        $("#container_form select option[value=-1]").attr("selected", true)
        $("#sent").fadeOut(200, function () {
            $("#container_form").fadeIn(200);
        });
    });


    function validateForm() {
        $("#contact_form .error").removeClass("error");

        var firstNameInput = $('input[name="first-name"]');
        var emailInput = $('input[name="email"]');
        // var institutionInput = $('input[name="institution"]');
        var messageInput = $('textarea[name="message"]');
        var rightSelect = $('select[name="right"]');
        var institutionSelect = $('select[name="institution"]');

        var errorMessage = "";

        if (firstNameInput.val().length === 0) {
            firstNameInput.parent("div").addClass('error');
            firstNameInput.focus();
            errorMessage = "Debes ingresar tu nombre";
        } else if (emailInput.val().length === 0) {
            emailInput.parent("div").addClass('error');
            emailInput.focus();
            errorMessage = "Debes ingresar tu email";
        } else if (!validateEmail(emailInput.val())) {
            emailInput.parent("div").addClass('error');
            emailInput.focus();
            errorMessage = "El email ingresado no es válido";
        } else if (rightSelect.val() === "-1") {
            rightSelect.parent("div").addClass('error');
            errorMessage = "Debes seleccionar un derecho";
        } else if (institutionSelect.val() === "-1") {
            institutionSelect.parent("div").addClass('error');
            errorMessage = "Debes seleccionar la institución a la que perteneces";
        } else if (messageInput.val().length === 0) {
            messageInput.parent("div").addClass('error');
            messageInput.focus();
            errorMessage = "Debes ingresar tu consulta";
        } else {
            return true;
        }

        if (errorMessage.length > 0) {
            showErrorMessage(errorMessage);
        }

        return false;
    }


    function showErrorMessage(errorMessage) {
        $('.error-message.pink_bg p').html(errorMessage);
        $('.error-message.pink_bg').fadeIn();
        clearTimeout(hideMessageTimer);
        hideMessageTimer = setTimeout(function () {
            $('.error-message.pink_bg').fadeOut();
        }, 3000);
    }
});