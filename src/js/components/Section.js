export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, target = 'begin') {
    if (target === 'begin') {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
