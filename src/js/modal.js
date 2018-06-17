class Modal {
  constructor() {
    this._block = null;
    this._win = null;
  }
  initBlockFon() {
    this._block = document.getElementById('blockScreen');
    if (!this._block) {
      const parent = document.getElementsByTagName('body')[0];
      const obj = parent.firstChild;
      this._block = document.createElement('div');
      this._block.id = 'blockScreen';
      this._block.classList.add('blockScreen');
      parent.insertBefore(this._block, obj);
    }
    this._block.style.display = 'flex';
  }

  initBlockWindow(width, text) {
    this._win = document.getElementById('modalWindow');
    if (!this._win) {
      const parent = document.getElementsByTagName('body')[0];
      const obj = parent.firstChild;
      this._win = document.createElement('div');
      this._win.id = 'modalWindow';
      this._win.classList.add('modalWindow');
      parent.insertBefore(this._win, obj);
    }
    this._win.style.display = 'flex';
    this._win.style.minwidth = width + 'px';
    this._win.innerHTML = text;
    let _close = document.createElement('div');
    _close.classList.add('exit');
    _close.classList.add('exit');
    _close.addEventListener('click', this.close);
    this._win.appendChild(_close);
  }
  close() {
    document.getElementById('blockScreen').style.display = 'none';
    document.getElementById('modalWindow').style.display = 'none';
  }
  show(width, html) {
    this.initBlockFon();
    this.initBlockWindow(width, html);
  }
}
module.exports = Modal;
