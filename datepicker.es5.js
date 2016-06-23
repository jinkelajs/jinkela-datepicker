'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

{
  (function () {
    var DatePickerItem = (function (_Jinkela) {
      _inherits(DatePickerItem, _Jinkela);

      function DatePickerItem() {
        _classCallCheck(this, DatePickerItem);

        _get(Object.getPrototypeOf(DatePickerItem.prototype), 'constructor', this).apply(this, arguments);
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
      }]);

      return DatePickerItem;
    })(Jinkela);

    var DatePickerGrid = (function (_Jinkela2) {
      _inherits(DatePickerGrid, _Jinkela2);

      function DatePickerGrid() {
        _classCallCheck(this, DatePickerGrid);

        _get(Object.getPrototypeOf(DatePickerGrid.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(DatePickerGrid, [{
        key: 'onClick',
        value: function onClick(_ref) {
          var target = _ref.target;

          if (target.tagName !== 'A') return;
          var value = target.parentNode.getAttribute('data-value');
          if (value && typeof this.onSelect === 'function') {
            this.onSelect(+value);
          }
        }
      }, {
        key: 'template',
        get: function get() {
          return '<ul on-click="{onClick}"></ul>';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          padding: 0;\n          margin: 0;\n          vertical-align: top;\n          border-left: 1px solid #d7d7d7;\n          border-top: 1px solid #d7d7d7;\n          list-style: none;\n          display: inline-block;\n          width: 252px;\n          li {\n            border: 1px solid #d7d7d7;\n            margin-left: -1px;\n            margin-top: -1px;\n            float: left;\n            padding: 0;\n            text-align: center;\n            a {\n              width: 100%;\n              display: block;\n              text-align: center;\n              line-height: 2;\n              color: inherit;\n              text-decoration: none;\n              cursor: default;\n            }\n            &[data-value] a {\n              cursor: pointer;\n            }\n            &[data-value] a:hover {\n              background: #eee;\n            }\n          }\n        }\n      ';
        }
      }]);

      return DatePickerGrid;
    })(Jinkela);

    var DatePickerDate = (function (_DatePickerGrid) {
      _inherits(DatePickerDate, _DatePickerGrid);

      function DatePickerDate() {
        _classCallCheck(this, DatePickerDate);

        _get(Object.getPrototypeOf(DatePickerDate.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(DatePickerDate, [{
        key: 'update',
        value: function update() {
          this.element.innerHTML = '';
          var day = new Date(this.year, this.month, 1).getDay() - 1;
          for (var i = 0; i < 7; i++) {
            var text = ['日', '一', '二', '三', '四', '五', '六'][i];
            var item = new DatePickerItem({ text: text }).renderTo(this);
            item.element.style.background = '#f0f0f0';
          }
          for (var i = 0; i < 42; i++) {
            var now = new Date(this.year, this.month, i - day);
            var item = new DatePickerItem({ value: i - day, text: now.getDate() }).renderTo(this);
            if (now.getMonth() !== this.month) item.element.style.color = '#d7d7d7';
          }
        }
      }, {
        key: 'init',
        value: function init() {
          this.update();
        }
      }, {
        key: 'prev',
        value: function prev() {
          this.parent.month--;
        }
      }, {
        key: 'next',
        value: function next() {
          this.parent.month++;
        }
      }, {
        key: 'back',
        value: function back() {
          this.parent.date = this.parent.month = null;
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          li:nth-child(7n+1) { clear: left; }\n          li { width: 35px; }\n        }\n      ';
        }
      }]);

      return DatePickerDate;
    })(DatePickerGrid);

    var DatePickerMonth = (function (_DatePickerGrid2) {
      _inherits(DatePickerMonth, _DatePickerGrid2);

      function DatePickerMonth() {
        _classCallCheck(this, DatePickerMonth);

        _get(Object.getPrototypeOf(DatePickerMonth.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(DatePickerMonth, [{
        key: 'init',
        value: function init() {
          for (var i = 0; i < 12; i++) {
            new DatePickerItem({ value: i, text: i + 1 + ' 月' }).renderTo(this);
          }
        }
      }, {
        key: 'prev',
        value: function prev() {
          this.parent.year--;
        }
      }, {
        key: 'next',
        value: function next() {
          this.parent.year++;
        }
      }, {
        key: 'back',
        value: function back() {
          this.parent.month = this.parent.year = null;
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          li:nth-child(3n+1) { clear: left; }\n          li { width: 83px; }\n          li a { padding: 11px 0; }\n        }\n      ';
        }
      }]);

      return DatePickerMonth;
    })(DatePickerGrid);

    var DatePickerYear = (function (_DatePickerGrid3) {
      _inherits(DatePickerYear, _DatePickerGrid3);

      function DatePickerYear() {
        _classCallCheck(this, DatePickerYear);

        _get(Object.getPrototypeOf(DatePickerYear.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(DatePickerYear, [{
        key: 'init',
        value: function init() {
          this.starting = this.starting || new Date().getFullYear() - 36;
        }
      }, {
        key: 'prev',
        value: function prev() {
          this.starting -= this.pageSize;
        }
      }, {
        key: 'next',
        value: function next() {
          this.starting += this.pageSize;
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          li:nth-child(4n+1) { clear: left; }\n          li { width: 62px; }\n          li a { padding: 6px 0; }\n        }\n      ';
        }
      }, {
        key: 'pageSize',
        get: function get() {
          return 20;
        }
      }, {
        key: 'starting',
        get: function get() {
          return this.$starting;
        },
        set: function set(value) {
          this.$starting = value;
          this.element.innerHTML = '';
          for (var i = 0; i < this.pageSize; i++) {
            new DatePickerItem({ value: i + value, text: i + value }).renderTo(this);
          }
        }
      }]);

      return DatePickerYear;
    })(DatePickerGrid);

    var DatePickerPanel = (function (_Jinkela3) {
      _inherits(DatePickerPanel, _Jinkela3);

      function DatePickerPanel() {
        _classCallCheck(this, DatePickerPanel);

        _get(Object.getPrototypeOf(DatePickerPanel.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(DatePickerPanel, [{
        key: 'init',
        value: function init() {
          var _this = this;

          var starting = this.starting;

          this.dpy = new DatePickerYear({ parent: this, onSelect: function onSelect(value) {
              return _this.year = value;
            }, starting: starting });
          this.dpm = new DatePickerMonth({ parent: this, onSelect: function onSelect(value) {
              return _this.month = value;
            } });
          this.dpd = new DatePickerDate({ parent: this, onSelect: function onSelect(value) {
              return _this.date = value;
            } });
          this.update();
        }
      }, {
        key: 'update',
        // eslint-disable-line eqeqeq
        value: function update() {
          this.uls.innerHTML = '';
          switch (true) {
            case this.year == null:
              // eslint-disable-line eqeqeq
              this.current = this.dpy.renderTo(this.uls);
              break;
            case this.month == null || this.disableDate:
              // eslint-disable-line eqeqeq
              this.current = this.dpm.renderTo(this.uls);
              break;
            default:
              this.current = this.dpd.renderTo(this.uls);
              break;
          }
          if (typeof this.current.update === 'function') this.current.update();
          if (typeof this.onChange === 'function') this.onChange(this.value);
        }
      }, {
        key: 'prev',
        value: function prev() {
          if (!this.current || typeof this.current.prev !== 'function') return;
          this.current.prev();
        }
      }, {
        key: 'next',
        value: function next() {
          if (!this.current || typeof this.current.next !== 'function') return;
          this.current.next();
        }
      }, {
        key: 'back',
        value: function back() {
          if (!this.current || typeof this.current.back !== 'function') return;
          this.current.back();
        }
      }, {
        key: 'year',
        get: function get() {
          return this.$year;
        },
        set: function set(value) {
          this.$year = this.dpy.year = this.dpm.year = this.dpd.year = value;
          if (value != null) {
            // eslint-disable-line eqeqeq
            var year = this.value.getFullYear();
            if (year !== value) {
              return this.year = year;
            }
          }
          this.update();
        }
      }, {
        key: 'month',
        get: function get() {
          return this.$month;
        },
        set: function set(value) {
          this.$month = this.dpy.month = this.dpm.month = this.dpd.month = value;
          if (value != null) {
            // eslint-disable-line eqeqeq
            var thisValue = this.value;
            if (thisValue.getMonth() !== value) {
              this.month = thisValue.getMonth();
              this.year = thisValue.getFullYear();
              return;
            }
          }
          this.update();
        }
      }, {
        key: 'date',
        get: function get() {
          return this.$date;
        },
        set: function set(value) {
          this.$date = this.dpy.date = this.dpm.date = this.dpd.date = value;
          if (value != null) {
            // eslint-disable-line eqeqeq
            var thisValue = this.value;
            if (thisValue.getDate() !== value) {
              this.date = thisValue.getDate();
              this.month = thisValue.getMonth();
              this.year = thisValue.getFullYear();
              return;
            }
          }
          this.update();
        }
      }, {
        key: 'value',
        set: function set(date) {
          this.year = date.getFullYear();
          this.month = date.getMonth();
          this.date = date.getDate();
        },
        get: function get() {
          return new Date(this.year, this.month || 0, this.date == null ? 1 : this.date);
        }
      }, {
        key: 'text',
        get: function get() {
          var text = '';
          var value = this.value;

          if (this.year != null) {
            // eslint-disable-line eqeqeq
            text += value.getFullYear() + ' 年';
            if (this.month != null) {
              // eslint-disable-line eqeqeq
              text += ' ' + (value.getMonth() + 1) + ' 月';
              if (this.date != null && !this.disableDate) text += ' ' + value.getDate() + ' 日'; // eslint-disable-line eqeqeq
            }
          }
          return text;
        }
      }, {
        key: 'template',
        get: function get() {
          return '\n        <dl>\n          <dt>\n            <a href="JavaScript:" on-click="{prev}">&lt;&lt;</a>\n            <a href="JavaScript:" on-click="{back}" if="{$year}">返回</a>\n            <span if-not="{$year}">请选择</span>\n            <a href="JavaScript:" on-click="{next}">&gt;&gt;</a>\n          </dt>\n          <dd ref="uls"></dd>\n        </dl>\n      ';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          position: absolute;\n          z-index: 1;\n          background: #fff;\n          top: 100%;\n          left: 0;\n          margin-top: 0;\n          font-size: 14px;\n          display: inline-block;\n          box-shadow: 0 0 32px -6px rgba(0,0,0,.5);\n          dt {\n            line-height: 2;\n            overflow: hidden;\n            text-align: center;\n            border: 1px solid #d7d7d7;\n            border-bottom: 0;\n            padding: 0 .5em;\n            a {\n              text-decoration: none;\n              color: inherit;\n              &:hover {\n                opacity: 0.5;\n              }\n            }\n            a:first-child {\n              float: left;\n            }\n            a:last-child {\n              float: right;\n            }\n          }\n          dd {\n            margin: 0;\n          }\n        }\n      ';
        }
      }]);

      return DatePickerPanel;
    })(Jinkela);

    var DatePicker = (function (_Jinkela4) {
      _inherits(DatePicker, _Jinkela4);

      function DatePicker() {
        _classCallCheck(this, DatePicker);

        _get(Object.getPrototypeOf(DatePicker.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(DatePicker, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.panel = new DatePickerPanel(this).renderTo(this);
          this.panel.onChange = function () {
            return _this2.change();
          };
          this.update();
          addEventListener('click', function (event) {
            return _this2.checkClose(event);
          });
          this.element.addEventListener('click', function (event) {
            return event.isFromDatePicker = true;
          });
          Object.defineProperty(this.element, 'value', { get: function get() {
              return _this2.value;
            }, set: function set(value) {
              return _this2.value = value;
            } });
        }
      }, {
        key: 'onChange',
        value: function onChange() {}
      }, {
        key: 'checkClose',
        value: function checkClose(event) {
          if (!this.element.className) return;
          if (event.isFromDatePicker) {
            if (!event.target.parentNode) return;
            if (!event.target.parentNode.getAttribute('data-value')) return;
            var value = this.disableDate ? this.panel.month : this.panel.date;
            if (value == null) return; // eslint-disable-line eqeqeq
          }
          this.element.className = '';
        }
      }, {
        key: 'update',
        value: function update() {
          this.text = this.panel.text || this.defaultText || '请选择';
        }
      }, {
        key: 'change',
        value: function change() {
          this.update();
          this.onChange();
        }
      }, {
        key: 'popup',
        value: function popup(event) {
          this.element.className = 'active';
        }
      }, {
        key: 'value',
        get: function get() {
          return this.panel.value;
        },
        set: function set(value) {
          this.panel.value = value;
        }
      }, {
        key: 'template',
        get: function get() {
          return '<span><span text="{text}" on-click="{popup}"></span></span>';
        }
      }, {
        key: 'styleSheet',
        get: function get() {
          return '\n        :scope {\n          position: relative;\n          line-height: 1.5em;\n          height: 1.5em;\n          > span:first-child {\n            &:before { content: attr(text); }\n            cursor: pointer;\n          }\n          > dl { display: none; }\n          &.active > dl { display: block; }\n        }\n      ';
        }
      }]);

      return DatePicker;
    })(Jinkela);

    window.DatePicker = DatePicker;
  })();
}
