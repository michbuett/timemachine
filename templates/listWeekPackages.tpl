<$
    var util = alchemy('tm.TimeUtils');
    var fill = util.fill;
    var total = 0;
$>
\n\n Agresso data from: [<$= data.from.toDateString() $>], to: [<$= data.to.toDateString() $>]
\n                    │   <$ for (var i = 1; i < 8; i++) { $><$=util.dayName(i) $>  │   <$ } $>
\n   -----------------------------------------------------------------------------------------
<$   for (var key in data.agressoPackages) {
      var e = data.agressoPackages[key];
$>
\n  <$=fill(e.ap, 10)$> │ <$=fill(e.aa, 4)$><$ for (var i = 0; i < 7; i++) { $> │ <$=fill(util.minToHour(e.times[i]), 5)$> <$ } $> | <$=e.description $><$ } $>
\n   -----------------------------------------------------------------------------------------
\n              Total<$ for (var i = 0; i < 7; i++) { total += data.dayTotals[i]; $> │ <$=fill(util.minToHour(data.dayTotals[i]), 5) $> <$ }$> │ <$=fill(util.minToHour(total), 5) $>\n

