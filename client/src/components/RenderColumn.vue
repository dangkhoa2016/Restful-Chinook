<template>

  <div>
    <span v-if='value' class='d-block' :class='fieldColor'>
      {{ renderValue(currentModel, field, value, index) }}
    </span>
    <div v-if='forHumanreadable' class='text-secondary'>
      <span class='d-block mt-2'>{{ renderHumanreadable }}</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'RenderColumn',
  };
</script>

<script setup>
  import { computed } from 'vue';

  import { renderValue, getBootstrapTextColor,
    renderMilliseconds, renderBytes, } from '/src/libs/tableHelpers.mjs';


  const props = defineProps({
    currentModel: {
      default: '',
      type: String,
    },
    field: {
      default: '',
      type: String,
    },
    value: {
      type: null,
      default: null,
    },
    index: {
      default: 0,
      type: Number,
    },
  });


  const fieldColor = computed(() => {
    return getBootstrapTextColor(props.field, props.value);
  });

  const forHumanreadable = computed(() => {
    return props.field === 'milliseconds' || props.field === 'bytes';
  });

  const renderHumanreadable = computed(() => {
    if (props.field === 'milliseconds') {
      return renderMilliseconds(props.value);
    } else if (props.field === 'bytes') {
      return renderBytes(props.value);
    }

    return '';
  });
</script>
