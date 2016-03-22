class DatePickerItem extends Jinkela {
  init() {
    if (this.value != null) this.element.setAttribute('data-value', this.value); // eslint-disable-line eqeqeq
  }
  get template() {
    return `<li><a href="JavaScript:">{text}</a></li>`;
  }
}

class DatePickerGrid extends Jinkela {
  onClick({ target }) {
    if (target.tagName !== 'A') return;
    let value = target.parentNode.getAttribute('data-value');
    if (value && typeof this.onSelect === 'function') {
      this.onSelect(+value);
    }
  }
  get template() {
    return `<ul on-click="{onClick}"></ul>`;
  }
  get styleSheet() {
    return `
      :scope {
        padding: 0;
        margin: 0;
        vertical-align: top;
        border-left: 1px solid #d7d7d7;
        border-top: 1px solid #d7d7d7;
        list-style: none;
        display: inline-block;
        width: 252px;
        li {
          border: 1px solid #d7d7d7;
          margin-left: -1px;
          margin-top: -1px;
          float: left;
          padding: 0;
          text-align: center;
          a {
            width: 100%;
            display: block;
            text-align: center;
            line-height: 2;
            color: inherit;
            text-decoration: none;
            cursor: default;
          }
          &[data-value] a {
            cursor: pointer;
          }
          &[data-value] a:hover {
            background: #eee;
          }
        }
      }
    `;
  }
}

class DatePickerDate extends DatePickerGrid {
  get styleSheet() {
    return `
      :scope {
        li:nth-child(7n+1) { clear: left; }
        li { width: 35px; }
      }
    `;
  }
  update() {
    this.element.innerHTML = '';
    let day = new Date(this.year, this.month, 1).getDay() - 1;
    for (let i = 0; i < 7; i++) {
      let text = [ '日', '一', '二', '三', '四', '五', '六' ][i];
      let item = new DatePickerItem({ text }).renderTo(this);
      item.element.style.background = '#f0f0f0';
    }
    for (let i = 0; i < 42; i++) {
      let now = new Date(this.year, this.month, i - day);
      let item = new DatePickerItem({ value: i - day, text: now.getDate() }).renderTo(this);
      if (now.getMonth() !== this.month) item.element.style.color = '#d7d7d7';
    }
  }
  init() {
    this.update();
  }
  prev() { this.parent.month--; }
  next() { this.parent.month++; }
  back() { this.parent.date = this.parent.month = null; }
}

class DatePickerMonth extends DatePickerGrid {
  get styleSheet() {
    return `
      :scope {
        li:nth-child(3n+1) { clear: left; }
        li { width: 83px; }
        li a { padding: 11px 0; }
      }
    `;
  }
  init() {
    for (let i = 0; i < 12; i++) new DatePickerItem({ value: i, text: i + 1 + ' 月' }).renderTo(this);
  }
  prev() { this.parent.year--; }
  next() { this.parent.year++; }
  back() { this.parent.month = this.parent.year = null; }
}

class DatePickerYear extends DatePickerGrid {
  get styleSheet() {
    return `
      :scope {
        li:nth-child(4n+1) { clear: left; }
        li { width: 62px; }
        li a { padding: 6px 0; }
      }
    `;
  }
  get pageSize() { return 20; }
  get starting() { return this.$starting; }
  set starting(value) {
    this.$starting = value;
    this.element.innerHTML = '';
    for (let i = 0; i < this.pageSize; i++) new DatePickerItem({ value: i + value, text: i + value }).renderTo(this);
  }
  init() {
    this.starting = new Date().getFullYear() - 36;
  }
  prev() { this.starting -= this.pageSize; }
  next() { this.starting += this.pageSize; }
}

class DatePicker extends Jinkela {
  init() {
    this.dpy = new DatePickerYear({ parent: this, onSelect: value => this.year = value });
    this.dpm = new DatePickerMonth({ parent: this, onSelect: value => this.month = value });
    this.dpd = new DatePickerDate({ parent: this, onSelect: value => this.date = value });
    this.update();
  }
  get year() { return this.$year; }
  set year(value) {
    this.$year = this.dpy.year = this.dpm.year = this.dpd.year = value;
    if (value != null) { // eslint-disable-line eqeqeq
      let year = this.value.getFullYear();
      if (year !== value) {
        return this.year = year;
      }
    }
    this.update();
  }
  get month() { return this.$month; }
  set month(value) {
    this.$month = this.dpy.month = this.dpm.month = this.dpd.month = value;
    if (value != null) { // eslint-disable-line eqeqeq
      let thisValue = this.value;
      if (thisValue.getMonth() !== value) {
        this.month = thisValue.getMonth();
        this.year = thisValue.getFullYear();
        return;
      }
    }
    this.update();
  }
  get date() { return this.$date; }
  set date(value) {
    this.$date = this.dpy.date = this.dpm.date = this.dpd.date = value;
    if (value != null) { // eslint-disable-line eqeqeq
      let thisValue = this.value;
      if (thisValue.getDate() !== value) {
        this.date = thisValue.getDate();
        this.month = thisValue.getMonth();
        this.year = thisValue.getFullYear();
        return;
      }
    }
    this.update();
  }
  set value(date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
  }
  get value() {
    return new Date(this.year, this.month || 0, this.date == null ? 1 : this.date); // eslint-disable-line eqeqeq
  }
  update() {
    this.uls.innerHTML = '';
    switch (true) {
      case this.year == null: // eslint-disable-line eqeqeq
        this.current = this.dpy.renderTo(this.uls);
        break;
      case this.month == null || this.disableDate: // eslint-disable-line eqeqeq
        this.current = this.dpm.renderTo(this.uls);
        break;
      default:
        this.current = this.dpd.renderTo(this.uls);
        break;
    }
    if (typeof this.current.update === 'function') this.current.update();
    if (typeof this.onChange === 'function') this.onChange(this.value);
  }
  get text() {
    let text = '';
    let { value } = this;
    if (this.year != null) { // eslint-disable-line eqeqeq
      text += value.getFullYear() + ' 年';
      if (this.month != null) { // eslint-disable-line eqeqeq
        text += ' ' + (value.getMonth() + 1) + ' 月';
        if (this.date != null && !this.disableDate) text += ' ' + value.getDate() + ' 日'; // eslint-disable-line eqeqeq
      }
    }
    return text;
  }
  prev() {
    if (!this.current || typeof this.current.prev !== 'function') return;
    this.current.prev();
  }
  next() {
    if (!this.current || typeof this.current.next !== 'function') return;
    this.current.next();
  }
  back() {
    if (!this.current || typeof this.current.back !== 'function') return;
    this.current.back();
  }
  get template() {
    return `
      <dl>
        <dt>
          <a href="JavaScript:" on-click="{prev}">&lt;&lt;</a>
          <a href="JavaScript:" on-click="{back}" if="{$year}">返回</a>
          <span if-not="{$year}">请选择</span>
          <a href="JavaScript:" on-click="{next}">&gt;&gt;</a>
        </dt>
        <dd ref="uls"></dd>
      </dl>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        position: absolute;
        background: #fff;
        top: 100%;
        left: 0;
        margin-top: 0;
        font-size: 14px;
        display: inline-block;
        box-shadow: 0 0 32px -6px rgba(0,0,0,.5);
        dt {
          line-height: 2;
          overflow: hidden;
          text-align: center;
          border: 1px solid #d7d7d7;
          border-bottom: 0;
          padding: 0 .5em;
          a {
            text-decoration: none;
            color: inherit;
            &:hover {
              opacity: 0.5;
            }
          }
          a:first-child {
            float: left;
          }
          a:last-child {
            float: right;
          }
        }
        dd {
          margin: 0;
        }
      }
    `;
  }
}

class JDatePicker extends Jinkela {
  init() {
    let { disableDate } = this;
    this.datePicker = new DatePicker({ disableDate }).renderTo(this);
    this.datePicker.onChange = () => {
      this.onDatePickerChange();
    };
    this.onDatePickerChange();
  }
  onDatePickerChange() {
    this.text = this.datePicker.text || '请选择';
  }
  get template() { return `<span><span>{text}</span></span>`; }
  get styleSheet() {
    return `
      :scope {
        position: relative;
        line-height: 1.5em;
        height: 1.5em;
        > span:first-child {
          cursor: default;
        }
        > dl {
          display: none;
        }
        &:hover > dl {
          display: block;
        }
      }
    `;
  }
}

Jinkela.register('J-DATEPICKER', (that, node) => {
  let disableDate = node.hasAttribute('disable-date');
  let jdp = new JDatePicker({ disableDate });
  let datePicker = jdp.datePicker;
  Object.defineProperties(node, {
    name: { configurable: true, enumerable: true, writable: false, value: node.getAttribute('name') },
    value: {
      configurable: true,
      enumerable: true,
      get() {
        try {
          return datePicker.value.toISOString();
        } catch (error) {
          return null;
        }
      },
      set(value) { datePicker.value = new Date(Date.parse(value)); }
    }
  });
  setTimeout(() => jdp.renderTo(node));
});
