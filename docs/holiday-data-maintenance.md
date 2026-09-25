# Japanese holiday data maintenance

Benri-Desk uses Japanese holiday data in the holiday list, working-day count,
next-business-day, payment-due-date, and bank-business-day tools.

## Source of truth

- Cabinet Office holiday page: <https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html>
- Cabinet Office CSV: <https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv>
- Bank closure reference: <https://www.fsa.go.jp/access/30/182a.html>

The Cabinet Office normally publishes the following year's holidays in February.
Equinox dates are not official before that publication.

## Annual update

Run this check each February:

1. Compare the newly published year with `officialUpcomingHolidays` in
   `lib/jpHolidays.ts`.
2. Add the complete official list, including statutory substitute holidays and
   citizen's holidays.
3. Advance `JP_HOLIDAY_OFFICIAL_THROUGH_YEAR` by one year.
4. Check the year in `/tools/holiday-list` and boundary cases in all four
   business-day tools.
5. Run targeted lint and a production build before deployment.

Years after `JP_HOLIDAY_OFFICIAL_THROUGH_YEAR` remain projections based on the
current holiday law and equinox calculation. They must continue to be labeled as
provisional in user-facing results.
