const Monster = require('./monsters');
const User = require('./user');
const Modal = require('./modal');
const Levels = require('./levels');

let newUser = new User();
let levels = new Levels();
let monster = new Monster();

class Game {
  constructor() {
    this.monsterBlock = document.getElementById('monster');
    this.monsterBlockInfo = document.getElementById('monsterInfo');
    this.heroBlock = document.getElementById('hero');
    this.heroBlockInfo = document.getElementById('heroInfo');
    this.heroBlock.addEventListener('click', this.choseLevel.bind(Game));
  }

  startGame() {
    let block = document.getElementById('block');
    let startText = document.getElementById('startText');
    let game = document.getElementById('game');
    block.style.backgroundImage = "url('src/resources/img/bg3.jpg')";
    startText.style.display = 'none';
    game.classList.remove('invisible');
    monster.createMonster(this.monsterBlock);
    monster.createMonsterInfo(this.monsterBlockInfo);
    newUser.createHero(this.heroBlock);
    newUser.createHeroInfo(this.heroBlockInfo);
  }

  createNewPlayer() {
    let modalUser = new Modal();
    let user = newUser.init();
    modalUser.show(400, user);
    const btn = document.getElementById('saveNewUser');
    let heroes = document.getElementById('heroes');
    heroes.addEventListener('click', (e) => {
      newUser.hero = e.target.getAttribute('src');
    });
    btn.addEventListener('click', () => {
      if (newUser.saveUser()) {
        modalUser.close();
      }
    }
    );
  }

  choseLevel() {
    let modalLevels = new Modal();
    let n;
    modalLevels.show(400, levels.init());
    monster.addMonsterArm();
    newUser.addHeroArm();
    levels.roundSymbols();
    let levelsBlock = document.getElementById('levels');
    levelsBlock.addEventListener('click', (e) => {
      n = e.target.getAttribute('data-value');
      if (n) {
        modalLevels.close();
        let task = levels.choseLevel(n);
        let level = new Modal();
        level.show(600, levels.initLevel(n));
        if (n === '2') {
          levels.fullLevel2();
        } else if (n === '7') {
          levels.fullLevel7();
        }
        let answerBtn = document.getElementById('answerBtn');
        answerBtn.addEventListener('click', () => {
          let res;
          if (n === '2') {
            res = levels.checkAnswerLeve2();
          } else {
            res = levels.checkAnswer(task);
          }
          if (res > 0) {
            monster.changeMonsterHealth(res);
          } else {
            newUser.changeHeroHealth(res);
          }
          level.close();
          if (newUser.heroHealth <= 0 || monster.monsterHealth <= 0) {
            if (newUser.heroHealth <= 0) {
              newUser.saveToLocalStorage();
              newUser.died();
              monster.died();
              newUser.heroHealth = 100;
              monster.monsterHealth = 100;
              levels.finishGame();
            } else {
              monster.died();
              newUser.userScore += 1;
              monster.createMonster(document.getElementById('monster'));
              monster.monsterHealth = 100;
              monster.createMonsterInfo(document.getElementById('monsterInfo'));
            }
          }
          let num = monster.attackMonster();
          if (num > 0) {
            newUser.changeHeroHealth(num);
          } else {
            monster.changeMonsterHealth(num);
          }
        });
      }
    });
  }
  showTableScore() {
    levels.createTableScore();
  }
  playMusic(url) {
    let music = document.getElementById('music');
    music.setAttribute('src', url);
    music.play();
  }
  stopMusic() {
    let music = document.getElementById('music');
    if (music.getAttribute('value') === '1') {
      music.play();
      music.style.backgroundPosition = '-45px 10px';
      music.setAttribute('value', '0');
    } else {
      music.pause();
      music.style.backgroundPosition = '10px 10px';
      music.setAttribute('value', '1');
    }
  }
}
module.exports = Game;
