<template>
  <div class='list-group' v-if='currentModel'>
    <template v-for='(value, field) in record' :key='field'>
      <a href='#' :class='fieldClass(field)' @click.prevent='() => handleClick(field)'>
        <span class='badge bg-primary rounded-pill'>{{ changeCase.capitalCase(field) }}</span>
        <RenderColumn :currentModel='currentModel' :field='field' :value='value' />
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
  import pluralize from 'pluralize';
	import RenderColumn from '/src/components/RenderColumn.vue';

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

  const fieldClass = (key) => {
    const arr = ['list-group-item-action list-group-item d-flex justify-content-between align-items-center'];
    if (isMainModelField(key))
      arr.push('list-group-item-primary');
    else
      arr.push('pe-none');
    return arr;
  }

  const emitter = inject('emitter');

  const isMainModelField = (key) => {
    if (!props.showModal || !props.currentModel || !key)
      return false;

    const single_name = pluralize.singular(props.currentModel);
    return key.indexOf(`${single_name}`) !== -1 && key.indexOf(`_id`) !== -1;
  };

  const handleClick = (key) => {
    if (!isMainModelField(key))
      return;

    emitter.emit('show-modal', { model: props.currentModel, record: props.record });
  };
</script>
