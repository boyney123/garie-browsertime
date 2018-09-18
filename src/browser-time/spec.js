const fs = require('fs-extra');
const path = require('path');
const child_process = require('child_process');
const { getBrowserTimeFile, filterBrowserTimeData, getData } = require('./');
const browserTimeTestData = require('../../test/mock-data/browsertime.json');
const browserTimeTestDataFlat = require('../../test/mock-data/browsertime-flat.json');

jest.mock('child_process', () => {
    return {
        spawn: jest.fn(() => ({
            on: jest.fn((process, callback) => {
                callback();
            }),
            stdout: { pipe: jest.fn() },
            stderr: { pipe: jest.fn() }
        }))
    }
});

describe('browser-time', () => {

    beforeEach(() => {
        const today = new Date();

        const filePath = path.join(__dirname, '../../reports/browsertime-results/www.test.co.uk', today.toISOString());
        fs.ensureDirSync(filePath);

        fs.writeJsonSync(path.join(filePath, 'browsertime.json'), browserTimeTestData);
    })

    afterEach(() => {
        fs.removeSync(path.join(__dirname, '../../../reports/browsertime-results/www.test.co.uk'));
    });

    describe('getBrowserTimeFile', () => {

        it('finds and resolves the browsertime results for the given url', async () => {

            const result = await getBrowserTimeFile('www.test.co.uk');

            expect(result).toEqual(browserTimeTestData);

        });

        it('rejects when no file can be found', async () => {
            fs.removeSync(path.join(__dirname, '../../reports/browsertime-results/www.test.co.uk'));
            await expect(getBrowserTimeFile('www.test.co.uk')).rejects.toEqual('Failed to get browsertime file for www.test.co.uk');
        });

    });

    describe('filterBrowserTimeData', () => {

        it('returns the `statistics` from the browser time file and flattens the data', () => {

            const testData = {
                statistics: {
                    property1: {
                        property1A: 'property1AValue'
                    },
                    property2: 'property2Value'
                }
            }

            const data = filterBrowserTimeData(testData);

            expect(data['property1.property1A']).toEqual('property1AValue');
            expect(data.property2).toEqual('property2Value');



        });

    });

    describe('getData', () => {

        it('calls the shell script to get the data from browsertime docker image and resolves with the browsertime file flattened when succesfully finished', async () => {

            const data = await getData('www.test.co.uk');
            expect(child_process.spawn).toBeCalledWith('bash', [path.join(__dirname, './browsertime.sh'), 'www.test.co.uk']);

            expect(data).toEqual(browserTimeTestDataFlat);


        });

        it('rejects when child process fails', async () => {

            child_process.spawn.mockImplementation(() => {
                throw new Error('Failed');
            })

            await expect(getData('www.test.co.uk')).rejects.toEqual('Failed to get data for www.test.co.uk');

        });


    });

});