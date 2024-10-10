<template>
  <transition name='just-fade' mode='out-in'>
    <LoadingBelongTo v-if='loadingHasManysRef || firstLoad' />
    <div v-else-if='loadHasManysErrorRef'>
      <ErrorLoadRecords :message='loadHasManysErrorRef'
        :show-reload-button='true' @reload='handleIdChange' />
    </div>
    <div v-else-if='!hasManysRef || hasManysRef.length == 0'>
      <div class='alert alert-info m-0' role='alert'>
        No associations found
      </div>
    </div>
    <div v-else ref='mainEl'>
      <nav class='nav nav-tabs justify-content-center' ref='hasManyNav'>
        <li v-for='(item, index) in hasManysRef' :key='index'
          class='nav-item' role='presentation'>
          <button :class="[{ 'nav-link': true, 'active': index == 0 }]"
            data-bs-toggle='tab'
            :data-bs-target='`#${mainId}-${item.name}-tab`'
            type='button' role='tab'
            :aria-controls='`${mainId}-${item.name}-tab`'
            :aria-selected='index == 0'>{{ getModelName(item.name) }}</button>
        </li>
      </nav>
      <div class='tab-content mt-4'>
        <div v-for='(item, index) in hasManysRef' :key='index'
          class='tab-pane fade' :class='{ show: index == 0, active: index == 0 }'
          :id='`${mainId}-${item.name}-tab`' role='tabpanel'
          :aria-labelledby='`${mainId}-${item.name}-tab`'>
          <AssociationModelTable :model-id='modelId'
            :current-model='currentModel'
            :load-data='loadIndex === index && loadData' :target='item.name' />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'HasManyTab',
  };
</script>

<script setup>
  import { ref, inject, watch, computed, onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
	import axios from 'axios';
  import changeCase from 'change-case';
  import pluralize from 'pluralize';
	import {
    useAssociationStore,

    fetchHasManys,
    setHasManys,
    setLoadHasManysError,
  } from '/src/stores/associationStore.mjs';

  import LoadingBelongTo from '/src/components/LoadingBelongTo.vue';
  import ErrorLoadRecords from '/src/components/ErrorLoadRecords.vue';
  import AssociationModelTable from '/src/components/AssociationModelTable.vue';


	const emitter = inject('emitter');
  const currentModel = ref(null);
  const firstLoad = ref(true);
  const hasManyNav = ref(null);
  const mainEl = ref(null);
  const loadIndex = ref(0);
  const props = defineProps({
    modelId: {
      required: true,
    },
    loadData: {
      type: Boolean,
    },
  });

  const {
    hasManys,
    loadingHasManys,
    loadHasManysError,
  } = useAssociationStore();
  const hasManysRef = ref(null);
  const loadingHasManysRef = ref(null);
  const loadHasManysErrorRef = ref(null);
	const cancelToken = ref(null);
  const isFetching = ref(false);
  const isInsideModal = ref(false);

  const getModelName = (model) => {
    return changeCase.capitalCase(pluralize.singular(model));
  };

  const mainId = computed(() => {
    return currentModel.value ? `${currentModel.value}-${props.modelId}-${Math.floor(Math.random() * 1000)}` : '';
  });

  const handleIdChange = () => {
		if (!currentModel.value) return;
		if (cancelToken.value)
			cancelToken.value.cancel('[HasManyTab] aborting previous request');

    firstLoad.value = false;
    isFetching.value = true;
		cancelToken.value = axios.CancelToken.source();
    fetchHasManys('', currentModel.value, props.modelId, cancelToken.value.token).then(() => {
			cancelToken.value = null;
      isFetching.value = false;
		});
  };

  const scrollToBottom = () => {
    if (isInsideModal.value)
      return;

    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  onBeforeUnmount(() => {
    if (cancelToken.value)
      cancelToken.value.cancel('[HasManyTab] onBeforeUnmount aborting previous request');

    if (hasManyNav.value) {
      hasManyNav.value.querySelectorAll('.nav-item').forEach((el) => {
        el.removeEventListener('shown.bs.tab', handleTabChange);
      });
    }
  });

  onMounted(() => {
		emitter.on('load-table', (model) => {
      currentModel.value = model;

      setHasManys(null);
      setLoadHasManysError(null);
      loadIndex.value = 0;
		});

    emitter.on('show-modal', ({ record, model }) => {
      currentModel.value = model;
    });
  });

  const handleTabChange = (event) => {
    const tab = event.target.getAttribute('aria-controls');
    let index = 0;
    hasManysRef.value.forEach((item, i) => {
      if (`${mainId.value}-${item.name}-tab` === tab)
        index = i;
    });

    loadIndex.value = index;
  };

  watch(() => hasManys.value, (newVal) => {
    if (isFetching.value)
      hasManysRef.value = newVal;
  });

  watch(() => loadingHasManys.value, (newVal) => {
    if (isFetching.value)
      loadingHasManysRef.value = newVal;
  });

  watch(() => loadHasManysError.value, (newVal) => {
    if (isFetching.value)
      loadHasManysErrorRef.value = newVal;
  });

  watch(() => hasManyNav.value, (newVal, oldVal) => {
    if (!newVal) {
      if (oldVal) {
        oldVal.querySelectorAll('.nav-item').forEach((el) => {
          el.removeEventListener('shown.bs.tab', handleTabChange);
        });
      }
    };

    newVal.querySelectorAll('.nav-item').forEach((el) => {
      el.addEventListener('shown.bs.tab', handleTabChange);
    });
  });

  watch(() => mainEl.value, (newVal) => {
    if (newVal)
      isInsideModal.value = !!newVal.closest('.modal');
    else
      isInsideModal.value = false;
  });

  watch(() => props.loadData, (newVal) => {
    if (!newVal)
      return;

    if (!hasManysRef.value || hasManysRef.value.length == 0)
      handleIdChange();
    else
      setTimeout(() => { scrollToBottom(); }, 10);
  });
</script>
