class Monster {
  constructor() {
    this.head = 'src/resources/monster-head/head2.png';
    this.body = 'src/resources/monster-body/body1.png';
    this.arm = 'src/resources/animals-arm/potion3.png';
    this.health = 100;
    this.monsterHeads = [
      'src/resources/monster-head/head1.png',
      'src/resources/monster-head/head2.png',
      'src/resources/monster-head/head3.png',
      'src/resources/monster-head/head4.png',
      'src/resources/monster-head/head5.png',
      'src/resources/monster-head/head6.png'
    ];
    this.monsterBodyes = [
      'src/resources/monster-body/body1.png',
      'src/resources/monster-body/body2.png',
      'src/resources/monster-body/body3.png',
      'src/resources/monster-body/body4.png',
      'src/resources/monster-body/body5.png',
      'src/resources/monster-body/body6.png'
    ];
    this.monsterArms = [
      'src/resources/animals-arm/potion1.png',
      'src/resources/animals-arm/potion2.png',
      'src/resources/animals-arm/potion3.png',
      'src/resources/animals-arm/potion4.png',
      'src/resources/animals-arm/potion5.png',
      'src/resources/animals-arm/potion6.png'
    ];
    this.monsterName = [
      ['Huge', 'Funny', 'Clumsy', 'Sullen', 'Weepy'],
      ['Animal', 'Existence', 'Entity', 'Thing', 'Substance'],
      ['Jilly', 'Jose', 'Maty', 'Tymba', 'Umba']
    ];
  }
  set monsterHealth(value) {
    this.health = value;
  }
  get monsterHealth() {
    return this.health;
  }
  set monsterArm(value) {
    this.arm = value;
  }
  get monsterArm() {
    return this.arm;
  }
  set monsterBody(value) {
    this.body = value;
  }
  get monsterBody() {
    return this.body;
  }
  set monsterHead(value) {
    this.head = value;
  }
  get monsterHead() {
    return this.head;
  }

  createMonster(element) {
    let head = document.createElement('img');
    head.classList.add('monsterHead');
    let i = this.randomNumber(this.monsterHeads.length, 1);
    this.monsterHead = this.monsterHeads[i];
    head.setAttribute('src', this.monsterHead);
    element.appendChild(head);
    let body = document.createElement('img');
    body.classList.add('monsterBody');
    let j = this.randomNumber(this.monsterBodyes.length, 1);
    this.monsterBody = this.monsterBodyes[j];
    body.setAttribute('src', this.monsterBody);
    element.appendChild(body);
    let arm = document.createElement('img');
    arm.classList.add('monsterArm');
    arm.setAttribute('id', 'monsterArm');
    let z = this.randomNumber(this.monsterArms.length, 1);
    this.monsterArm = this.monsterArms[z];
    arm.setAttribute('src', this.monsterArm);
    element.appendChild(arm);
  }

  randomNumber(max, min) {
    const n = Math.floor((Math.random() * (max - min)) + min);
    return n;
  }

  createMonsterInfo(element) {
    let nick = document.createElement('h2');
    nick.classList.add('monsterName');
    let monsterName = this.monsterName[0][this.randomNumber(1, this.monsterName[0].length)].concat(
      this.monsterName[1][this.randomNumber(1, this.monsterName[1].length)],
      this.monsterName[2][this.randomNumber(1, this.monsterName[2].length)],
    );
    nick.innerHTML = monsterName;
    element.appendChild(nick);
    let div = document.createElement('div');
    let progress = document.createElement('progress');
    let health = document.createElement('span');
    progress.setAttribute('value', this.monsterHealth);
    progress.setAttribute('max', 100);
    progress.setAttribute('id', 'monsterProgress');
    div.classList.add('monsterHealth');
    health.setAttribute('id', 'monsterHealth');
    health.innerHTML = this.monsterHealth;
    div.appendChild(progress);
    div.appendChild(health);
    element.appendChild(div);
  }

  changeMonsterHealth(res) {
    this.monsterHealth -= res;
    let monsterProgress = document.getElementById('monsterProgress');
    let monsterHealth = document.getElementById('monsterHealth');
    monsterProgress.setAttribute('value', this.monsterHealth);
    monsterHealth.innerHTML = this.monsterHealth;
  }

  attackMonster() {
    let sign = Math.floor((0.5 - Math.random()) * 10);
    let res = this.randomNumber(30, 10);
    let arm = document.getElementById('monsterArm');
    arm.classList.add('monsterArmHero');
    return (sign > 0) ? res : -res;
  }

  addMonsterArm() {
    let arm = document.getElementById('monsterArm');
    arm.classList.remove('monsterArmHero');
  }

  died() {
    let monster = document.getElementById('monster');
    let monsterInfo = document.getElementById('monsterInfo');

    while (monster.firstChild) {
      monster.removeChild(monster.firstChild);
    }
    while (monsterInfo.firstChild) {
      monsterInfo.removeChild(monsterInfo.firstChild);
    }
  }
}

module.exports = Monster;
