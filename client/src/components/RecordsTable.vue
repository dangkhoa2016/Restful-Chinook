<template>

  <div class='table-responsive'>
    <table :class='tableClass' class='table table-bordered mb-0 table-striped bsb-table-xl text-nowrap align-middle'>
      <thead>
        <tr>
          <th v-for='header in tableHeaders' :key='header.key'
            :data-key='header.key'>
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if='loadingRecords' class='text-center'>
          <td>
            <RecordLoader />
          </td>
        </tr>
        <tr v-else-if='records.length === 0'>
          <td>
            <ErrorLoadRecords message='No records found!' />
          </td>
        </tr>
        <template v-else>
          <tr v-for='(record, rowIndex) in records'
            :key='rowIndex'
            :class="{ 'table-warning': rowActive(rowIndex), 'cursor-pointer': true }"
            @click='handleRowClick(rowIndex)'
          >
            <RecordRow :record='record' :index='rowIndex'>
              <template #default='slotData'>
                <slot name='default' v-bind='slotData'></slot>
              </template>
            </RecordRow>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

</template>

<script>
  export default {
    name: 'RecordsTable',
  };
</script>

<script setup>
  import { ref, computed } from 'vue';
  import changeCase from 'change-case';

  import RecordLoader from '/src/components/RecordLoader.vue';
  import ErrorLoadRecords from '/src/components/ErrorLoadRecords.vue';
  import RecordRow from '/src/components/RecordRow.vue';

  
  const props = defineProps({
    records: {
      type: Array,
      required: true,
    },
    loadingRecords: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: [],
    },
    tableClass: {
      default: '',
      type: String
    }
  });

  const currentActiveRowIndex = ref(null);

  const emits = defineEmits(['row-click']);


  const tableHeaders = computed(() => {
    let headers = [];
    if (props.headers && props.headers.length > 0)
      headers = props.headers;
    else if (props.records && props.records.length > 0)
      headers = Object.keys(props.records[0]);

    return headers.map((header) => {
      return {
        key: header,
        title: changeCase.capitalCase(header),
      }
    });
  });


  const rowActive = (rowIndex) => rowIndex === currentActiveRowIndex.value;

  const handleRowClick = (index) => {
    const record = props.records[index];
    currentActiveRowIndex.value = index;
    emits('row-click', { record, index });
  };
</script>
