const levels = require('../json/tasks.json');
const Modal = require('./modal');
let Sortable = require('./sortable');

class Levels {
  constructor() {
    this.levelsImages = [
      'src/resources/symbols/item1.png',
      'src/resources/symbols/item2.png',
      'src/resources/symbols/item3.png',
      'src/resources/symbols/item4.png',
      'src/resources/symbols/item5.png',
      'src/resources/symbols/item6.png',
      'src/resources/symbols/item7.png'
    ];
  }

  init() {
    let itemsBlock = `
      <div class='levelImages' id="levels">
        <img class='levelImg' src=${this.levelsImages[5]} alt="levels" data-value="1">
        <img class='levelImg' src=${this.levelsImages[1]} alt="levels" data-value="2">
        <img class='levelImg' src=${this.levelsImages[2]} alt="levels" data-value="3">
        <img class='levelImg' src=${this.levelsImages[3]} alt="levels" data-value="4">
        <img class='levelImg' src=${this.levelsImages[4]} alt="levels" data-value="5">
        <img class='levelImg' src=${this.levelsImages[0]} alt="levels" data-value="6">
        <img class='levelImg' src=${this.levelsImages[6]} alt="levels" data-value="7">
      </div>
      <h2 class="levelsText">Chose <br> task</h2>
    `;
    return itemsBlock;
  }
  set taskLevel(value) {
    this.task = value;
  }
  get taskLevel() {
    return this.task;
  }

  roundSymbols() {
    let images = document.querySelectorAll('.levelImg');
    let imagesNumber = this.levelsImages.length;
    for (let i = 0; i < imagesNumber; i++) {
      let angle = 2 / imagesNumber * i * Math.PI;
      let left = 200 + 170 * Math.sin(angle) + 'px';
      let top = 200 + 170 * Math.cos(angle) + 'px';
      images[i].style.top = top;
      images[i].style.left = left;
    }
  }

  choseLevel(n) {
    if (n === '3') {
      this.createLevel3(n);
      return this.taskLevel;
    } else {
      this.playLevel(n);
      return this.taskLevel;
    }
  }

  playLevel(n) {
    let arr = levels[n];
    let length = arr.length;
    let i = this.randomNumber(length, 0);
    this.taskLevel = levels[n][i];
  }

  randomNumber(max, min) {
    const n = Math.floor((Math.random() * (max - min)) + min);
    return n;
  }

  createLevel3(n) {
    let arr = levels[n];
    let sign = arr[this.randomNumber(4, 1)];
    let num1 = this.randomNumber(100, 1) + '';
    let num2 = this.randomNumber(100, 1) + '';
    let str = num1.concat(' ', sign, ' ', num2);
    let result = Math.floor(new Function('return ' + str)()) + '';
    let obj = {[str]: result};
    this.taskLevel = obj;
    return obj;
  }

  initLevel(n) {
    let task;
    let text;
    let taskBlock;
    for (let key in this.taskLevel) {
      task = key;
    }
    switch (n) {
      case '1' : {
        text = 'Please, translate the word into Russian language.';
        taskBlock = `<span class="word">${task}</span>
           <input type="text" id="userAnswer" placeholder="Enter your answer..."/>
        `;
        return this.playLevels(taskBlock, text);
      }
      case '2' : {
        text = 'Shuffle letters to get a word';
        taskBlock = `<div class="level2Word" id="level2Word"></div>`;
        return this.playLevels(taskBlock, text);
      }
      case '3' : {
        text = 'Solve the arithmetic task';
        taskBlock = `<span>*you have round to enteger </span>
            <span class="word">${task}</span>
            <input type="text" id="userAnswer" placeholder="Enter your answer..."/>`;
        return this.playLevels(taskBlock, text);
      }
      case '4' : {
        text = 'Please translate the word to English language.';
        taskBlock = `<span class="word">${task}</span>
        <input type="text" id="userAnswer" placeholder="Enter your answer..."/>`;
        return this.playLevels(taskBlock, text);
      }
      case '5' : {
        text = 'Write the answer in English language what is on the picture.';
        taskBlock = `<img class="picture" src=${task} alt="picture">
      <input type="text" id="userAnswer" placeholder="Enter your answer..."/>`;
        return this.playLevels(taskBlock, text);
      }
      case '6' : {
        text = 'Guess the riddle';
        taskBlock = `<span>${task}</span>
            <input type="text" id="userAnswer" placeholder="Enter your answer..."/>
            <span>*answer in English </span>`;
        return this.playLevels(taskBlock, text);
      }
      case '7' : {
        responsiveVoice.speak(task);
        text = 'Please, write translation of the word, that you heard';
        taskBlock = `<btn class="voice" id="voiceTask">Play</btn>
      <input type="text" id="userAnswer" placeholder="Enter your answer..."/>`;
        return this.playLevels(taskBlock, text);
      }
    }
  }

  playLevels(task, text) {
    let levelBlock = `
    <div class="levels">
      <h1>${text}</h1>
      <div class="task">${task}</div>
      <button type="submit" id="answerBtn" class="answerBtn">Answer</button>
    </div>
    `;
    return levelBlock;
  }

  fullLevel2() {
    let task2 = this.taskLevel.split('').sort(this.compareRandom);
    let div = document.getElementById('level2Word');
    Sortable.create(div);
    task2.forEach((item) => {
      let span = document.createElement('span');
      span.innerHTML = item;
      div.appendChild(span);
    });
  }

  fullLevel7() {
    let task;
    for (let key in this.taskLevel) {
      task = key;
    }
    let btn = document.getElementById('voiceTask');
    btn.addEventListener('click', () => {
      responsiveVoice.speak(task);
    });
  }

  checkAnswer(taskObject) {
    let userAnswer = document.getElementById('userAnswer');
    let answer;
    for (let key in taskObject) {
      answer = taskObject[key];
    }

    if (userAnswer.value) {
      if (userAnswer.value === answer) {
        let res = this.randomNumber(10, 30);
        let arm = document.getElementById('heroArm');
        arm.classList.add('heroFightMonster');
        return res;
      } else {
        let res = this.randomNumber(10, 30);
        return -res;
      }
    } else {
      alert ('please enter your answer');
      return false;
    }
  }

  checkAnswerLeve2() {
    let text = document.getElementById('level2Word');
    let res;
    if (text.textContent === this.taskLevel) {
      res = this.randomNumber(10, 30);
      let arm = document.getElementById('heroArm');
      arm.classList.add('heroFightMonster');
    } else {
      res = -this.randomNumber(10, 30);
    }
    return res;
  }

  finishGame() {
    let block = document.getElementById('block');
    let img = document.createElement('img');
    img.setAttribute('src', 'src/resources/img/gameOver.png');
    img.classList.add('gameOver');
    block.appendChild(img);
    let tryAgain = document.createElement('div');
    tryAgain.classList.add('tryAgain');
    tryAgain.innerHTML = 'Try Again';
    tryAgain.addEventListener('click', () => {
      let start = document.getElementById('startText');
      block.removeAttribute('style');
      block.setAttribute('backgroundImage', 'src/resources/img/start-bg.jpg');
      block.getAttribute('style');
      start.style.display = 'flex';
      img.style.display = 'none';
      tryAgain.style.display = 'none';
      tableScore.style.display = 'none';
    });
    let tableScore = document.createElement('div');
    tableScore.classList.add('tableScoreButton');
    tableScore.innerHTML = 'Show Table Score';
    tableScore.addEventListener('click', () => {
      this.createTableScore();
    });
    block.appendChild(tryAgain);
    block.appendChild(tableScore);
  }

  createTableScore() {
    let tableScore = `
    <div class="tableScore" id="tableScore">
        <h1>Table Score</h1>
    </div>`;
    let ts = new Modal();
    ts.show(400, tableScore);
    let tableSc = document.getElementById('tableScore');
    let items = JSON.parse(localStorage.getItem('users'));
    let top = (items.length >= 15) ? items.slice(0, 15) : items;
    let length = top.length;
    for (let i = 0; i < length; i++) {
      let div = document.createElement('div');
      div.classList.add('item');
      let span1 = document.createElement('span');
      let span2 = document.createElement('span');
      span1.innerHTML = top[i]['name'];
      span2.innerHTML = top[i]['monsterNumbers'];
      div.appendChild(span1);
      div.appendChild(span2);
      tableSc.appendChild(div);
    }
  }

  compareRandom() {
    return Math.random() - 0.5;
  }
}
module.exports = Levels;
