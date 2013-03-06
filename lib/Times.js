(function () {
    'use strict';

    var fs = require('fs');
    var alchemy = require('../support/alchemy.js');

    /**
     * @class tm.Times
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.Times',
        extend: 'alchemy.core.Collectum',
        overrides: {
            init: function hocuspocus(_super) {
                return function () {
                    _super.call(this);
                    this.load();
                };
            },

            /**
             * Converts a date into a string that acts as a key of the data set
             * @private
             */
            getKey: function (date) {
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            },

            getDayModel: function (day) {
                var date = new Date(day);
                var key = this.getKey(date);

                if (!this.contains(key)) {
                    this.add(alchemy('tm.Day').brew({
                        id: key,
                        date: date
                    }));
                }
                return this.get(key);
            },

            getWeekByDay: function (key) {
                var date = new Date(key);
                var day = date.getDate() - date.getDay(); // first day of the week
                var month = date.getMonth(); // months are zero based
                var year = date.getFullYear();
                var currDate, currKey;
                var result = [];

                for (var i = 1; i < 8; i++) { // the weekdays are Sun (0), Mon (1), ..., Sat(6)
                    currDate = new Date(year, month, day + i);
                    currKey = this.getKey(currDate);
                    result.push(this.getDayModel(currKey));
                }
                return result;
            },

            getWeekByPackage: function (key) {
                var agressoPackages = {};
                var weekTimes = this.getWeekByDay(key);
                var dayTotals = [];

                alchemy.each(weekTimes, function (day, i) {
                    var projectTimes = day.getProjectTimes();
                    dayTotals[i] = 0;
                    alchemy.each(projectTimes, function (entry, key) {
                        if (!agressoPackages[key]) {
                            agressoPackages[key] = {
                                ap: entry.ap,
                                aa: entry.aa,
                                description: entry.description,
                                times: []
                            };
                        }
                        agressoPackages[key].times[i] = entry.time;
                        dayTotals[i] += entry.time;
                    });
                });
                return {
                    agressoPackages: agressoPackages,
                    dayTotals: dayTotals
                };
            },

            load: function () {
                var data;
                var raw = fs.readFileSync(this.src, 'utf8');
                // replace line comments
                raw = raw.replace(/\/\/.*/g, '');
                // replace block comments
                raw = raw.replace(/\n/g, '');
                raw = raw.replace(/\/\*.*\*\//g, '');
                data = JSON.parse(raw);

                alchemy.each(data, function (item, key) {
                    this.add(alchemy('tm.Day').brew(alchemy.mix({
                        id: key,
                        date: new Date(key),
                    }, item)));
                }, this);
            }
        }
    });
}());
