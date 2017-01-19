'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

{
  (function () {
    var DatePickerItem = function (_Jinkela) {
      _inherits(DatePickerItem, _Jinkela);

      function DatePickerItem() {
        _classCallCheck(this, DatePickerItem);

        return _possibleConstructorReturn(this, (DatePickerItem.__proto__ || Object.getPrototypeOf(DatePickerItem)).apply(this, arguments));
      }

      _createClass(DatePickerItem, [{
        key: 'init',
        value: function init() {
          if (this.value != null) this.element.setAttribute('data-value', this.value); // eslint-disable-line eqeqeq
        }
      }, {
        key: 'template',
        get: function get() {
          return '<li><a href="JavaScript:">{text}</a></li>';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          float: left;\n          font-size: 12px;\n          color: #48576a;\n          padding: 0;\n          text-align: center;\n          a {\n            width: 100%;\n            display: block;\n            text-align: center;\n            line-height: 2;\n            color: inherit;\n            text-decoration: none;\n            cursor: default;\n          }\n          &[data-value] a {\n            cursor: pointer;\n          }\n          &[data-value] a:hover {\n            background: #eee;\n          }\n          &.current {\n            color: #20a0ff;\n          }\n        }\n      ';
        }
      }]);

      return DatePickerItem;
    }(Jinkela);

    var DatePickerItemWithHead = function (_DatePickerItem) {
      _inherits(DatePickerItemWithHead, _DatePickerItem);

      function DatePickerItemWithHead() {
        _classCallCheck(this, DatePickerItemWithHead);

        return _possibleConstructorReturn(this, (DatePickerItemWithHead.__proto__ || Object.getPrototypeOf(DatePickerItemWithHead)).apply(this, arguments));
      }

      _createClass(DatePickerItemWithHead, [{
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          width: 32px;\n          color: #8391a5;\n        }\n      ';
        }
      }]);

      return DatePickerItemWithHead;
    }(DatePickerItem);

    var DatePickerItemWithDate = function (_DatePickerItem2) {
      _inherits(DatePickerItemWithDate, _DatePickerItem2);

      function DatePickerItemWithDate() {
        _classCallCheck(this, DatePickerItemWithDate);

        return _possibleConstructorReturn(this, (DatePickerItemWithDate.__proto__ || Object.getPrototypeOf(DatePickerItemWithDate)).apply(this, arguments));
      }

      _createClass(DatePickerItemWithDate, [{
        key: 'init',
        value: function init() {
          var now = this.now,
              dateObject = this.dateObject;

          if (dateObject.getMonth() !== this.month) this.element.style.color = '#d7d7d7';
          if (now.getFullYear() === this.year && now.getMonth() === this.month && now.getDate() === this.value) {
            this.text = '今天';
            this.element.className = 'current';
          } else {
            this.text = dateObject.getDate();
          }
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          width: 32px;\n        }\n      ';
        }
      }]);

      return DatePickerItemWithDate;
    }(DatePickerItem);

    var DatePickerGrid = function (_Jinkela2) {
      _inherits(DatePickerGrid, _Jinkela2);

      function DatePickerGrid() {
        _classCallCheck(this, DatePickerGrid);

        return _possibleConstructorReturn(this, (DatePickerGrid.__proto__ || Object.getPrototypeOf(DatePickerGrid)).apply(this, arguments));
      }

      _createClass(DatePickerGrid, [{
        key: 'click',
        value: function click(_ref) {
          var target = _ref.target;

          if (target.tagName !== 'A') return;
          var value = target.parentNode.getAttribute('data-value');
          if (value && typeof this.onSelect === 'function') {
            this.onSelect(+value);
          }
        }
      }, {
        key: 'init',
        value: function init() {
          var _this5 = this;

          this.element.addEventListener('click', function (event) {
            return _this5.click(event);
          });
        }
      }, {
        key: 'tagName',
        get: function get() {
          return 'ul';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          padding: 0;\n          margin: 0;\n          list-style: none;\n          width: 224px;\n          box-sizing: border-box;\n          overflow: hidden;\n        }\n      ';
        }
      }]);

      return DatePickerGrid;
    }(Jinkela);

    var DatePickerDate = function (_DatePickerGrid) {
      _inherits(DatePickerDate, _DatePickerGrid);

      function DatePickerDate() {
        _classCallCheck(this, DatePickerDate);

        return _possibleConstructorReturn(this, (DatePickerDate.__proto__ || Object.getPrototypeOf(DatePickerDate)).apply(this, arguments));
      }

      _createClass(DatePickerDate, [{
        key: 'update',
        value: function update() {
          this.element.innerHTML = '';
          var year = this.year,
              month = this.month;

          var day = new Date(year, month, 1).getDay() - 1;
          var now = new Date();
          for (var i = 0; i < 7; i++) {
            var text = ['日', '一', '二', '三', '四', '五', '六'][i];
            new DatePickerItemWithHead({ text: text }).to(this);
          }
          for (var value = -day; value < 42 - day; value++) {
            var dateObject = new Date(year, month, value);
            new DatePickerItemWithDate({ value: value, dateObject: dateObject, now: now, year: year, month: month }).to(this);
          }
        }
      }, {
        key: 'init',
        value: function init() {
          this.update();
        }
      }, {
        key: 'year',
        get: function get() {
          return this.$year;
        },
        set: function set(value) {
          this.$year = value;
          this.update();
        }
      }, {
        key: 'month',
        get: function get() {
          return this.$month;
        },
        set: function set(value) {
          this.$month = value;
          this.update();
        }
      }]);

      return DatePickerDate;
    }(DatePickerGrid);

    var DatePickerItemWithMonth = function (_DatePickerItem3) {
      _inherits(DatePickerItemWithMonth, _DatePickerItem3);

      function DatePickerItemWithMonth() {
        _classCallCheck(this, DatePickerItemWithMonth);

        return _possibleConstructorReturn(this, (DatePickerItemWithMonth.__proto__ || Object.getPrototypeOf(DatePickerItemWithMonth)).apply(this, arguments));
      }

      _createClass(DatePickerItemWithMonth, [{
        key: 'init',
        value: function init() {
          if (this.value === this.currentMonth) {
            this.text = '本月';
            this.element.className = 'current';
          } else {
            this.text = this.value + 1 + ' 月';
          }
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          width: 74px;\n          a { padding: 9px 0; }\n        }\n      ';
        }
      }]);

      return DatePickerItemWithMonth;
    }(DatePickerItem);

    var DatePickerMonth = function (_DatePickerGrid2) {
      _inherits(DatePickerMonth, _DatePickerGrid2);

      function DatePickerMonth() {
        _classCallCheck(this, DatePickerMonth);

        return _possibleConstructorReturn(this, (DatePickerMonth.__proto__ || Object.getPrototypeOf(DatePickerMonth)).apply(this, arguments));
      }

      _createClass(DatePickerMonth, [{
        key: 'update',
        value: function update() {
          this.element.innerHTML = '';
          for (var value = 0; value < 12; value++) {
            var now = new Date();
            var currentMonth = this.year === now.getFullYear() && now.getMonth();
            new DatePickerItemWithMonth({ value: value, currentMonth: currentMonth }).to(this);
          }
        }
      }, {
        key: 'init',
        value: function init() {
          this.update();
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          padding: 1px;\n        }\n      ';
        }
      }, {
        key: 'year',
        get: function get() {
          return this.$year;
        },
        set: function set(value) {
          this.$year = value;
          this.update();
        }
      }]);

      return DatePickerMonth;
    }(DatePickerGrid);

    var DatePickerItemWithYear = function (_DatePickerItem4) {
      _inherits(DatePickerItemWithYear, _DatePickerItem4);

      function DatePickerItemWithYear() {
        _classCallCheck(this, DatePickerItemWithYear);

        return _possibleConstructorReturn(this, (DatePickerItemWithYear.__proto__ || Object.getPrototypeOf(DatePickerItemWithYear)).apply(this, arguments));
      }

      _createClass(DatePickerItemWithYear, [{
        key: 'init',
        value: function init() {
          if (this.value === this.currentYear) {
            this.text = '今年';
            this.element.className = 'current';
          } else {
            this.text = this.value;
          }
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          width: 56px;\n          a { padding: 6px 0; }\n        }\n      ';
        }
      }]);

      return DatePickerItemWithYear;
    }(DatePickerItem);

    var DatePickerYear = function (_DatePickerGrid3) {
      _inherits(DatePickerYear, _DatePickerGrid3);

      function DatePickerYear() {
        _classCallCheck(this, DatePickerYear);

        return _possibleConstructorReturn(this, (DatePickerYear.__proto__ || Object.getPrototypeOf(DatePickerYear)).apply(this, arguments));
      }

      _createClass(DatePickerYear, [{
        key: 'pageSize',
        get: function get() {
          return 20;
        }
      }, {
        key: 'starting',
        get: function get() {
          return this.$starting;
        },
        set: function set(starting) {
          this.$starting = starting;
          this.element.innerHTML = '';
          var currentYear = new Date().getFullYear();
          for (var value = starting; value < starting + this.pageSize; value++) {
            new DatePickerItemWithYear({ value: value, currentYear: currentYear }).to(this);
          }
        }
      }]);

      return DatePickerYear;
    }(DatePickerGrid);

    var DatePickerPanel = function (_Jinkela3) {
      _inherits(DatePickerPanel, _Jinkela3);

      function DatePickerPanel() {
        _classCallCheck(this, DatePickerPanel);

        return _possibleConstructorReturn(this, (DatePickerPanel.__proto__ || Object.getPrototypeOf(DatePickerPanel)).apply(this, arguments));
      }

      _createClass(DatePickerPanel, [{
        key: 'beforeParse',
        value: function beforeParse(params) {
          var _this12 = this;

          this.lock = 0;
          if (!params.starting) params.starting = null;
          this.dpy = new DatePickerYear({ onSelect: function onSelect(value) {
              return _this12.year = value;
            } });
          this.dpm = new DatePickerMonth({ onSelect: function onSelect(value) {
              return _this12.month = value;
            } });
          this.dpd = new DatePickerDate({ onSelect: function onSelect(value) {
              return _this12.date = value;
            } });
        }
      }, {
        key: 'init',
        value: function init() {
          var _this13 = this;

          this.element.addEventListener('click', function (event) {
            return _this13.action(event);
          });
          this.update();
        }
      }, {
        key: 'commit',
        value: function commit(func) {
          this.lock++;
          func.call(this);
          this.lock--;
          this.update();
        }
      }, {
        key: 'update',
        value: function update() {
          if (this.lock) return;
          this.uls.innerHTML = '';
          switch (true) {
            case this.year == null:
              // eslint-disable-line eqeqeq
              this.mode = 'year';
              this.current = this.dpy.to(this.uls);
              break;
            case this.month == null || this.disableDate:
              // eslint-disable-line eqeqeq
              this.mode = 'month';
              this.current = this.dpm.to(this.uls);
              break;
            default:
              this.mode = 'date';
              this.current = this.dpd.to(this.uls);
              break;
          }
          if (typeof this.current.update === 'function') this.current.update();
          var value = this.value;

          if (+value !== +value) value = null;
          if (typeof this.onChange === 'function') this.onChange(value);
        }
      }, {
        key: 'action',
        value: function action(_ref2) {
          var target = _ref2.target;

          try {
            this[target.dataset.action || target.parentNode.dataset.action]();
          } catch (error) {
            /* ignore error */
          }
        }
      }, {
        key: 'nextYearPage',
        value: function nextYearPage() {
          this.starting += 20;
        }
      }, {
        key: 'prevYearPage',
        value: function prevYearPage() {
          this.starting -= 20;
        }
      }, {
        key: 'prevYear',
        value: function prevYear() {
          this.year--;
        }
      }, {
        key: 'nextYear',
        value: function nextYear() {
          this.year++;
        }
      }, {
        key: 'prevMonth',
        value: function prevMonth() {
          this.month--;
        }
      }, {
        key: 'nextMonth',
        value: function nextMonth() {
          this.month++;
        }
      }, {
        key: 'resetMonth',
        value: function resetMonth() {
          var _this14 = this;

          this.commit(function () {
            _this14.date = _this14.month = null;
          });
        }
      }, {
        key: 'resetYear',
        value: function resetYear() {
          var _this15 = this;

          this.commit(function () {
            _this15.starting = _this15.year ? _this15.year - 8 : null;
            _this15.year = _this15.date = _this15.month = null;
          });
        }
      }, {
        key: 'starting',
        get: function get() {
          return this.$starting;
        },
        set: function set(value) {
          value = value || new Date().getFullYear() - 8;
          this.$starting = this.dpy.starting = value;
          this.startingText = value + ' ~ ' + (value + 19) + ' 年';
          this.update();
        }
      }, {
        key: 'year',
        get: function get() {
          return this.$year;
        },
        set: function set(value) {
          this.$year = this.dpy.year = this.dpm.year = this.dpd.year = value;
          this.yearText = this.$year;
          this.update();
        }
      }, {
        key: 'month',
        get: function get() {
          return this.$month;
        },
        set: function set(value) {
          this.$month = this.dpy.month = this.dpm.month = this.dpd.month = value;
          this.monthText = this.$month + 1;
          this.update();
        }
      }, {
        key: 'date',
        get: function get() {
          return this.$date;
        },
        set: function set(value) {
          this.$date = this.dpy.date = this.dpm.date = this.dpd.date = value;
          this.update();
        }
      }, {
        key: 'value',
        set: function set(date) {
          var _this16 = this;

          try {
            if (date == null) throw void 0;
            if (!(date instanceof Date)) date = new Date(date);
            if (+date !== +date) throw void 0;
            this.commit(function () {
              _this16.year = date.getFullYear();
              _this16.month = date.getMonth();
              _this16.date = date.getDate();
            });
          } catch (error) {
            this.resetYear();
          }
        },
        get: function get() {
          if (this.year == null) return new Date(0 / 0); // eslint-disable-line eqeqeq
          return new Date(this.year, this.month || 0, this.date == null ? 1 : this.date); // eslint-disable-line eqeqeq
        }
      }, {
        key: 'text',
        get: function get() {
          var text = '';
          var value = this.value;

          if (this.year != null) {
            // eslint-disable-line eqeqeq
            text += value.getFullYear();
            if (this.month != null) {
              // eslint-disable-line eqeqeq
              text += '-' + (value.getMonth() + 1);
              if (this.date != null && !this.disableDate) text += '-' + value.getDate(); // eslint-disable-line eqeqeq
            }
          }
          return text.replace(/\b\d\b/g, '0$&');
        }
      }, {
        key: 'template',
        get: function get() {
          return '\n        <dl>\n          <dt data-mode="{mode}">\n            <div style="float: left; text-align: left;">\n              <a href="JavaScript:" class="year" data-action="prevYearPage">&lt;&lt;</a>&nbsp;\n              <a href="JavaScript:" class="month date" data-action="prevYear">&lt;&lt;</a>&nbsp;\n              <a href="JavaScript:" class="date" data-action="prevMonth">&lt;</a>\n            </div>\n            <span class="year">{startingText}</span>\n            <a href="JavaScript:" class="month date" data-action="resetYear"><span>{yearText}</span> \u5E74</a>\n            <span class="date">&nbsp;</span>\n            <a href="JavaScript:" class="date" data-action="resetMonth"><span>{monthText}</span> \u6708</a>\n            <div style="float: right; text-align: right;">\n              <a href="JavaScript:" class="date" data-action="nextMonth">&gt;</a>&nbsp;\n              <a href="JavaScript:" class="month date" data-action="nextYear">&gt;&gt;</a>\n              <a href="JavaScript:" class="year" data-action="nextYearPage">&gt;&gt;</a>&nbsp;\n            </div>\n          </dt>\n          <dd ref="uls"></dd>\n        </dl>\n      ';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          position: absolute;\n          z-index: 2;\n          background: #fff;\n          top: 100%;\n          left: 0;\n          font-size: 14px;\n          display: inline-block;\n          margin-top: 5px;\n          box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);\n          border: 1px solid #d1dbe5;\n          border-radius: 2px;\n          > dt {\n            line-height: 20px;\n            margin: 12px;\n            overflow: hidden;\n            text-align: center;\n            border-bottom: 0;\n            a {\n              text-decoration: none;\n              color: inherit;\n              &:hover {\n                color: #20a0ff;\n              }\n            }\n            [class] { display: none; }\n            &[data-mode="year"] .year { display: inline-block; }\n            &[data-mode="month"] .month { display: inline-block; }\n            &[data-mode="date"] .date { display: inline-block; }\n          }\n          dd {\n            margin: 0;\n          }\n        }\n      ';
        }
      }]);

      return DatePickerPanel;
    }(Jinkela);

    var DatePickerField = function (_Jinkela4) {
      _inherits(DatePickerField, _Jinkela4);

      function DatePickerField() {
        _classCallCheck(this, DatePickerField);

        return _possibleConstructorReturn(this, (DatePickerField.__proto__ || Object.getPrototypeOf(DatePickerField)).apply(this, arguments));
      }

      _createClass(DatePickerField, [{
        key: 'text',
        set: function set(value) {
          this.element.value = value;
        },
        get: function get() {
          return this.element.value;
        }
      }, {
        key: 'template',
        get: function get() {
          return '<input placeholder="{placeholder}" readonly="readonly" />';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          width: 226px;\n          position: relative;\n          border: 1px solid #bfcbd9;\n          border-radius: 4px;\n          line-height: 1;\n          box-sizing: border-box;\n          background: #fff;\n          height: 36px;\n          transition: border-color .2s cubic-bezier(.645,.045,.355,1);\n          display: inline-block;\n          padding: 3px 10px;\n          outline: 0;\n          font-family: inherit;\n          &:hover {\n            border-color: #8391a5;\n          }\n        }\n      ';
        }
      }]);

      return DatePickerField;
    }(Jinkela);

    var DatePicker = function (_Jinkela5) {
      _inherits(DatePicker, _Jinkela5);

      function DatePicker() {
        _classCallCheck(this, DatePicker);

        return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
      }

      _createClass(DatePicker, [{
        key: 'beforeParse',
        value: function beforeParse(params) {
          var _this19 = this;

          this.field = new DatePickerField(this);
          this.panel = new DatePickerPanel(this);
          this.panel.onChange = function () {
            return _this19.change();
          };
          this.placeholder = 'placeholder' in params ? params.placeholder : '请选择日期';
        }
      }, {
        key: 'init',
        value: function init() {
          var _this20 = this;

          this.field.to(this);
          this.panel.to(this);
          this.update();
          addEventListener('click', function (event) {
            return _this20.checkClose(event);
          });
          this.element.addEventListener('click', function (event) {
            return event.relatedDatePicker = _this20;
          });
          this.element.addEventListener('focus', function () {
            return _this20.element.className = 'active';
          }, true);
          Object.defineProperty(this.element, 'value', { get: function get() {
              return _this20.value;
            }, set: function set(value) {
              return _this20.value = value;
            } });
        }
      }, {
        key: 'onChange',
        value: function onChange() {}
      }, {
        key: 'checkClose',
        value: function checkClose(event) {
          if (!this.element.className) return;
          var target = event.target;

          if (event.relatedDatePicker === this) {
            if (!target.parentNode) return;
            if (!target.parentNode.getAttribute('data-value')) return;
            var value = this.disableDate ? this.panel.month : this.panel.date;
            if (value == null) return; // eslint-disable-line eqeqeq
          }
          this.element.className = '';
        }
      }, {
        key: 'update',
        value: function update() {
          this.field.text = this.panel.text || this.defaultText || '';
        }
      }, {
        key: 'change',
        value: function change() {
          this.update();
          this.onChange();
        }
      }, {
        key: 'placeholder',
        set: function set(value) {
          this.field.placeholder = value;
        },
        get: function get() {
          return this.field.placeholder;
        }
      }, {
        key: 'starting',
        set: function set(value) {
          this.panel.starting = value;
        },
        get: function get() {
          return this.panel.strting;
        }
      }, {
        key: 'value',
        get: function get() {
          var value = this.panel.value;
          if (value == null) return value; // eslint-disable-line eqeqeq
          if ('offset' in this) value = new Date(value.getTime() + this.offset);
          return value;
        },
        set: function set(value) {
          if (typeof value === 'string') value = new Date(value);
          if (value instanceof Date && 'offset' in this) value = new Date(value.getTime() - this.offset);
          this.panel.value = value;
          this.update();
        }
      }, {
        key: 'template',
        get: function get() {
          return '\n        <span>\n          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">\n            <path d="M164 108l0 0c0-0 0-0 0-0L164 108 164 108M222 782l173 0 0-115-173 0L222 782 222 782M801 50l-57 0 0 173 57 0L801 50 801 50M280 50 222 50l0 173 57 0L280 50 280 50M222 609l173 0 0-115-173 0L222 609 222 609M858 108c0 0 0 0 0 0l0-0L858 108 858 108M685 609l115 0 0-115-115 0L685 609 685 609M859 108l0 86c0 47-38 86-86 86s-86-38-86-86L685 108 338 108l0 86c0 47-38 86-86 86-47 0-86-38-86-86L164 108C100 108 48 160 48 224l0 635c0 64 52 116 116 116l693 0c64 0 116-52 116-116L975 224C975 160 923 108 859 108L859 108M916 861c0 31-25 57-57 57L164 919c-31 0-57-25-57-57L106 437c0-31 25-57 57-57L858 379c31 0 57 25 57 57L916 861 916 861M454 609l173 0 0-115L454 493 454 609 454 609M454 782l173 0 0-115L454 667 454 782 454 782M685 782l115 0 0-115-115 0L685 782 685 782M685 782 685 782z"></path>\n          </svg>\n        </span>\n      ';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          font-size: 14px;\n          font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;\n          -webkit-font-smoothing: antialiased;\n          position: relative;\n          display: inline-block;\n          > dl { display: none; }\n          &.active > input { border-color: #20a0ff; }\n          &.active > dl { display: block; }\n          > svg {\n            position: absolute;\n            width: 16px;\n            height: 16px;\n            right: 8px;\n            top: 0;\n            bottom: 0;\n            margin: auto;\n            fill: #bfcbd9;\n            z-index: 1;\n          }\n        }\n      ';
        }
      }]);

      return DatePicker;
    }(Jinkela);

    window.DatePicker = DatePicker;
  })();
}
