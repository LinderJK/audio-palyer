let trackList = [
  "Arkady_Antsyrev-Ne_vspominaem",
  "Ishome-Ken_Tavr",
  "Pobeg-Mosty"
];


const autorSong = document.querySelector('#songAutor');
const nameSong = document.querySelector('#songName');
const coverSong = document.querySelector('#songCover');
const audioPlayer = document.querySelector('.player');


const audio = new Audio();
let isPlay = false;
let currentTrack = trackList[0];
let trackListLength = trackList.length - 1;
updatePlayer(currentTrack);


function updatePlayer(song) {
  const info = song.split('-');
  autorSong.innerHTML = info[0].replace(/_/g, ' ');
  nameSong.innerHTML = info[1].replace(/_/g, ' ');
  audio.src = `./assets/music/${song}.mp3`;
  coverSong.src = `./assets/image/${song}.png`;
    
}

const buttonNextSong = document.querySelector('#buttonNext');
buttonNextSong.addEventListener('click', nextSong);

function nextSong() {
  let currentTrackIndex = trackList.indexOf(currentTrack);
  console.log('currentTrackIndex', currentTrackIndex);
  if (currentTrackIndex < trackListLength) {
    currentTrack = trackList[currentTrackIndex + 1];
    updatePlayer(currentTrack);
    playSong();
    console.log('currentTrackIndex', currentTrackIndex);
  }
  if (currentTrackIndex === trackListLength) {
    currentTrack = trackList[0];
    updatePlayer(currentTrack);
    playSong();
  }
}

const buttonPrevSong = document.querySelector('#buttonPrev');
buttonPrevSong.addEventListener('click', prevSong);

function prevSong() {
  let currentTrackIndex = trackList.indexOf(currentTrack);
  console.log('currentTrackIndex', currentTrackIndex);
  if (currentTrackIndex !== 0) {
    currentTrack = trackList[currentTrackIndex - 1];
    updatePlayer(currentTrack);
    playSong();
    console.log('currentTrackIndex', currentTrackIndex);
  }
  if (currentTrackIndex === 0) {
    currentTrack = trackList[trackListLength];
    updatePlayer(currentTrack);
    playSong();

  }
}

const progressTimeBar = document.querySelector('#currTime');
const allTimeBar = document.querySelector('#allTime');
function updateBar () {
    let allTime = audio.duration;
    allTimeBar.innerHTML = calcTime(allTime);
    //TODO FIX NAN
    if (isPlay) {
        console.log();
        let time = audio.currentTime;
        progressTimeBar.innerHTML = calcTime(time);
        setTimeout(updateBar, 1000);
    }
    else {
        return;
    }
}  

function calcTime (num) {
    let sec = parseInt(num);
    console.log(sec);
    let min = parseInt (sec / 60);
    console.log(min);
    let a = sec % 60;
    let b = String(a);
    b = b.padStart(2, 0 );
    console.log(a);
    console.log(b);
    return (`${min}:${b}`);
}



 


const buttonPlay = document.querySelector('#buttonPause');
buttonPlay.addEventListener('click', () => {
  if (!isPlay) {
    playSong();
    console.log(audio.duration);
  } else {
    pauseSong();
  }
})

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
