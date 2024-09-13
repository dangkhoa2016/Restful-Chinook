<template>
  <div class='list-group' v-if='currentModel'>
    <template v-for='(value, key) in record' :key='key'>
      <a href='#' :class='fieldClass' @click.prevent='() => handleClick(key)'>
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
  import { inject } from 'vue';
  import changeCase from 'change-case';
	import { renderValue } from '/src/libs/tableHelpers.mjs';

  const props = defineProps({
    record: {
      type: Object,
    },
    currentModel: {
      type: String,
      required: false,
    },
    showModal: {
      type: Boolean,
      required: false,
    },
  });
  const fieldClass = 'list-group-item-action list-group-item d-flex justify-content-between align-items-center';

  const emitter = inject('emitter');

  const handleClick = (key) => {
    if (!props.showModal || !key || key.indexOf('_id') === -1)
      return;

    emitter.emit('show-modal', { model: props.currentModel, record: props.record });
  };
</script>
