const fs = require('fs');
const path = require('path');
const flatten = require('flat');
const child_process = require('child_process');

const logger = require('../utils/logger');

const filterBrowserTimeData = (report = {}) => {
    const { statistics = {} } = report;
    return flatten(statistics);
};

const getBrowserTimeFile = (url = '') => {
    try {
        const urlWithNoProtocol = url.replace(/^https?\:\/\//i, '');

        const dir = path.join(__dirname, '../../reports/browsertime-results', urlWithNoProtocol);

        const folders = fs.readdirSync(dir);

        const sortFoldersByTime = folders.sort(function(a, b) {
            return new Date(b) - new Date(a);
        });

        const newestFolder = sortFoldersByTime[sortFoldersByTime.length - 1];

        const browserTimeFile = fs.readFileSync(path.join(dir, newestFolder, 'browsertime.json'));

        return Promise.resolve(JSON.parse(browserTimeFile));
    } catch (err) {
        console.log(err);
        const message = `Failed to get browsertime file for ${url}`;
        logger.warn(message);
        return Promise.reject(message);
    }
};

const getData = async url => {
    return new Promise(async (resolve, reject) => {
        try {
            const child = child_process.spawn('bash', [path.join(__dirname, './browsertime.sh'), url]);

            child.on('exit', async () => {
                logger.info(`Finished getting data for ${url}, trying to get the results`);
                const data = await getBrowserTimeFile(url);
                resolve(filterBrowserTimeData(data));
            });

            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        } catch (err) {
            logger.warn(`Failed to get data for ${url}`, err);
            reject(`Failed to get data for ${url}`);
        }
    });
};

module.exports = {
    getBrowserTimeFile,
    filterBrowserTimeData,
    getData
};
