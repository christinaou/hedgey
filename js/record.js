var recording = false;


var onFail = function(e) {
            console.log('Rejected!', e);
          };

var onSuccess = function(s) {
  var context = new AudioContext();
  var mediaStreamSource = context.createMediaStreamSource(s);
  recorder = new Recorder(mediaStreamSource);
  recorder.record();

  // audio loopback
  // mediaStreamSource.connect(context.destination);
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var recorder;
var audio = document.querySelector('audio');

function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }
}

function postSpeech() {
  var xmlhttp = new XMLHttpRequest();
    var url = "https://hedgey.herokuapp.com";
    var params = "file=myFile";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.send(params);
}


function stopRecording() {
  console.log('lol');
  recorder.stop();
  recorder.exportWAV(function(s) {
    audio.src = URL.createObjectURL(s);

    var fd = new FormData();
    fd.append('fname', 'test.wav');
    console.log(myFile);
    console.log('heh');
    fd.append('data', myFile);
    $.ajax({
        type: 'POST',
        url: 'https://hedgey.herokuapp.com',
        data: fd,
        processData: false,
        contentType: false
    }).done(function(data) {
           console.log(data);
    });
  });




  // var formData = new FormData();
  // formData.append("speechFile.wav", myFile);

  // console.log('created formData');
  // var request = new XMLHttpRequest();
  // request.open("POST", "https://hedgey.herokuapp.com");
  // request.send(formData);
  // console.log('sent');

}



function clickRecord() {
  if (!recording) {
    console.log('Start recording');
    startRecording();
    recording = true;
  } else {
    console.log('End recording');
    stopRecording();
    recording = false;
  }
}