		 
		 
    <script type="text/javascript">
      // Polyfilla
      navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      
      
      // Create a new instance of an audio object and adjust some of its properties

var audio_01 = new Audio();
audio_01.src = 'sons/In my craft or Sullen art D.mp3';
audio_01.controls = true;
audio_01.loop = true;
audio_01.autoplay = false;

// Establish all variables that your Analyser will use

var ac_01, m_01, c_01, ctx_01, source_01, context_01, main_01, stream_01;



// Initialize the MP3 player after the page loads all of its HTML into the window

window.addEventListener("load", initMp3Player_01, false);

function initMp3Player_01(){

	document.getElementById('audio_box_01').appendChild(audio_01);
	ac_01 = new AudioContext(); // AudioContext object instance
	m_01 = ac_01.createAnalyser(); // AnalyserNode method
	c_01 = document.getElementById('main_01');
	ctx_01 = c_01.getContext('2d');
	
	

// Re-route audio playback into the processing graph of the AudioContext

	source_01 = ac_01.createMediaElementSource(audio_01); 
	source_01.connect(m_01);
	m_01.connect(ac_01.destination)
    stream_01(audio_01);

}
 //ctx.font = "bold 16px Arial";
      //ctx.fillStyle = "#000";
      //ctx.lineWidth = 1;
      //ctx.strokeStyle = '#000';
      var spectrumLength = 512;
      var spectracount = 50;

      var previousAmplitudeSpectra = [];
      var previousSpectralCentroids = [];

      for(var i = 0; i < spectracount; i++){
        previousAmplitudeSpectra[i] = [];
        previousSpectralCentroids[i] = 0;
        for(var j = 0; j < spectrumLength; j++){
          previousAmplitudeSpectra[i][j] = 0;
        }
      }
      
     //var source = ac.createMediaElementSource(audio2); 
          function stream_01 () {
           
			var m_01 = new Meyda(ac_01,source_01,spectrumLength);
            
            
                setTimeout(function(){
              function draw(){
                ctx_01.clearRect(0, 0, c_01.width, c_01.height);
                requestAnimationFrame(draw);
                var features = m_01.get(['spectralCentroid','buffer','complexSpectrum']);
                var hannedBuffer = m_01.hanning(features.buffer);
                for (var i = previousAmplitudeSpectra.length - 1; i > 0; i--) {
                  previousAmplitudeSpectra[i] = previousAmplitudeSpectra[i-1];
                  previousSpectralCentroids[i] = previousSpectralCentroids[i-1];
                };
                previousAmplitudeSpectra[0] = features.amplitudeSpectrum;
                previousSpectralCentroids[0] = features.spectralCentroid;
                ctx_01.beginPath();
                ctx_01.moveTo(0,ctx_01.canvas.height/2);
                ctx_01.strokeStyle = "#000";
                for(var bin = 0; bin < features.complexSpectrum.real.length; bin++){
                  // Buffer Plot
                  ctx_01.lineTo(bin/spectrumLength*ctx_01.canvas.width,ctx_01.canvas.height/2+100*hannedBuffer[bin],1,1);
                }
                ctx_01.stroke();
                
                for(var i = 0; i < spectracount; i++){
                  ctx_01.beginPath();
                  // Amplitude Spectrum Plot
                  ctx_01.strokeStyle = "rgba(70,10,10,"+(1-i/spectracount)+")";
                  for(var bin = 0; bin < features.amplitudeSpectrum.length; bin++){
                    ctx_01.lineTo(i*6+Math.round(bin/features.amplitudeSpectrum.length*(c_01.width-i*12)),(ctx_01.canvas.height/(spectracount+i*2))*(spectracount-i)-50*previousAmplitudeSpectra[i][bin],1,1);
                  }
                  ctx_01.stroke();
                }
                // ctx.moveTo(0,features.)
              }
              draw();
            },1000);
          }
      
      
    </script>