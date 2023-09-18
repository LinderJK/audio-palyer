let track = {
   0: './assets/music/Libercio-feeling_alright.mp3',

}

const contentDiv = document.querySelector('.player');
document.body.onload =()=> addPlayer(track[0]);


function addPlayer (trackUrl) {
    const player = new Audio();
    contentDiv.appendChild(player);
    player.setAttribute('src', trackUrl);
    playerButton();
}

// function playerButton () {
//     let buttonNext = document.createElement('button');
//     buttonNext.classList.add('button');
//     buttonNext.classList.add('button-next');
//     contentDiv.appendChild(buttonNext);

//     let buttonPrev = document.createElement('button');
//     buttonPrev.classList.add('button');
//     buttonPrev.classList.add('button-prev');
//     contentDiv.appendChild(buttonPrev);

//     let buttonPause = document.createElement('button');
//     buttonPause.classList.add('button');
//     buttonPause.classList.add('button-pause');
//     contentDiv.appendChild(buttonPause);
// }



