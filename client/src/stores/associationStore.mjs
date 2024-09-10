
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/client/src/libs/api.mjs';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Create a reactive store
const associationStore = reactive({
  loadingBelongTos: false,
  belongTos: null,
  loadBelongTosError: null,

  loadingHasManys: false,
  hasManys: null,
  loadHasManysError: null,

  hasManyTargetRecords: null,
  loadingHasManyTargets: false,
  loadHasManyTargetsError: null,
  targetTotalItems: 0,
});

const setLoadBelongTosError = (error) => {
  associationStore.loadBelongTosError = error;
};

const setBelongTos = (belongTos) => {
  associationStore.belongTos = belongTos;
};

const fetchBelongTos = async (token, model, id, abortToken) => {
  if (!model || !id)
    return;

  setBelongTos(null);
  associationStore.loadingBelongTos = true;
  associationStore.loadBelongTosError = null;
  await sleep(2000);

  if (abortToken && abortToken.reason) {
    // console.log('Aborted fetch belongTos', model);
    return;
  }

  try {
    const response = await api.get(`${endpoint}api/associations`, {
      params: {
        model, id,
        action: 'belongto',
      },
      headers: {
        'x-access-token': `${token}`
      },
      cancelToken: abortToken
    });

    if (abortToken && abortToken.reason) {
      // console.log('Aborted fetch belongTos', model);
      return;
    }

    const models = response.data || {};
    setBelongTos(models);
  } catch (ex) {
    console.log('Error fetch belongTos', ex);
    associationStore.loadBelongTosError = ex.message;
  }

  associationStore.loadingBelongTos = false;
  return associationStore.belongTos;
};


const setLoadHasManysError = (error) => {
  associationStore.loadHasManysError = error;
};

const setHasManys = (hasManys) => {
  associationStore.hasManys = hasManys;
};

const fetchHasManys = async (token, model, id, abortToken) => {
  if (!model || !id)
    return;

  setHasManys(null);
  associationStore.loadingHasManys = true;
  associationStore.loadHasManysError = null;
  // await sleep(10000);

  if (abortToken && abortToken.reason) {
    // console.log('Aborted fetch hasManys', model);
    return;
  }

  try {
    const response = await api.get(`${endpoint}api/associations`, {
      params: {
        model, id,
        action: 'hasmany',
      },
      headers: {
        'x-access-token': `${token}`
      },
      cancelToken: abortToken
    });

    if (abortToken && abortToken.reason) {
      // console.log('Aborted fetch belongTos', model);
      return;
    }

    const models = response.data || {};
    setHasManys(models);
  } catch (ex) {
    console.log('Error fetch hasManys', ex);
    associationStore.loadHasManysError = ex.message;
  }

  associationStore.loadingHasManys = false;
  return associationStore.hasManys;
};



const setLoadHasManyTargetsError = (error) => {
  associationStore.loadHasManyTargetsError = error;
};

const setHasManyTargetRecords = (records, targetTotalItems) => {
  associationStore.hasManyTargetRecords = records;
  associationStore.targetTotalItems = targetTotalItems;
};

const fetchHasManyTargets = async ({ token, model, id, target, limit, offset, abortToken }) => {
  if (!model || !id)
    return;

  setHasManyTargetRecords(null, 0);
  associationStore.loadingHasManyTargets = true;
  associationStore.loadHasManyTargetsError = null;
  await sleep(2000);

  if (abortToken && abortToken.reason) {
    // console.log('Aborted fetch hasManyTargets', model);
    return;
  }

  try {
    const response = await api.get(`${endpoint}api/associations`, {
      params: {
        action: 'hasmany',
        model, id, target,
        limit, offset,
      },
      headers: {
        'x-access-token': `${token}`
      },
      cancelToken: abortToken
    });

    if (abortToken && abortToken.reason) {
      // console.log('Aborted fetch belongTos', model);
      return;
    }

    const { rows = [], total: totalItems = 0, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    setHasManyTargetRecords(rows, totalItems);
  } catch (ex) {
    console.log('Error fetch hasManyTargets', ex);
    associationStore.loadHasManyTargetsError = ex.message;
  }

  associationStore.loadingHasManyTargets = false;
  return associationStore.hasManyTargetRecords;
};


// Use toRefs for read-only access in components
const useAssociationStore = () => {
  return toRefs(associationStore);
};

export {
  useAssociationStore,

  fetchBelongTos,
  setBelongTos,
  setLoadBelongTosError,

  fetchHasManys,
  setHasManys,
  setLoadHasManysError,

  fetchHasManyTargets,
  setHasManyTargetRecords,
  setLoadHasManyTargetsError,
};
