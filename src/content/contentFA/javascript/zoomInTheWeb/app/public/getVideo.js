(function() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

	var streaming = false;
	
  var video = document.getElementById('video');
   var canvas = document.getElementById('canvas');
  var  photo = document.getElementById('photo');
  var  startbutton = document.getElementById('startbutton');
	
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
.then(function(stream) {
	console.log(stream)
		video.srcObject = stream;
		video.play();
})
.catch(function(err) {
		console.log("An error occurred: " + err);
});

video.addEventListener('canplay', function(ev){
	console.log('can play')
	console.log(ev)
	if (!streaming) {
		height = video.videoHeight / (video.videoWidth/width);
	
		video.setAttribute('width', width);
		video.setAttribute('height', height);
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		streaming = true;
	}
}, false);
})()