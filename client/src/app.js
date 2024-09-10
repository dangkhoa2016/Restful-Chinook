import { createApp, } from 'vue';
import { loadModule, options, } from '/src/libs/loadModuleHelper.mjs';
import { useAuthStore, login, logout, init as authStoreInit, } from '/src/stores/authStore.mjs';
import emitter from '/src/libs/eventBus.mjs';
import { getComponentPath, isComponentLoaded, } from '/src/libs/helpers.mjs';


loadModule(getComponentPath('App'), options).then(async (App) => {
  const app = createApp(App);
  await authStoreInit();

  app.provide('emitter', emitter);
  app.provide('authStore', { useAuthStore, login, logout, });

  app.provide('isComponentLoaded', isComponentLoaded);

  app.mount('#app');
});
