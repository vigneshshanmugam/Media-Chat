var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};

var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 500,
      maxHeight: 500	
    }
  }
};

var canvasFeed = document.getElementById('feedCanvas');
var ctx = canvasFeed.getContext('2d');
var image = document.querySelector('image');
var video = document.querySelector('video');
var captureBtn = document.getElementById('captureBtn');

captureBtn.addEventListener('click',function(){

	if (videoAvailable) {

		ctx.drawImage(video,0,0,video.clientWidth,video.clientHeight);
		image.src = canvasFeed.toDataURL('image/webp');
	};
});


var startBtn = document.getElementById('startBtn');
startBtn.onclick = function(){
	document.getElementById('contextArea').style.visibility = "visible";
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
 
    if (navigator.getUserMedia) {
    
        navigator.getUserMedia(vgaConstraints, successCallback, errorCallback);
    } else {
    	document.getElementById('error').innerHTML = "WebRTC is not support in the browser.Upgrade your browser and restart again"
        console.log('getUserMedia not supported in this browser.');
    }


   function successCallback(stream) {
       videoAvailable = true;
        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
        video.play();
        captureBtn.style.visibility = "visible";
    }

    function errorCallback(error) {
        console.error("Error Occured" + error);

    }
};

//Render - Video in Canvas

window.requestAnimationFrame = window.requestAnimationFrame || 
			(window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            });


var renderEverything = (function(){

	var aniCanvas = document.getElementById('animatedCanvas');
	var anCtxt = aniCanvas.getContext('2d');

	function renderCanvas() {
            window.requestAnimationFrame(renderCanvas);
            anCtxt.drawImage(video, 0, 0, video.clientWidth,video.clientHeight);
        
	}

})();








