<template>
  <div ref='detailRow'
    class='d-none container-fluid mt-4'>
    <h4>Detail</h4>
    <hr>
    <nav class='nav nav-tabs justify-content-center mt-4'>
      <li class='nav-item' role='presentation'>
        <button class='nav-link active' data-bs-toggle='tab'
          type='button' role='tab' aria-selected='true'
          :data-bs-target='`#${readableTabId}`'
          :aria-controls='readableTabId'>Human Readable</button>
      </li>
      <li class='nav-item' role='presentation'>
        <button class='nav-link' data-bs-toggle='tab'
          type='button' role='tab' aria-selected='false'
          :data-bs-target='`#${jsonTabId}`'
          :aria-controls='jsonTabId'>JSON</button>
      </li>
    </nav>
    <div class='tab-content bg-white rounded'>
      <div class='tab-pane fade show active p-4' role='tabpanel'
        :id='readableTabId' :aria-labelledby='readableTabId'>
        <DisplayJson :record='dataRecord' :current-model='currentModel' />
      </div>
      <div class='tab-pane fade p-4' role='tabpanel'
        :id='jsonTabId' :aria-labelledby='jsonTabId'>
        <pre ref='detailJson'></pre>
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
  import { ref, computed, watch, inject, onMounted, onBeforeUnmount } from 'vue';

  import ShowAssociations from '/src/components/ShowAssociations.vue';
  import DisplayJson from '/src/components/DisplayJson.vue';


  const props = defineProps({
    dataRecord: {
      type: Object,
    },
  });
  const detailJson = ref(null);
	const emitter = inject('emitter');
  const currentModel = ref(null);
  const detailRow = ref(null);
  const readableTabId = ref(null);
  const jsonTabId = ref(null);

  const dataRecordId = computed(() => {
    if (!props.dataRecord)
      return null;

    const field = Object.keys(props.dataRecord).find(key => key.toLowerCase().endsWith('_id'));
    if (!field)
      return null;
    return props.dataRecord[field];
  });


  onMounted(() => {
    readableTabId.value = 'readable-tab-' + (new Date()).getTime() + Math.floor(Math.random() * 1000);
    jsonTabId.value = 'json-tab-' + (new Date()).getTime() + Math.floor(Math.random() * 1000);

		emitter.on('load-table', (model) => {
			currentModel.value = model;
      detailRow.value.classList.add('d-none');
		});
  });

  watch(() => props.dataRecord, (newVal) => {
    if (newVal) {
      if (!detailJson.value)
        return;

      detailRow.value.classList.remove('d-none');

      detailJson.value.textContent = JSON.stringify(newVal, null, 2);
    }
  });

</script>
