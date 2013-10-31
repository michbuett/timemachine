(function () {
    'use strict';

    var alchemy = require('../support/alchemy.js');

    /**
     * @class tm.Day
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.Day',
        extend: 'alchemy.core.Collectum',
        overrides: {
            init: function hocuspocus(_super) {
                return function () {
                    _super.call(this);

                    var utils = alchemy('tm.TimeUtils');
                    if (alchemy.isString(this.from)) {
                        this.from = utils.stringToMin(this.from);
                    }
                    if (alchemy.isString(this.to)) {
                        this.to = utils.stringToMin(this.to);
                    }
                    if (alchemy.isArray(this.times)) {
                        alchemy.each(this.times, function (entryData) {
                            this.add(alchemy('tm.Entry').brew({
                                data: entryData
                            }));
                        }, this);
                        delete this.times;
                    }
                };
            },

            getWorkingTime: function () {
                var total = this.to - this.from - this.getBreakTime();
                return total > 0 ? total : 0;
            },

            getBreakTime: function () {
                var total = 0;
                alchemy.each(this.items, function (entry) {
                    if (entry.isBreak()) {
                        total += entry.durration();
                    }
                });
                return total;
            },

            getProjectTimes: function () {
                var result = {};
                var workingTime = this.getWorkingTime();
                var presenceTime = 0;
                var agressoTime = 0;

                alchemy.each(this.items, function (entry) {
                    var ap = entry.get('ap');
                    var aa = entry.get('aa');
                    var desc = entry.get('description');
                    var durr;
                    var key;

                    if (ap && ap !== '0') {
                        key = ap + '#' + aa + '#' + desc;
                        durr = entry.durration();

                        if (!result[key]) {
                            result[key] = {
                                ap: ap,
                                aa: aa,
                                description: desc,
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
            },

            getDayTimes: function () {
                var result = this.toData();
                return result;
            }
        }
    });
}());
