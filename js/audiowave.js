// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes





// Create a new instance of an audio object and adjust some of its properties

var audio = new Audio();
audio.src = 'sons/In my craft or Sullen art D.mp3';
audio.controls = true;
audio.loop = false;
audio.autoplay = false;

// Establish all variables that your Analyser will use

var canvas, ctx, source, context, analyser, stream, fbc_array, bars, bar_x, bar_width, bar_height;



// Initialize the MP3 player after the page loads all of its HTML into the window

window.addEventListener("load", initMp3Player, false);

function initMp3Player(){

	document.getElementById('audio_box').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	//context = new mozAudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
	canvasContext = canvas.getContext('2d');
	analyser.minDecibels = -90;
	analyser.maxDecibels = -10;
	analyser.smoothingTimeConstant = 0.85;
	

// Re-route audio playback into the processing graph of the AudioContext

	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination)
    visualize(audio);

}








 function visualize() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount; // half the FFT value
    var dataArray = new Uint8Array(bufferLength); // create an array to store the data

    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

      canvasContext.fillStyle = '#181818'; // draw wave with canvas
      canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = '#3cfd2a';

      canvasContext.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasContext.lineTo(canvas.width, canvas.height/2);
      canvasContext.stroke();
    }

    draw();  
  }
