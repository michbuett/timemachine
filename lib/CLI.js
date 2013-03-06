(function () {
    'use strict';

    var alchemy = require('../support/alchemy.js');
    var readline = require('readline');

    /**
     * A command line interface to show and modify the times
     *
     * @class tm.CLI
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.CLI',
        extend: 'MateriaPrima',
        overrides: {

            basePrompt: 'TIMEMASHINE ({mode})> ',

            mode: 'week',

            commands: {
                previous: function () {
                    var stepWidth = this.mode === 'day' ? 1 : 7;
                    this.currentDay.setDate(this.currentDay.getDate() - stepWidth);
                },

                next: function () {
                    var stepWidth = this.mode === 'day' ? 1 : 7;
                    this.currentDay.setDate(this.currentDay.getDate() + stepWidth);
                },

                exit: function () {
                    this.rl.close();
                },

                day: function () {
                    this.setMode('day');
                },

                week: function () {
                    this.setMode('week');
                },

                agresso: function () {
                    this.setMode('agresso');
                },
            },

            init: function () {
                // init code here
            },

            open: function () {
                this.currentDay = new Date();
                this.rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    completer: this.complete.bind(this)
                });
                this.setMode(this.mode);

                // handle input
                this.rl.on('line', (function (line) {
                    line = line && line.trim();
                    if (line) {
                        this.handleInput(line.toLowerCase());
                    }
                    this.prompt();
                }).bind(this));

                // exit app on close
                this.rl.on('close', (function () {
                    this.print('Bye bye!');
                    process.exit(0);
                }).bind(this));

                this.prompt();
            },

            /**
             * The autocomplete function for the interface
             * See http://nodejs.org/api/readline.html
             * @private
             */
            complete: function (line) {
                var suggestions = [];
                var originLine = line;
                var re = new RegExp('^' + this.normalizeInput(line));

                alchemy.each(this.commands, function (fn, key) {
                    if (re.test(this.normalizeInput(key))) {
                        suggestions.push(key);
                    }
                }, this);

                return [suggestions, originLine];
            },

            setMode: function (mode) {
                this.mode = mode;
                this.rl.setPrompt(this.basePrompt.replace('{mode}', this.mode));
            },

            prompt: function () {
                var times;
                switch (this.mode) {
                case 'day':
                    times = this.times.getDayModel(this.currentDay);
                    this.print(alchemy.render(this.tplDayList, times));
                    break;

                case 'week':
                    times = this.times.getWeekByDay(this.currentDay);
                    this.print(alchemy.render(this.tplWeekList, times));
                    break;

                case 'agresso':
                    times = this.times.getWeekByPackage(this.currentDay);
                    this.print(alchemy.render(this.tplWeekPackages, times));
                    break;
                }

                this.rl.prompt();
            },

            handleInput: function (line) {
                var handlerFn = this.commands[this.normalizeInput(line)];
                if (alchemy.isFunction(handlerFn)) {
                    handlerFn.call(this, line);
                } else {
                    this.error('Unknown command: ' + line);
                }
            },

            /**
             * Normalizes the raw user input (trims white space, ...)
             * @private
             */
            normalizeInput: function (raw) {
                return (raw || '').trim().toLowerCase();
            },

            error: function (msg) {
                this.print('[ERROR] ' + msg);
            },

            print: function (msg) {
                console.log(msg);
            }
        }
    });
}());
