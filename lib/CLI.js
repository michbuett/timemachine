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

            init: function () {
                // init code here
            },

            open: function () {
                this.rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                this.rl.setPrompt(this.basePrompt);
                this.rl.prompt();
                this.rl.on('line', (function (line) {
                    line = line && line.trim();
                    if (line) {
                        this.handleInput(line.toLowerCase());
                    }
                    this.rl.prompt();
                }).bind(this));
                this.rl.on('close', (function () {
                    this.print('Bye bye!');
                    process.exit(0);
                }).bind(this));
            },

            close: function () {
                this.rl.close();
            },

            handleInput: function (line) {
                switch (line) {
                case 'list':
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
