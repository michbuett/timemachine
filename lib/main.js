var root = __dirname + '/../';
var fs = require('fs');
var alchemy = require('../support/alchemy.js');

alchemy.path.set({
    tm: root + 'lib'
});

var times = alchemy('tm.Times').brew({
    src: root + 'data/times.json'
});

var cli = alchemy('tm.CLI').brew({
    times: times,
    tplDayList: fs.readFileSync(root + 'templates/listDayTimes.tpl', 'utf8'),
    tplWeekList: fs.readFileSync(root + 'templates/listWeekTimes.tpl', 'utf8'),
    tplWeekPackages: fs.readFileSync(root + 'templates/listWeekPackages.tpl', 'utf8')
});
cli.open();
