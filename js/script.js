// $('.backbtn').on('click', function() {
//   if (window.location.href == "tester.html") {
//     console.log('lol');
//     window.location.href = "index.html";

//   } else {
//     console.log('hii');
//     window.location.href = "html/tester.html";
//   }

// });

var errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

var successCallback = function(e) {
  console.log('Accepted', e);
};

// Not showing vendor prefixes.
navigator.getUserMedia({video: true, audio: false}, function(localMediaStream) {
  var video = document.querySelector('video');
  video.src = window.URL.createObjectURL(localMediaStream);

  // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
  // See crbug.com/110938.
  video.onloadedmetadata = function(e) {
    // Ready to go. Do some stuff.
  };
}, errorCallback);

var vgaConstraints = {
  video: {
    facingMode: {
      "environment"
    },
    mandatory: {
      maxWidth: 600,
      maxHeight: 904
    }
  }
};

navigator.getUserMedia(vgaConstraints, successCallback, errorCallback);

// $('.backbtn').on('click', function() {
//   console.log("CLICKK");
//   var canvas = document.getElementById("vidId");
//   var img    = canvas.toDataURL("image/png");
// });









