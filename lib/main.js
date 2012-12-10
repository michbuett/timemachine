var alchemy = require('../support/alchemy.js');
alchemy.path.set({
    tm: '../../../../lib'
});

var cli = alchemy('tm.CLI').create();
cli.open();
