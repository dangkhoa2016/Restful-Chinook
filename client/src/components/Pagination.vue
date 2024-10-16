<template>

  <nav aria-label="Page navigation" class="my-3">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a href="#" class="page-link" @click.prevent="changePage(modelValue - 1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li v-if="displayedPages[0] > 1" class="page-item">
        <a href="#" class="page-link" @click.prevent="changePage(1)">1</a>
      </li>

      <li v-if="displayedPages[0] > 2" class="page-item">
        <a href="#" class="page-link" @click.prevent="changePage(displayedPages[0] - 1)">...</a>
      </li>

      <li v-for="pageNumber in displayedPages" :key="pageNumber" class="page-item"
        :class="{ 'active': modelValue === pageNumber }">
        <a href="#" class="page-link" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
      </li>

      <li v-if="displayedPages[displayedPages.length - 1] < totalPages - 1" class="page-item">
        <a href="#" class="page-link" @click.prevent="changePage(displayedPages[displayedPages.length - 1] + 1)">...</a>
      </li>

      <li v-if="displayedPages[displayedPages.length - 1] < totalPages" class="page-item">
        <a href="#" class="page-link" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
      </li>

      <li class="page-item">
        <a href="#" class="page-link" @click.prevent="changePage(modelValue + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>

</template>

<script>
  export default {
    name: 'Pagination',
  }
</script>

<script setup>
  import { computed, ref, } from 'vue';


  // Define props
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    modelValue: {
      type: Number,
      required: true,
      default: 1,
    },
  });

  // Define emits
  const emits = defineEmits(['update:modelValue']);

  // Reactive state for currentPage (if needed for internal component logic)
  const currentPage = ref(props.modelValue);


  // Computed properties
  const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.itemsPerPage);
  });

  const displayedPages = computed(() => {
    const maxDisplayedPages = 5;
    let startPage = Math.max(1, currentPage.value - Math.floor(maxDisplayedPages / 2));
    const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages.value);

    // Ensure we have exactly 5 pages
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  });


  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
      emits('update:modelValue', pageNumber);
      currentPage.value = pageNumber; // Update currentPage if it's used internally
    }
  };
</script>
