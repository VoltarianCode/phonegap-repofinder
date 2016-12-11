$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});


function onDeviceReady(){

    getRepos();

    $('.ui-input-clear').click(function(){
        $('#search_list').hide();
        $('#userinfo').hide();
    });

    $("#search_btn").click(function (e){
        e.preventDefault();
        var search_html = '';
        var user_html = '';
        var username = $("#search_input").val();

        console.log("Username: " + username);

        var user_url = "https://api.github.com/users/" + username;
        var repo_url = "https://api.github.com/users/" + username + '/repos';

        $.ajax({
            url: repo_url,
            dataType: 'jsonp',
            success: function (response){

                $.ajax({
                    url: user_url,
                    dataType: 'jsonp',
                    success: function (res){ 
                        console.log(res);
                        var user_html ='';
                        user_html += '<h3><img src="' + res.data.avatar_url + '" class="thumbnail">' + 
                            '<a href="' + res.data.html_url + '" target="_blank">' + res.data.name + 
                            '</a></h3><div style="clear:both"></div><br/>';


                        $("#userinfo").html(user_html);

                    }
                });

                $.each(response.data, function(){
                    search_html += '<li> <h1><a href="'+ this.html_url +'" target="_blank">' + this.name +'</a></h1>'+
                    '<p> By ' + this.owner.login + '</p></li>';
                });
                $("#search_list").append(search_html);
                $("#search_list").listview("refresh");
            }
        });

    });

}


function getRepos(){
    var html ='';

    $.ajax({
        url: "https://api.github.com/repositories",
        dataType: "jsonp",
        success: function(response){
            $.each(response.data, function(i, item){
                if(i < 10){
                    html += '<li>' + 
                        '<img class="thumbnail" src="'+ this.owner.avatar_url+'" >' +
                        '<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a>' +
                        '<p> By ' + this.owner.login + '</p> </li>';
                }
            });

            $("#latest_repo_list").append(html);
            $("#latest_repo_list").listview("refresh");


        }
    });
}