/**/ void function(factory) {
/**/   switch (true) {
/**/   case typeof module === 'object' && module && 'exports' in module: // CommonJS
/**/     module.exports = factory();
/**/     if (module.exports === void 0) module.exports = {};
/**/     break;
/**/   case typeof define === 'function' && !!define.amd: // AMD
/**/     define(factory);
/**/     break;
/**/   default: // Global
/**/     var global = new Function('return this')();
/**/     var name = 'DatePicker';
/**/     /**/ try { /* Fuck IE8- */
/**/     /**/   if (typeof execScript === 'object') execScript('var ' + name);
/**/     /**/ } catch(error) {}
/**/     global[name] = factory();
/**/   }
/**/ }(function() {

var DatePicker;

{

  class Item extends Jinkela {
    init() {
      if (this.value != null) this.element.setAttribute('data-value', this.value); // eslint-disable-line eqeqeq
    }
    get template() {
      return `<li on-click="{onClick}"><a href="javascript:">{text}</a></li>`;
    }
    onClick() { /* 用于方法覆写 */ }
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
          }
          a:hover {
            background: #eee;
          }
          &.current {
            color: #20a0ff;
          }
          &.active {
            background: #20a0ff;
            color: #fff;
            a:hover {
              background: rgba(255, 255, 255, .3);
            }
          }
        }
      `;
    }
  }

  class ItemWithHead extends Item {
    get styleSheet() {
      return `
        :scope {
          width: 32px;
          color: #8391a5;
          > a {
            cursor: default;
            &:hover { background: none; }
          }
        }
      `;
    }
  }

  class Grid extends Jinkela {
    get template() {
      return `
        <ul on-click="{click}" class="{className}"></ul>
      `;
    }
    click({ target }) {
      if (target.tagName !== 'A') return;
      let value = target.parentNode.getAttribute('data-value');
      if (value && typeof this.onSelect === 'function') {
        this.onSelect(+value);
      }
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
          display: none;
        }
      `;
    }
  }

  class DateGridItem extends Item {
    onClick() {
      this.panel.value = this.dateObject;
      this.panel.mode = 'ok';
    }
    init() {
      let { now, dateObject, panel } = this;
      if (dateObject.getMonth() !== panel.value.getMonth()) this.element.style.color = '#d7d7d7';
      if (+now === +dateObject) {
        this.text = '今天';
        this.element.classList.add('current');
      } else {
        this.text = dateObject.getDate();
      }
      if (panel.mode === 'ok' && +panel.value === +dateObject) {
        this.element.classList.add('active');
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
  class DateGrid extends Grid {
    get className() { return 'date'; }
    init() {
      this.element.innerHTML = '';
      let { panel } = this;
      let { value } = panel;
      let firstDayInThisMonth = new Date(value);
      firstDayInThisMonth.setDate(1);
      let day = firstDayInThisMonth.getDay() - 1;
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      for (let i = 0; i < 7; i++) {
        let text = [ '日', '一', '二', '三', '四', '五', '六' ][i];
        new ItemWithHead({ text }).to(this);
      }
      for (let nth = -day; nth < 42 - day; nth++) {
        let dateObject = new Date(value);
        dateObject.setDate(nth);
        new DateGridItem({ nth, dateObject, now, panel }).to(this);
      }
    }
  }

  class MonthGridItem extends Item {
    onClick() {
      this.panel.value = [ this.panel.value.getFullYear(), this.value ];
    }
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
  class MonthGrid extends Grid {
    get className() { return 'month'; }
    get styleSheet() {
      return `
        :scope {
          padding: 1px;
        }
      `;
    }
    init() {
      this.element.innerHTML = '';
      let { panel } = this;
      let year = panel.value.getFullYear();
      let now = new Date();
      let currentMonth = panel.value.getFullYear() === now.getFullYear() && now.getMonth();
      for (let value = 0; value < 12; value++) {
        new MonthGridItem({ value, currentMonth, panel }).to(this);
      }
    }
  }

  class YearGridItem extends Item {
    onClick() {
      this.panel.value = [ this.value ];
    }
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
  class YearGrid extends Grid {
    get className() { return 'year'; }
    get pageSize() { return 20; }
    init() {
      let { panel } = this;
      let { starting } = panel;
      this.element.innerHTML = '';
      let currentYear = new Date().getFullYear();
      for (let value = starting; value < starting + this.pageSize; value++) {
        new YearGridItem({ value, currentYear, panel }).to(this);
      }
    }
  }

  class Panel extends Jinkela {
    get YearGrid() { return YearGrid; }
    get MonthGrid() { return MonthGrid; }
    get DateGrid() { return DateGrid; }
    beforeParse(params) {
      Object.defineProperty(this, '$value', { value: new Date(0 / 0), configurable: true });
      this.mode = 'year';
      this.panel = this;
      this.lock = 0;
      if (!params.starting) params.starting = null;
    }

    update() {
      switch (this.mode) {
        case 'year':
          this.current = new YearGrid({ panel: this });
          break;
        case 'month':
          this.yearText = this.value.getFullYear();
          this.current = new MonthGrid({ panel: this });
          break;
        case 'date':
        case 'ok':
          this.yearText = this.value.getFullYear();
          this.monthText = this.value.getMonth() + 1;
          this.current = new DateGrid({ panel: this });
          break;
        default:
          throw new Error('wtf');
      }
      let { value } = this;
      if (+value !== +value) value = null;
      if (typeof this.onChange === 'function') {
        Promise.resolve().then(() => {
          this.onChange(value);
        });
      }
    }

    get text() {
      let text = '';
      let { value } = this;
      if (this.mode !== 'year') {
        text += value.getFullYear();
        if (this.mode !== 'month') {
          text += '-' + (value.getMonth() + 1);
          if (this.mode === 'ok' && !this.disableDate) text += '-' + value.getDate();
        }
      }
      return text.replace(/\b\d\b/g, '0$&');
    }

    click(event) {
      event.relatedDatePicker = this.binding;
      let { target } = event;
      try {
        // 简直黑
        this[target.dataset.action || target.parentNode.dataset.action]();
      } catch (error) {
        /* ignore error */
      }
    }

    set value(date) {
      try {
        if (date instanceof Array) {
          if (date.length > 3) throw void 0;
          this.mode = [ 'year', 'month', 'date', 'ok' ][date.length];
          if (date.length === 0) date = [ 0, 0, 1 ];
          if (date.length === 1) date = date.concat(0, 1);
          if (date.length === 2) date = date.concat(1);
          date = new Date(...date);
        } else {
          this.mode = 'ok';
        }
        if (date == null) throw void 0;
        date = new Date(date);
        if (+date !== +date) throw void 0;
        date.setHours(0, 0, 0, 0);
        this.$value.setTime(date.getTime());
        this.update();
      } catch (error) {
        if (error) throw error;
        this.resetYear();
      }
    }
    get value() { return this.$value; }

    get starting() { return this.$starting; }
    set starting(value) {
      value = value || new Date().getFullYear() - 8;
      this.$starting = value;
      this.startingText = value + ' ~ ' + (value + 19) + ' 年';
      this.update();
    }

    nextYearPage() { this.starting += 20; }
    prevYearPage() { this.starting -= 20; }
    prevYear() {
      this.$value.setFullYear(this.$value.getFullYear() - 1);
      this.update();
    }
    nextYear() {
      this.$value.setFullYear(this.$value.getFullYear() + 1);
      this.update();
    }
    prevMonth() {
      this.$value.setMonth(this.$value.getMonth() - 1);
      this.update();
    }
    nextMonth() {
      this.$value.setMonth(this.$value.getMonth() + 1);
      this.update();
    }

    resetMonth() {
      this.mode = 'month';
      this.$value.setDate(1);
      this.update();
    }
    resetYear() {
      this.mode = 'year';
      this.$value.setTime(0 / 0);
      this.update();
    }

    // 对话框相关
    updatePosition() {
      let rect = this.binding.element.getBoundingClientRect();
      this.element.style.top = rect.top + rect.height + 'px';
      this.element.style.left = rect.left + 'px';
    }
    startFixPositionWhileScroll() {
      if (this.scroll) return; // 避免重复绑定事件
      let scroll = event => {
        if (document.body.contains(this.element)) {
          this.updatePosition();
        } else {
          removeEventListener('scroll', scroll);
          delete this.scroll;
        }
      };
      this.scroll = scroll;
      addEventListener('scroll', scroll);
    }
    show() {
      this.to(document.body);
      this.startFixPositionWhileScroll();
      this.updatePosition();
      let click = event => {
        if (event.relatedDatePicker === this.binding) return;
        // 检测到是否点了自己，然后阻止操作
        this.element.remove();
        removeEventListener('click', click);
      };
      addEventListener('click', click);
    }

    get template() {
      return `
        <dl on-click="{click}" data-mode="{mode}">
          <dt>
            <div style="float: left; text-align: left;">
              <a href="javascript:" class="year" data-action="prevYearPage">&lt;&lt;</a>&nbsp;
              <a href="javascript:" class="month date" data-action="prevYear">&lt;&lt;</a>&nbsp;
              <a href="javascript:" class="date" data-action="prevMonth">&lt;</a>
            </div>
            <span class="year">{startingText}</span>
            <a href="javascript:" class="month date" data-action="resetYear"><span>{yearText}</span> 年</a>
            <span class="date">&nbsp;</span>
            <a href="javascript:" class="date" data-action="resetMonth"><span>{monthText}</span> 月</a>
            <div style="float: right; text-align: right;">
              <a href="javascript:" class="date" data-action="nextMonth">&gt;</a>&nbsp;
              <a href="javascript:" class="month date" data-action="nextYear">&gt;&gt;</a>
              <a href="javascript:" class="year" data-action="nextYearPage">&gt;&gt;</a>&nbsp;
            </div>
          </dt>
          <dd>
            <meta ref="current" />
          </dd>
        </dl>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          position: fixed;
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
          }
          dd {
            margin: 0;
          }
          &[data-mode="year"] .year { display: inline-block; }
          &[data-mode="month"] .month { display: inline-block; }
          &[data-mode="date"] .date { display: inline-block; }
          &[data-mode="ok"] .date { display: inline-block; }
        }
      `;
    }
  }

  class Field extends Jinkela {
    get template() { return '<input placeholder="{placeholder}" readonly="readonly" value="{text}" />'; }
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

  DatePicker = class DatePicker extends Jinkela {
    get Field() { return Field; }

    get placeholder() { return '请选择日期'; }
    get text() { return ''; }

    // 访问时才初始化
    get panel() {
      let onChange = this.change.bind(this);
      let value = new Panel(this.params, { binding: this, onChange });
      Object.defineProperty(this, 'panel', { value, configurable: true });
      return value;
    }

    init(params) {
      this.params = params;
      addEventListener('click', event => this.checkClose(event));
      this.element.addEventListener('click', event => event.relatedDatePicker = this);
      this.element.addEventListener('focus', () => {
        this.element.className = 'active';
        this.panel.show();
      }, true);
      Object.defineProperty(this.element, 'value', { get: () => this.value, set: value => this.value = value });
    }

    onChange() { /* 提供给外部重写 */ }

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

    change() {
      this.text = this.panel.text;
      this.onChange();
    }

    get value() {
      let value = this.panel.value;
      if (value == null) return value; // eslint-disable-line eqeqeq
      if ('offset' in this) value = new Date(value.getTime() + this.offset);
      return value;
    }
    set value(value = this.defaultValue) {
      if (typeof value === 'string') value = new Date(value);
      if (value instanceof Date && 'offset' in this) value = new Date(value.getTime() - this.offset);
      this.panel.value = value;
      this.text = this.panel.text;
    }

    get template() {
      return `
        <span>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M164 108l0 0c0-0 0-0 0-0L164 108 164 108M222 782l173 0 0-115-173 0L222 782 222 782M801 50l-57 0
                     0 173 57 0L801 50 801 50M280 50 222 50l0 173 57 0L280 50 280 50M222 609l173 0 0-115-173 0L222 609
                     222 609M858 108c0 0 0 0 0 0l0-0L858 108 858 108M685 609l115 0 0-115-115 0L685 609 685 609M859 108
                     l0 86c0 47-38 86-86 86s-86-38-86-86L685 108 338 108l0 86c0 47-38 86-86 86-47 0-86-38-86-86L164 108
                     C100 108 48 160 48 224l0 635c0 64 52 116 116 116l693 0c64 0 116-52 116-116L975 224C975 160 923 108
                     859 108L859 108M916 861c0 31-25 57-57 57L164 919c-31 0-57-25-57-57L106 437c0-31 25-57 57-57L858
                     379c31 0 57 25 57 57L916 861 916 861M454 609l173 0 0-115L454 493 454 609 454 609M454 782l173 0 0
                     -115L454 667 454 782 454 782M685 782l115 0 0-115-115 0L685 782 685 782M685 782 685 782z"></path>
          </svg>
          <jkl-field placeholder="{placeholder}" text="{text}"></jkl-field>
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
          &.active > input { border-color: #20a0ff; }
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

}


return DatePicker;

/**/ });

