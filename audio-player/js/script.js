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

const progressTime = document.querySelector('#currTime');

function updateBar () {
    if (isPlay) {
        console.log();
        let time = audio.currentTime;
        progressTime.innerHTML = ''
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

    return `${min}:`



}

calcTime(421.511825);

 


const buttonPlay = document.querySelector('#buttonPause');
buttonPlay.addEventListener('click', () => {
  if (!isPlay) {
    playSong();
    updateBar(audio);
    console.log(audio.duration);
  } else {
    pauseSong();
    updateBar(audio);
  }
})

function playSong() {
  audio.volume = 0.5;
  isPlay = true;
  audio.play();
}

function pauseSong() {
  isPlay = false;
  audio.pause();

}
