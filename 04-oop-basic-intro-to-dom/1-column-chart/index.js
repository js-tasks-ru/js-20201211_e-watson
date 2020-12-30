export default class ColumnChart {
  childElements = {};
  chartHeight = 50;

  render() {
    const divElement = document.createElement('div');
    divElement.innerHTML = this.getChartHtmlTemplate();

    this.element = divElement.firstElementChild;
    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }

    this.childElements = this.getChildElements(this.element);
  }

  update(data) {
    this.childElements.body.innerHTML = this.getColumnBodyHtmlTemplate(data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    this.childElements = {};
  }

  constructor({ data = [], label = '', link = '', value = 0 } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;

    this.render();
  }

  getChildElements(element) {
    const dataNodes = element.querySelectorAll('[data-element]');

    return [...dataNodes].reduce((prev, current) => {
      prev[current.dataset.element] = current;
      return prev;
    }, {});
  }

  getLinkHtmlTemplate() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  getColumnBodyHtmlTemplate(data) {
    const maxValue = Math.max(...data);
    if (maxValue === 0) {
      return '';
    }

    const scale = this.chartHeight / maxValue;
    return data
      .map(dataItem => {
        const percent = (dataItem / maxValue * 100).toFixed(0);
        return `<div style="--value: ${Math.floor(dataItem * scale)}" data-tooltip="${percent}%"></div>`;
      }).join('');
  }

  getChartHtmlTemplate() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLinkHtmlTemplate()}
        </div>
        <div class="column-chart__container">
           <div data-element="header" class="column-chart__header">
             ${this.value}
           </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBodyHtmlTemplate(this.data)}
          </div>
        </div>
      </div>
    `;
  }
}
