import * as changeCase from 'change-case';

export default {
  install(app) {
    app.config.globalProperties.$filters = {
      capitalCase: changeCase.capitalCase,
    };
  },
};

