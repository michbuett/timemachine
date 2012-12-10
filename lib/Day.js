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
        }
    });
}());
