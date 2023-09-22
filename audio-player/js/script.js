const trackList = [
  'Arkady_Antsyrev-Ne_vspominaem',
  'Ishome-Ken_Tavr',
  'Pobeg-Mosty',
];

const autorSong = document.querySelector('#songAutor');
const nameSong = document.querySelector('#songName');
const coverSong = document.querySelector('#songCover');

const progressTimeText = document.querySelector('#currTime');
const allTimeText = document.querySelector('#allTime');
const buttonPrevSong = document.querySelector('#buttonPrev');
const buttonNextSong = document.querySelector('#buttonNext');
const buttonPlay = document.querySelector('#buttonPause');
const progressRange = document.querySelector('.progress-bar__item');
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
}
updatePlayer(currentTrack);

function updateBar() {
  const allTime = audio.duration;
  allTimeText.innerHTML = calcTime(allTime);
  // TODO FIX NAN
  if (isPlay) {
    // console.log();
    const time = audio.currentTime;
    progressTimeText.innerHTML = calcTime(time);
    const persent = (time / allTime) * 100;
    progressRange.setAttribute('value', persent);
    setTimeout(updateBar, 1000);
  }
}

function playSong() {
  audio.volume = 0.5;
  isPlay = true;
  audio.play();
  updateBar();
}

function pauseSong() {
  isPlay = false;
  audio.pause();
  updateBar();
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
    console.log('array distr', currentTrack);
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
  console.log(`${min}:${b}`);
  return `${min}:${b}`;
}

function updatePlayTrack() {
  const time = (progressRange.value * audio.duration) / 100;
  audio.currentTime = time;
}

buttonNextSong.addEventListener('click', nextSong);
buttonPrevSong.addEventListener('click', prevSong);
buttonPlay.addEventListener('click', () => {
  if (!isPlay) {
    playSong();
    // console.log(audio.duration);
  } else {
    pauseSong();
  }
});
progressRange.addEventListener('change', updatePlayTrack);