<template>
  <div class='my-4'>
    <button class='btn btn-warning' type='button'
      aria-expanded='false' @click.prevent='toggleAssociations'>
      View associations
    </button>
  </div>
  <div class='collapse my-4' ref='collapseAssociationsTab'>
    <nav class='nav nav-tabs justify-content-center mt-4'>
      <li class='nav-item' role='presentation'>
        <button class='nav-link' :class="{'active': showTab == 1}"
          data-bs-toggle='tab' type='button' role='tab' aria-selected='true'
          :data-bs-target='`#${belongToTabId}`'
          :aria-controls='belongToTabId'>Belong to</button>
      </li>
      <li class='nav-item' role='presentation'>
        <button class='nav-link' :class="{'active': showTab == 2}"
          data-bs-toggle='tab' type='button' role='tab' aria-selected='false'
          :data-bs-target='`#${hasManyTabId}`'
          :aria-controls='hasManyTabId'>Has many</button>
      </li>
    </nav>
    <div class='tab-content bg-white rounded'>
      <div class='tab-pane fade p-4' :class="{'show active': showTab == 1}"
        :id='belongToTabId' role='tabpanel' :aria-labelledby='belongToTabId'>
        <BelongToTab :model-id='modelId' :load-data='showTab == 1' />
      </div>
      <div class='tab-pane fade p-4' :class="{'show active': showTab == 2}"
        :id='hasManyTabId' role='tabpanel' :aria-labelledby='hasManyTabId'>
        <HasManyTab :model-id='modelId' :load-data='showTab == 2' />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShowAssociations',
  };
</script>

<script setup>
  import { ref, watch, inject, onMounted, onBeforeUnmount } from 'vue';
  import * as bootstrap from 'bootstrap';

  import BelongToTab from '/src/components/BelongToTab.vue';
  import HasManyTab from '/src/components/HasManyTab.vue';


	const emitter = inject('emitter');
  const collapseAssociationsTab = ref(null);
  const collapseAssociationsJs = ref(null);
  const currentModel = ref(null);

  const props = defineProps({
    modelId: {
      type: [String, Number, null, undefined],
      required: false,
    },
  });
  const showTab = ref(null);
  const belongToTabId = ref(null);
  const hasManyTabId = ref(null);
  const isInsideModal = ref(false);


  onMounted(() => {
    belongToTabId.value = 'belongto-tab-' + (new Date()).getTime() + Math.floor(Math.random() * 1000);
    hasManyTabId.value = 'hasmany-tab-' + (new Date()).getTime() + Math.floor(Math.random() * 1000);

    if (!collapseAssociationsTab.value)
      return;

    collapseAssociationsJs.value = new bootstrap.Collapse(collapseAssociationsTab.value, {
      toggle: false,
    });

    collapseAssociationsTab.value.addEventListener('shown.bs.collapse', handleCollapseShown);
    collapseAssociationsTab.value.addEventListener('hide.bs.collapse', handleCollapseHide);

		emitter.on('load-table', (model) => {
      collapseAssociationsJs.value.hide();
      showTab.value = null;
      currentModel.value = model;
		});

    emitter.on('model-page-change', () => {
      collapseAssociationsJs.value.hide();
      showTab.value = null;
    });

    emitter.on('modal-hidden', () => {
      if (isInsideModal.value)
        collapseAssociationsJs.value.hide();
    });

    collapseAssociationsTab.value.querySelectorAll('nav .nav-item').forEach((el) => {
      el.addEventListener('shown.bs.tab', handleTabChange);
    });

    isInsideModal.value = !!collapseAssociationsTab.value.closest('.modal-body');
  });

  const handleTabChange = (event) => {
    const tab = event.target.getAttribute('aria-controls');
    showTab.value = tab === belongToTabId.value ? 1 : 2;
  };

  const handleCollapseHide = (event) => {
    showTab.value = null;
  };

  const toggleAssociations = (ev) => {
    collapseAssociationsJs.value.toggle();
  };

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  const handleCollapseShown = (event) => {
    setTimeout(() => { scrollToBottom(); }, 100);
    showTab.value = 1;
  };

  onBeforeUnmount(() => {
    collapseAssociationsTab.value.removeEventListener('shown.bs.collapse', handleCollapseShown);
    collapseAssociationsTab.value.removeEventListener('hide.bs.collapse', handleCollapseHide);

    collapseAssociationsTab.value.querySelectorAll('nav .nav-item').forEach((el) => {
      el.removeEventListener('shown.bs.tab', handleTabChange);
    });
  });

  watch(() => props.modelId, (newValue, oldValue) => {
    collapseAssociationsJs.value.hide();
    showTab.value = null;
  });

</script>
