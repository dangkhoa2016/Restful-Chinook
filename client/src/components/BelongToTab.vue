<template>

  <transition name="just-fade" mode="out-in">
    <LoadingBelongTo
      v-if="loadingBelongTosRef || forceLoading"
      :id="`loading-${mainId}`"
    />
    <div v-else-if="loadBelongTosErrorRef">
      <ErrorLoadRecords
        :message="loadBelongTosErrorRef"
        :show-reload-button="true"
        @reload="handleIdChange"
      />
    </div>
    <div v-else-if="!belongTosRef || belongTosRef.length == 0" :id="`nodata-${mainId}`">
      <div class="alert alert-info m-0" role="alert">No associations found</div>
    </div>
    <div v-else :id="`main-${mainId}`">
      <nav class="nav nav-tabs justify-content-center" key="nav">
        <li
          v-for="(item, index) in belongTosRef"
          :key="index"
          class="nav-item"
          role="presentation"
        >
          <button
            :class="[{ 'nav-link': true, active: index == 0 }]"
            data-bs-toggle="tab"
            :data-bs-target="`#${item.name}-tab`"
            type="button"
            role="tab"
            :aria-controls="`${item.name}-tab`"
            :aria-selected="index == 0"
          >
            {{ getModelName(item.name) }}
          </button>
        </li>
      </nav>
      <div class="tab-content mt-4" key="tabs">
        <div
          v-for="(item, index) in belongTosRef"
          :key="index"
          class="tab-pane fade"
          :class="{ show: index == 0, active: index == 0 }"
          :id="`${item.name}-tab`"
          role="tabpanel"
          :aria-labelledby="`${item.name}-tab`"
        >
          <DisplayJson
            v-if="item.record"
            :record="item.record"
            :current-model="item.name"
            :show-modal="!isInsideModal"
          />
          <div v-else class="alert alert-info m-0" role="alert">No record found</div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: "BelongToTab",
};
</script>

<script setup>
  import { ref, inject, watch, onMounted, computed, onBeforeUnmount } from "vue";
  import axios from "axios";
  import changeCase from "change-case";
  import pluralize from "pluralize";

  import {
    useAssociationStore,
    fetchBelongTos,
    // setBelongTos,
    // setLoadBelongTosError,
  } from "/src/stores/associationStore.mjs";

  import LoadingBelongTo from "/src/components/LoadingBelongTo.vue";
  import ErrorLoadRecords from "/src/components/ErrorLoadRecords.vue";
  import DisplayJson from "/src/components/DisplayJson.vue";


  const props = defineProps({
    modelId: {
      type: [String, Number, null],
      required: true,
    },
    loadData: {
      type: Boolean,
    },
    isInsideModal: {
      type: Boolean,
    },
  });

  const emitter = inject("emitter");
  const currentModel = ref(null);

  const { belongTos, loadingBelongTos, loadBelongTosError } = useAssociationStore();
  const belongTosRef = ref([]);
  const loadingBelongTosRef = ref(null);
  const loadBelongTosErrorRef = ref(null);
  const cancelToken = ref(null);
  const forceLoading = ref(true);
  const isFetching = ref(false);


  const mainId = computed(() => {
    return currentModel.value
      ? `${currentModel.value}-${props.modelId}-${Math.floor(Math.random() * 1000)}`
      : "";
  });

  const hasBelongTo = computed(() => {
    return belongTosRef.value && Object.keys(belongTosRef.value).length > 0;
  });


  const getCurrentElement = () => {
    const id = mainId.value;
    return document.querySelector(`#main-${id},#nodata-${id},#loading-${id}`);
  };

  const getModal = () => {
    const el = getCurrentElement();
    return el ? el.closest(".modal") : null;
  };

  const getModelName = (model) => {
    return changeCase.capitalCase(pluralize.singular(model));
  };

  const scrollToBottom = () => {
    const el = getCurrentElement();
    if (!el) return;

    const modal = getModal();
    if (modal) {
      modal.scroll({
        top: el.offsetTop,
        behavior: "smooth",
      });
    } else {
      window.scroll({
        top: el.offsetTop - 30,
        behavior: "smooth",
      });
    }
  };

  const handleIdChange = () => {
    if (!currentModel.value) return;
    if (cancelToken.value) cancelToken.value.cancel("aborting previous request");

    forceLoading.value = false;
    cancelToken.value = axios.CancelToken.source();
    isFetching.value = true;

    fetchBelongTos("", currentModel.value, props.modelId, cancelToken.value.token).then(() => {
      cancelToken.value = null;
      setTimeout(() => {
        scrollToBottom();
      }, 550);
      isFetching.value = false;
    });
  };


  watch(() => belongTos.value, (newVal) => {
    if (isFetching.value) belongTosRef.value = newVal;
  });

  watch(() => loadingBelongTos.value, (newVal) => {
    if (isFetching.value) loadingBelongTosRef.value = newVal;
  });

  watch(() => loadBelongTosError.value, (newVal) => {
    if (isFetching.value) loadBelongTosErrorRef.value = newVal;
  });

  watch(() => props.modelId, () => {
    belongTosRef.value = null;
    loadBelongTosErrorRef.value = null;
    loadingBelongTosRef.value = false;
  });

  watch(() => props.loadData, (newVal) => {
    if (newVal) {
      if (!hasBelongTo.value) {
        handleIdChange();
        setTimeout(() => {
          scrollToBottom();
        }, 650);
        return;
      }

      setTimeout(() => {
        scrollToBottom();
      }, 10);
      
      return;
    }

    if (!hasBelongTo.value) forceLoading.value = true;
  });

  watch(() => currentModel.value, (newVal) => {
    if (newVal) {
      belongTosRef.value = null;
      forceLoading.value = true;
    }
  });


  onMounted(() => {
    emitter.on("load-table", (model) => {
      if (!getModal()) currentModel.value = model;
    });

    emitter.on("show-modal", ({ model }) => {
      if (getModal()) currentModel.value = model;
    });
  });

  onBeforeUnmount(() => {
    if (cancelToken.value)
      cancelToken.value.cancel("[BelongToTab] onBeforeUnmount aborting previous request");
  });
</script>
