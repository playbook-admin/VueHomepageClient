<template>
  <div v-if="localShowModal">
    <!-- Modal Overlay -->
    <div class="modal-overlay"></div>
    
    <!-- Modal Dialog -->
    <div class="modal-dialog modal-sm modal-dialog-centered">
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
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  name: 'DeleteConfirmation',
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
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 999; /* Ensure it covers other content */
}

.modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Above the overlay */
  width: auto;
  max-width: 90%;
}


</style>
