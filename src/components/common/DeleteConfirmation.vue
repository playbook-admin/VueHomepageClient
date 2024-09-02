<template>
  <div v-if="localShowModal" class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h4">Confirm deletion</h5>
      </div>
      <div class="alert alert-danger">
        {{ message }}
      </div>
      <div class="modal-body">
        <button @click="handleClose" class="btn btn-secondary">Cancel</button>
        <button @click="confirmModal" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'DeleteConfirmation',
  components: {
    FontAwesomeIcon
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    confirmModal: {
      type: Function,
      required: true,
    },
    hideModal: {
      type: Function,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const localShowModal = ref(props.showModal);
    const opacity = computed(() => (localShowModal.value ? 1 : 0));

    // Watch for prop changes to update localShowModal
    watch(() => props.showModal, (newVal) => {
      localShowModal.value = newVal;
    });

    // Watch for localShowModal changes to call hideModal
    watch(() => localShowModal.value, (newVal) => {
      if (!newVal) {
        props.hideModal();
      }
    });

    // Handle modal close
    const handleClose = () => {
      localShowModal.value = false;
    };

    return {
      localShowModal,
      handleClose,
      opacity,
    };
  },
};
</script>
