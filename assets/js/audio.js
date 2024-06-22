document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const seekSlider = document.getElementById("seekSlider");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");
    const muteBtn = document.getElementById("muteBtn");
    const volumeSlider = document.getElementById("volumeSlider");

    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "Pause";
        } else {
            audio.pause();
            playPauseBtn.textContent = "Play";
        }
    });

    audio.addEventListener("timeupdate", function () {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        seekSlider.value = (currentTime / duration) * 100;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    });

    seekSlider.addEventListener("input", function () {
        const duration = audio.duration;
        audio.currentTime = (seekSlider.value / 100) * duration;
    });

    muteBtn.addEventListener("click", function () {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? "Unmute" : "Mute";
    });

    volumeSlider.addEventListener("input", function () {
        audio.volume = volumeSlider.value / 100;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
});
