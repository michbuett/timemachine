console.log(__dirname);
var root = __dirname + '/../';
var fs = require('fs');
var alchemy = require('../support/alchemy.js');
alchemy.path.set({
    tm: root + 'lib'
});


var times = alchemy('tm.Times').create({
    src: root + 'data/times.json'
});

//var weekTimes = times.getWeekByPackage(new Date());
//var tplWeekPackages = fs.readFileSync('templates/listWeekPackages.tpl', 'utf8');
//console.log(alchemy.render(tplWeekPackages, weekTimes));

var cli = alchemy('tm.CLI').create({
    times: times,
    tplWeekList: fs.readFileSync(root + 'templates/listWeekTimes.tpl', 'utf8'),
    tplWeekPackages: fs.readFileSync(root + 'templates/listWeekPackages.tpl', 'utf8')
});
cli.open();
