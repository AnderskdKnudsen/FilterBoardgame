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
        
        if(email === "" || password === "") {
            $(".error").append('<p>Enter both password and email</p>');
            return;
        }


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
                window.location.href = "/index.html?email="+responseData.email;
            }
            if(responseData.status === 403){
                $(".error").append('<p>'+responseData.message+'</p>');
            }
        });


    });
});
