$(document).ready(() => {
    $('form').submit(event => {
        event.preventDefault();
        $(".password-error").empty();

        let email, password;

        if ($(".register-password").val() !== $(".confirm-password").val()) {
            $(".password-error").append('<p class="text-danger">Password needs to be identically</p>')
            return;
        }
        email = $(".register-email").val();
        password = $(".register-password").val();

        var data = {
            "email": email,
            "password": password
        }

        $.ajax({
            type: "POST",
            url: "register-user",
            data: data
        }).done(responseData => {
            if(responseData.success === "done"){
                console.log("hej");
                window.location = "/login.html";
            }
        });


    });
});
