class Presenter {
  constructor({view, model}) {
    this._view = view;
    this._model = model;
  }

  get view() {
    return this._view;
  }

  _displayContent(content) {
    this._view.data = content;
  }

  _displayMessage(message) {
    this._view.showMessage(message);
  }

  _displayImage(src) {
    const target = document.querySelector('.message');
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Message image';
    img.className = 'message_image';
    target.appendChild(img);
  }
}

export default Presenter;
