(function () {

    // Playlist array
    var files = [
        "./sons/acousmatic_perc_explo_01.mp3",
        "./sons/acousmatic_perc_explo_02.mp3",
        "./sons/acousmatic_perc_explo_03.mp3",
        "./sons/acousmatic_perc_explo_04.mp3",
        "./sons/acousmatic_perc_explo_05.mp3",
        "./sons/acousmatic_perc_explo_06.mp3",
        "./sons/acousmatic_perc_explo_07.mp3",
        "./sons/acousmatic_perc_explo_08.mp3",


    ];

    // Current index of the files array
    var current = 0;

    // Get the audio element
    var playlistPlayer = document.querySelector("#playlist audio");

    // function that will be call at the end of the previous
    function next() {
        // Check for last media in the playlist
        if (current === files.length - 1) {
            current = 0;
        } else {
            current++;
        }

        // Change the audio element source
        playlistPlayer.src = files[current];
    }

    // Check if the player is in the DOM
    if (playlistPlayer === null) {
        throw "Playlist Player does not exists ...";
    } else {
        // Start the player
        playlistPlayer.src = files[current];

        // Listen for the playback ended event, to play the next media
        playlistPlayer.addEventListener('ended', next, false)
    }

})();