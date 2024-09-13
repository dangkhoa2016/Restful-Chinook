<template>
  <transition name='just-fade' mode='out-in'>
    <LoadingBelongTo v-if='loadingBelongTosRef || forceLoading' />
    <div v-else-if='loadBelongTosErrorRef'>
      <ErrorLoadRecords :message='loadBelongTosErrorRef'
        :show-reload-button='true' @reload='handleIdChange' />
    </div>
    <div v-else-if='!belongTosRef || belongTosRef.length == 0' :id='`nodata-${mainId}`'>
      <div class='alert alert-info m-0' role='alert'>
        No associations found
      </div>
    </div>
    <div v-else :id='`main-${mainId}`'>
      <nav class='nav nav-tabs justify-content-center' key='nav'>
        <li v-for='(item, index) in belongTosRef' :key='index'
          class='nav-item' role='presentation'>
          <button :class="[{ 'nav-link': true, 'active': index == 0 }]"
            data-bs-toggle='tab'
            :data-bs-target='`#${item.name}-tab`'
            type='button' role='tab'
            :aria-controls='`${item.name}-tab`'
            :aria-selected='index == 0'>{{ getModelName(item.name) }}</button>
        </li>
      </nav>
      <div class='tab-content mt-4' key='tabs'>
        <div v-for='(item, index) in belongTosRef' :key='index'
          class='tab-pane fade' :class='{ show: index == 0, active: index == 0 }'
          :id='`${item.name}-tab`' role='tabpanel' :aria-labelledby='`${item.name}-tab`'>
          <DisplayJson v-if='item.record' :record='item.record' :current-model='item.name' :show-modal='true' />
          <div v-else class='alert alert-info m-0' role='alert'>
            No record found
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'BelongToTab',
  };
</script>

<script setup>
  import { ref, inject, watch, onMounted, computed,
    onBeforeMount, nextTick, onBeforeUnmount } from 'vue';
	import axios from 'axios';
  import changeCase from 'change-case';
  import pluralize from 'pluralize';
	import {
    useAssociationStore,

    fetchBelongTos,
    setBelongTos,
    setLoadBelongTosError,
  } from '/src/stores/associationStore.mjs';

  import LoadingBelongTo from '/src/components/LoadingBelongTo.vue';
  import ErrorLoadRecords from '/src/components/ErrorLoadRecords.vue';
  import DisplayJson from '/src/components/DisplayJson.vue';

	const emitter = inject('emitter');
  const currentModel = ref(null);
  
  const props = defineProps({
    modelId: {
      type: [String, Number, null, undefined],
      required: true,
    },
    loadData: {
      type: Boolean,
    },
  });

  const {
    belongTos, loadingBelongTos, loadBelongTosError
  } = useAssociationStore();
  const belongTosRef = ref([]);
  const loadingBelongTosRef = ref(null);
  const loadBelongTosErrorRef = ref(null);
	const cancelToken = ref(null);
  const forceLoading = ref(true);
  const isFetching = ref(false);

  const mainId = computed(() => {
    return currentModel.value ? `${currentModel.value}-${props.modelId}-${Math.floor(Math.random() * 1000)}` : '';
  });

  const getModal = () => {
    const id = mainId.value;
    const el = document.querySelector(`#main-${id}`) || document.querySelector(`#nodata-${id}`);
    return el ? el.closest('.modal') : null;
  };

  watch(() => belongTos.value, (newVal) => {
    if (isFetching.value)
      belongTosRef.value = newVal;
  });

  watch(() => loadingBelongTos.value, (newVal) => {
    if (isFetching.value)
      loadingBelongTosRef.value = newVal;
  });

  watch(() => loadBelongTosError.value, (newVal) => {
    if (isFetching.value)
      loadBelongTosErrorRef.value = newVal;
  });

  const getModelName = (model) => {
    return changeCase.capitalCase(pluralize.singular(model));
  };

  const handleIdChange = () => {
		if (!currentModel.value) return;
		if (cancelToken.value)
			cancelToken.value.cancel('aborting previous request');

    forceLoading.value = false;
		cancelToken.value = axios.CancelToken.source();
    isFetching.value = true;

    fetchBelongTos('', currentModel.value, props.modelId, cancelToken.value.token).then(() => {
			cancelToken.value = null;
      setTimeout(() => {
        scrollToBottom();
      }, 500);
      isFetching.value = false;
		});
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const modal = getModal();
      if (modal) {
        modal.scroll({
          top: modal.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        window.scroll({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 20);
  }

  onMounted(() => {
		emitter.on('load-table', (model) => {
      currentModel.value = model;
		});

    emitter.on('show-modal', ({ record, model }) => {
      currentModel.value = model;
    });
  });

  onBeforeUnmount(() => {
    if (cancelToken.value)
      cancelToken.value.cancel('[BelongToTab] onBeforeUnmount aborting previous request');
  });

  watch(() => props.modelId, (newVal) => {
    belongTosRef.value = [];
    loadBelongTosErrorRef.value = null;
    loadingBelongTosRef.value = false;
  });

  watch(() => props.loadData, (newVal) => {
    if (newVal) {
      if (!belongTosRef.value || belongTosRef.value.length == 0) {
        handleIdChange();
        setTimeout(() => { scrollToBottom(); }, 650);
        return;
      }

      setTimeout(() => { scrollToBottom(); }, 10);
      return;
    }
    
    if (!belongTosRef.value || belongTosRef.value.length == 0)
      forceLoading.value = true;
  });
</script>
