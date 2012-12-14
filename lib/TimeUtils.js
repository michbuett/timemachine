(function () {
    'use strict';

    var alchemy = require('../support/alchemy.js');
    var dayNames = ['Son', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    /**
     * @class tm.TimeUtils
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.TimeUtils',
        overrides: {
            minToString: function (min) {
                if (min > 0) {
                    var hour = Math.floor(min / 60);
                    min = min % 60;
                    return (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min);
                } else {
                    return ' -/- ';
                }
            },

            stringToMin: function (string) {
                if (string) {
                    var hr = parseInt(string.split(':')[0], 10) || 0;
                    var mn = parseInt(string.split(':')[1], 10) || 0;
                    return 60 * hr + mn;
                } else {
                    return 0;
                }
            },

            minToHour: function (min) {
                return Math.round(100 * min / 60) / 100;
            },

            fill: function (raw, length, spacer) {
                raw = (raw || '') + '';
                spacer = spacer || ' ';
                while (raw.length < length) {
                    raw = spacer + raw;
                }
                return raw;
            },

            dayName: function (date) {
                if (date instanceof Date) {
                    return dayNames[date.getDay()];
                } else if (alchemy.isNumber(date)) {
                    return dayNames[date % dayNames.length];
                } else {
                    return '-';
                }
            }
        }
    });
}());
