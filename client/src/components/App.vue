<template>

  <div class='app'>
    <div class="container-fluid mt-4">
      <h1 class="text-center mb-4">Resful Chinook</h1>

      <div class="row">
        <div class="col-md-4">
          <ListOfModels />
        </div>
        <div class="col-md-8 mt-4 mt-sm-0">
          <RecordsPanel @record-click='handleRecordClick' />
        </div>
      </div>
    </div>

    <div ref='detailEl' class='d-none container-fluid mt-4'>
      <h4>Detail</h4>
      <hr>
      <RecordDetail :data-record='currentRecord' />
    </div>

    <ModalDetail />
  </div>

</template>

<script>
  export default {
    name: 'App',
  }
</script>

<script setup>
  import { ref, inject, onMounted } from 'vue';

  import ListOfModels from '/src/components/ListOfModels.vue';
  import RecordsPanel from '/src/components/RecordsPanel.vue';
  import RecordDetail from '/src/components/RecordDetail.vue';
  import ModalDetail from '/src/components/ModalDetail.vue';


	const emitter = inject('emitter');
  const currentRecord = ref(null);
  const detailEl = ref(null);


  const handleRecordClick = (detail) => {
    currentRecord.value = detail?.record;
    detailEl.value.classList.remove('d-none');

    setTimeout(() => {
      window.scrollTo(0, detailEl.value.offsetTop);
    }, 100);
  };


  onMounted(() => {
    emitter.on('load-table', () => {
      currentRecord.value = null;
      detailEl.value.classList.add('d-none');
		});
  });
</script>
