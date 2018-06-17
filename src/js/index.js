const Game = require('./game');
const block = document.getElementById('block');

block.addEventListener('click', (e) => {
  chooseItem(e);
});

function chooseItem(e) {
  const game = new Game();
  let attribute = e.target.getAttribute('id');
  switch (attribute) {
    case 'start' : {
      game.startGame();
      game.playMusic('src/resources/audio/jungle.mp3');
      break;
    }
    case 'newPlayers' : {
      game.createNewPlayer();
      break;
    }
    case 'table' : {
      game.showTableScore();
      break;
    }
    case 'player' : {
      game.stopMusic();
      break;
    }
  }
}

