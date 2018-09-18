![reports](./screenshots/logo.png 'Reports')

<p align="center">
  <p align="center">Tool to gather browsertime metrics and supports CRON jobs and webhooks.<p>
  <p align="center"><a href="https://travis-ci.org/boyney123/garie-browsertime"><img src="https://img.shields.io/travis/boyney123/garie-browsertime/master.svg" alt="Build Status"></a>
    <a href="https://codecov.io/gh/boyney123/garie-browsertime/"><img src="https://codecov.io/gh/boyney123/garie-browsertime/branch/master/graph/badge.svg?token=AoXW3EFgMP" alt="Codecov"></a>
	<a href="https://github.com/boyney123/garie"><img src="https://img.shields.io/badge/plugin%20built%20for-garie-blue.svg" alt="garie"></a>  
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT"></a>

  </p>
</p>

**Highlights**

-   Poll for browsertime performance metrics on any website and stores the data into InfluxDB
-   Webhook support
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
git clone git@github.com:boyney123/garie-browsertime.git
```

Next setup you're config. Edit the `config.json` and add websites to the list.

```javascript
{
	"cron": "00 00 */6 * * *",
	"urls": [
		{
			"url": "https://www.comparethemarket.com"
		},
		{
			"url": "https://www.bbc.co.uk"
		},
		{
			"url": "https://www.cnn.com"
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

## Viewing reports

Viewing browsertime reports is straight forward. Once you have your application running just go to `localhost:3000/reports` and you should see all the reports browsertime has generated.

![reports](./screenshots/reports.png 'Reports')
![reports](./screenshots/browsertime.gif 'Reports')

## Webhook

Garie-browsertime also supports webhooks. You will need to `POST` to `localhost:3000/collect`.

**Payload**

| Property | Type                | Description             |
| -------- | ------------------- | ----------------------- |
| `url`    | `string` (required) | Url to get metrics for. |

**Payload Example**

```javascript
{
  "url": "https://www.bbc.co.uk"
}
```

## config.json

| Property | Type                | Description                                                                          |
| -------- | ------------------- | ------------------------------------------------------------------------------------ |
| `cron`   | `string` (optional) | Cron timer. Supports syntax can be found [here].(https://www.npmjs.com/package/cron) |
| `urls`   | `object` (required) | Config for browsertime. More detail below                                            |

**urls object**

| Property | Type                | Description                         |
| -------- | ------------------- | ----------------------------------- |
| `url`    | `string` (required) | Url to get browsertime metrics for. |
