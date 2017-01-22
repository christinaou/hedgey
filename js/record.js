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


function transferImage(capImage) {
  var url = "https://hedgey.herokuapp.com/store";
  var formData = new FormData();
  formData.append("ifile", capImage, "image.png");
  var xhr = new XMLHttpRequest();
  console.log(capImage);
  xhr.open('POST', url, true);
  xhr.send(formData);
}


function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }

  var video = document.getElementById("screenVid");
  var canvas = document.getElementById("canv");
  console.log(canvas);
  canvas.getContext("2d").drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
  console.log(canvas);
  var dataURL = canvas.toDataURL();
  console.log(dataURL);

  transferImage(dataURL);
  // var dataURL = canvas.toDataURL("image/png");
  // var sixFourImg = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // transferImage(sixFourImg);
  // $("#replace").src = sixFourImg;
}




function stopRecording() {
  console.log('lol');
  

  recorder.stop();
  recorder.exportWAV(function(s) {

  });
  
  

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








