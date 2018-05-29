$(document).ready(() => {
    $('form').submit(event => {
        event.preventDefault();
        $(".error").empty();

        let email, password;

        if ($(".register-password").val() !== $(".confirm-password").val()) {
            $(".error").append('<p>Password needs to be identically</p>')
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
            if(responseData.success === "done") {
                window.location.href = "/login.html?email="+responseData.email;
            }
            if(responseData.status === 403){
                $(".error").append('<p>'+responseData.message+'</p>');
            }
        });


    });
});
