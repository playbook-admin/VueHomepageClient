<template>
  <div v-if="localShowModal" class="modal-overlay">
    <div class="modal-content rounded border border-dark">
      <div class="modal-header border-bottom p-4">
        <h5 class="modal-title">Confirm deletion</h5>
        <button @click="handleClose" class="btn btn-close">X</button>
      </div>
      <div class="alert alert-danger p-4">
        {{ message }}
      </div>
      <div class="modal-footer d-flex gap-2 p-4">
        <button @click="handleClose" class="btn btn-secondary">Cancel</button>
        <button @click="confirmModal" class="btn btn-danger">Delete</button>
        <button style="border: none; background: none; color: black;">
          <font-awesome-icon
            icon="spinner"
            size="2x"
            spin
            :style="{ opacity: opacity }"
          />
        </button>
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

    const handleClose = () => {
      localShowModal.value = false;
      setTimeout(() => {
        props.hideModal();
      }, 250); // Match the timeout with the CSS transition time if you use one
    };

    watch(
      () => props.showModal,
      (newVal) => {
        localShowModal.value = newVal;
      }
    );

    watch(
      () => localShowModal.value,
      (newVal) => {
        if (!newVal) {
          props.hideModal();
        }
      }
    );

    return {
      localShowModal,
      handleClose,
      opacity,
    };
  },
};

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header .btn-close {
  border: none;
  background: none;
  font-size: 1.5rem;
}

.modal-footer .btn {
  margin: 0;
}
</style>

