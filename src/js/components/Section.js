export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(arr) {
    arr.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, target = 'begin') {
    if (target === 'begin') {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  clear() {
    this._container.innerHTML = '';
  }
}
