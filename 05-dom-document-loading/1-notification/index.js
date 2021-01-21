export default class NotificationMessage {
  static notification = null;

  render() {
    if (NotificationMessage.notification) {
      NotificationMessage.notification.remove();
    }

    const element = document.createElement("div");
    element.innerHTML = this.getHtmlTemplate();
    this.element = element.firstElementChild;
    NotificationMessage.notification = this.element;
  }

  show(target = document.body) {
    target.append(this.element);
    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.element = null;
    NotificationMessage.notification = null;
  }

  constructor(text = '', { type = '', duration = 1000 } = {}) {
    this.text = text;
    this.type = type;
    this.duration = duration;

    this.render();
  }

  getHtmlTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${(this.duration / 1000).toFixed(0)}s">
          <div class="timer"></div>
          <div class="inner-wrapper">
              <div class="notification-header">${this.type}</div>
              <div class="notification-body">
                  ${this.text}
              </div>
          </div>
      </div>
    `;
  }
}
