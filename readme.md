![reports](./screenshots/browsertime-logo.png 'Reports')

<p align="center">
  <p align="center">Tool to gather browsertime metrics and supports CRON jobs.<p>
</p>

**Highlights**

-   Poll for browsertime performance metrics on any website and stores the data into InfluxDB
-   Generates web performance videos
-   View all historic reports.
-   Setup within minutes


## Overview of garie-browsertime

Garie-browsertime was developed as a plugin for the [Garie](https://github.com/boyney123/garie) Architecture.

[Garie](https://github.com/boyney123/garie) is an out the box web performance toolkit, and `garie-browsertime` is a plugin that generates and stores browsertime data into `InfluxDB`.

`Garie-browsertime` can also be run outside the `Garie` environment and run as standalone.

If your interested in an out the box solution that supports multiple performance tools like `browsertime`, `google-speed-insight` and `lighthouse` then checkout [Garie](https://github.com/boyney123/garie).

If you want to run `garie-browsertime` standalone you can find out how below.

## Getting Started

### Prerequisites

-   Docker installed

### Running garie-browsertime

You can get setup with the basics in a few minutes.

First clone the repo.

```sh
git clone https://github.com/eea/garie-browsertime.git
```

Next setup you're config. Edit the `config.json` and add websites to the list.

```javascript
{
  "plugins":{
        "browsertime":{
            "cron": "0 */4 * * *"
        }
    },
  "urls": [
    {
      "url": "https://www.eea.europa.eu/"
    },
    {
      "url": "https://biodiversity.europa.eu/"
    }
  ]
}
```

Once you finished edited your config, lets build our docker image and setup our environment.

```sh
docker build -t garie-browsertime . && docker-compose up
```

This will build your copy of `garie-browsertime` and run the application.

On start garie-browsertime will start to gather performance metrics for the websites added to the `config.json`.

## config.json

| Property | Type                | Description                                                                          |
| -------- | ------------------- | ------------------------------------------------------------------------------------ |
| `plugins.browsertime.cron`   | `string` (optional) | Cron timer. Supports syntax can be found [here].(https://www.npmjs.com/package/cron) |
| `plugins.browsertime.retry`   | `object` (optional) | Configuration how to retry the failed tasks |
| `plugins.browsertime.retry.after`   | `number` (optional, default 30) | Minutes before we retry to execute the tasks |
| `plugins.browsertime.retry.times`   | `number` (optional, default 3) | How many time to retry to execute the failed tasks |
| `plugins.browsertime.retry.timeRange`   | `number` (optional, default 360) | Period in minutes to be checked in influx, to know if a task failed |
| `urls`   | `object` (required) | Config for browsertime. More detail below                                            |

**urls object**

| Property | Type                | Description                         |
| -------- | ------------------- | ----------------------------------- |
| `url`    | `string` (required) | Url to get browsertime metrics for. |
