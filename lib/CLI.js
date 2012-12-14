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

            basePrompt: 'TIMEMASHINE> ',

            mode: 'week',

            init: function () {
                // init code here
            },

            open: function () {
                this.rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                this.prompt();
                this.rl.on('line', (function (line) {
                    line = line && line.trim();
                    if (line) {
                        this.handleInput(line.toLowerCase());
                    }
                    this.prompt();
                }).bind(this));
                this.rl.on('close', (function () {
                    this.print('Bye bye!');
                    process.exit(0);
                }).bind(this));
            },

            close: function () {
                this.rl.close();
            },

            prompt: function () {
                var weekTimes;
                if (this.mode === 'week') {
                    weekTimes = this.times.getWeekByDay(new Date());
                    this.print(alchemy.render(this.tplWeekList, weekTimes));
                }
                if (this.mode === 'agresso') {
                    weekTimes = this.times.getWeekByPackage(new Date());
                    this.print(alchemy.render(this.tplWeekPackages, weekTimes));
                }
                this.rl.setPrompt(this.basePrompt);
                this.rl.prompt();
            },

            handleInput: function (line) {
                switch (line) {
                case 'agresso':
                    this.mode = 'agresso';
                    break;

                case 'week':
                    this.mode = 'week';
                    break;

                case 'exit':
                    this.close();
                    break;

                default:
                    this.error('unknown command: ' + line);
                    break;
                }
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
