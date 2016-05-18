<script>
var audio;
var playlist;
var tracks;
var current;
 
init();
function init(){
    current = 0;
    audio = $('#audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length -1;
    audio[0].volume = 1.0;
//    audio[0].play();
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];   
        }
        run($(link),audio[0]);
    });
}
function run(link, player){
    $(player).find('#primarysrc').attr('src', link.attr('href'));
    $(player).find('#secondarysrc').attr('src', link.attr('data-altsrc'));
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    player.load();
    player.play();
}
</script>

</div>

<!-- /###########################################  

Well we start off by declaring our global variables, and than initialize the audio element.
We set the current index to 0, and using jquery (though you could use getElementByID as well) get the audio (or video) element we want to control, the playlist find the tracks, get the total number of tracks (-1 because the tracks are a 0 index array). We set the volume to 10% (so that the sound doesn’t blast our visitors), and than start playing our audio or video. Note that automatically paying audio and video is not really a good practice (unless for video you have volume at 0) as people don’t like getting surprised with sound and than have to hunt it down to mute it.

Next we set up our listeners, we listen for clicks in our playlist, as well as for when our track is ended (using the new ended event) so that we can play the next track. In this example we have it looping, so when it gets to the end of the play list, it goes back to the beginning.

finally we have a function that actually loads up and plays the song on the playlist. It gets the source from the link, changes the class to active (for css styling), loads the file (.load() is not to be confused with the jquery .load() method, the html5 .load() api hook is so that the html5 audio or video element knows to start loading a new resource) and than play the newly loaded resource. -->
