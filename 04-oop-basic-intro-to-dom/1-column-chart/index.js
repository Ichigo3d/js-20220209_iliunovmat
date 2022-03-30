export default class ColumnChart {
  chartHeight = 50;
  subElements = {}
  constructor({
    data = [],
    label = '',
    link = '',
    value = 0,
    formatHeading = data => data
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);

    this.render();
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}
      `
  }
  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
  remove () {
    if (this.element) {
      this.element.remove();
    }
    this.element.remove();
  }
  update (data) {
    this.data = data;
    //this.subElements.body.innerHTML = this.getColumnBody();
  }
  createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }
  setTitle(title) {
    if (title === "orders") {
      return 'Total orders';
    } else if (title === "sales") {
      return "Total sales";
    } else {
      return "Total customers";
    }
  }
  getColumnBody() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;
    return this.data
      .map(item => {
        const percent = (item / maxValue * 100).toFixed(0);
      }).join('');
  }
  setPlug(data) {
    if (data === undefined || data.length === 0) {
      return '<div class="column-chart column-chart_loading" style="--chart-height: 50">';
    } else {
      return '<div class="column-chart" style="--chart-height: 50">';
    }
  }
  render() {
    this.element = this.createElement(
      `${this.setPlug(this.data)}
                <div class="column-chart__title">
                    ${this.setTitle(this.label)}
                    ${this.hasOwnProperty('link') ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ''}
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">${this.label === "sales" ? this.formatHeading(this.value) : this.value}</div>
                    <div data-element="body" class="column-chart__chart">
                        ${this.update(this.data)}
                     </div>
                </div>
            </div>`);

  }

}
