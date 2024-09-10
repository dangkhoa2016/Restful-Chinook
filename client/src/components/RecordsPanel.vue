<template>

	<div v-if='currentModel'>
		<div v-if='loadingRecords' class='card text-center pt-4 top-30-percent'>
			<RecordLoader :message='currentModel' />
		</div>
		<div v-else-if='loadRecordsError'>
			<ErrorLoadRecords :message='loadRecordsError'
				:show-reload-button='true' @reload='handlePageChange' />
		</div>
		<div v-else ref='mainPanel'>
			<RecordsTable :records='records' table-class='rounded-table'
				@row-click='handleRowClick'>
				<template #default='{ data: { field, value, index } }'>
					<RenderColumn :currentModel='currentModel' :field='field' :value='value' :index='index' />
				</template>
			</RecordsTable>
			<Pagination v-if='totalItems' v-model='pageIndex'
				:total-items='totalItems'
				:items-per-page='itemsPerPage' />
		</div>
	</div>
	<div v-else class='card text-center pt-4 top-30-percent'>
		<h3 class='text-center'>Select a model to view records</h3>
		<img src='/src/assets/images/select-model.gif'
			width='100' class='mx-auto' />
	</div>

</template>

<script>
	export default {
		name: 'RecordsPanel',
	};
</script>

<script setup>
	import { ref, onMounted, onBeforeMount, inject, watch } from 'vue';
	import axios from 'axios';

	import { useTableStore, fetchRecords, setRecords, setLoadRecordsError } from '/src/stores/tableStore.mjs';

	import RecordLoader from '/src/components/RecordLoader.vue';
	import RecordsTable from '/src/components/RecordsTable.vue';
	import Pagination from '/src/components/Pagination.vue';
	import ErrorLoadRecords from '/src/components/ErrorLoadRecords.vue';
	import RenderColumn from '/src/components/RenderColumn.vue';


	const emits = defineEmits(['record-click']);
	const emitter = inject('emitter');
  // const authStore = inject('authStore');
  // const { useAuthStore, logout, } = authStore;
  // const { isAuthenticated, authInfo, isAdmin } = useAuthStore();

  const itemsPerPage = 10;
  const pageIndex = ref(1);
	const currentModel = ref(null);
  const { records, loadingRecords, totalItems = 0, /*totalPages = 0, */ loadRecordsError } = useTableStore();
	const cancelToken = ref(null);
	const mainPanel = ref(null);


  const handlePageChange = () => {
		if (!currentModel.value) return;
		if (cancelToken.value) {
			cancelToken.value.cancel('aborting previous request');
		}

		cancelToken.value = axios.CancelToken.source();

		const limit = itemsPerPage;
		const offset = (pageIndex.value - 1) * itemsPerPage;
    fetchRecords('', currentModel.value, limit, offset, cancelToken.value.token).then(() => {
			cancelToken.value = null;
		});
  };

  const scrollToTop = () => {
    if (!mainPanel.value) return;

    // window.scrollTo(0, mainPanel.value.offsetTop - 150);
    window.scrollTo(0, 0);
  };

	const hidePanel = () => {
		return new Promise((resolve) => {
			if (mainPanel.value) {
				mainPanel.value.classList.add('fade-out');
				setTimeout(() => {
					resolve();
				}, 300);
			} else {
				resolve();
			}
		});
	};

	const handleRowClick = ({ record, index }) => {
		emits('record-click', { record, index });
	};


  watch(pageIndex, () => {
		emitter.emit('model-page-change', pageIndex.value);
    scrollToTop();
    setTimeout(handlePageChange, 500);
  });

	watch(currentModel, () => {
		hidePanel().then(() => {
			if (pageIndex.value === 1) {
				scrollToTop();
				handlePageChange();
			} else {
				pageIndex.value = 1;
			}
		});
	});


  onBeforeMount(() => {
    setRecords([], 0);
    setLoadRecordsError(null);
  });

  onMounted(() => {
		emitter.on('load-table', (model) => {
			currentModel.value = model;
		});
  });
</script>
