<template>
  <transition name='just-fade' mode='out-in'>
    <LoadingBelongTo v-if='loadingBelongTos' />
    <div v-else-if='loadBelongTosError'>
      <ErrorLoadRecords :message='loadBelongTosError'
        :show-reload-button='true' @reload='handleIdChange' />
    </div>
    <div v-else-if='!belongTos || belongTos.length == 0'>
      <div class='alert alert-info m-0' role='alert'>
        No associations found
      </div>
    </div>
    <div v-else>
      <nav class='nav nav-tabs justify-content-center' key='nav'>
        <li v-for='(item, index) in belongTos' :key='index'
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
        <div v-for='(item, index) in belongTos' :key='index'
          class='tab-pane fade' :class='{ show: index == 0, active: index == 0 }'
          :id='`${item.name}-tab`' role='tabpanel' :aria-labelledby='`${item.name}-tab`'>
          <DisplayJson v-if='item.record' :record='item.record' :current-model='item.name' />
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
  import { ref, inject, watch, onMounted, onBeforeMount, nextTick, onBeforeUnmount } from 'vue';
	import axios from 'axios';
  import changeCase from 'change-case';
  import pluralize from 'pluralize';
	import {
    useAssociationStore,

    fetchBelongTos,
    setBelongTos,
    setLoadBelongTosError,
  } from '/client/src/stores/associationStore.mjs';

  import LoadingBelongTo from '/client/src/components/LoadingBelongTo.vue';
  import ErrorLoadRecords from '/client/src/components/ErrorLoadRecords.vue';
  import DisplayJson from '/client/src/components/DisplayJson.vue';


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
	const cancelToken = ref(null);

  const getModelName = (model) => {
    return changeCase.capitalCase(pluralize.singular(model));
  };

  const handleIdChange = () => {
		if (!currentModel.value) return;
		if (cancelToken.value) {
			cancelToken.value.cancel('aborting previous request');
		}

		cancelToken.value = axios.CancelToken.source();

    fetchBelongTos('', currentModel.value, props.modelId, cancelToken.value.token).then(() => {
			cancelToken.value = null;
      setTimeout(() => { scrollToBottom(); }, 500);
		});
  };

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  onMounted(() => {
		emitter.on('load-table', (model) => {
      currentModel.value = model;
		});
  });

  onBeforeUnmount(() => {
    if (cancelToken.value) {
      cancelToken.value.cancel('[BelongToTab] onBeforeUnmount aborting previous request');
    }
  });

  watch(() => loadBelongTosError, (newVal) => {
    console.log('loadBelongTosError', newVal);
  });

  watch(() => props.modelId, (newVal) => {
    setBelongTos(null);
    setLoadBelongTosError(null);
  });

  watch(() => props.loadData, (newVal) => {
    if (newVal) {
      if (!belongTos.value || belongTos.value.length == 0) {
        handleIdChange();
        setTimeout(() => { scrollToBottom(); }, 650);
      }
      else
        setTimeout(() => { scrollToBottom(); }, 10);
    }
  });
</script>
