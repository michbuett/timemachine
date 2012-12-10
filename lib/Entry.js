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
        extend: 'MateriaPrima',
        overrides: {
            from: undefined,
            to: undefined,
            aggressoPackage: undefined,
            type: undefined,

            format: function () {
                return [
                    'from: ' + utils.formatTime(this.from),
                    'to' + utils.formatTime(this.to)
                ].join(', ');
            }
        }
    });
}());
