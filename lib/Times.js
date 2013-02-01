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
        overrides: {
            init: function () {
                this.load();
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
                    currKey = year + '-' + (month + 1) + '-' + currDate.getDate();
                    result.push(alchemy('tm.Day').create(alchemy.mix({
                        date: currDate,
                        key: currKey,
                    }, this.data[currKey])));
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
                var raw = fs.readFileSync(this.src, 'utf8');
                // replace line comments
                raw = raw.replace(/\/\/.*/g, '');
                // replace block comments
                raw = raw.replace(/\n/g, '');
                raw = raw.replace(/\/\*.*\*\//g, '');
                this.data = JSON.parse(raw);
            }
        }
    });
}());
