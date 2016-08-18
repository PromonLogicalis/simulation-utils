'use strict';

const DateRangeStream = require('../lib/streams/DateRangeStream');

const dateRangeStream = new DateRangeStream({
    startDate: new Date(2016, 0, 1), // 2016-01-01T00:00:00
    endDate: new Date(2016, 0, 2), // 2016-01-02T00:00:00
    interval: "01:00" // 1h
});

dateRangeStream.pipe(process.stdout);
