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

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;

    //Cast to a File() type
    return theBlob;
}

function stopRecording() {
  recorder.stop();
  var myBlob = recorder.exportWAV(function(s) {
    audio.src = URL.createObjectURL(s);
  });
  var myFile = blobToFile(myBlob, "sound.wav");
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