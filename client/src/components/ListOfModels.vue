<template>
  <!-- list of models -->
  <ul class='list-group'>
    <template v-for='(item, index) in listModels' :key='index'>
      <li :class='itemClasses(item.id)'>
        <span class='model-name'>{{ item.name }}</span>
        <button class='btn btn-primary show-records text-nowrap ms-1'
          @click.prevent="loadTable(item.id)">Show Records</button>
      </li>
    </template>
  </ul>
</template>

<script>
  export default {
    name: 'ListOfModels',
  }
</script>

<script setup>

  import { ref, inject, } from 'vue';
  const emitter = inject('emitter');

  const currentModel = ref(null);
  const itemClasses = (model) => {
    return {
      'list-group-item d-flex': true,
      'justify-content-between': true,
      'align-items-center text-nowrap': true,
      'px-2': true,
      'bg-warning': model === currentModel.value,
    }
  }

  const listModels = [
    { id: 'albums', name: 'Albums' },
    { id: 'artists', name: 'Artists' },
    { id: 'customers', name: 'Customers' },
    { id: 'employees', name: 'Employees' },
    { id: 'genres', name: 'Genres' },
    { id: 'invoice-lines', name: 'Invoice Lines' },
    { id: 'invoices', name: 'Invoices' },
    { id: 'media-types', name: 'Media Types' },
    { id: 'playlists', name: 'Playlists' },
    { id: 'tracks', name: 'Tracks' }
  ];

  const loadTable = (model) => {
    if (!model) return

    currentModel.value = model;
    emitter.emit('load-table', model);
  }

</script>