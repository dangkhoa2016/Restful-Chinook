
import { reactive, toRefs } from 'vue';
// import api, { endpoint } from '/src/libs/api.mjs';
import { getLocalStorageItem, setLocalStorageItem } from '/src/libs/localStorageHelpers.mjs';
import { sleep } from '/src/libs/helpers.mjs';

// Create a reactive store
const authStore = reactive({
  authInfo: null,
  isAuthenticated: false,
  errorLogin: null,
  isProcessing: false,
  isAdmin: false,
});


// Mutations
const setAuthInfo = (authInfo) => {
  const { user, token, userToken } = authInfo || {};
  if (userToken)
    setLocalStorageItem('authInfo', userToken);
  else
    setLocalStorageItem('authInfo', null);
  authStore.authInfo = authInfo;
  authStore.isAdmin = user?.role === 'admin';
  authStore.isAuthenticated = Boolean(token);
};


// Actions
const login = (/* username, password */) => {
  authStore.errorLogin = null;
  authStore.isProcessing = true;

  // console.log('logining...', username, password);

  sleep(3000).then(async () => {
    // console.log('logining... done at, ', new Date().toISOString());
  });
};

const logout = () => {
  setAuthInfo(null);
};

const init = () => {
  const authInfo = getLocalStorageItem('authInfo');

  if (!authInfo)
    return;

  // console.log('authInfo', authInfo);
};


// Use toRefs for read-only access in components
const useAuthStore = () => {
  return toRefs(authStore);
};


export { useAuthStore, login, logout, init };
