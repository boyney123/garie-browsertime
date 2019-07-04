const garie_plugin = require('garie-plugin')
const path = require('path');
const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');
const flatten = require('flat');

const filterBrowserTimeData = (report = {}) => {
    const { statistics = {} } = report[0];

    return flatten(statistics);
};

const myGetFile = async (options) => {
    options.fileName = 'browsertime.json';
    const file = await garie_plugin.utils.helpers.getNewestFile(options);
    return filterBrowserTimeData(JSON.parse(file));
}

const myGetData = async (item) => {
    const { url } = item.url_settings;
    return new Promise(async (resolve, reject) => {
        try {
            const { reportDir } = item;
            const options = { script: path.join(__dirname, './browsertime.sh'),
                        url: url,
                        reportDir: reportDir,
                        params: [ ],
                        env: {
                          CPU_USAGE: config.plugins['browsertime'].cpuUsage
                        },
                        callback: myGetFile
                    }
            data = await garie_plugin.utils.helpers.executeScript(options);

            var clear_data = {};
            Object.keys(data).forEach(function(data_key){
                clear_data[data_key.replace(/[^\x00-\x7F]/g, "").replace(/\s/g,"")] = data[data_key];
            });
            resolve(clear_data);
        } catch (err) {
            console.log(`Failed to get data for ${url}`, err);
            reject(`Failed to get data for ${url}`);
        }
    });
};



console.log("Start");


const app = express();
app.use('/reports', express.static('reports'), serveIndex('reports', { icons: true }));

const main = async () => {
  return new Promise(async (resolve, reject) => {
    try{
      await garie_plugin.init({
        db_name:'browsertime',
        getData:myGetData,
        report_folder_name:'browsertime-results',
        plugin_name:'browsertime',
        app_root: path.join(__dirname, '..'),
        config:config
      });
    }
    catch(err){
      reject(err);
    }
  });
}

if (process.env.ENV !== 'test') {
  const server = app.listen(3000, async () => {
    console.log('Application listening on port 3000');
    try{
      await main();
    }
    catch(err){
      console.log(err);
      server.close();
    }
  });
}
