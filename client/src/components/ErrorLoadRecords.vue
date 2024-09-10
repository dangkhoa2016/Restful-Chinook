<template>

  <div class='alert text-center alert-danger' role='alert'>
    <h4>
      <svg class='bi feature-icon flex-shrink-0 me-2'
        role='img' aria-label='Error:'>
        <use xlink:href='#error-load'/>
      </svg>
      Error while loading {{ loadDetails ? 'details' : 'list' }}
    </h4>
    <div class='mw-75 mb-3 mw-md-50 mx-auto'>
      <img :src='imageFile' class='mw-50'>
    </div>
    <p>
      <slot>
        {{ message }}
      </slot>
    </p>
    <div v-if='showReloadButton'>
      <button class='btn btn-outline-success btn-sm' @click="emits('reload')"
        title='Click to reload again'>
        <svg class='bi svg-icon' role='img' aria-label='Reload'>
          <use xlink:href='#reload'/>
        </svg>
        Reload
      </button>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'ErrorLoadRecords',
  }
</script>

<script setup>
  import { ref, onMounted } from 'vue';

  defineProps({
    message: {
      type: String,
      required: true,
      default: 'Something went wrong!',
    },
    showReloadButton: {
      type: Boolean,
      default: false,
    },
    loadDetails: { // or load list
      type: Boolean,
      default: false,
    },
  });

  const folder = '/src/assets/images';
  const emits = defineEmits(['reload']);
  const imageFiles = 6;
  const imageFile = ref(null);


  onMounted(() => {
    imageFile.value = `${folder}/error${Math.floor(Math.random() * imageFiles) + 1}.png`;
  });
</script>
