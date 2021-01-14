export default class SortableTable {
  subElements = {};

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="sortable-table">
            ${this.getTableHeaderHtmlTemplate()}
            ${this.getTableBodyHtmlTemplate()}
        </div>
    `;
    this.element = element;
    this.subElements = this.getChildNodes(this.element);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    if (this.element) {
      this.remove();
    }

    this.element = null;
    this.subElements = {};
  }

  constructor(header = [], {data = []} = {}) {
    this.header = header;
    this.data = data;

    this.render();
  }

  getChildNodes(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((prev, current) => {
      prev[current.dataset.element] = current;
      return prev;
    }, {});
  }

  getTableHeaderHtmlTemplate() {
    const headerCells = this.header.map(columnHeader => {
      return `
          <div class="sortable-table__cell" data-id="${columnHeader.id}" data-sortable="${columnHeader.sortable}">
            <span>${columnHeader.title}</span>
          </div>
        `;
    });
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${headerCells.join('')}
      </div>
    `;
  }

  getSortArrow() {
    if (!this.sortArrow) {
      const divNode = document.createElement('div');
      divNode.innerHTML = `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      `;
      this.sortArrow = divNode.firstElementChild;
    }
    return this.sortArrow;
  }

  getTableBodyHtmlTemplate() {
    return `
        <div data-element="body" class="sortable-table__body">
        ${this.getTableRows()}
        </div>
    `;
  }

  getTableRows() {
    const rows = this.data.map(row => {
      const cells = this.header.map(header => {
        if (header.template) {
          return header.template(row.images);
        } else {
          return `<div class="sortable-table__cell">${row[header.id]}</div>`;
        }
      });
      return `
        <a href="/products/${row.id}" class="sortable-table__row">
          ${cells.join('')}
        </a>
      `;
    });
    return rows.join('');
  }

  sort(fieldValue, orderValue) {
    const columnDescription = this.header.find(h => h.id === fieldValue);
    if (!columnDescription.sortable) {
      return;
    }

    let direction;
    if (orderValue === 'asc') {
      direction = 1;
    } else if (orderValue === 'desc') {
      direction = -1;
    } else {
      return;
    }

    let compareFn;
    switch (columnDescription.sortType) {
    case 'number':
      compareFn = (number1, number2) => direction * (number1 - number2);
      break;
    case 'string':
      compareFn = (string1, string2) =>
        direction * string1.localeCompare(string2, ['ru', 'en'], {caseFirst: 'upper'});
      break;
    default:
      return;
    }
    this.data.sort((row1, row2) => compareFn(row1[columnDescription.id], row2[columnDescription.id]));

    let headerCell = this.element.querySelector(`[data-id=${columnDescription.id}]`);
    headerCell.dataset.order = orderValue;
    headerCell.append(this.getSortArrow());
    this.subElements.body.innerHTML = this.getTableRows();
  }
}
