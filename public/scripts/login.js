$(document).ready(() => {

    let email = getParameterByName("email");
    $(".login-email").val(email);

    $("form").submit(event => {
        event.preventDefault();
        
        let email, password, data;
        email = $(".login-email").val();
        password = $(".login-password").val();
        data = {"email": email, "password": password};
        
        $.ajax({
            type: POST,
            url: "login-user",
            data: data
        }).done(responseData => {
            /*what do to witht he response*/
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