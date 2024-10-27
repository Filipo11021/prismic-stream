import Hls from 'hls.js'

export function ready() {
    const channelId = document.querySelector('[data-channel-id]')?.dataset.channelId
    if (!channelId) return console.debug("channelId not exist")

    const videoEl = document.getElementById('video');
    if (!videoEl) return console.debug("videoEl not exist")

    const offlineMessage = document.getElementById('offline-message');
    if (!videoEl) return console.debug("offlineMessage not exist")

    const videoContainerEl = document.getElementById('video-container');
    if (!videoContainerEl) return console.debug("videoContainer not exist")

    const streamUrl = `http://localhost:8888/${channelId}/index.m3u8`

    if (Hls.isSupported()) {
        const hls = new Hls();

        hls.on(Hls.Events.ERROR, function () {
            videoEl.classList.add('hidden');
            offlineMessage.classList.remove('hidden');
        });

        hls.on(Hls.Events.MANIFEST_LOADED, function() {
            videoEl.classList.remove('hidden');
            offlineMessage.classList.add('hidden');
        });

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
    else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
        videoEl.src = streamUrl;
        videoEl.addEventListener('canplay', function () {
            videoEl.play();
        });
    }
}
