const trackList = [
  'Arkady_Antsyrev-Ne_vspominaem',
  'Ishome-Ken_Tavr',
  'Pobeg-Mosty',
];

const autorSong = document.querySelector('#songAutor');
const nameSong = document.querySelector('#songName');
const coverSong = document.querySelector('#songCover');

const currnentTimeText = document.querySelector('#currTime');
const durationTimeText = document.querySelector('#allTime');
const buttonPrevSong = document.querySelector('#buttonPrev');
const buttonNextSong = document.querySelector('#buttonNext');
const buttonPlay = document.querySelector('#buttonPause');
const progressBar = document.querySelector('.progress-bar__item');
const playerBackImg = document.querySelector('.container__bg-image');
const volumeRange = document.querySelector('#volume');
const volumeValueText = document.querySelector('#volumeValue');

const bgImage = document.querySelector('.container__bg-image');
const equalizer = Array.from(document.querySelectorAll('.equalizer .line'));

const audio = new Audio();
let isPlay = false;
let currentTrack = trackList[0];
const trackListLength = trackList.length - 1;
audio.volume = 0.5;

function animations() {
  if (isPlay === false) {
    bgImage.classList.add('paused');
    equalizer.forEach((elem) => elem.classList.add('hide'));
    // equalizer.style.animationPlayState = 'running';
  } else {
    bgImage.classList.remove('paused');
    equalizer.forEach((elem) => elem.classList.remove('hide'));
  }
}

function updatePlayButton() {
  if (!isPlay && buttonPlay.classList.contains('button-stop')) {
    buttonPlay.classList.remove('button-stop');
    buttonPlay.classList.add('button-play');
  } else {
    buttonPlay.classList.remove('button-play');
    buttonPlay.classList.add('button-stop');
  }
}

volumeRange.addEventListener('input', updateVolumeText);
function updateVolumeText() {
  audio.volume = volumeRange.value;
  const vol = audio.volume * 100;
  volumeValueText.textContent = `${vol.toFixed(0)}%`;
}

function updatePlayer(song) {
  const info = song.split('-');
  autorSong.textContent = info[0].replace(/_/g, ' ').toUpperCase();
  nameSong.textContent = info[1].replace(/_/g, ' ');
  audio.src = `./assets/music/${song}.mp3`;
  coverSong.src = `./assets/image/${song}.png`;
  playerBackImg.style.backgroundImage = `url('./audio-player/assets/image/${song}.png')`;
  progressBar.value = 0;
  audio.volume = volumeRange.value;
  updateVolumeText();
  animations();
}
updatePlayer(currentTrack);

function updateProgressBar() {
  let durationTime = audio.duration || 0;
  if (!isNaN(durationTime)) {
    durationTime = Math.round(durationTime);
    const currentTime = Math.round(audio.currentTime);
    durationTimeText.textContent = calcTime(durationTime);

    if (isPlay) {
      currnentTimeText.textContent = calcTime(currentTime);
      progressBar.value = (currentTime / durationTime) * 100;
    }
  }
}

function playSong() {
  audio.volume = 0.5;
  isPlay = true;
  audio.play();
  animations();
  updateProgressBar();
  updatePlayButton();
}

function pauseSong() {
  isPlay = false;
  audio.pause();
  animations();
  updateProgressBar();
  updatePlayButton();
}

function nextSong() {
  const currentTrackIndex = trackList.indexOf(currentTrack);
  if (currentTrackIndex < trackListLength) {
    currentTrack = trackList[currentTrackIndex + 1];
    updatePlayer(currentTrack);
    playSong();
  }
  if (currentTrackIndex === trackListLength) {
    [currentTrack] = trackList;
    updatePlayer(currentTrack);
    playSong();
  }
}

function prevSong() {
  const currentTrackIndex = trackList.indexOf(currentTrack);
  if (currentTrackIndex !== 0) {
    currentTrack = trackList[currentTrackIndex - 1];
    updatePlayer(currentTrack);
    playSong();
  }
  if (currentTrackIndex === 0) {
    currentTrack = trackList[trackListLength];
    updatePlayer(currentTrack);
    playSong();
  }
}

function calcTime(num) {
  const sec = parseInt(num, 10);
  const min = parseInt(sec / 60, 10);
  const a = sec % 60;
  let b = String(a);
  b = b.padStart(2, 0);
  return `${min}:${b}`;
}

function updatePlayTrack() {
  const durationTime = audio.duration;
  const newCurrentTime = (progressBar.value / 100) * durationTime;
  audio.currentTime = newCurrentTime;
}

buttonNextSong.addEventListener('click', nextSong);
buttonPrevSong.addEventListener('click', prevSong);
buttonPlay.addEventListener('click', () => {
  if (!isPlay) {
    playSong();
  } else {
    pauseSong();
  }
});

progressBar.addEventListener('input', updatePlayTrack);
audio.addEventListener('timeupdate', () => {
  updateProgressBar();
});

audio.addEventListener('ended', () => {
  nextSong();
});
