<$
    var util = alchemy('tm.TimeUtils');
    var format = function (raw) {
        return util.minToString(raw);
    };

    // formats the agresso package number
    var getAP = function (entry) {
        return entry.get('ap') || '   --   ';
    };

    // formats the agresso activity
    var getAA = function (entry) {
        return entry.get('aa') || ' -- ';
    };

    var details = function (times) {
        var result = [];
        alchemy.each(times, function (entry) {
            var ap = getAP(entry);
            var aa = getAA(entry);
            var from = format(entry.from());
            var to = format(entry.to());
            var durr = format(entry.durration());

            result.push([ap, aa, from, to, durr, entry.get('description')].join(' | '));
        });
        return result.join('/n');
    };

$>
\n
Worktimes for [<$=data.date.toDateString() $>]\n
  from: [<$= format(data.from) $>]   work:  [<$= format(data.getWorkingTime()) $>] \n
  to:   [<$= format(data.to)   $>]   break: [<$= format(data.getBreakTime())   $>] \n
  \n
  <$=details(data.items) $>
  \n
