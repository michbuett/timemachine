(function () {
    'use strict';

    var alchemy = require('../support/alchemy.js');
    var utils = alchemy('tm.TimeUtils');

    /**
     * A command line interface to show and modify the times
     *
     * @class tm.Entry
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.Entry',
        extend: 'alchemy.core.Modelum',
        overrides: {

            from: function () {
                return utils.stringToMin(this.get('from'));
            },

            to: function () {
                return utils.stringToMin(this.get('to'));
            },

            durration: function () {
                var from = this.from();
                var to = this.to();
                if (from > 0 && to >= from) {
                    return to - from;
                } else {
                    return undefined;
                }
            },

            isBreak: function () {
                return !alchemy.isString(this.get('ap'));
            },

            isPresenceTime: function () {
                return this.get('ap') === '0';
            },

            isProjectTime: function () {
                return !this.isBreak() && this.isPresenceTime();
            },

            format: function () {
                return [
                    'from: ' + utils.formatTime(this.from),
                    'to' + utils.formatTime(this.to)
                ].join(', ');
            }
        }
    });
}());
