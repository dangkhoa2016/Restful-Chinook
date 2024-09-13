
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/src/libs/api.mjs';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Create a reactive store
const tableStore = reactive({
  loadingRecords: false,
  loadingRecord: false,
  records: null,
  totalItems: 0,
  loadRecordError: null,
  loadRecordsError: null,
});

const setLoadRecordsError = (error) => {
  tableStore.loadRecordsError = error;
};

const setRecords = (records, totalItems) => {
  tableStore.records = records;
  tableStore.totalItems = totalItems;
};

const fetchRecords = async (token, model, limit, offset, abortToken) => {
  if (!model)
    return;

  setRecords(null, 0);
  tableStore.loadingRecords = true;
  tableStore.loadRecordsError = null;
  // await sleep(10000);

  if (abortToken && abortToken.reason) {
    // console.log('Aborted fetch records', model);
    return;
  }

  try {
    const response = await api.get(`${endpoint}api/${model}`, {
      params: {
        limit, offset
      },
      headers: {
        'x-access-token': `${token}`
      },
      cancelToken: abortToken
    });

    if (abortToken && abortToken.reason) {
      // console.log('Aborted fetch records', model);
      return;
    }

    const { rows = [], total: totalItems = 0, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    setRecords(rows, totalItems);
  } catch (ex) {
    console.log('Error fetch records', ex);
    tableStore.loadRecordsError = ex.message;
  }

  tableStore.loadingRecords = false;
  return tableStore.records;
};

// Use toRefs for read-only access in components
const useTableStore = () => {
  return toRefs(tableStore);
};

export {
  useTableStore,
  fetchRecords,
  setRecords,
  setLoadRecordsError,
};
