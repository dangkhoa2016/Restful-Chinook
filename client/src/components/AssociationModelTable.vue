<template>

  <transition name='just-fade' mode='out-in'>
    <LoadingBelongTo v-if='(loadData && loadingRecords) || modelIdChanged' />
    <div v-else-if='loadData && loadError'>
      <ErrorLoadRecords :message='loadError'
        :show-reload-button='true' @reload='handleIdChange' />
    </div>
    <div v-else-if='loadData && !totalRecords'>
      <div class='alert alert-info m-0' role='alert'>
        No records found
      </div>
    </div>
    <div v-else-if='loadData' :id='uniqueId'>
      <RecordsTable :records='tableData'>
				<template #default='{ data: { field, value, index } }'>
					<RenderColumn :currentModel='target' :field='field' :value='value' :index='index' />
				</template>
			</RecordsTable>
			<Pagination v-if='totalRecords' v-model='pageIndex'
				:total-items='totalRecords'
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
  import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
  import axios from 'axios';  

  import {
    useAssociationStore,
    fetchHasManyTargets,
    // setHasManyTargetRecords,
    // setLoadHasManyTargetsError,
  } from '/src/stores/associationStore.mjs';

  import LoadingBelongTo from '/src/components/LoadingBelongTo.vue';
  import ErrorLoadRecords from '/src/components/ErrorLoadRecords.vue';
  import RecordsTable from '/src/components/RecordsTable.vue';
  import Pagination from '/src/components/Pagination.vue';
	import RenderColumn from '/src/components/RenderColumn.vue';


  const props = defineProps({
    modelId: {
      type: [String, Number, null],
      required: true,
    },
    target: {
      type: String,
      required: false,
      default: '',
    },
    currentModel: {
      default: '',
      type: String,
    },
    loadData: {
      type: Boolean,
    },
  });

  const itemsPerPage = 10;
  const pageIndex = ref(1);
  const {
    hasManyTargetRecords, loadingHasManyTargets,
    targetTotalItems = 0, loadHasManyTargetsError
  } = useAssociationStore();

  const cancelToken = ref(null);
  const modelIdChanged = ref(true);
  const tableData = ref([]);
  const totalRecords = ref(0);
  const loadError = ref(null);
  const loadingRecords = ref(false);

  const uniqueId = computed(() => {
    return `${props.currentModel}-${props.target}-${props.modelId}`;
  });

  /*
  const isInsideModal = computed(() => {
    const el = document.getElementById(uniqueId.value);
    return el ? !!el.closest('.modal') : false;
  });
  */


  const scrollToTop = (position) => {
    const el = document.getElementById(uniqueId.value);
    if (!el) return;

    const modal = el.closest('.modal');
    if (modal) {
      modal.scroll({
        top: el.offsetTop + position,
        behavior: 'smooth'
      });
    } else
      window.scrollTo(0, el.offsetTop + position);
  };

  const scrollToBottom = () => {
    /*
    if (isInsideModal.value)
      return;

    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
    */
  };

  const handleIdChange = () => {
    if (!props.currentModel) return;
    if (cancelToken.value) {
      cancelToken.value.cancel('aborting previous request');
    }

    cancelToken.value = axios.CancelToken.source();
    modelIdChanged.value = false;

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
      if (props.loadData)
        setTimeout(() => { scrollToTop(-70); }, 600);
    });
  };


  watch(pageIndex, handleIdChange);

  watch(() => hasManyTargetRecords.value, (newVal) => {
    if (props.loadData)
      tableData.value = newVal ? [...newVal] : [];
  });

  watch(() => targetTotalItems.value, (newVal) => {
    if (props.loadData)
      totalRecords.value = newVal;
  });

  watch(() => loadHasManyTargetsError.value, (newVal) => {
    if (props.loadData)
      loadError.value = newVal;
  });

  watch(() => loadingHasManyTargets.value, (newVal) => {
    if (props.loadData)
      loadingRecords.value = newVal;
  });

  watch(() => props.loadData, (newVal) => {
    if (newVal) {
      if (!tableData.value || !tableData.value.length) {
        setTimeout(() => { scrollToBottom(); }, 700);
        handleIdChange();
        return;
      }

      setTimeout(() => { scrollToTop(-70); }, 200);
    }
    
    if (cancelToken.value)
      cancelToken.value.cancel('[AssociationModelTable] onBeforeUnmount aborting previous request');
  });

  watch(() => props.modelId, () => {
    tableData.value = []
    loadError.value = null;
    modelIdChanged.value = true;
    pageIndex.value = 1;
  });


  onMounted(() => {
    if (props.loadData) {
      setTimeout(() => { scrollToBottom(); }, 700);
      handleIdChange();
    }
  });

  onBeforeUnmount(() => {
    if (cancelToken.value)
      cancelToken.value.cancel('[AssociationModelTable] onBeforeUnmount aborting previous request');
  });
</script>
