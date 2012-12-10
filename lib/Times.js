(function () {
    'use strict';

    var alchemy = require('../support/alchemy.js');
    var utils = alchemy('tm.TimeUtils');

    /**
     * @class tm.Times
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.Times',
        overrides: {
        }
    });
}());
