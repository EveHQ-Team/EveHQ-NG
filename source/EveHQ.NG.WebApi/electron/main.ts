import { EveHqApplication } from './infrastructure/evehq-application';

const args = process.argv.slice(1);
let isDevelopment = args.some(val => val === '--serve');

require('electron-unhandled')({ logger: console.error, showDialog: false });
//require('electron-unhandled')({ logger: logExceptionToApi, showDialog: false });

if (isDevelopment) {
	require('electron-reload')(__dirname, { electron: require(`${__dirname}/../../source/EveHQ.NG.WebApi/node_modules/electron`) });
}

let application = new EveHqApplication(isDevelopment);
