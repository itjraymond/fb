// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '',
            extension = 'mp3',
            tracks = [{
                "track": 1,
                "name": "Airhead - Pyramid Lake",
                "length": "4:36",
                "file": "01"
            }, {
                "track": 2,
                "name": "Trimbal - Saying (Harmonimix)",
                "length": "4:19",
                "file": "02"
            }, {
                "track": 3,
                "name": "Andy Stott - New Romantic",
                "length": "5:39",
                "file": "03"
            }, {
                "track": 4,
                "name": "Frank Ocean - Deathwish (ASR)",
                "length": "1:19",
                "file": "04"
            }, {
                "track": 5,
                "name": "James Blake - Put That Away And Talk To Me",
                "length": "3:57",
                "file": "05"
            }, {
                "track": 6,
                "name": "Nicolas Jaar - Three Sides of Nazareth",
                "length": "9:54",
                "file": "06"
            }, {
                "track": 7,
                "name": "Andy Stott - Cracked",
                "length": "5:36",
                "file": "07"
            }, {
                "track": 8,
                "name": "Wolfgang Tillmans - Device Control",
                "length": "7:04",
                "file": "08"
            }, {
                "track": 9,
                "name": "Arca - Soldier",
                "length": "2:49",
                "file": "09"
            }, {
                "track": 10,
                "name": "Teebs - Track 03",
                "length": "3:12",
                "file": "10"
            }, {
                "track": 11,
                "name": "James Blake - Words That We Both Know",
                "length": "1:03",
                "file": "11"
            }, {
                "track": 12,
                "name": "Blonde Interview",
                "length": "4:18",
                "file": "12"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('+');
            }).bind('pause', function () {
                playing = false;
                npAction.text('-');
            }).bind('ended', function () {
                npAction.text('-');
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
