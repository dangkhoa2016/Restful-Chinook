<template>

  <div class='modal fade' ref='modalEl' tabindex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
    <div class='modal-dialog modal-dialog-centered modal-lg'>
      <div class='modal-content'>
        <div class='modal-header'>
          <h5 class='modal-title'>View detail model: {{ currentModel }}</h5>
          <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
        </div>
        <div class='modal-body p-0'>
          <RecordDetail :data-record='currentRecord' />
        </div>
        <div class='modal-footer'>
          <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
  import { ref, onMounted, inject } from 'vue';
  // skipcq: JS-C1003
  import * as bootstrap from 'bootstrap';

  import RecordDetail from '/src/components/RecordDetail.vue';


  const modalEl = ref(null);
  const modal = ref(null);
  const emitter = inject('emitter');
  const currentRecord = ref(null);
  const currentModel = ref(null);


  onMounted(() => {
    modal.value = new bootstrap.Modal(modalEl.value);

    emitter.on('show-modal', ({ record, model }) => {
      currentRecord.value = record;
      currentModel.value = model;
      modal.value.show();
    });

    modalEl.value.addEventListener('hidden.bs.modal', () => {
      emitter.emit('modal-hidden');
    });
  });
</script>
