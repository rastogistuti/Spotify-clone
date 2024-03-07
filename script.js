console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('MasterPlay'); // Changed ID to match HTML
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.querySelector('.songInfo'); // Changed selector to match HTML
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "cover1.jpg" },
    // Add more songs as needed
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.querySelector(".songItem span").innerText = songs[i].songName; // Changed selector to match HTML
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
});

document.getElementById('prev').addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
});
