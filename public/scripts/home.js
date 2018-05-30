$(document).ready(() => {

    $("form").submit(event => {
        event.preventDefault();
        $(".error").empty();
        
        let minplayers, maxplayers, genre, time;
        var checked = [
            minplayers = $('input[name=minplayers]:checked').val(),
            maxplayers = $('input[name=maxplayers]:checked').val(),
            genre = $('input[name=genre]:checked').val(),
            time = $('input[name=time]:checked').val()
        ];

        if(checked.indexOf(undefined) != -1) {
            $(".error").append('<p>Remember to choose for every category</p>');
            return;
        }

        var data = {
            "minplayers": checked[0],
            "maxplayers": checked[1],
            "genre": checked[2],
            "time": checked[3]
        };

        $.ajax({
            type: "POST",
            url: "get-boardgames",
            data: data
        }).done(responseData => {
            console.log(responseData);
        });
    });
});