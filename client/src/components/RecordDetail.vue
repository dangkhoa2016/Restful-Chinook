<template>
  <div ref='detailRow'
    class='d-none container-fluid mt-4'>
    <h4>Detail</h4>
    <hr>
    <nav class='nav nav-tabs justify-content-center mt-4'>
      <li class='nav-item' role='presentation'>
        <button class='nav-link active' id='readable' data-bs-toggle='tab'
          data-bs-target='#readable-tab' type='button' role='tab'
          aria-controls='readable-tab' aria-selected='true'>Human Readable</button>
      </li>
      <li class='nav-item' role='presentation'>
        <button class='nav-link' id='json' data-bs-toggle='tab'
          data-bs-target='#json-tab' type='button' role='tab'
          aria-controls='json-tab' aria-selected='false'>JSON</button>
      </li>
    </nav>
    <div class='tab-content bg-white rounded' ref='detailTab'>
      <div class='tab-pane fade show active p-4' id='readable-tab' role='tabpanel' aria-labelledby='readable-tab'>
        <DisplayJson :record='dataRecord' :current-model='currentModel' />
      </div>
      <div class='tab-pane fade p-4' id='json-tab' role='tabpanel' aria-labelledby='json-tab'>
        <pre></pre>
      </div>
    </div>

    <ShowAssociations :model-id='dataRecordId' />
  </div>
</template>

<script>
  export default {
    name: 'RecordDetail',
  };
</script>

<script setup>
  import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue';

  import ShowAssociations from '/client/src/components/ShowAssociations.vue';
  import DisplayJson from '/client/src/components/DisplayJson.vue';


  const detail = ref(null);
	const emitter = inject('emitter');
  const dataRecord = ref({});
  const currentModel = ref(null);
  const detailRow = ref(null);
  const detailTab = ref(null);

  const dataRecordId = computed(() => {
    if (!dataRecord.value)
      return null;

    const field = Object.keys(dataRecord.value).find(key => key.toLowerCase().endsWith('_id'));
    if (!field)
      return null;
    return dataRecord.value[field];
  });


  onMounted(() => {
    detail.value = document.querySelector('#json-tab pre');

    emitter.on('record-click', (eventData) => {
      if (!detail.value)
        return;

      detailRow.value.classList.remove('d-none');

      setTimeout(() => {
        window.scrollTo(0, detailTab.value.offsetTop);
      }, 100);

      dataRecord.value = eventData.record || {};
      detail.value.textContent = JSON.stringify(dataRecord.value, null, 2);
    });

		emitter.on('load-table', (model) => {
			currentModel.value = model;
      dataRecord.value = {};
      detailRow.value.classList.add('d-none');
		});
  });

  onBeforeUnmount(() => {
    detail.value = null;
  });

</script>
