<template>
  <transition name='just-fade' mode='out-in'>
    <LoadingBelongTo v-if='showLoading' />
    <div v-else-if='loadHasManysError'>
      <ErrorLoadRecords :message='loadHasManysError'
        :show-reload-button='true' @reload='handleIdChange' />
    </div>
    <div v-else-if='!hasManys || hasManys.length == 0'>
      <div class='alert alert-info m-0' role='alert'>
        No associations found
      </div>
    </div>
    <div v-else>
      <nav class='nav nav-tabs justify-content-center' key='nav'>
        <li v-for='(item, index) in hasManys' :key='index'
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
        <div v-for='(item, index) in hasManys' :key='index'
          class='tab-pane fade' :class='{ show: index == 0, active: index == 0 }'
          :id='`${item.name}-tab`' role='tabpanel' :aria-labelledby='`${item.name}-tab`'>
          <AssociationModelTable :model-id='modelId'
            :current-model='currentModel'
            :load-on-mount='index === 0 && loadData' :target='item.name' />
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
  } from '/client/src/stores/associationStore.mjs';

  import LoadingBelongTo from '/client/src/components/LoadingBelongTo.vue';
  import ErrorLoadRecords from '/client/src/components/ErrorLoadRecords.vue';
  import AssociationModelTable from '/client/src/components/AssociationModelTable.vue';


	const emitter = inject('emitter');
  const currentModel = ref(null);
  const modelIdChanged = ref(false);
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
    hasManys,
    loadingHasManys,
    loadHasManysError,
  } = useAssociationStore();
	const cancelToken = ref(null);

  const showLoading = computed(() => {
    return loadingHasManys.value || modelIdChanged.value;
  });

  const getModelName = (model) => {
    return changeCase.capitalCase(pluralize.singular(model));
  };

  const handleIdChange = () => {
		if (!currentModel.value) return;
		if (cancelToken.value) {
			cancelToken.value.cancel('[HasManyTab] aborting previous request');
		}

		cancelToken.value = axios.CancelToken.source();

    modelIdChanged.value = false;

    fetchHasManys('', currentModel.value, props.modelId, cancelToken.value.token).then(() => {
			cancelToken.value = null;
		});
  };

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  onBeforeUnmount(() => {
    if (cancelToken.value) {
      cancelToken.value.cancel('[HasManyTab] onBeforeUnmount aborting previous request');
    }
  });

  onMounted(() => {
		emitter.on('load-table', (model) => {
      currentModel.value = model;
		});
  });

  watch(() => loadHasManysError, (newVal) => {
    console.log('loadHasManysError', newVal);
  });

  watch(() => props.modelId, (newVal) => {
    modelIdChanged.value = true;
    setHasManys(null);
    setLoadHasManysError(null);
  });

  watch(() => props.loadData, (newVal) => {
    if (newVal) {
      if (!hasManys.value || hasManys.value.length == 0)
        handleIdChange();
      else
        setTimeout(() => { scrollToBottom(); }, 10);
    }
  });
</script>
