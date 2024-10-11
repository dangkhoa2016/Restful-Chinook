<template>
  <td v-for='(value, field) in record' :key='field' :data-original-value='value'>
    <slot name='default' :data='{ field, value, index }'>
      {{ value }}
    </slot>
  </td>
</template>

<script>
  export default {
    name: 'RecordRow',
  };
</script>

<script setup>
  import { ref, defineProps, computed, watch } from 'vue';

  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
</script>
