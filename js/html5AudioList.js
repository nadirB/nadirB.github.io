// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform );


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !! document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false;
        mediaPath = 'sons/quaregnon_rehearsal_01.mp3',
        extension = '',
        tracks = [{
            "track": 1,
            "name": "quaregnon_rehearsal_01.mp3",
            "length": "02:22",
            "file": "JLS_ATI"
        }, {
            "track": 2,
            "name": "acousmatic_perc_explo_02.mp3",
            "length": "1:50",
            "file": "BS_TF"
        }, {
            "track": 3,
            "name": "acousmatic_perc_explo_03.mp3",
            "length": "05:01",
            "file": "BS_ATKM"
        }, {
            "track": 4,
            "name": "acousmatic_perc_explo_04.mp3",
            "length": "08:32",
            "file": "BSFM_TF"
        }, {
            "track": 5,
            "name": "acousmatic_perc_explo_05.mp3",
            "length": "05:05",
            "file": "BSFM_ATKM"
        }, {
            "track": 6,
            "name": "acousmatic_perc_explo_06.mp3",
            "length": "02:49",
            "file": "AC_ATI"
        }, {
            "track": 7,
            "name": "acousmatic_perc_explo_07.mp3",
            "length": "05:44",
            "file": "AC_ATKMTake_1"
        }, {
            "track": 8,
            "name": "quaregnon_rehearsal_01.mp3",
            "length": "05:27",
            "file": "AC_ATKMTake_2"
        }],
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Now Playing...');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Paused...');
        }).bind('ended', function () {
            npAction.text('Paused...');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});