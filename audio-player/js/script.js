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
// const audioPlayer = document.querySelector(".player");

const audio = new Audio();
let isPlay = false;
let currentTrack = trackList[0];
const trackListLength = trackList.length - 1;

function updatePlayer(song) {
  const info = song.split('-');
  autorSong.innerHTML = info[0].replace(/_/g, ' ').toUpperCase();
  nameSong.innerHTML = info[1].replace(/_/g, ' ');
  audio.src = `./assets/music/${song}.mp3`;
  coverSong.src = `./assets/image/${song}.png`;
  playerBackImg.style.backgroundImage = `url('/audio-player/assets/image/${song}.png')`;
  progressBar.value = 0;
}
updatePlayer(currentTrack);

function updateProgressBar() {
  const durationTime = Math.round(audio.duration);
  const currentTime = Math.round(audio.currentTime);

  durationTimeText.innerHTML = calcTime(durationTime);
  if (isPlay) {
    // console.log();
    // const time = audio.currentTime;
    currnentTimeText.innerHTML = calcTime(currentTime);
    // const persentOfTime = (currentTime / durationTime) * 100;
    // progressBar.value = persentOfTime;
  }
}

function playSong() {
  audio.volume = 0.5;
  isPlay = true;
  audio.play();
  updateProgressBar();

}

function pauseSong() {
  isPlay = false;
  audio.pause();
  updateProgressBar();

}

function nextSong() {
  const currentTrackIndex = trackList.indexOf(currentTrack);
  // console.log('currentTrackIndex', currentTrackIndex);
  if (currentTrackIndex < trackListLength) {
    currentTrack = trackList[currentTrackIndex + 1];
    updatePlayer(currentTrack);
    playSong();
    // console.log('currentTrackIndex', currentTrackIndex);
  }
  if (currentTrackIndex === trackListLength) {
    [currentTrack] = trackList;
    // console.log('array distr', currentTrack);
    updatePlayer(currentTrack);
    playSong();
  }
}

function prevSong() {
  const currentTrackIndex = trackList.indexOf(currentTrack);
  // console.log('currentTrackIndex', currentTrackIndex);
  if (currentTrackIndex !== 0) {
    currentTrack = trackList[currentTrackIndex - 1];
    updatePlayer(currentTrack);
    playSong();
    // console.log('currentTrackIndex', currentTrackIndex);
  }
  if (currentTrackIndex === 0) {
    currentTrack = trackList[trackListLength];
    updatePlayer(currentTrack);
    playSong();
  }
}

function calcTime(num) {
  const sec = parseInt(num, 10);
  // console.log(sec);
  const min = parseInt(sec / 60, 10);
  // console.log(min);
  const a = sec % 60;
  let b = String(a);
  b = b.padStart(2, 0);
  // console.log(a);
  // console.log(b);
  // console.log(`${min}:${b}`);
  return `${min}:${b}`;
}

function updatePlayTrack() {
  if (progressBar.value === 0) {
    audio.currentTime = 0;
  }
  const time = Math.floor((progressBar.value * audio.duration) / 100);
  // console.log('proggress range',progressBar.value);
  // console.log(time);
  audio.currentTime = time;
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

progressBar.addEventListener('click', updatePlayTrack);
audio.addEventListener('timeupdate', (evt)=> {
  updateProgressBar();
});

audio.addEventListener('ended', (evt) => {
  console.log("FINISH");
  nextSong();
});