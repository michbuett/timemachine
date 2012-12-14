(function () {
    'use strict';

    var alchemy = require('../support/alchemy.js');
    var utils = alchemy('tm.TimeUtils');

    /**
     * @class tm.Day
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.Day',
        overrides: {
            init: function () {
                var utils = alchemy('tm.TimeUtils');
                if (alchemy.isString(this.from)) {
                    this.from = utils.stringToMin(this.from);
                }
                if (alchemy.isString(this.to)) {
                    this.to = utils.stringToMin(this.to);
                }
            },

            getWorkingTime: function () {
                var total = this.to - this.from;
                if (total > 0 && this.times) {
                    alchemy.each(this.times, function (entry) {
                        if (!entry.ap) {
                            // no agresso package -> it's a break
                            total -= utils.stringToMin(entry.to) - utils.stringToMin(entry.from);
                        }
                    });
                }
                return total > 0 ? total : 0;
            },

            getProjectTimes: function () {
                var result = {};
                var workingTime = this.getWorkingTime();
                var presenceTime = 0;
                var agressoTime = 0;

                alchemy.each(this.times, function (entry) {
                    if (entry.ap && entry.ap !== '0') {
                        var key = entry.ap + '#' + entry.aa + '#' + entry.description;
                        var durr = utils.stringToMin(entry.to) - utils.stringToMin(entry.from);
                        if (!result[key]) {
                            result[key] = {
                                ap: entry.ap,
                                aa: entry.aa,
                                description: entry.description,
                                time: 0
                            };
                        }
                        result[key].time += durr;
                        agressoTime += durr;
                    }
                });
                presenceTime = workingTime - agressoTime;
                if (presenceTime > 0) {
                    result['0#ANWE#Anwesenheit'] = {
                        ap: '0',
                        aa: 'ANWE',
                        description: 'Anwesenheit',
                        time: presenceTime
                    };
                }

                return result;
            }
        }
    });
}());
