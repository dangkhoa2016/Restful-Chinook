<template>
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

  <RecordDetail ref='detailTab' :data-record='currentRecord' />
  <ModalDetail />
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<script setup>
  import { ref } from 'vue';
  import ListOfModels from '/src/components/ListOfModels.vue';
  import RecordsPanel from '/src/components/RecordsPanel.vue';
  import RecordDetail from '/src/components/RecordDetail.vue';
  import ModalDetail from '/src/components/ModalDetail.vue';

  const currentRecord = ref(null);
  const detailTab = ref(null);

  const handleRecordClick = (detail) => {
    currentRecord.value = detail && detail.record;
    setTimeout(() => {
      window.scrollTo(0, detailTab.value.$el.offsetTop);
    }, 100);
  }
</script>
