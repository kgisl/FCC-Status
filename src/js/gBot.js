/*global $:false */
/*jshint quotmark: false */
/*jshint loopfunc: true */
/*jslint latedef:false*/
/*jslint browser:true */
/*jshint maxparams: 5 */
var key = "ae28f23f134c4364ad45e7b7355cfa91c92038bb";
var arr = [];
var points = 0;
var html =
    '<table class="table" id="data"><tr><th>SNO</th><th>Avatar</th><th>Name</th><th>User Name</th><th>Points</th></tr>';


$(document).ready(function () {
    "use strict";

    var url = "https://api.gitter.im/v1/rooms?access_token=" + key;
    var roomId = "";
    var noOfUsers = 0;
    $.ajax({
        type: 'GET',
        url: url,
        //data:data,
        async: false,
        dataType: 'json',
        /*beforeSend:function(){
            // this is where we append a loading image
            $('#ajax-panel').html('<div class="loading"><img src="/img/loading.gif" alt="Loading..." /></div>');
        },*/
        success: function (data) {
            //Do stuff with the JSON data
            for (var i = 0; i < data.length; i = i + 1) {
                if (data[i].name === 'kgisl/campsite') {
                    roomId = data[i].id;
                    noOfUsers = data[i].userCount;
                    break;
                }
            }
        },
        error: function ( /* xhr, textStatus, errorThrown */ ) {
            points = 0;
        }
    });
    var jsonData = [];


    for (var i = 0; i < noOfUsers; i += 30) {
        $.ajax({
            type: 'GET',
            url: 'https://api.gitter.im/v1/rooms/' + roomId +
                '/users?access_token=' + key + '&skip=' + i,
            //data:data,
            async: false,
            dataType: 'json',
            success: function (data) {
                $.merge(jsonData, data);
                //alert(jsonData);
            },
            error: function ( /* xhr, textStatus, errorThrown */ ) {
                points = 0;
            }
        });
    }
    getData(jsonData);
});


function browniePointsFetcher(uname) {
    "use strict";

    var points = 0;
    var url = 'https://www.freecodecamp.com/api/users/about?username=' +
        uname.toLowerCase();
    $.ajax({
        type: 'GET',
        url: url,
        //data:data,
        async: false,
        dataType: 'json',
        success: function (data) {
            //Do stuff with the JSON data
            points = data.about.browniePoints;
        },
        error: function ( /* xhr, textStatus, errorThrown */ ) {
            points = 0;
        }
    });
    return points;
}


function dataFormatter(image, name, uname, points) {
    "use strict";

    var tempHtml = '<td>';
    tempHtml += '<img src=' + image +
        ' class="img-thumbnail" width="50px" ></img></td>';
    tempHtml += '<td>';
    tempHtml += '<h3>' + name + '</h3></td>';
    tempHtml += '<td>';
    tempHtml += '<h3><a href="http://freecodecamp.com/' + uname +
        '" target="_blank">' + uname + '</a></h3></td>';
    tempHtml += '<td>';
    if (points === 0) {
        tempHtml += '<h3><span class="label label-warning">' + points +
            '</span></h3></td>';
    } else {
        tempHtml += '<h3>' + points + '</h3></td>';
    }

    return tempHtml;
}


function getData(jsonData) {
    "use strict";

    //alert(json["array"].length
    var len = jsonData.length;
    var sum = 0;
    for (var i = 0; i < len; i = i + 1) {
        if (jsonData[i].id !== '546fc9f1db8155e6700d6e8c' &&
            jsonData[i].id !== '5433c4b0163965c9bc209625' &&
            jsonData[i].id !== '572db9c4c43b8c6019719c7a' &&
            jsonData[i].id !== '570a6857187bb6f0eadec072') {
            points = browniePointsFetcher(jsonData[i].username);
            sum += points;
            arr.push({
                avatar: jsonData[i].avatarUrlSmall,
                name: jsonData[i].displayName,
                uname: jsonData[i].username,
                points: points
            });

            $('.progress-bar').css({
                width: (i / len) * 100 + '%'
            });
        }
    }
    $('.progress-bar').prop("hidden", true);


    arr.sort(function (a, b) {
        return a.points - b.points;
    });

    arr.reverse();
    var j = 0;


    html += arr.map(function (a) {
        j = j + 1;
        return '<tr><td>' + (j) + '</td>' + dataFormatter(a.avatar, a
            .name, a.uname, a.points) + '</tr>';
    }).join('');
    html += '</table>';

    $("#data").html(html);

    //var a = $("#data").html();
    $("#campers").html(
        '<h2><span class="label label-info">Total Campers:- ' + j +
        '</span></h2>');
    $("#totalProblems").html(
        '<h2><span class="label label-info">Total Problems:- ' + sum +
        '</span></h2>');

}
