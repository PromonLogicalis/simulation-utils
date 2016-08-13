'use strict';

const stream = require('stream');

/**
 * Class representing a Data Generator stream.
 * @extends stream.Readable
 */
class DataGeneratorStream extends stream.Readable {
    /**
     * Create a dot.
     * @param {object} options - Stream options.
     * @param {generator} options.generator - Generator function.
     * @param {number} [options.size=1] - Number of elements to be generated.
     * @param {number} [options.offset=0] - Offset of first index.
     */
    constructor(options) {
        options = options || {};
        super(options);

        this.generator = options.generator || (index => { return 'dummy-data' }) ;
        this.size = options.size || 1;
        this.offset = options.offset || 0;

        this.generatedCount = 0;
    }

    _read() {
        if (this.generatedCount >= this.size) {
            this.push(null);
        } else {
            this.generatedCount++;
            const dataPromise = Promise.resolve(this.generator(this.offset + this.generatedCount));
            dataPromise
                .then(data => {
                    this.push(typeof data === 'string' ? data : JSON.stringify(data));
                })
                .catch(err => {
                    process.nextTick(() => this.emit('error', err));
                });
        }
    }
}

/**
 * This callback is displayed as part of the DataGeneratorStream class.
 * This must be a function that optionally return a promise that resolves the generated
 * data or it may just return the generated data.
 * @callback generator
 * @param {number} index - Index of the current iteration.
 * @returns {Promise|*} - Generated data or a promise that resolves the data.
 */

module.exports = DataGeneratorStream;