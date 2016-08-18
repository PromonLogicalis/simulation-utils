'use strict';

const stream = require('stream');
const moment = require('moment');

/**
 * Class representing a Date Range stream.
 * @extends stream.Readable
 */
class DateRangeStream extends stream.Readable {
    /**
     * Create a DateRangeStream.
     * @param {object} options - Stream options.
     * @param {string|Date|Moment} options.startDate - Range start date.
     * @param {string|Date|Moment} options.endDate - Range end date.
     * @param {string|Moment.Duration} options.interval - Range interval. May be a string in format D.HH:mm:ss.SSS or a
     * @param {string} [options.format] - Moment formatting string. More info: http://momentjs.com/docs/#/displaying/format/
     * Moment.Duration object
     */
    constructor(options) {
        super(options);
        this.startDate = moment(options.startDate);
        this.endDate = moment(options.endDate);
        this.interval = typeof options.interval === 'string' ? moment.duration(options.interval) : options.interval;
        this.format = options.format;

        this.currentDate = this.startDate;
    }

    _read() {
        if (this.endDate.diff(this.currentDate) >= 0) {
            this.push(this.currentDate.format(this.format));
            this.currentDate.add(this.interval);
        } else {
            this.push(null);
        }
    }
}

module.exports = DateRangeStream;