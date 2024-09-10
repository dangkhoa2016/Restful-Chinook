import { createApp, } from 'vue';
import { loadModule, options, } from '/client/src/libs/loadModuleHelper.mjs';
import { useAuthStore, login, logout, init as authStoreInit, } from '/client/src/stores/authStore.mjs';
import emitter from '/client/src/libs/eventBus.mjs';
import { getComponentPath, isComponentLoaded, } from '/client/src/libs/helpers.mjs';


loadModule(getComponentPath('App'), options).then(async (App) => {
  const app = createApp(App);
  await authStoreInit();

  app.provide('emitter', emitter);
  app.provide('authStore', { useAuthStore, login, logout, });

  app.provide('isComponentLoaded', isComponentLoaded);

  app.mount('#app');
});
