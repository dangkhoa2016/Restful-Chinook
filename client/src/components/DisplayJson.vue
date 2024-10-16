<template>

  <div class='list-group'>
    <a v-for='(value, field) in record' :key='field' href='#'
      :class='fieldClass(field)' @click.prevent='() => handleClick(field)'>
      <span class='badge bg-primary rounded-pill'>{{ changeCase.capitalCase(field) }}</span>
      <div class='d-flex flex-column align-items-end'>
        <RenderColumn :currentModel='currentModel' :field='field' :value='value' />
      </div>
    </a>
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
      default: null,
      type: Object,
    },
    currentModel: {
      default: '',
      type: String,
      required: false,
    },
    showModal: {
      type: Boolean,
      required: false,
    },
  });

  const emitter = inject('emitter');


  const isMainModelField = (key) => {
    if (!props.showModal || !props.currentModel || !key)
      return false;

    const single_name = pluralize.singular(props.currentModel);
    return key.indexOf(single_name) !== -1 && key.indexOf('_id') !== -1;
  };

  const fieldClass = (key) => {
    const arr = ['list-group-item-action list-group-item d-flex justify-content-between align-items-center'];
    if (isMainModelField(key))
      arr.push('list-group-item-primary');
    // else
    //   arr.push('pe-none');
    return arr;
  };

  const handleClick = (key) => {
    if (!isMainModelField(key))
      return;

    emitter.emit('show-modal', { model: props.currentModel, record: props.record });
  };
</script>
