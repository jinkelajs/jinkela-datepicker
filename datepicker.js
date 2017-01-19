{

  class DatePickerItem extends Jinkela {
    init() {
      if (this.value != null) this.element.setAttribute('data-value', this.value); // eslint-disable-line eqeqeq
    }
    get template() {
      return `<li><a href="JavaScript:">{text}</a></li>`;
    }
    get styleSheet() {
      return `
        :scope {
          float: left;
          font-size: 12px;
          color: #48576a;
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
          &.current {
            color: #20a0ff;
          }
        }
      `;
    }
  }

  class DatePickerItemWithHead extends DatePickerItem {
    get styleSheet() {
      return `
        :scope {
          width: 32px;
          color: #8391a5;
        }
      `;
    }
  }

  class DatePickerItemWithDate extends DatePickerItem {
    init() {
      let { now, dateObject } = this;
      if (dateObject.getMonth() !== this.month) this.element.style.color = '#d7d7d7';
      if (now.getFullYear() === this.year && now.getMonth() === this.month && now.getDate() === this.value) {
        this.text = '今天';
        this.element.className = 'current';
      } else {
        this.text = dateObject.getDate();
      }
    }
    get styleSheet() {
      return `
        :scope {
          width: 32px;
        }
      `;
    }
  }

  class DatePickerGrid extends Jinkela {
    get tagName() { return `ul`; }
    click({ target }) {
      if (target.tagName !== 'A') return;
      let value = target.parentNode.getAttribute('data-value');
      if (value && typeof this.onSelect === 'function') {
        this.onSelect(+value);
      }
    }
    init() {
      this.element.addEventListener('click', event => this.click(event));
    }
    get styleSheet() {
      return `
        :scope {
          padding: 0;
          margin: 0;
          list-style: none;
          width: 224px;
          box-sizing: border-box;
          overflow: hidden;
        }
      `;
    }
  }

  class DatePickerDate extends DatePickerGrid {
    update() {
      this.element.innerHTML = '';
      let { year, month } = this;
      let day = new Date(year, month, 1).getDay() - 1;
      let now = new Date();
      for (let i = 0; i < 7; i++) {
        let text = [ '日', '一', '二', '三', '四', '五', '六' ][i];
        new DatePickerItemWithHead({ text }).to(this);
      }
      for (let value = -day; value < 42 - day; value++) {
        let dateObject = new Date(year, month, value);
        new DatePickerItemWithDate({ value, dateObject, now, year, month }).to(this);
      }
    }
    get year() { return this.$year; }
    set year(value) {
      this.$year = value;
      this.update();
    }
    get month() { return this.$month; }
    set month(value) {
      this.$month = value;
      this.update();
    }
    init() {
      this.update();
    }
  }

  class DatePickerItemWithMonth extends DatePickerItem {
    get styleSheet() {
      return `
        :scope {
          width: 74px;
          a { padding: 9px 0; }
        }
      `;
    }
    init() {
      if (this.value === this.currentMonth) {
        this.text = '本月';
        this.element.className = 'current';
      } else {
        this.text = this.value + 1 + ' 月';
      }
    }
  }

  class DatePickerMonth extends DatePickerGrid {
    get styleSheet() {
      return `
        :scope {
          padding: 1px;
        }
      `;
    }
    update() {
      this.element.innerHTML = '';
      for (let value = 0; value < 12; value++) {
        let now = new Date();
        let currentMonth = this.year === now.getFullYear() && now.getMonth();
        new DatePickerItemWithMonth({ value, currentMonth }).to(this);
      }
    }
    get year() { return this.$year; }
    set year(value) {
      this.$year = value;
      this.update();
    }
    init() {
      this.update();
    }
  }

  class DatePickerItemWithYear extends DatePickerItem {
    get styleSheet() {
      return `
        :scope {
          width: 56px;
          a { padding: 6px 0; }
        }
      `;
    }
    init() {
      if (this.value === this.currentYear) {
        this.text = '今年';
        this.element.className = 'current';
      } else {
        this.text = this.value;
      }
    }
  }

  class DatePickerYear extends DatePickerGrid {
    get pageSize() { return 20; }
    get starting() { return this.$starting; }
    set starting(starting) {
      this.$starting = starting;
      this.element.innerHTML = '';
      let currentYear = new Date().getFullYear();
      for (let value = starting; value < starting + this.pageSize; value++) {
        new DatePickerItemWithYear({ value, currentYear }).to(this);
      }
    }
  }

  class DatePickerPanel extends Jinkela {
    beforeParse(params) {
      this.lock = 0;
      if (!params.starting) params.starting = null;
      this.dpy = new DatePickerYear({ onSelect: value => this.year = value });
      this.dpm = new DatePickerMonth({ onSelect: value => this.month = value });
      this.dpd = new DatePickerDate({ onSelect: value => this.date = value });
    }
    init() {
      this.element.addEventListener('click', event => this.action(event));
      this.update();
    }
    get starting() { return this.$starting; }
    set starting(value) {
      value = value || new Date().getFullYear() - 8;
      this.$starting = this.dpy.starting = value;
      this.startingText = value + ' ~ ' + (value + 19) + ' 年';
      this.update();
    }
    get year() { return this.$year; }
    set year(value) {
      this.$year = this.dpy.year = this.dpm.year = this.dpd.year = value;
      this.yearText = this.$year;
      this.update();
    }
    get month() { return this.$month; }
    set month(value) {
      this.$month = this.dpy.month = this.dpm.month = this.dpd.month = value;
      this.monthText = this.$month + 1;
      this.update();
    }
    get date() { return this.$date; }
    set date(value) {
      this.$date = this.dpy.date = this.dpm.date = this.dpd.date = value;
      this.update();
    }
    set value(date) {
      try {
        if (date == null) throw void 0;
        if (!(date instanceof Date)) date = new Date(date);
        if (+date !== +date) throw void 0;
        this.commit(() => {
          this.year = date.getFullYear();
          this.month = date.getMonth();
          this.date = date.getDate();
        });
      } catch (error) {
        this.resetYear();
      }
    }
    get value() {
      if (this.year == null) return new Date(0 / 0); // eslint-disable-line eqeqeq
      return new Date(this.year, this.month || 0, this.date == null ? 1 : this.date); // eslint-disable-line eqeqeq
    }
    commit(func) {
      this.lock++;
      func.call(this);
      this.lock--;
      this.update();
    }
    update() {
      if (this.lock) return;
      this.uls.innerHTML = '';
      switch (true) {
        case this.year == null: // eslint-disable-line eqeqeq
          this.mode = 'year';
          this.current = this.dpy.to(this.uls);
          break;
        case this.month == null || this.disableDate: // eslint-disable-line eqeqeq
          this.mode = 'month';
          this.current = this.dpm.to(this.uls);
          break;
        default:
          this.mode = 'date';
          this.current = this.dpd.to(this.uls);
          break;
      }
      if (typeof this.current.update === 'function') this.current.update();
      let { value } = this;
      if (+value !== +value) value = null;
      if (typeof this.onChange === 'function') this.onChange(value);
    }
    get text() {
      let text = '';
      let { value } = this;
      if (this.year != null) { // eslint-disable-line eqeqeq
        text += value.getFullYear();
        if (this.month != null) { // eslint-disable-line eqeqeq
          text += '-' + (value.getMonth() + 1);
          if (this.date != null && !this.disableDate) text += '-' + value.getDate(); // eslint-disable-line eqeqeq
        }
      }
      return text.replace(/\b\d\b/g, '0$&');
    }
    action({ target }) {
      try {
        this[target.dataset.action || target.parentNode.dataset.action]();
      } catch (error) {
        /* ignore error */
      }
    }
    nextYearPage() { this.starting += 20; }
    prevYearPage() { this.starting -= 20; }
    prevYear() { this.year--; }
    nextYear() { this.year++; }
    prevMonth() { this.month--; }
    nextMonth() { this.month++; }
    resetMonth() {
      this.commit(() => {
        this.date = this.month = null;
      });
    }
    resetYear() {
      this.commit(() => {
        this.starting = this.year ? this.year - 8 : null;
        this.year = this.date = this.month = null;
      });
    }
    get template() {
      return `
        <dl>
          <dt data-mode="{mode}">
            <div style="float: left; text-align: left;">
              <a href="JavaScript:" class="year" data-action="prevYearPage">&lt;&lt;</a>&nbsp;
              <a href="JavaScript:" class="month date" data-action="prevYear">&lt;&lt;</a>&nbsp;
              <a href="JavaScript:" class="date" data-action="prevMonth">&lt;</a>
            </div>
            <span class="year">{startingText}</span>
            <a href="JavaScript:" class="month date" data-action="resetYear"><span>{yearText}</span> 年</a>
            <span class="date">&nbsp;</span>
            <a href="JavaScript:" class="date" data-action="resetMonth"><span>{monthText}</span> 月</a>
            <div style="float: right; text-align: right;">
              <a href="JavaScript:" class="date" data-action="nextMonth">&gt;</a>&nbsp;
              <a href="JavaScript:" class="month date" data-action="nextYear">&gt;&gt;</a>
              <a href="JavaScript:" class="year" data-action="nextYearPage">&gt;&gt;</a>&nbsp;
            </div>
          </dt>
          <dd ref="uls"></dd>
        </dl>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          position: absolute;
          z-index: 2;
          background: #fff;
          top: 100%;
          left: 0;
          font-size: 14px;
          display: inline-block;
          margin-top: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
          border: 1px solid #d1dbe5;
          border-radius: 2px;
          > dt {
            line-height: 20px;
            margin: 12px;
            overflow: hidden;
            text-align: center;
            border-bottom: 0;
            a {
              text-decoration: none;
              color: inherit;
              &:hover {
                color: #20a0ff;
              }
            }
            [class] { display: none; }
            &[data-mode="year"] .year { display: inline-block; }
            &[data-mode="month"] .month { display: inline-block; }
            &[data-mode="date"] .date { display: inline-block; }
          }
          dd {
            margin: 0;
          }
        }
      `;
    }
  }

  class DatePickerField extends Jinkela {
    set text(value) { this.element.value = value; }
    get text() { return this.element.value; }
    get template() { return '<input placeholder="{placeholder}" readonly="readonly" />'; }
    get styleSheet() {
      return `
        :scope {
          width: 226px;
          position: relative;
          border: 1px solid #bfcbd9;
          border-radius: 4px;
          line-height: 1;
          box-sizing: border-box;
          background: #fff;
          height: 36px;
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          display: inline-block;
          padding: 3px 10px;
          outline: 0;
          font-family: inherit;
          &:hover {
            border-color: #8391a5;
          }
        }
      `;
    }
  }

  class DatePicker extends Jinkela {
    beforeParse(params) {
      this.field = new DatePickerField(this);
      this.panel = new DatePickerPanel(this);
      this.panel.onChange = () => this.change();
      this.placeholder = 'placeholder' in params ? params.placeholder : '请选择日期';
    }
    init() {
      this.field.to(this);
      this.panel.to(this);
      this.update();
      addEventListener('click', event => this.checkClose(event));
      this.element.addEventListener('click', event => event.relatedDatePicker = this);
      this.element.addEventListener('focus', () => this.element.className = 'active', true);
      Object.defineProperty(this.element, 'value', { get: () => this.value, set: value => this.value = value });
    }
    onChange() {}
    checkClose(event) {
      if (!this.element.className) return;
      let { target } = event;
      if (event.relatedDatePicker === this) {
        if (!target.parentNode) return;
        if (!target.parentNode.getAttribute('data-value')) return;
        let value = (this.disableDate ? this.panel.month : this.panel.date);
        if (value == null) return; // eslint-disable-line eqeqeq
      }
      this.element.className = '';
    }
    update() { this.field.text = this.panel.text || this.defaultText || ''; }
    change() {
      this.update();
      this.onChange();
    }
    set placeholder(value) { this.field.placeholder = value; }
    get placeholder() { return this.field.placeholder; }
    set starting(value) { this.panel.starting = value; }
    get starting() { return this.panel.strting; }
    get value() {
      let value = this.panel.value;
      if (value == null) return value; // eslint-disable-line eqeqeq
      if ('offset' in this) value = new Date(value.getTime() + this.offset);
      return value;
    }
    set value(value) {
      if (typeof value === 'string') value = new Date(value);
      if (value instanceof Date && 'offset' in this) value = new Date(value.getTime() - this.offset);
      this.panel.value = value;
      this.update();
    }
    get template() {
      return `
        <span>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M164 108l0 0c0-0 0-0 0-0L164 108 164 108M222 782l173 0 0-115-173 0L222 782 222 782M801 50l-57 0 0 173 57 0L801 50 801 50M280 50 222 50l0 173 57 0L280 50 280 50M222 609l173 0 0-115-173 0L222 609 222 609M858 108c0 0 0 0 0 0l0-0L858 108 858 108M685 609l115 0 0-115-115 0L685 609 685 609M859 108l0 86c0 47-38 86-86 86s-86-38-86-86L685 108 338 108l0 86c0 47-38 86-86 86-47 0-86-38-86-86L164 108C100 108 48 160 48 224l0 635c0 64 52 116 116 116l693 0c64 0 116-52 116-116L975 224C975 160 923 108 859 108L859 108M916 861c0 31-25 57-57 57L164 919c-31 0-57-25-57-57L106 437c0-31 25-57 57-57L858 379c31 0 57 25 57 57L916 861 916 861M454 609l173 0 0-115L454 493 454 609 454 609M454 782l173 0 0-115L454 667 454 782 454 782M685 782l115 0 0-115-115 0L685 782 685 782M685 782 685 782z"></path>
          </svg>
        </span>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          font-size: 14px;
          font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
          -webkit-font-smoothing: antialiased;
          position: relative;
          display: inline-block;
          > dl { display: none; }
          &.active > input { border-color: #20a0ff; }
          &.active > dl { display: block; }
          > svg {
            position: absolute;
            width: 16px;
            height: 16px;
            right: 8px;
            top: 0;
            bottom: 0;
            margin: auto;
            fill: #bfcbd9;
            z-index: 1;
          }
        }
      `;
    }
  }

  window.DatePicker = DatePicker;

}
