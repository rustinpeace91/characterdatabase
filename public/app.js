$(document).ready(function(){

    $("#submit").on("click", event =>{
        event.preventDefault();

        //grab the name of the character
        let name = $("#char-name").val().trim();
        let parry = $("#char-parry").val().trim();
        let toughness = $("#char-toughness").val().trim();
        let skills = $("#char-skills").val().trim();
        let weapons = $("#char-weapons").val().trim();
        let other = $("#char-other").val().trim();

        const charObject = {
            name: name,
            parry: parry,
            toughness: toughness,
            skills: skills,
            weapons: weapons,
            other: other
        }
        $.ajax('/api/characters', {
            type: 'POST',
            data: charObject
        }).then(function(){
            alert("yeah");
            window.location.href = "/";
        })
    })

    $("#goback").on("click", event => {
        alert("yeah");
        event.preventDefault();
        window.location.href = "/";
    })


    $(".delete-char").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        $.ajax('/api/characters/' + id, {
            type: 'DELETE',
            //data: id
        }).then(function(){
            alert("yeah");
            //window.location.href = "/";
        })
    });
});
