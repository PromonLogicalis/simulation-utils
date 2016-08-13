'use strict';

const DataGeneratorStream = require('../lib/streams/DataGeneratorStream');

const dataGeneratorStream = new DataGeneratorStream({
    generator: (index) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: 'dummy-' + index
                });
            }, 1000);
        });
    },
    size: 5
});

dataGeneratorStream.pipe(process.stdout);
