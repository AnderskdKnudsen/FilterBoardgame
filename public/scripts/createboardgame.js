$(document).ready(() => {

    $(".empty").on("click", () => {
        $(".boardgame-title").val("");
        $(".boardgame-playingtime").val("");
        $("#boardgame-genre").val("Deckbuilding");
        $("#boardgame-maxplayers").val("2");
        $("#boardgame-minplayers").val("2");
    });

    $("form").submit(event => {
        event.preventDefault();
        $(".error").empty();
        $(".succes").empty();


        if (!($(".boardgame-title").val() && $(".boardgame-playingtime").val())) {
            $(".error").append('<p>Remember to insert for every category</p>');
            return;
        }

        let data = {
            title: $(".boardgame-title").val(),
            minplayers: $("#boardgame-minplayers option:selected").val(),
            maxplayers: $("#boardgame-maxplayers option:selected").val(),
            genre: $("#boardgame-genre option:selected").val(),
            playingtime: $(".boardgame-playingtime").val()
        };

        var result = confirm(
            "Title: " + data.title + "\n" +
            "Players: " + data.minplayers + " - " + data.maxplayers + "\n" +
            "Genre: " + data.genre + "\n" +
            "Playing time: " + data.playingtime + "\n" +
            "Want to create boardgame?"
        );

        if (!result) return;

        $.ajax({
            type: "POST",
            url: "insert-boardgame",
            data: data
        }).done(responseData => {
            if(responseData.status === 403) {
                $(".error").append('<p>' + responseData.message + '</p>');
                return;
            } else {
                $(".succes").append('<p>' + responseData.message + '</p>');
                setTimeout(() => {
                    window.location = "/home.html";
                }, 3000);
            }
        })









    });
});