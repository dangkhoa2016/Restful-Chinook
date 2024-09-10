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
          data-bs-toggle='tab' ref='belongToTabBtn'
          data-bs-target='#belongto-tab' type='button' role='tab'
          aria-controls='belongto-tab' aria-selected='true'>Belong to</button>
      </li>
      <li class='nav-item' role='presentation'>
        <button class='nav-link' :class="{'active': showTab == 2}"
          data-bs-toggle='tab' ref='hasManyTabBtn'
          data-bs-target='#hasmany-tab' type='button' role='tab'
          aria-controls='hasmany-tab' aria-selected='false'>Has many</button>
      </li>
    </nav>
    <div class='tab-content bg-white rounded'>
      <div class='tab-pane fade p-4' :class="{'show active': showTab == 1}"
        id='belongto-tab' role='tabpanel' aria-labelledby='belongto-tab'>
        <BelongToTab :model-id='modelId' :load-data='showTab == 1' />
      </div>
      <div class='tab-pane fade p-4' :class="{'show active': showTab == 2}"
        id='hasmany-tab' role='tabpanel' aria-labelledby='hasmany-tab'>
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

  import BelongToTab from '/client/src/components/BelongToTab.vue';
  import HasManyTab from '/client/src/components/HasManyTab.vue';


	const emitter = inject('emitter');
  const collapseAssociationsTab = ref(null);
  const collapseAssociationsJs = ref(null);
  const hasManyTabBtn = ref(null);
  const belongToTabBtn = ref(null);
  const currentModel = ref(null);

  const props = defineProps({
    modelId: {
      type: [String, Number, null, undefined],
      required: false,
    },
  });
  const showTab = ref(null);


  onMounted(() => {
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

    hasManyTabBtn.value.addEventListener('shown.bs.tab', handleTabChange);
    belongToTabBtn.value.addEventListener('shown.bs.tab', handleTabChange);
  });

  const handleTabChange = (event) => {
    const tab = event.target.getAttribute('aria-controls');
    showTab.value = tab === 'belongto-tab' ? 1 : 2;
  };

  const handleCollapseHide = (event) => {
    showTab.value = null;
  };

  const toggleAssociations = () => {
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
    hasManyTabBtn.value.removeEventListener('shown.bs.tab', handleTabChange);
    belongToTabBtn.value.removeEventListener('shown.bs.tab', handleTabChange);
  });

  watch(() => props.modelId, (newValue, oldValue) => {
    collapseAssociationsJs.value.hide();
    showTab.value = null;
  });

</script>
