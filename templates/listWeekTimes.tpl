<$
    var util = alchemy('tm.TimeUtils');
$>
\n
Week from: [<$=data[0].date.toDateString() $>], to: [<$=data[6].date.toDateString() $>]\n
<$ for (var i = 0; i < 7; i++) {
    var d = data[i];
    $>

    <$=util.dayName(d.date) $> | <$=util.minToString(d.from) $> - <$=util.minToString(d.to) $> | <$=util.minToString(d.getWorkingTime()) $>\n
<$ } $>
