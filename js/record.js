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


function transferImage(image) {
  var url = "https://hedgey.herokuapp.com/upload";
  var formData = new FormData();
  formData.append("file", image, "image.png");
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.send(formData);
}


function stopRecording() {
  console.log('lol');
  var video = document.getElementById("screenVid");
  var canvas = document.getElementById("canv");
  canvas.getContext("2d").drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
  var capturedImg = canvas.toDataURL("image.png");
  $("#replace").src = capturedImg;
  recorder.stop();
  recorder.exportWAV(function(s) {

  });
  
  transferImage(capturedImg);

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



/* RESULTS */

function results(x) {
  var res = x;
  if (res == []) {
    console.log("Wrong");
  } else {
    console.log("Right");
    for (var i = 0; i < len(res); i++) {
      console.log(res[i]);
    }
  }
}








