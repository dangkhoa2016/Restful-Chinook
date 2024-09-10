<template>

  <div class='record-detail'>
    <nav ref='detailNav' class='nav nav-tabs justify-content-center mt-4'>
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
  import { ref, computed, watch, inject, onMounted } from 'vue';

  import ShowAssociations from '/src/components/ShowAssociations.vue';
  import DisplayJson from '/src/components/DisplayJson.vue';


  const props = defineProps({
    dataRecord: {
      default: null,
      type: Object,
    },
  });

  const detailJson = ref(null);
	const emitter = inject('emitter');
  const currentModel = ref(null);
  const detailNav = ref(null);
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


  watch(() => props.dataRecord, (newVal) => {
    if (newVal) {
      if (!detailJson.value)
        return;

      detailJson.value.textContent = JSON.stringify(newVal, null, 2);
    }
  });


  onMounted(() => {
    readableTabId.value = `readable-tab-${(new Date()).getTime() + Math.floor(Math.random() * 1000)}`;
    jsonTabId.value = `json-tab-${(new Date()).getTime() + Math.floor(Math.random() * 1000)}`;

		emitter.on('load-table', (model) => {
			currentModel.value = model;
		});

    emitter.on('show-modal', ({ model }) => {
      const modal = detailNav.value.closest('.modal');
      if (modal)
        currentModel.value = model;
    });
  });
</script>
