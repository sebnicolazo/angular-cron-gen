(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ACCEPTABLE_CRON_FORMATS = ['quartz', 'unix'];
  var States = {
    INIT: 1,
    DIRTY: 2,
    CLEAN: 3
  };
  var CronGenComponent = /*#__PURE__*/function () {
    CronGenComponent.$inject = ["$scope", "$translate", "$filter", "cronGenService"];
    function CronGenComponent($scope, $translate, $filter, cronGenService) {
      'ngInject';

      var _this = this;

      _classCallCheck(this, CronGenComponent);

      this.parsedOptions = this.mergeDefaultOptions(this.options);
      $translate.use(this.parsedOptions.language);
      angular.extend(this, {
        cronGenService: cronGenService,
        filter: $filter,
        translate: $translate,
        cronFormat: 'unix',
        currentState: States.INIT,
        activeTab: function () {
          if (!_this.parsedOptions.hideMinutesTab) {
            return 'minutes';
          } else if (!_this.parsedOptions.hideHourlyTab) {
            return 'hourly';
          } else if (!_this.parsedOptions.hideDailyTab) {
            return 'daily';
          } else if (!_this.parsedOptions.hideWeeklyTab) {
            return 'weekly';
          } else if (!_this.parsedOptions.hideMonthlyTab) {
            return 'monthly';
          } else if (!_this.parsedOptions.hideYearlyTab) {
            return 'yearly';
          } else if (!_this.parsedOptions.hideAdvancedTab) {
            return 'advanced';
          }

          throw 'No tabs available to make active';
        }(),
        selectOptions: cronGenService.selectOptions(),
        state: {
          minutes: {
            minutes: 1,
            seconds: 0
          },
          hourly: {
            hours: 1,
            minutes: 0,
            seconds: 0
          },
          daily: {
            subTab: 'everyDays',
            everyDays: {
              days: 1,
              hours: this.parsedOptions.use24HourTime ? 0 : 1,
              minutes: 0,
              seconds: 0,
              hourType: this.parsedOptions.use24HourTime ? null : 'AM'
            },
            everyWeekDay: {
              hours: this.parsedOptions.use24HourTime ? 0 : 1,
              minutes: 0,
              seconds: 0,
              hourType: this.parsedOptions.use24HourTime ? null : 'AM'
            }
          },
          weekly: {
            MON: true,
            TUE: false,
            WED: false,
            THU: false,
            FRI: false,
            SAT: false,
            SUN: false,
            hours: this.parsedOptions.use24HourTime ? 0 : 1,
            minutes: 0,
            seconds: 0,
            hourType: this.parsedOptions.use24HourTime ? null : 'AM'
          },
          monthly: {
            subTab: 'specificDay',
            specificDay: {
              day: '1',
              months: 1,
              hours: this.parsedOptions.use24HourTime ? 0 : 1,
              minutes: 0,
              seconds: 0,
              hourType: this.parsedOptions.use24HourTime ? null : 'AM'
            },
            specificWeekDay: {
              monthWeek: '#1',
              day: 'MON',
              months: 1,
              hours: this.parsedOptions.use24HourTime ? 0 : 1,
              minutes: 0,
              seconds: 0,
              hourType: this.parsedOptions.use24HourTime ? null : 'AM'
            }
          },
          yearly: {
            subTab: 'specificMonthDay',
            specificMonthDay: {
              month: 1,
              day: '1',
              hours: this.parsedOptions.use24HourTime ? 0 : 1,
              minutes: 0,
              seconds: 0,
              hourType: this.parsedOptions.use24HourTime ? null : 'AM'
            },
            specificMonthWeek: {
              monthWeek: '#1',
              day: 'MON',
              month: 1,
              hours: this.parsedOptions.use24HourTime ? 0 : 1,
              minutes: 0,
              seconds: 0,
              hourType: this.parsedOptions.use24HourTime ? null : 'AM'
            }
          },
          advanced: {
            expression: this.cronFormat === 'quartz' ? '0 15 10 L-2 * ?' : '0 6 1 * *'
          }
        }
      }); //Validate our opts

      if (ACCEPTABLE_CRON_FORMATS.indexOf(this.cronFormat) == -1) {
        throw "Desired cron format (".concat(this.cronFormat, ") is not available");
      } //On model changes, update our state to reflect the user's input


      $scope.$watch('$ctrl.ngModel', function (cron) {
        return _this.handleModelChange(cron);
      }); // Watch for option changes

      $scope.$watch('$ctrl.options', this.optionsChanged.bind(this), true);
    }

    _createClass(CronGenComponent, [{
      key: "$onInit",
      value: function $onInit() {
        var _this2 = this;

        //If possible, add our cron expression validator to our form
        if (this.formCtrl && this.name) {
          this.ngModelCtrl.$validators.testCronExpr = function (expression) {
            return _this2.cronGenService.isValid(_this2.cronFormat, expression);
          };
        }
      }
    }, {
      key: "optionsChanged",
      value: function optionsChanged(options) {
        this.parsedOptions = this.mergeDefaultOptions(options);
        this.translate.use(this.parsedOptions.language);
      }
    }, {
      key: "setActiveTab",
      value: function setActiveTab($event, tab) {
        $event.preventDefault();

        if (!this.ngDisabled) {
          this.activeTab = tab;
          this.regenerateCron();
        }
      }
    }, {
      key: "dayDisplay",
      value: function dayDisplay(day) {
        switch (day) {
          case "SUN":
            return this.filter('translate')('SUNDAY');

          case "MON":
            return this.filter('translate')('MONDAY');

          case "TUE":
            return this.filter('translate')('TUESDAY');

          case "WED":
            return this.filter('translate')('WEDNESDAY');

          case "THU":
            return this.filter('translate')('THURSDAY');

          case "FRI":
            return this.filter('translate')('FRIDAY');

          case "SAT":
            return this.filter('translate')('SATURDAY');
        }
      }
    }, {
      key: "monthWeekDisplay",
      value: function monthWeekDisplay(monthWeekNumber) {
        switch (monthWeekNumber) {
          case "#1":
            return this.filter('translate')('FIRST');

          case "#2":
            return this.filter('translate')('SECOND');

          case "#3":
            return this.filter('translate')('THIRD');

          case "#4":
            return this.filter('translate')('FOURTH');

          case "#5":
            return this.filter('translate')('FIFTH');

          case "L":
            return this.filter('translate')('LAST');
        }
      }
    }, {
      key: "monthDisplay",
      value: function monthDisplay(monthNumber) {
        switch (monthNumber) {
          case 1:
            return this.filter('translate')('JANUARY');

          case 2:
            return this.filter('translate')('FEBRUARY');

          case 3:
            return this.filter('translate')('MARCH');

          case 4:
            return this.filter('translate')('APRIL');

          case 5:
            return this.filter('translate')('MAY');

          case 6:
            return this.filter('translate')('JUNE');

          case 7:
            return this.filter('translate')('JULY');

          case 8:
            return this.filter('translate')('AUGUST');

          case 9:
            return this.filter('translate')('SEPTEMBER');

          case 10:
            return this.filter('translate')('OCTOBER');

          case 11:
            return this.filter('translate')('NOVEMBER');

          case 12:
            return this.filter('translate')('DECEMBER');
        }
      }
    }, {
      key: "monthDayDisplay",
      value: function monthDayDisplay(monthDay) {
        if (monthDay === 'L') {
          return this.filter('translate')('LAST_DAY');
        } else if (monthDay === 'LW') {
          return this.filter('translate')('LAST_WEEKDAY');
        } else if (monthDay === '1W') {
          return this.filter('translate')('FIRST_WEEKDAY');
        } else {
          return "".concat(monthDay).concat(this.cronGenService.appendInt(monthDay), " ").concat(this.filter('translate')('DAY'));
        }
      }
    }, {
      key: "processHour",
      value: function processHour(hours) {
        if (this.parsedOptions.use24HourTime) {
          return hours;
        } else {
          return (hours + 11) % 12 + 1;
        }
      }
    }, {
      key: "getHourType",
      value: function getHourType(hours) {
        return this.parsedOptions.use24HourTime ? null : hours >= 12 ? 'PM' : 'AM';
      }
    }, {
      key: "hourToCron",
      value: function hourToCron(hour, hourType) {
        if (this.parsedOptions.use24HourTime) {
          return hour;
        } else {
          return hourType === 'AM' ? hour === 12 ? 0 : hour : hour === 12 ? 12 : hour + 12;
        }
      }
    }, {
      key: "mergeDefaultOptions",
      value: function mergeDefaultOptions(options) {
        return angular.extend({
          formInputClass: 'form-control cron-gen-input',
          formSelectClass: 'form-control cron-gen-select',
          formRadioClass: 'cron-gen-radio',
          formCheckboxClass: 'cron-gen-checkbox',
          hideMinutesTab: true,
          hideHourlyTab: true,
          hideDailyTab: false,
          hideWeeklyTab: false,
          hideMonthlyTab: false,
          hideYearlyTab: false,
          hideAdvancedTab: true,
          use24HourTime: true,
          hideSeconds: true,
          language: 'en'
        }, options);
      }
    }, {
      key: "regenerateCron",
      value: function regenerateCron() {
        var _this3 = this;

        this.currentState = States.DIRTY;

        switch (this.cronFormat) {
          case 'quartz':
            switch (this.activeTab) {
              case 'minutes':
                this.ngModel = "".concat(this.state.minutes.seconds, " 0/").concat(this.state.minutes.minutes, " * 1/1 * ? *");
                break;

              case 'hourly':
                this.ngModel = "".concat(this.state.hourly.seconds, " ").concat(this.state.hourly.minutes, " 0/").concat(this.state.hourly.hours, " 1/1 * ? *");
                break;

              case 'daily':
                switch (this.state.daily.subTab) {
                  case 'everyDays':
                    this.ngModel = "".concat(this.state.daily.everyDays.seconds, " ").concat(this.state.daily.everyDays.minutes, " ").concat(this.hourToCron(this.state.daily.everyDays.hours, this.state.daily.everyDays.hourType), " 1/").concat(this.state.daily.everyDays.days, " * ? *");
                    break;

                  case 'everyWeekDay':
                    this.ngModel = "".concat(this.state.daily.everyWeekDay.seconds, " ").concat(this.state.daily.everyWeekDay.minutes, " ").concat(this.hourToCron(this.state.daily.everyWeekDay.hours, this.state.daily.everyWeekDay.hourType), " ? * MON-FRI *");
                    break;

                  default:
                    throw 'Invalid cron daily subtab selection';
                }

                break;

              case 'weekly':
                var days = this.selectOptions.days.reduce(function (acc, day) {
                  return _this3.state.weekly[day] ? acc.concat([day]) : acc;
                }, []).join(',');
                this.ngModel = "".concat(this.state.weekly.seconds, " ").concat(this.state.weekly.minutes, " ").concat(this.hourToCron(this.state.weekly.hours, this.state.weekly.hourType), " ? * ").concat(days, " *");
                break;

              case 'monthly':
                switch (this.state.monthly.subTab) {
                  case 'specificDay':
                    this.ngModel = "".concat(this.state.monthly.specificDay.seconds, " ").concat(this.state.monthly.specificDay.minutes, " ").concat(this.hourToCron(this.state.monthly.specificDay.hours, this.state.monthly.specificDay.hourType), " ").concat(this.state.monthly.specificDay.day, " 1/").concat(this.state.monthly.specificDay.months, " ? *");
                    break;

                  case 'specificWeekDay':
                    this.ngModel = "".concat(this.state.monthly.specificWeekDay.seconds, " ").concat(this.state.monthly.specificWeekDay.minutes, " ").concat(this.hourToCron(this.state.monthly.specificWeekDay.hours, this.state.monthly.specificWeekDay.hourType), " ? 1/").concat(this.state.monthly.specificWeekDay.months, " ").concat(this.state.monthly.specificWeekDay.day).concat(this.state.monthly.specificWeekDay.monthWeek, " *");
                    break;

                  default:
                    throw 'Invalid cron monthly subtab selection';
                }

                break;

              case 'yearly':
                switch (this.state.yearly.subTab) {
                  case 'specificMonthDay':
                    this.ngModel = "".concat(this.state.yearly.specificMonthDay.seconds, " ").concat(this.state.yearly.specificMonthDay.minutes, " ").concat(this.hourToCron(this.state.yearly.specificMonthDay.hours, this.state.yearly.specificMonthDay.hourType), " ").concat(this.state.yearly.specificMonthDay.day, " ").concat(this.state.yearly.specificMonthDay.month, " ? *");
                    break;

                  case 'specificMonthWeek':
                    this.ngModel = "".concat(this.state.yearly.specificMonthWeek.seconds, " ").concat(this.state.yearly.specificMonthWeek.minutes, " ").concat(this.hourToCron(this.state.yearly.specificMonthWeek.hours, this.state.yearly.specificMonthWeek.hourType), " ? ").concat(this.state.yearly.specificMonthWeek.month, " ").concat(this.state.yearly.specificMonthWeek.day).concat(this.state.yearly.specificMonthWeek.monthWeek, " *");
                    break;

                  default:
                    throw 'Invalid cron yearly subtab selection';
                }

                break;

              case 'advanced':
                this.ngModel = this.state.advanced.expression;
                break;

              default:
                throw 'Invalid cron active tab selection';
            }

          case 'unix':
            switch (this.activeTab) {
              case 'daily':
                switch (this.state.daily.subTab) {
                  case 'everyDays':
                    this.ngModel = "".concat(this.state.daily.everyDays.minutes, " ").concat(this.hourToCron(this.state.daily.everyDays.hours, this.state.daily.everyDays.hourType), " */").concat(this.state.daily.everyDays.days, " * *");
                    break;

                  case 'everyWeekDay':
                    this.ngModel = "".concat(this.state.daily.everyWeekDay.minutes, " ").concat(this.hourToCron(this.state.daily.everyWeekDay.hours, this.state.daily.everyWeekDay.hourType), " * * 1-5");
                    break;

                  default:
                    throw 'Invalid cron daily subtab selection';
                }

                break;

              case 'weekly':
                var _days = this.selectOptions.days.reduce(function (acc, day) {
                  return _this3.state.weekly[day] ? acc.concat([day]) : acc;
                }, []).join(',');

                this.ngModel = "".concat(this.state.weekly.minutes, " ").concat(this.hourToCron(this.state.weekly.hours, this.state.weekly.hourType), " ? * ").concat(_days);
                break;

              case 'monthly':
                switch (this.state.monthly.subTab) {
                  case 'specificDay':
                    this.ngModel = "".concat(this.state.monthly.specificDay.minutes, " ").concat(this.hourToCron(this.state.monthly.specificDay.hours, this.state.monthly.specificDay.hourType), " ").concat(this.state.monthly.specificDay.day, " */").concat(this.state.monthly.specificDay.months, " *");
                    break;

                  default:
                    throw 'Invalid cron monthly subtab selection';
                }

                break;

              case 'yearly':
                switch (this.state.yearly.subTab) {
                  case 'specificMonthDay':
                    this.ngModel = "".concat(this.state.yearly.specificMonthDay.minutes, " ").concat(this.hourToCron(this.state.yearly.specificMonthDay.hours, this.state.yearly.specificMonthDay.hourType), " ").concat(this.state.yearly.specificMonthDay.day, " ").concat(this.state.yearly.specificMonthDay.month, " *");
                    break;

                  default:
                    throw 'Invalid cron yearly subtab selection';
                }

                break;

              case 'advanced':
                this.ngModel = this.state.advanced.expression;
                break;

              default:
                throw 'Invalid cron active tab selection';
            }

        }
      }
    }, {
      key: "handleModelChange",
      value: function handleModelChange(cron) {
        var _this4 = this;

        if (this.currentState === States.DIRTY) {
          this.currentState = States.CLEAN;
          return;
        } else {
          this.currentState = States.CLEAN;
        }

        if (!cron) {
          return;
        }

        var segments = cron.split(' ');

        if (this.cronFormat === 'quartz' && (segments.length === 6 || segments.length === 7)) {
          var _segments = _slicedToArray(segments, 6),
              seconds = _segments[0],
              minutes = _segments[1],
              hours = _segments[2],
              dayOfMonth = _segments[3],
              month = _segments[4],
              dayOfWeek = _segments[5];

          if (cron.match(/\d+ 0\/\d+ \* 1\/1 \* \? \*/)) {
            this.activeTab = 'minutes';
            this.state.minutes.minutes = parseInt(minutes.substring(2));
            this.state.minutes.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ 0\/\d+ 1\/1 \* \? \*/)) {
            this.activeTab = 'hourly';
            this.state.hourly.hours = parseInt(hours.substring(2));
            this.state.hourly.minutes = parseInt(minutes);
            this.state.hourly.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ \d+ 1\/\d+ \* \? \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyDays';
            this.state.daily.everyDays.days = parseInt(dayOfMonth.substring(2));
            var parsedHours = parseInt(hours);
            this.state.daily.everyDays.hours = this.processHour(parsedHours);
            this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
            this.state.daily.everyDays.minutes = parseInt(minutes);
            this.state.daily.everyDays.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ \d+ \? \* MON-FRI \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyWeekDay';

            var _parsedHours = parseInt(hours);

            this.state.daily.everyWeekDay.hours = this.processHour(_parsedHours);
            this.state.daily.everyWeekDay.hourType = this.getHourType(_parsedHours);
            this.state.daily.everyWeekDay.minutes = parseInt(minutes);
            this.state.daily.everyWeekDay.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ \d+ \? \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
            this.activeTab = 'weekly';
            this.selectOptions.days.forEach(function (weekDay) {
              return _this4.state.weekly[weekDay] = false;
            });
            dayOfWeek.split(',').forEach(function (weekDay) {
              return _this4.state.weekly[weekDay] = true;
            });

            var _parsedHours2 = parseInt(hours);

            this.state.weekly.hours = this.processHour(_parsedHours2);
            this.state.weekly.hourType = this.getHourType(_parsedHours2);
            this.state.weekly.minutes = parseInt(minutes);
            this.state.weekly.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ \? \*/)) {
            this.activeTab = 'monthly';
            this.state.monthly.subTab = 'specificDay';
            this.state.monthly.specificDay.day = dayOfMonth;
            this.state.monthly.specificDay.months = parseInt(month.substring(2));

            var _parsedHours3 = parseInt(hours);

            this.state.monthly.specificDay.hours = this.processHour(_parsedHours3);
            this.state.monthly.specificDay.hourType = this.getHourType(_parsedHours3);
            this.state.monthly.specificDay.minutes = parseInt(minutes);
            this.state.monthly.specificDay.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ \d+ \? 1\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            var day = dayOfWeek.substr(0, 3);
            var monthWeek = dayOfWeek.substr(3);
            this.activeTab = 'monthly';
            this.state.monthly.subTab = 'specificWeekDay';
            this.state.monthly.specificWeekDay.monthWeek = monthWeek;
            this.state.monthly.specificWeekDay.day = day;
            this.state.monthly.specificWeekDay.months = parseInt(month.substring(2));

            var _parsedHours4 = parseInt(hours);

            this.state.monthly.specificWeekDay.hours = this.processHour(_parsedHours4);
            this.state.monthly.specificWeekDay.hourType = this.getHourType(_parsedHours4);
            this.state.monthly.specificWeekDay.minutes = parseInt(minutes);
            this.state.monthly.specificWeekDay.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+ \? \*/)) {
            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthDay';
            this.state.yearly.specificMonthDay.month = parseInt(month);
            this.state.yearly.specificMonthDay.day = dayOfMonth;

            var _parsedHours5 = parseInt(hours);

            this.state.yearly.specificMonthDay.hours = this.processHour(_parsedHours5);
            this.state.yearly.specificMonthDay.hourType = this.getHourType(_parsedHours5);
            this.state.yearly.specificMonthDay.minutes = parseInt(minutes);
            this.state.yearly.specificMonthDay.seconds = parseInt(seconds);
          } else if (cron.match(/\d+ \d+ \d+ \? \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            var _day = dayOfWeek.substr(0, 3);

            var _monthWeek = dayOfWeek.substr(3);

            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthWeek';
            this.state.yearly.specificMonthWeek.monthWeek = _monthWeek;
            this.state.yearly.specificMonthWeek.day = _day;
            this.state.yearly.specificMonthWeek.month = parseInt(month);

            var _parsedHours6 = parseInt(hours);

            this.state.yearly.specificMonthWeek.hours = this.processHour(_parsedHours6);
            this.state.yearly.specificMonthWeek.hourType = this.getHourType(_parsedHours6);
            this.state.yearly.specificMonthWeek.minutes = parseInt(minutes);
            this.state.yearly.specificMonthWeek.seconds = parseInt(seconds);
          } else {
            this.activeTab = 'advanced';
            this.state.advanced.expression = cron;
          }
        } else if (this.cronFormat === 'unix' && segments.length === 5) {
          var _segments2 = _slicedToArray(segments, 5),
              _minutes = _segments2[0],
              _hours = _segments2[1],
              _dayOfMonth = _segments2[2],
              _month = _segments2[3],
              _dayOfWeek = _segments2[4];

          if (cron.match(/\d+ \d+ \*\/\d+ \* \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyDays';
            this.state.daily.everyDays.days = parseInt(_dayOfMonth.substring(2));

            var _parsedHours7 = parseInt(_hours);

            this.state.daily.everyDays.hours = this.processHour(_parsedHours7);
            this.state.daily.everyDays.hourType = this.getHourType(_parsedHours7);
            this.state.daily.everyDays.minutes = parseInt(_minutes);
            this.state.daily.everyDays.seconds = 0;
          } else if (cron.match(/\d+ \d+ \* \* MON-FRI/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyWeekDay';

            var _parsedHours8 = parseInt(_hours);

            this.state.daily.everyWeekDay.hours = this.processHour(_parsedHours8);
            this.state.daily.everyWeekDay.hourType = this.getHourType(_parsedHours8);
            this.state.daily.everyWeekDay.minutes = parseInt(_minutes);
            this.state.daily.everyWeekDay.seconds = 0;
          } else if (cron.match(/\d+ \d+ \* \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))*/)) {
            this.activeTab = 'weekly';
            this.selectOptions.days.forEach(function (weekDay) {
              return _this4.state.weekly[weekDay] = false;
            });

            _dayOfWeek.split(',').forEach(function (weekDay) {
              return _this4.state.weekly[weekDay] = true;
            });

            var _parsedHours9 = parseInt(_hours);

            this.state.weekly.hours = this.processHour(_parsedHours9);
            this.state.weekly.hourType = this.getHourType(_parsedHours9);
            this.state.weekly.minutes = parseInt(_minutes);
            this.state.weekly.seconds = 0;
          } else if (cron.match(/\d+ \d+ \d+ 1\/\d+ \*/)) {
            this.activeTab = 'monthly';
            this.state.monthly.subTab = 'specificDay';
            this.state.monthly.specificDay.day = _dayOfMonth;
            this.state.monthly.specificDay.months = parseInt(_month.substring(2));

            var _parsedHours10 = parseInt(_hours);

            this.state.monthly.specificDay.hours = this.processHour(_parsedHours10);
            this.state.monthly.specificDay.hourType = this.getHourType(_parsedHours10);
            this.state.monthly.specificDay.minutes = parseInt(_minutes);
            this.state.monthly.specificDay.seconds = 0;
          } else if (cron.match(/\d+ \d+ \d+ \d+ \*/)) {
            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthDay';
            this.state.yearly.specificMonthDay.month = parseInt(_month);
            this.state.yearly.specificMonthDay.day = _dayOfMonth;

            var _parsedHours11 = parseInt(_hours);

            this.state.yearly.specificMonthDay.hours = this.processHour(_parsedHours11);
            this.state.yearly.specificMonthDay.hourType = this.getHourType(_parsedHours11);
            this.state.yearly.specificMonthDay.minutes = parseInt(_minutes);
            this.state.yearly.specificMonthDay.seconds = 0;
          } else {
            this.activeTab = 'advanced';
            this.state.advanced.expression = cron;
          }
        } else {
          throw 'Unsupported cron expression. Expression must be 6 or 7 segments';
        }
      }
    }]);

    return CronGenComponent;
  }();

  var QUARTZ_REGEX = /^\s*($|#|\w+\s*=|(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?(?:,(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[1-7]|MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-|\/|\,|#)(?:[1-5]))?(?:L)?(?:,(?:[1-7]|MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-|\/|\,|#)(?:[1-5]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?)*))$/;
  var CronGenService = /*#__PURE__*/function () {
    CronGenService.$inject = ["$filter"];
    function CronGenService($filter) {
      _classCallCheck(this, CronGenService);

      this.filter = $filter;
    }

    _createClass(CronGenService, [{
      key: "isValid",
      value: function isValid(cronFormat, expression) {
        if (!expression) {
          return false;
        }

        var formattedExpression = expression.toUpperCase();

        switch (cronFormat) {
          case 'quartz':
            return !!formattedExpression.match(QUARTZ_REGEX);

          case 'unix':
            return true;

          default:
            throw "Desired cron format (".concat(cronFormat, ") is not available");
        }
      }
    }, {
      key: "appendInt",
      value: function appendInt(number) {
        var value = "".concat(number);

        if (value.length > 1) {
          var secondToLastDigit = value.charAt(value.length - 2);

          if (secondToLastDigit === '1') {
            return this.filter('translate')('CARDINAL_PREFIX');
          }
        }

        var lastDigit = value.charAt(value.length - 1);

        switch (lastDigit) {
          case '1':
            return this.filter('translate')('FIRST_PREFIX');

          case '2':
            return this.filter('translate')('SECOND_PREFIX');

          case '3':
            return this.filter('translate')('THIRD_PREFIX');

          default:
            return this.filter('translate')('CARDINAL_PREFIX');
        }
      }
    }, {
      key: "padNumber",
      value: function padNumber(number) {
        return "".concat(number).length === 1 ? "0".concat(number) : "".concat(number);
      }
    }, {
      key: "range",
      value: function range(start, end) {
        if (typeof end === 'undefined') {
          end = start;
          start = 0;
        }

        if (start < 0 || end < 0) throw 'Range values must be positive values';

        if (end > start) {
          return _toConsumableArray(new Array(end - start)).map(function (val, idx) {
            return idx + start;
          });
        } else if (start < end) {
          return _toConsumableArray(new Array(start - end)).map(function (val, idx) {
            return end - idx;
          });
        } else {
          return [];
        }
      }
    }, {
      key: "selectOptions",
      value: function selectOptions() {
        return {
          months: this.range(1, 13),
          monthWeeks: ['#1', '#2', '#3', '#4', '#5', 'L'],
          days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          minutes: this.range(1, 60),
          fullMinutes: this.range(60),
          seconds: this.range(60),
          hours: this.range(1, 24),
          monthDays: this.range(1, 32),
          monthDaysWithLasts: _toConsumableArray(_toConsumableArray(new Array(31)).map(function (val, idx) {
            return "".concat(idx + 1);
          }))
        };
      }
    }]);

    return CronGenService;
  }();

  var CronGenTimeSelect = function CronGenTimeSelect($scope, cronGenService) {
    'ngInject';

    var _this = this;

    _classCallCheck(this, CronGenTimeSelect);

    this.cronGenService = cronGenService;
    this.selectOptions = {
      minutes: cronGenService.range(60),
      seconds: cronGenService.range(60),
      hourTypes: ['AM', 'PM']
    };
    $scope.$watch('$ctrl.use24HourTime', function () {
      _this.selectOptions.hours = _this.use24HourTime ? _this.cronGenService.range(24) : _this.cronGenService.range(1, 13);
    });
  };
  CronGenTimeSelect.$inject = ["$scope", "cronGenService"];

  angular.module('angular-cron-gen', ['pascalprecht.translate']).config(["$translateProvider", function ($translateProvider) {
    $translateProvider.translations('en', {
      'MINUTES': 'Minutes',
      'HOURLY': 'Hourly',
      'DAILY': 'Daily',
      'WEEKLY': 'Weekly',
      'MONTHLY': 'Monthly',
      'YEARLY': 'Yearly',
      'ADVANCED': 'Advanced',
      'EVERY': 'Every',
      'EVERY_MONTH': 'Every',
      'MINUTE': 'minute(s)',
      'ON_SECOND': 'on second',
      'HOUR_ON_MINUTE': 'hour(s) on minute',
      'AND_SECOND': 'and second',
      'DAY_AT': 'day(s) at',
      'EVERY_WEEK_WORKING_DAY': 'Every week day (Monday through Friday) at',
      'MONDAY': 'Monday',
      'TUESDAY': 'Tuesday',
      'WEDNESDAY': 'Wednesday',
      'THURSDAY': 'Thursday',
      'FRIDAY': 'Friday',
      'SATURDAY': 'Saturday',
      'SUNDAY': 'Sunday',
      'START_TIME': 'Start time',
      'ON_THE': 'On the',
      'ON_THE_SMALL': 'on the',
      'OF_EVERY': 'of every',
      'MONTHS_AT': 'month(s) at',
      'AT': 'at',
      'OF': 'of',
      'CRON_EXPRESSION': 'Cron Expression',
      'MORE_DETAILS': 'More details about how to create these expressions can be found',
      'HERE': 'here',
      'LAST_DAY': 'Last day',
      'LAST_WEEKDAY': 'Last Weekday',
      'FIRST_WEEKDAY': 'First Weekday',
      'DAY': 'Day',
      'FIRST_PREFIX': 'st',
      'SECOND_PREFIX': 'nd',
      'THIRD_PREFIX': 'rd',
      'CARDINAL_PREFIX': 'th',
      'FIRST': 'First',
      'SECOND': 'Second',
      'THIRD': 'Third',
      'FOURTH': 'Fourth',
      'FIFTH': 'Fifth',
      'LAST': 'Last',
      'JANUARY': 'January',
      'FEBRUARY': 'February',
      'MARCH': 'March',
      'APRIL': 'April',
      'MAY': 'May',
      'JUNE': 'June',
      'JULY': 'July',
      'AUGUST': 'August',
      'SEPTEMBER': 'September',
      'OCTOBER': 'October',
      'NOVEMBER': 'November',
      'DECEMBER': 'December'
    }).translations('it', {
      'MINUTES': 'Minuti',
      'HOURLY': 'Orario',
      'DAILY': 'Giornaliero',
      'WEEKLY': 'Settimanale',
      'MONTHLY': 'Mensile',
      'YEARLY': 'Annuale',
      'ADVANCED': 'Avanzato',
      'EVERY': 'Ogni',
      'EVERY_MONTH': 'Ogni',
      'MINUTE': 'minuto/i',
      'ON_SECOND': 'al secondo',
      'HOUR_ON_MINUTE': 'ora/e al minuto',
      'AND_SECOND': 'e secondi',
      'DAY_AT': 'giorno/i alle',
      'EVERY_WEEK_WORKING_DAY': "Ogni giorno della settimana (dal Lunedi' al Venerdi') alle",
      'MONDAY': "Lunedi'",
      'TUESDAY': "Martedi'",
      'WEDNESDAY': "Mercoledi'",
      'THURSDAY': "Giovedi'",
      'FRIDAY': "Venerdi'",
      'SATURDAY': 'Sabato',
      'SUNDAY': 'Domenica',
      'START_TIME': 'Inizio alle',
      'ON_THE': 'Il',
      'ON_THE_SMALL': 'il',
      'OF_EVERY': 'di ogni',
      'MONTHS_AT': 'mese/i il',
      'AT': 'il',
      'OF': 'di',
      'CRON_EXPRESSION': 'Sintassi Cron',
      'MORE_DETAILS': 'Maggiori informazioni sulla sintassi Cron li potete trovare',
      'HERE': 'qui',
      'LAST_DAY': 'Ultimo giorno',
      'LAST_WEEKDAY': 'Fine settimana',
      'FIRST_WEEKDAY': 'Inizio settimana',
      'DAY': 'Giorno',
      'FIRST_PREFIX': '',
      'SECOND_PREFIX': '',
      'THIRD_PREFIX': '',
      'CARDINAL_PREFIX': '',
      'FIRST': 'Primo',
      'SECOND': 'Secondo',
      'THIRD': 'Terzo',
      'FOURTH': 'Quarto',
      'FIFTH': 'Quinto',
      'LAST': 'Ultimo',
      'JANUARY': 'Gennaio',
      'FEBRUARY': 'Febbraio',
      'MARCH': 'Marzo',
      'APRIL': 'Aprile',
      'MAY': 'Maggio',
      'JUNE': 'Giugno',
      'JULY': 'Luglio',
      'AUGUST': 'Agosto',
      'SEPTEMBER': 'Settembre',
      'OCTOBER': 'Ottobre',
      'NOVEMBER': 'Novembre',
      'DECEMBER': 'Dicembre'
    }).translations('de', {
      'MINUTES': 'Minütlich',
      'HOURLY': 'Stündlich',
      'DAILY': 'Täglich',
      'WEEKLY': 'Wöchentlich',
      'MONTHLY': 'Monatlich',
      'YEARLY': 'Jährlich',
      'ADVANCED': 'Cron Ausdruck',
      'EVERY': 'Alle',
      'EVERY_MONTH': 'Jeden',
      'MINUTE': 'Minute(n)',
      'ON_SECOND': 'auf Sekunde',
      'HOUR_ON_MINUTE': 'Stunde(n) auf Minute',
      'AND_SECOND': 'und Sekunde',
      'DAY_AT': 'Tag(e) um',
      'EVERY_WEEK_WORKING_DAY': "Jeden Wochentag (Montag bis Freitag) um",
      'MONDAY': "Montag",
      'TUESDAY': "Dienstag",
      'WEDNESDAY': "Mittwoch",
      'THURSDAY': "Donnerstag",
      'FRIDAY': "Freitag",
      'SATURDAY': 'Samstag',
      'SUNDAY': 'Sonntag',
      'START_TIME': 'Startzeit',
      'ON_THE': 'Am',
      'ON_THE_SMALL': 'am',
      'OF_EVERY': 'alle',
      'MONTHS_AT': 'Monat(e) um',
      'AT': 'um',
      'OF': 'im',
      'CRON_EXPRESSION': 'Cron Ausdruck',
      'MORE_DETAILS': 'Weitere Informationen zum Erstellen dieser Ausdrücke finden Sie ',
      'HERE': 'hier',
      'LAST_DAY': 'letzter Tag',
      'LAST_WEEKDAY': 'letzter Wochentag',
      'FIRST_WEEKDAY': 'erster Wochentag',
      'DAY': 'Tag',
      'FIRST_PREFIX': '',
      'SECOND_PREFIX': '',
      'THIRD_PREFIX': '',
      'CARDINAL_PREFIX': '',
      'FIRST': 'Ersten',
      'SECOND': 'Zweiten',
      'THIRD': 'Dritten',
      'FOURTH': 'Vierten',
      'FIFTH': 'Fünften',
      'LAST': 'Letzten',
      'JANUARY': 'Januar',
      'FEBRUARY': 'Februar',
      'MARCH': 'März',
      'APRIL': 'April',
      'MAY': 'Mai',
      'JUNE': 'Juni',
      'JULY': 'Juli',
      'AUGUST': 'August',
      'SEPTEMBER': 'September',
      'OCTOBER': 'Oktober',
      'NOVEMBER': 'November',
      'DECEMBER': 'Dezember'
    }).translations('fr', {
      'MINUTES': 'Minutes',
      'HOURLY': 'Heures',
      'DAILY': 'Jours',
      'WEEKLY': 'Semaines',
      'MONTHLY': 'Mois',
      'YEARLY': 'Années',
      'ADVANCED': 'Avancée',
      'EVERY': 'Chaque',
      'EVERY_MONTH': 'Chaque',
      'MINUTE': 'minute(s)',
      'ON_SECOND': 'à la seconde',
      'HOUR_ON_MINUTE': 'heure(s) à la minute',
      'AND_SECOND': 'et seconde',
      'DAY_AT': 'jours(s) à',
      'EVERY_WEEK_WORKING_DAY': 'Chaque jour de semaine à',
      'MONDAY': 'Lundi',
      'TUESDAY': 'Mardi',
      'WEDNESDAY': 'Mercredi',
      'THURSDAY': 'Jeudi',
      'FRIDAY': 'Vendredi',
      'SATURDAY': 'Samedi',
      'SUNDAY': 'Dimanche',
      'START_TIME': 'De',
      'ON_THE': 'Au',
      'ON_THE_SMALL': 'au',
      'OF_EVERY': 'de chaque',
      'MONTHS_AT': 'mois à',
      'AT': 'à',
      'OF': 'de',
      'CRON_EXPRESSION': 'Expression Cron',
      'MORE_DETAILS': 'Plus de détails sur la génération de ces expressions',
      'HERE': 'ici',
      'LAST_DAY': 'Dernier jour',
      'LAST_WEEKDAY': 'Dernier jour de la semaine',
      'FIRST_WEEKDAY': 'Premier jour de la semaine',
      'DAY': 'Jour',
      'FIRST_PREFIX': 'er',
      'SECOND_PREFIX': 'nd',
      'THIRD_PREFIX': 'eme',
      'CARDINAL_PREFIX': 'eme',
      'FIRST': 'Premier',
      'SECOND': 'Second',
      'THIRD': 'Troisième',
      'FOURTH': 'Quatrième',
      'FIFTH': 'Cinquième',
      'LAST': 'Dernier',
      'JANUARY': 'Janvier',
      'FEBRUARY': 'Février',
      'MARCH': 'Mars',
      'APRIL': 'Avril',
      'MAY': 'Mai',
      'JUNE': 'Juin',
      'JULY': 'Juillet',
      'AUGUST': 'Août',
      'SEPTEMBER': 'Septembre',
      'OCTOBER': 'Octobre',
      'NOVEMBER': 'Novembre',
      'DECEMBER': 'Décembre'
    });
  }]).service('cronGenService', CronGenService).component('cronGenTimeSelect', {
    bindings: {
      isDisabled: '<',
      onChange: '&',
      isRequired: '<',
      model: '=',
      selectClass: '<',
      use24HourTime: '<',
      hideSeconds: '<',
      namePrefix: '@'
    },
    templateUrl: 'angular-cron-gen/cron-gen-time-select.html',
    controller: CronGenTimeSelect
  }).component('cronGen', {
    bindings: {
      ngModel: '=',
      ngDisabled: '<',
      options: '<',
      cronFormat: '@',
      templateUrl: '@',
      name: '@'
    },
    require: {
      ngModelCtrl: 'ngModel',
      ngDisabledCtrl: '?ngDisabled',
      formCtrl: '^?form'
    },
    templateUrl: ["$attrs", function templateUrl($attrs) {
      'ngInject';

      return $attrs.templateUrl || 'angular-cron-gen/cron-gen.html';
    }],
    controller: CronGenComponent
  });

}());

angular.module('angular-cron-gen').run(['$templateCache', function($templateCache) {$templateCache.put('angular-cron-gen/cron-gen-time-select.html','<div class="inline-block">\n    <select class="hours"\n            name="{{namePrefix}}Hours"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-required="$ctrl.isRequired"\n            ng-model="$ctrl.model.hours"\n            ng-options="hour as $ctrl.cronGenService.padNumber(hour) for hour in $ctrl.selectOptions.hours"\n            ng-class="$ctrl.selectClass">\n    </select>\n    <select class="minutes"\n            name="{{namePrefix}}Minutes"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-required="$ctrl.isRequired"\n            ng-model="$ctrl.model.minutes"\n            ng-options="minute as $ctrl.cronGenService.padNumber(minute) for minute in $ctrl.selectOptions.minutes"\n            ng-class="$ctrl.selectClass">\n    </select>\n    <select class="seconds"\n            name="{{namePrefix}}Seconds"\n            ng-show="!$ctrl.hideSeconds"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-required="$ctrl.isRequired"\n            ng-model="$ctrl.model.seconds"\n            ng-options="second as $ctrl.cronGenService.padNumber(second) for second in $ctrl.selectOptions.seconds"\n            ng-class="$ctrl.selectClass">\n    </select>\n    <select class="hour-types"\n            name="{{namePrefix}}HourType"\n            ng-if="!$ctrl.use24HourTime"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-model="$ctrl.model.hourType"\n            ng-options="hourType as hourType for hourType in $ctrl.selectOptions.hourTypes"\n            ng-required="$ctrl.isRequired"\n            ng-class="$ctrl.selectClass">\n    </select>\n</div>');
$templateCache.put('angular-cron-gen/cron-gen.html','<!doctype html>\n<div class="cron-gen-main" ng-cloak>\n    <ul class="nav nav-tabs tab-nav" role="tablist">\n        <li ng-class="{\'active\': $ctrl.activeTab === \'minutes\'}"\n            ng-show="!$ctrl.parsedOptions.hideMinutesTab"\n            role="presentation">\n            <a href="#"\n               aria-controls="minutes"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'minutes\')">\n                {{ \'MINUTES\' | translate }}\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideHourlyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'hourly\'}">\n            <a href="#"\n               aria-controls="hourly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'hourly\')">\n                {{ \'HOURLY\' | translate }}\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideDailyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'daily\'}">\n            <a href="#"\n               aria-controls="daily"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'daily\')">\n                {{ \'DAILY\' | translate }}\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideWeeklyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'weekly\'}">\n            <a href="#" aria-controls="weekly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'weekly\')">\n                {{ \'WEEKLY\' | translate }}\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideMonthlyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'monthly\'}">\n            <a href="#"\n               aria-controls="monthly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'monthly\')">\n                {{ \'MONTHLY\' | translate }}\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideYearlyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'yearly\'}">\n            <a href="#"\n               aria-controls="yearly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'yearly\')">\n                {{ \'YEARLY\' | translate }}\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideAdvancedTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'advanced\'}">\n            <a href="#"\n               aria-controls="advanced"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'advanced\')">\n                {{ \'ADVANCED\' | translate}}\n            </a>\n        </li>\n    </ul>\n    <div class="cron-gen-container">\n        <div class="row">\n            <div class="col-xs-12">\n                <div class="tab-content">\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideMinutesTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'minutes\'}">\n                        <div class="well well-small">\n                            {{ \'EVERY\' | translate}}\n                            <select class="minutes"\n                                    name="minutesMinutes"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'minutes\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.minutes.minutes"\n                                    ng-required="$ctrl.activeTab === \'minutes\'"\n                                    ng-options="minute as minute for minute in $ctrl.selectOptions.minutes"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'MINUTE\' | translate}}\n                            <span ng-show="!$ctrl.parsedOptions.hideSeconds"> {{ \'ON_SECOND\' | translate }} </span>\n                            <select class="seconds"\n                                    name="minutesSeconds"\n                                    ng-show="!$ctrl.parsedOptions.hideSeconds"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'minutes\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.minutes.seconds"\n                                    ng-required="$ctrl.activeTab === \'minutes\'"\n                                    ng-options="second as $ctrl.cronGenService.padNumber(second) for second in $ctrl.selectOptions.seconds"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideHourlyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'hourly\'}">\n                        <div class="well well-small">\n                            {{ \'EVERY\' | translate}}\n                            <select class="hours"\n                                    name="hourlyHours"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'hourly\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.hourly.hours"\n                                    ng-required="$ctrl.activeTab === \'hourly\'"\n                                    ng-options="hour as hour for hour in $ctrl.selectOptions.hours"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'HOUR_ON_MINUTE\' | translate}}\n                            <select class="minutes"\n                                    name="hourlyMinutes"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'hourly\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.hourly.minutes"\n                                    ng-required="$ctrl.activeTab === \'hourly\'"\n                                    ng-options="minute as $ctrl.cronGenService.padNumber(minute) for minute in $ctrl.selectOptions.fullMinutes"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            <span ng-show="!$ctrl.parsedOptions.hideSeconds">{{ \'AND_SECOND\' | translate}}</span>\n                            <select class="seconds"\n                                    name="hourlySeconds"\n                                    ng-show="!$ctrl.parsedOptions.hideSeconds"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'hourly\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.hourly.seconds"\n                                    ng-required="$ctrl.activeTab === \'hourly\'"\n                                    ng-options="second as $ctrl.cronGenService.padNumber(second) for second in $ctrl.selectOptions.seconds"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideDailyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'daily\'}">\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="everyDays"\n                                   name="daily-radio"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.daily.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   checked="checked">\n                            {{ \'EVERY\' | translate}}\n                            <select class="days"\n                                    name="dailyEveryDaysDays"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'daily\' || $ctrl.state.daily.subTab !== \'everyDays\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.daily.everyDays.days"\n                                    ng-required="$ctrl.activeTab === \'daily\' && $ctrl.state.daily.subTab === \'everyDays\'"\n                                    ng-options="monthDay as monthDay for monthDay in $ctrl.selectOptions.monthDays"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'DAY_AT\' | translate}}\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'daily\' || $ctrl.state.daily.subTab !== \'everyDays\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="dailyEveryDays"\n                                    is-required="$ctrl.activeTab === \'daily\' && $ctrl.state.daily.subTab === \'everyDays\'"\n                                    model="$ctrl.state.daily.everyDays"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="everyWeekDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.daily.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="daily-radio">\n                            {{ \'EVERY_WEEK_WORKING_DAY\' | translate}}\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'daily\' || $ctrl.state.daily.subTab !== \'everyWeekDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="dailyEveryWeekDay"\n                                    is-required="$ctrl.activeTab === \'daily\' && $ctrl.state.daily.subTab === \'everyWeekDay\'"\n                                    model="$ctrl.state.daily.everyWeekDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideWeeklyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'weekly\'}">\n                        <div class="well well-small row">\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyMON"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.MON"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                {{ \'MONDAY\' | translate}}\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyTUE"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.TUE"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                {{ \'TUESDAY\' | translate}}\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyWED"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.WED"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                {{ \'WEDNESDAY\' | translate}}\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyTHU"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.THU"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                {{ \'THURSDAY\' | translate}}\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyFRI"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.FRI"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                {{ \'FRIDAY\' | translate}}\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklySAT"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.SAT"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                {{ \'SATURDAY\' | translate}}\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklySUN"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.SUN"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                {{ \'SUNDAY\' | translate}}\n                            </div>\n                        </div>\n                        {{ \'START_TIME\' | translate}}\n                        <cron-gen-time-select\n                                is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                on-change="$ctrl.regenerateCron()"\n                                name-prefix="weekly"\n                                is-required="$ctrl.activeTab === \'weekly\'"\n                                model="$ctrl.state.weekly"\n                                select-class="$ctrl.parsedOptions.formSelectClass"\n                                use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                        </cron-gen-time-select>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideMonthlyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'monthly\'}">\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="specificDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.monthly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="monthly-radio"\n                                   checked="checked">\n                            {{ \'ON_THE\' | translate}}\n                            <select class="month-days"\n                                    name="monthlySpecificDayDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificDay.day"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificDay\'"\n                                    ng-options="monthDaysWithLast as $ctrl.monthDayDisplay(monthDaysWithLast) for monthDaysWithLast in $ctrl.selectOptions.monthDaysWithLasts"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'OF_EVERY\' | translate}}\n                            <select class="months-small"\n                                    name="monthlySpecificDayMonths"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificDay.months"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificDay\'"\n                                    ng-options="month as month for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'MONTHS_AT\' | translate}}\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="monthlySpecificDay"\n                                    is-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificDay\'"\n                                    model="$ctrl.state.monthly.specificDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                        <div class="well well-small" ng-hide="$ctrl.cronFormat ==\'unix\'">\n                            <input type="radio"\n                                   value="specificWeekDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.monthly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="monthly-radio">\n                            {{ \'ON_THE\' | translate}}\n                            <select class="day-order-in-month"\n                                    name="monthlySpecificWeekDayMonthWeek"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificWeekDay.monthWeek"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    ng-options="monthWeek as $ctrl.monthWeekDisplay(monthWeek) for monthWeek in $ctrl.selectOptions.monthWeeks"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            <select class="week-days"\n                                    name="monthlySpecificWeekDayDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificWeekDay.day"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    ng-options="day as $ctrl.dayDisplay(day) for day in $ctrl.selectOptions.days"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'OF_EVERY\' | translate}}\n                            <select class="months-small"\n                                    name="monthlySpecificWeekDayMonths"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificWeekDay.months"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    ng-options="month as month for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'MONTHS_AT\' | translate}}\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="monthlySpecificWeekDay"\n                                    is-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    model="$ctrl.state.monthly.specificWeekDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideYearlyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'yearly\'}">\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="specificMonthDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.yearly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="yearly-radio">\n                            {{ \'EVERY_MONTH\' | translate}}\n                            <select class="months"\n                                    name="yearlySpecificMonthDayMonth"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthDay.month"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthDay\'"\n                                    ng-options="month as $ctrl.monthDisplay(month) for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'ON_THE_SMALL\' | translate}}\n                            <select class="month-days"\n                                    name="yearlySpecificMonthDayDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthDay.day"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthDay\'"\n                                    ng-options="monthDaysWithLast as $ctrl.monthDayDisplay(monthDaysWithLast) for monthDaysWithLast in $ctrl.selectOptions.monthDaysWithLasts"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'AT\' | translate}}\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    is-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthDay\'"\n                                    name-prefix="yearlySpecificMonthDay"\n                                    model="$ctrl.state.yearly.specificMonthDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                        <div class="well well-small" ng-hide="$ctrl.cronFormat ==\'unix\'">\n                            <input type="radio"\n                                   value="specificMonthWeek"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.yearly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="yearly-radio">\n                            {{ \'EVERY_MONTH\' | translate}}\n                            <select class="day-order-in-month"\n                                    name="yearlySpecificMonthWeekMonthWeek"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthWeek.monthWeek"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    ng-options="monthWeek as $ctrl.monthWeekDisplay(monthWeek) for monthWeek in $ctrl.selectOptions.monthWeeks"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            <select class="week-days"\n                                    name="yearlySpecificMonthWeekMonthDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthWeek.day"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    ng-options="day as $ctrl.dayDisplay(day) for day in $ctrl.selectOptions.days"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'OF\' | translate}}\n                            <select class="months"\n                                    name="yearlySpecificMonthWeekMontMonth"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthWeek.month"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    ng-options="month as $ctrl.monthDisplay(month) for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            {{ \'AT\' | translate}}\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="yearlySpecificMonthWeek"\n                                    is-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    model="$ctrl.state.yearly.specificMonthWeek"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideAdvancedTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'advanced\'}">\n                        {{ \'CRON_EXPRESSION\' | translate}}\n                        <input type="text"\n                               class="advanced-cron-gen-input"\n                               name="advancedExpression"\n                               ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'advanced\'"\n                               ng-change="$ctrl.regenerateCron()"\n                               ng-model="$ctrl.state.advanced.expression"\n                               ng-required="$ctrl.activeTab === \'advanced\'"\n                               ng-class="$ctrl.parsedOptions.formInputClass">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>');}]);
//# sourceMappingURL=cron-gen.js.map
