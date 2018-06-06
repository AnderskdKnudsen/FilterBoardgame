$(document).ready(() => {

    let email = getParameterByName("email");
    $(".login-email").val(email);

    $("form").submit(event => {
        event.preventDefault();
        $(".error").empty();


        let email, password, data;
        email = $(".login-email").val();
        password = $(".login-password").val();

        if (email === "" && password === "") {
            $(".error").append('<p>Enter both password and email</p>');
            return;
        }

        data = { "email": email, "password": password };

        $.ajax({
            type: "POST",
            url: "login-user",
            data: data
        }).done(responseData => {
            if (responseData.status === 200) {
                window.name = "secretstring";
                window.location.href = "/home.html";
            } else if (responseData.status === 403 || responseData.status === 404) {
                $(".error").append('<p>' + responseData.message + '</p>');
            }
        });
    });

});

//Thankfully lended from stackoverflow
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}