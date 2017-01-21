var xhr = new XMLHttpRequest();

// **NOT NEEDED WHEN CONNECTED TO REST
var query = "VIDEO ID";
var type = "REST API CALL";

var user;

function showUser(u) {
    $('#video').animate({'opacity':'0'}, 'fast');
    $('#user').animate({'opacity':'0'}, 'fast');
    $('#user').animate({'opacity':'1'}, 'fast');

    document.getElementById('video').style.display = 'none';
    
    $('#subscribers').empty();
    $('#uploadVids').empty();
    $('#likedVids').empty();
    user = u;

    addDescriptions();
    addSubscribers();
    addUploadVids();
    addLikedVids();

    google.charts.setOnLoadCallback(drawUserChart);
    document.getElementById('user').style.display = 'block';
}

function addDescriptions() {
    document.getElementById('userImage').src = user.thumbnailURL;
    document.getElementById('username').innerHTML = user.username;
    document.getElementById('userChannelID').innerHTML = user.channelID;
    document.getElementById('userChannelDescrp').innerHTML = user.description;
}

function drawUserChart() {
    var array = new Array(11);
    array[0] = ['Topics', 'Percentage'];
    var topics = user.stmTopics;
    var i = 1;
    for (var x in topics) {
        array[i] = [x, topics[x]];
        i++;
    }

    var data = google.visualization.arrayToDataTable(array);

    var options = {
      title: 'Top 10 STM User Topics',
      chartArea: { left: 0, top: 40 }
    };

    var chart = new google.visualization.BarChart(document.getElementById('userBarChart'));
    chart.draw(data, options);
}

function addSubscribers() {
    var list = user.subscriptions;
    var result;
    if (list == null || list.length == 0) {
        result = document.createElement('p');
        result.appendChild(document.createTextNode('No public subscriptions'));
    }
    else {
        var ul = document.createElement('ul');
        for (var i = 0; i < list.length; i++) {
            appendLI(list[i], ul);
        }
        result = ul;
    }
    document.getElementById('subscribers').appendChild(result);
}

function addUploadVids() {
    var list = user.uploadVideos;
    var result;
    if (list == null || list.length == 0) {
        result = document.createElement('p');
        result.appendChild(document.createTextNode('No public uploaded videos'));
    }
    else {
        var ul = document.createElement('ul');
        for (var i = 0; i < list.length; i++) {
            appendLI(list[i].videoData, ul);
        }
        result = ul;
    }
    document.getElementById('uploadVids').appendChild(result);
}

function addLikedVids() {
    var list = user.likedVideos;
    var result;
    if (list == null || list.length == 0) {
        result = document.createElement('p');
        result.appendChild(document.createTextNode('No public liked videos'));
    }
    else {
        var ul = document.createElement('ul');
        for (var i = 0; i < list.length; i++) {
            appendLI(list[i], ul);
        }
        result = ul;
    }
    document.getElementById('likedVids').appendChild(result);
}

function appendLI(x, ul) {
    var title = x.title;
    var descrp = x.id;
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(title + " -- " + descrp));
    ul.appendChild(item);
}