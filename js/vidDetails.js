var xhr = new XMLHttpRequest();

// **NOT NEEDED WHEN CONNECTED TO REST

var vid;

function showVideo(video) {
	
    document.getElementById('user').style.display = 'none';
    document.getElementById('video').style.display = 'block';
    
    $('#video').animate({'opacity':'0'}, 'fast');
    $('#user').animate({'opacity':'0'}, 'fast');
    $('#video').animate({'opacity':'1'}, 'slow');

    $('#vidFeat').empty();

	vid = video;
	addDetails();
	appendUL();
	google.charts.setOnLoadCallback(drawVidChart);
}

function addDetails() {
    var vidData = vid.videoData;
    var url = "https://www.youtube.com/embed/" + vidData.id;
    document.getElementById('vidURL').src = url;
    document.getElementById('vidTitle').innerHTML = vidData.title;
    document.getElementById('vidChannelID').innerHTML = vidData.channelID;
    document.getElementById('vidType').innerHTML = vidData.type;
    document.getElementById('vidGenre').innerHTML = vidData.genre;
    document.getElementById('vidChannelName').innerHTML = vidData.channelName;
    document.getElementById('vidPubDate').innerHTML = vidData.publishedDate;
    document.getElementById('vidDescrp').innerHTML = vidData.description;
}

function appendUL() {
	var vidFeats = vid[vid.videoData.id]; 	// CHANGEEEEEEEE
	var arr = [];

	arr[0] = vidFeats.popularity;
	arr[1] = vidFeats.sentimentScore;
	arr[2] = vidFeats.peakDaysAfter;

	arr[3] = vidFeats.numVideosOnChannel;
	arr[4] = vidFeats.numTopicDetails;
	arr[5] = vidFeats.subscribersToViews;
	arr[6] = vidFeats.numCommentsToViews;
	arr[7] = vidFeats.titleLength;
	arr[8] = vidFeats.publishMonth;
	arr[9] = vidFeats.avgLenComments;
	arr[10] = vidFeats.durationToViews;
	arr[11] = vidFeats.likesToDislikes;
	arr[12] = vidFeats.viewsToDaysActive;
	arr[13] = vidFeats.bingMentions;
	arr[14] = vidFeats.numRepliesToNumComments;
	arr[15] = vidFeats.descrpLength;
	arr[16] = vidFeats.subscriberCount;
	arr[17] = vidFeats.likesToViews;
	arr[18] = vidFeats.definition;
	arr[19] = vidFeats.captioning;
	var finishedUL = makeUL(arr);
	document.getElementById('vidFeat').appendChild(finishedUL);
}

function makeUL(arr) {
	var list = document.createElement('ul');
	makeLI(list, 'Popularity', arr[0]);	
	makeLI(list, 'Sentiment score', arr[1]);
	makeLI(list, 'Peak days after', arr[2]);

	makeLI(list, 'Videos on channel', arr[3]);
	makeLI(list, 'Number of tagged topics', arr[4]);
	makeLI(list, 'Views to subscribers', arr[5]);
	makeLI(list, 'Number of comments to views', arr[6]);
	makeLI(list, 'Title length', arr[7]);
	makeLI(list, 'Published month', arr[8]);
	makeLI(list, 'Dislikes to views', arr[9]);
	makeLI(list, 'Average length of comments', arr[10]);
	makeLI(list, 'Likes to dislikes', arr[11]);
	makeLI(list, 'Views to days active', arr[12]);
	makeLI(list, 'Bing mentions', arr[13]);
	makeLI(list, 'Number of replies to comments', arr[14]);
	makeLI(list, 'Description length', arr[15]);
	makeLI(list, 'Subscribers', arr[16]);
	makeLI(list, 'Likes to views', arr[17]);
	makeLI(list, 'Definition', arr[18]);
	makeLI(list, 'Captioning', arr[19]);

	return list;
}

function makeLI(listLI, str, value) {
	var item = document.createElement('li');
	item.appendChild(document.createTextNode(str + ': ' + value));
	listLI.appendChild(item);
}



function drawVidChart() {
	var array = new Array(11);
	array[0] = ['Topics', 'Percentage'];

	var topics = vid.stmTopics;
	var i = 1;
	for (var x in topics) {
		array[i] = [x, topics[x]];
		i++;
	}

	var data = google.visualization.arrayToDataTable(array);

    var options = {
      title: 'Top 10 STM Video Topics',
      chartArea: { left: 0, top: 40 },
      colors: ['#204d74']
    };

    var chart = new google.visualization.BarChart(document.getElementById('vid-bar-chart'));

    chart.draw(data, options);
}



