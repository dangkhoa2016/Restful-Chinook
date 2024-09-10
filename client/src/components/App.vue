<template>
  <div class="container-fluid mt-4">
    <h1 class="text-center mb-4">Resful Chinook</h1>

    <div class="row">
      <!-- two columns 4/8 -->
      <div class="col-md-4">
        <ListOfModels />
      </div>
      <div class="col-md-8 mt-4 mt-sm-0">
        <RecordsPanel />
      </div>
    </div>
  </div>

  <RecordDetail />
</template>

<script>

  import ListOfModels from '/client/src/components/ListOfModels.vue';
  import RecordsPanel from '/client/src/components/RecordsPanel.vue';
  import RecordDetail from '/client/src/components/RecordDetail.vue';

  export default {
    name: 'App',
    components: {
      ListOfModels,
      RecordsPanel,
      RecordDetail,
    },
  };

</script>
