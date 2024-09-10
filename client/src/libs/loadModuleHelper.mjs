// skipcq: JS-C1003
import * as Vue from 'vue';
import sfcLoader from 'sfc-loader';
import { Modal, Toast, Tab, Collapse } from 'bootstrap';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import dayjs from 'dayjs';
import dayjsLocalizedFormat from 'dayjsLocalizedFormat';
import { getFile, } from './helpers.mjs';
// skipcq: JS-C1003
import * as changeCase from 'change-case';
import currencyJs from 'currency.js';
import pluralize from 'pluralize';
const { loadModule } = sfcLoader.default || sfcLoader;

const options = {
	moduleCache: {
		vue: Vue,
		bootstrap: { Modal, Toast, Tab, Collapse },
		axios,
		dayjs,
		pluralize,
		'dayjs/plugin/localizedFormat': dayjsLocalizedFormat,
		'axios-mock-adapter': axiosMockAdapter,
		'change-case': changeCase,
		'currency.js': currencyJs,
	},
	getFile,
	addStyle(textContent) {
		const style = Object.assign(document.createElement('style'), {
			textContent,
		});
		const refStyle = document.head.getElementsByTagName('style')[0] ?? null;
		document.head.insertBefore(style, refStyle);
	},
};

export {
  loadModule, options,
}
