(function () {
    'use strict';

    var alchemy = require('../support/alchemy.js');

    /**
     * @class tm.TimeUtils
     * @extends core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'tm.TimeUtils',
        overrides: {
            formatTime: function (time) {
                if (time >= 0) {
                    var hour = Math.floor(time / 100);
                    var min = Math.round((time % 100) / 100 * 60);
                    return (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min);
                } else {
                    return '-';
                }
            }
        }
    });
}());
