<template>
  <div class='list-group' v-if='currentModel'>
    <template v-for='(value, key) in record' :key='key'>
      <a href='#' :class='fieldClass' @click.prevent>
        <span class='badge bg-primary rounded-pill'>{{ changeCase.capitalCase(key) }}</span>
        {{ renderValue(currentModel, key, value) }}
      </a>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'DisplayJson',
  };
</script>

<script setup>
  import changeCase from 'change-case';
	import { renderValue } from '/client/src/libs/tableHelpers.mjs';

  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    currentModel: {
      type: String,
      required: false,
    },
  });
  const fieldClass = 'list-group-item-action list-group-item d-flex justify-content-between align-items-center';

</script>
