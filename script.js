// Select DOM Elements
const audioPlayer = document.getElementById('audio-player');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const songList = document.getElementById('song-list');


// Footer Elements
const footerPlayPauseButton = document.getElementById('footer-play-pause');
const footerPrevButton = document.getElementById('footer-prev');
const footerNextButton = document.getElementById('footer-next');
const footerAlbumArt = document.getElementById('footer-album-art');
const footerSongTitle = document.getElementById('footer-song-title');
const footerArtistName = document.getElementById('footer-artist-name');

// Songs Data
const songs = [
    { src: 'song1.mp3', title: 'Meherma', artist: 'Darshan Raval', albumArt: 'album1.jpg' },
    { src: 'song2.mp3', title: 'Asal Mein', artist: 'Darshan Raval', albumArt: 'album2.png' },
    { src: 'song3.mp3', title: 'Ek Ladki Ko', artist: 'Darshan Raval', albumArt: 'album3.png' },
];

let currentSongIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    albumArt.src = song.albumArt;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    footerAlbumArt.src = song.albumArt;
    footerSongTitle.textContent = song.title;
    footerArtistName.textContent = song.artist;

    // Set blurred background image
    const playerElement = document.querySelector('.player');
    playerElement.style.backgroundImage = `url(${song.albumArt})`;

    // Reset progress bar
    progressBar.value = 0;
    currentTime.textContent = '0:00';

    // Set the total time when metadata is loaded
    audioPlayer.onloadedmetadata = function() {
        totalTime.textContent = formatTime(audioPlayer.duration);
    };
}

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Toggle Play/Pause
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.textContent = '▶️';
        footerPlayPauseButton.textContent = '▶️';
    } else {
        audioPlayer.play();
        playPauseButton.textContent = '⏸️';
        footerPlayPauseButton.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

// Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = '⏸️';
    footerPlayPauseButton.textContent = '⏸️';
}

// Previous Song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = '⏸️';
    footerPlayPauseButton.textContent = '⏸️';
}

// Update Progress Bar
function updateProgressBar() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        currentTime.textContent = formatTime(audioPlayer.currentTime);
    }
}

// Sync progress bar to the song duration
audioPlayer.addEventListener('timeupdate', updateProgressBar);

// Handle Manual Progress Bar Change
progressBar.addEventListener('input', function() {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

// Event Listeners
playPauseButton.addEventListener('click', togglePlayPause);
footerPlayPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', nextSong);
footerNextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
footerPrevButton.addEventListener('click', prevSong);

// Playlist Song Selection
songList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const songIndex = Array.from(songList.children).indexOf(event.target);
        currentSongIndex = songIndex;
        loadSong(currentSongIndex);
        audioPlayer.play();
        isPlaying = true;
        playPauseButton.textContent = '⏸️';
        footerPlayPauseButton.textContent = '⏸️';
    }
});

// Initial Load
loadSong(currentSongIndex);
