import Hls from 'hls.js'

export function ready() {
    const username = document.querySelector('[data-username]')?.dataset.username
    if (!username) return console.debug("username not exist")

    const videoEl = document.getElementById('video');
    if (!videoEl) return console.debug("videoEl not exist")

    const videoContainerEl = document.getElementById('video-container');
    if (!videoContainerEl) return console.debug("videoContainer not exist")

    const streamUrl = `http://localhost:8888/${username}/index.m3u8`

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.on(Hls.Events.ERROR, function (event, data) {
            videoContainerEl.textContent = "Nie ma streama i nie będzie"
        })

        hls.loadSource(streamUrl);
        hls.attachMedia(videoEl);

        hls.on(Hls.Events.MEDIA_ATTACHED, function onMediaAttached() {
            videoEl.muted = true;
            videoEl.play();
        });

    }
// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
// This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.addEventListener('canplay', function () {
            video.play();
        });
    }
}

