$(document).ready(() => {
    $(".table").hide();

    $("form").submit(event => {
        event.preventDefault();
        $(".error").empty();
        $(".table").find("tr:gt(0)").remove();
        
        let minplayers, maxplayers, genre, time;
        var checked = [
            minplayers = $('input[name=minplayers]:checked').val(),
            maxplayers = $('input[name=maxplayers]:checked').val(),
            genre = $('input[name=genre]:checked').val(),
            time = $('input[name=time]:checked').val()
        ];
        
        if (checked.indexOf(undefined) !== -1) {
            $(".error").append('<p>Remember to choose for every category</p>');
            return;
        }
        
        $(".table").show();
        
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
            responseData.forEach(boardgame => {

                $(".table").append(
                    '<tr>' +
                    '<td>' + boardgame.title + '</td>' +
                    '<td>' + boardgame.minplayers + '</td>' +
                    '<td>' + boardgame.maxplayers + '</td>' +
                    '<td>' + boardgame.genre + ' </td>' +
                    '<td>' + boardgame.time + '</td>' +
                    '</tr>'
                );
            });
        });
    });
});