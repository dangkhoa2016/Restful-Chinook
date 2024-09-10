<template>
  <transition name='just-fade' mode='out-in'>
    <LoadingBelongTo v-if='loadingHasManyTargets || !modelId' />
    <div v-else-if='loadHasManyTargetsError'>
      <ErrorLoadRecords :message='loadHasManyTargetsError'
        :show-reload-button='true' @reload='handleIdChange' />
    </div>
    <div v-else-if='!targetTotalItems'>
      <div class='alert alert-info m-0' role='alert'>
        No records found
      </div>
    </div>
    <div v-else :id='uniqueId'>
      <RecordsTable :data='hasManyTargetRecords'>
				<template #default='{ data: { key, value, index } }'>
					{{ renderValue(target, key, value, index) }}
				</template>
			</RecordsTable>
			<Pagination v-if='targetTotalItems' v-model='pageIndex'
				:total-items='targetTotalItems'
				:items-per-page='itemsPerPage' />
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'AssociationModelTable',
  };
</script>

<script setup>
  import { ref, inject, watch, computed, onMounted, onBeforeUnmount } from 'vue';
  import axios from 'axios';
  import changeCase from 'change-case';
  import pluralize from 'pluralize';
  import { renderValue } from '/client/src/libs/tableHelpers.mjs';
  import {
    useAssociationStore,

    fetchHasManyTargets,
    setHasManyTargetRecords,
    setLoadHasManyTargetsError,
  } from '/client/src/stores/associationStore.mjs';

  import LoadingBelongTo from '/client/src/components/LoadingBelongTo.vue';
  import ErrorLoadRecords from '/client/src/components/ErrorLoadRecords.vue';
  import RecordsTable from '/client/src/components/RecordsTable.vue';
  import Pagination from '/client/src/components/Pagination.vue';

  const props = defineProps({
    modelId: {
      type: Number,
      required: true,
    },
    target: {
      type: String,
      required: false,
    },
    loadOnMount: {
      type: Boolean,
      required: false,
      default: false,
    },
    currentModel: {
      type: String,
    },
  });
  const itemsPerPage = 10;
  const pageIndex = ref(1);
  const {
    hasManyTargetRecords, loadingHasManyTargets,
    targetTotalItems = 0, loadHasManyTargetsError
  } = useAssociationStore();
  const cancelToken = ref(null);

  const uniqueId = computed(() => {
    return `${props.currentModel}-${props.target}-${props.modelId}`;
  });

  const handleIdChange = () => {
    if (!props.currentModel) return;
    if (cancelToken.value) {
      cancelToken.value.cancel('aborting previous request');
    }

    cancelToken.value = axios.CancelToken.source();

    const limit = itemsPerPage;
		const offset = (pageIndex.value - 1) * itemsPerPage;
    fetchHasManyTargets({
      target: props.target,
      limit, offset,
      model: props.currentModel,
      id: props.modelId,
      page: pageIndex.value,
      abortToken: cancelToken.value.token,
    }).then(() => {
      cancelToken.value = null;
      if (props.loadOnMount)
        setTimeout(() => { scrollToTop(-70); }, 600);
    });
  };

  const scrollToTop = (position) => {
    const el = document.getElementById(uniqueId.value);
    if (!el) return;

    window.scrollTo(0, el.offsetTop + position);
  };


  const scrollToBottom = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  watch(pageIndex, handleIdChange);

  watch(() => props.loadOnMount, (newVal) => {
    if (newVal) {
      if (!hasManyTargetRecords || !hasManyTargetRecords.value || !hasManyTargetRecords.value.length) {
        setTimeout(() => { scrollToBottom(); }, 700);
        handleIdChange();
      } else 
        setTimeout(() => { scrollToTop(-70); }, 200);
    }
  });

  onMounted(() => {
    setHasManyTargetRecords(null, 0);
    setLoadHasManyTargetsError(null);

    if (props.loadOnMount) {
      setTimeout(() => { scrollToBottom(); }, 700);
      handleIdChange();
    }
  });

  onBeforeUnmount(() => {
    if (cancelToken.value) {
      cancelToken.value.cancel('onBeforeUnmount aborting previous request');
    }
    setHasManyTargetRecords(null, 0);
    setLoadHasManyTargetsError(null);
  });
</script>
