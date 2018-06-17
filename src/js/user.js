class User {
  constructor() {
    this.head = 'src/resources/animals-face/head3.png';
    this.body = 'src/resources/animals-body/body3.png';
    this.arm = 'src/resources/animals-arm/arm3.png';
    this.heroHeads = [
      'src/resources/animals-face/head1.png',
      'src/resources/animals-face/head2.png',
      'src/resources/animals-face/head3.png',
      'src/resources/animals-face/head4.png',
      'src/resources/animals-face/head5.png',
      'src/resources/animals-face/head6.png'
    ];
    this.heroBodyes = [
      'src/resources/animals-body/body1.png',
      'src/resources/animals-body/body2.png',
      'src/resources/animals-body/body3.png',
      'src/resources/animals-body/body4.png',
      'src/resources/animals-body/body5.png',
      'src/resources/animals-body/body6.png'
    ];
    this.heroArms = [
      'src/resources/animals-arm/arm1.png',
      'src/resources/animals-arm/arm2.png',
      'src/resources/animals-arm/arm3.png',
      'src/resources/animals-arm/arm4.png',
      'src/resources/animals-arm/arm5.png',
      'src/resources/animals-arm/arm6.png'
    ];
    this.name = 'Nameless hero';
    this.health = 100;
    this.monsterNumbers = 0;
  }
  set heroArm(value) {
    this.arm = value;
  }
  get heroArm() {
    return this.arm;
  }
  set heroHealth(value) {
    this.health = value;
  }
  get heroHealth() {
    return this.health;
  }
  set heroName(value) {
    this.name = value;
  }
  get heroName() {
    return this.name;
  }
  set hero(value) {
    this.head = value;
  }
  get hero() {
    return this.head;
  }
  set userName(value) {
    this.name = value;
  }
  get userName() {
    return this.name;
  }
  set userEmail(value) {
    this.email = value;
  }
  get userEmail() {
    return this.email;
  }
  set userScore(value) {
    this.monsterNumbers = value;
  }
  get userScore() {
    return this.monsterNumbers;
  }

  init() {
    let newUserForm = `
        <div class="form">
           <div class="newPlayer">
              <label for="newUser" class="labelName"> New Player </label>
              <form id="newUser" class="form">
                  <label for="formName">New Player name: </label>
                  <input type="text" id="formName" required>
                  <label for="formNick">Hero name: </label>
                  <input type="text" id="formNick" required>
                  <label for="formEmail">New player email:</label>
                  <input type="email" id="formEmail" required>
              </form>
              <h2> Select Hero</h2>
              <div class="heroes" id="heroes">
                <img src = ${this.heroHeads[0]} alt="heroImage">
                <img src = ${this.heroHeads[1]} alt="heroImage">
                <img src = ${this.heroHeads[2]} alt="heroImage">
                <img src = ${this.heroHeads[3]} alt="heroImage">
                <img src = ${this.heroHeads[4]} alt="heroImage">
                <img src = ${this.heroHeads[5]} alt="heroImage">
              </div>
              <button id="saveNewUser" class="formSaveBtn" type="submit">Save</button>
          </div>
       </div>`;
    return newUserForm;
  }

  saveToLocalStorage() {
    let users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      users.push(this);
      this.sortTableScore(users);
    } else {
      users = [];
      users.push(this);
    }
    localStorage.setItem('users', JSON.stringify(users));
  }

  sortTableScore(arr) {
    arr.sort(this.compareTime);
  }

  compareTime(userOne, userTwo) {
    return -(userOne.monsterNumbers - userTwo.monsterNumbers);
  }

  saveUser() {
    let name = document.getElementById('formName');
    let email = document.getElementById('formEmail');
    let nick = document.getElementById('formNick');
    this.userName = name.value;
    this.userEmail = email.value;
    this.heroName = nick.value;
    if (!this.userName || !this.userEmail || !this.heroName) {
      alert ('Please, fill all fields');
      return false;
    } else {
      return true;
    }
  }
  createHero(element) {
    let head = document.createElement('img');
    let body = document.createElement('img');
    let arm = document.createElement('img');
    arm.classList.add('heroArm');
    head.classList.add('heroHead');
    body.classList.add('heroBody');
    arm.setAttribute('id', 'heroArm');
    head.setAttribute('src', this.hero);
    let n = this.findNumber(this.hero);
    body.setAttribute('src', this.heroBodyes[n - 1]);
    arm.setAttribute('src', this.heroArms[n - 1]);
    element.appendChild(head);
    element.appendChild(body);
    element.appendChild(arm);
  }
  findNumber(elem) {
    let regex = /\d+/g;
    return elem.match(regex);
  }
  createHeroInfo(element) {
    let heroName = document.createElement('h2');
    heroName.classList.add('heroName');
    heroName.innerHTML = this.heroName;
    element.appendChild(heroName);
    let div = document.createElement('div');
    let progress = document.createElement('progress');
    let health = document.createElement('span');
    progress.setAttribute('value', this.heroHealth);
    progress.setAttribute('max', 100);
    progress.setAttribute('id', 'heroProgress');
    div.classList.add('heroHealth');
    health.setAttribute('id', 'heroHealth');
    health.innerHTML = this.heroHealth;
    div.appendChild(progress);
    div.appendChild(health);
    element.appendChild(div);
  }
  changeHeroHealth(res) {
    this.heroHealth += res;
    let heroProgress = document.getElementById('heroProgress');
    let heroHealth = document.getElementById('heroHealth');
    heroProgress.setAttribute('value', this.heroHealth);
    heroHealth.innerHTML = this.heroHealth;
  }
  addHeroArm() {
    let arm = document.getElementById('heroArm');
    arm.classList.remove('heroFightMonster');
  }
  died() {
    let hero = document.getElementById('hero');
    let heroInfo = document.getElementById('heroInfo');

    while (hero.firstChild) {
      hero.removeChild(hero.firstChild);
    }
    while (heroInfo.firstChild) {
      heroInfo.removeChild(heroInfo.firstChild);
    }
  }
}
module.exports = User;
