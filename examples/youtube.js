var vlc = require('../vlc')([
    '-I', 'dummy',
    '-V', 'dummy',
    '--verbose', '1',
    '--no-video-title-show',
    '--no-disable-screensaver',
    '--no-snapshot-preview'
]);

var ytdl = require('ytdl-core');
ytdl.getInfo('https://www.youtube.com/watch?v=uInltd4OkTQ', {

}, function (err, info) {
    var url = info.formats[0].url;
    var media = vlc.mediaFromUrl(url);
    console.log('play '+url);
    media.parseSync();
    media.track_info.forEach(function (info) {
        console.log(info);
    });

    console.log(media.artist, '--', media.album, '--', media.title);

    var player = vlc.mediaplayer;
    player.media = media;
    console.log('Media duration:', media.duration);

    player.play();
    var POS = 0.5
    player.position = POS;

    var poller = setInterval(function () {
        return;
        //console.log('Poll:', player.position);
        if (player.position < POS)
            return;

        try {
            if (player.video.track_count > 0) {
                //player.video.take_snapshot(0, "test.png", player.video.width, player.video.height);
            }
            //console.log('Media Stats:', media.stats);
        } catch (e) {
            console.log(e);
        }
        finally {
            if (player.position < 0.7)
                return;

            player.stop();

            media.release();
            vlc.release();

            clearInterval(poller);
        }
    }, 100);

});