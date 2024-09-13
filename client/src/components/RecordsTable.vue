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
        <tr v-else-if='data.length === 0'>
          <td>
            <ErrorLoadRecords message='No records found!' />
          </td>
        </tr>
        <template v-else v-for='(record, index) in data' :key='index'>
          <tr class='cursor-pointer' :class='{"table-warning": index == activeIndex }'
            @click.prevent='handleRowClick(record, index)'>
            <td v-for='(value, key) in record' :key='key' :data-original-value='value'>
              <slot name='default' :data='{ value, key, index }'>
                {{ value }}
              </slot>
            </td>
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
  import { ref, defineProps, computed } from 'vue';
  import changeCase from 'change-case';
  import RecordLoader from '/src/components/RecordLoader.vue';
  import ErrorLoadRecords from '/src/components/ErrorLoadRecords.vue';

  const props = defineProps({
    data: {
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
      type: String
    }
  });

  const emits = defineEmits(['row-click']);
  const activeIndex = ref(null);

  const tableHeaders = computed(() => {
    let headers = [];
    if (props.headers && props.headers.length > 0)
      headers = props.headers;
    else if (props.data && props.data.length > 0)
      headers = Object.keys(props.data[0]);

    return headers.map((header) => {
      return {
        key: header,
        title: changeCase.capitalCase(header),
      }
    });
  });

  const handleRowClick = (record, index) => {
    activeIndex.value = index;
    emits('row-click', { record, index });
  };
</script>
